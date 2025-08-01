// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/DeenVerseDistribution.sol";

contract DeenVerseDistributionTest is Test {
    DeenVerseDistribution public distribution;
    DeenVerseSBT public sbt;

    address public owner = address(1);
    address public amilWallet = address(2);
    address public org1Wallet = address(3);
    address public org2Wallet = address(4);
    address public user1 = address(5);
    address public user2 = address(6);

    string public constant ORG1_ID = "org1";
    string public constant ORG2_ID = "org2";
    string public constant ORG1_NAME = "Baitul Mal";
    string public constant ORG2_NAME = "Dompet Dhuafa";

    string public constant IPFS_URI = "ipfs://QmExampleMetadataHash";

    uint256 public constant PAYMENT_AMOUNT = 1 ether;

    function setUp() public {
        vm.prank(owner);
        distribution = new DeenVerseDistribution(amilWallet);
        sbt = distribution.deenVerseSBT();

        // Add test organizations
        vm.prank(owner);
        distribution.addOrganization(ORG1_ID, ORG1_NAME, org1Wallet);

        vm.prank(owner);
        distribution.addOrganization(ORG2_ID, ORG2_NAME, org2Wallet);
    }

    // Test initialization
    function test_Initialization() public view {
        assertEq(distribution.owner(), owner);
        assertEq(distribution.amilWallet(), amilWallet);
        assertEq(address(distribution).balance, 0);
        assertTrue(address(sbt) != address(0));
    }

    // Test organization management
    function test_AddOrganization() public view {
        (string memory name, address wallet, bool isActive) = distribution.organizations(ORG1_ID);
        assertEq(name, ORG1_NAME);
        assertEq(wallet, org1Wallet);
        assertTrue(isActive);
    }

    // Test only owner can add organization
    function test_OnlyOwnerCanAddOrganization() public {
        vm.prank(user1);
        vm.expectRevert(abi.encodeWithSignature("OwnableUnauthorizedAccount(address)", user1));
        distribution.addOrganization("new_org", "New Org", user1);
    }

    // Test remove organization
    function test_RemoveOrganization() public {
        // Check organization is active
        (,, bool isActiveBefore) = distribution.organizations(ORG1_ID);
        assertTrue(isActiveBefore);

        // Remove organization
        vm.prank(owner);
        distribution.removeOrganization(ORG1_ID);

        // Check organization is inactive
        (,, bool isActiveAfter) = distribution.organizations(ORG1_ID);
        assertFalse(isActiveAfter);
    }

    // Test only owner can remove organization
    function test_OnlyOwnerCanRemoveOrganization() public {
        vm.prank(user1);
        vm.expectRevert(abi.encodeWithSignature("OwnableUnauthorizedAccount(address)", user1));
        distribution.removeOrganization(ORG1_ID);
    }

    // Test make payment
    function test_MakePayment() public {
        uint256 initialOrgBalance = distribution.getOrganizationBalance(ORG1_ID);
        uint256 initialAmilBalance = distribution.getAmilBalance();

        // Make payment
        vm.deal(user1, PAYMENT_AMOUNT);
        vm.prank(user1);
        distribution.makePayment{value: PAYMENT_AMOUNT}(
            ORG1_ID, DeenVerseDistribution.PaymentType.ZAKAT, "emas", "Zakat emas", IPFS_URI
        );

        // Check balances
        uint256 expectedOrgShare = (PAYMENT_AMOUNT * 975) / 1000; // 97.5%
        uint256 expectedAmilShare = PAYMENT_AMOUNT - expectedOrgShare; // 2.5%

        assertEq(distribution.getOrganizationBalance(ORG1_ID), initialOrgBalance + expectedOrgShare);
        assertEq(distribution.getAmilBalance(), initialAmilBalance + expectedAmilShare);

        // Check payment record
        uint256[] memory paymentIds = distribution.getUserPayments(user1);
        assertEq(paymentIds.length, 1);

        DeenVerseDistribution.Payment memory payment = distribution.getPayment(paymentIds[0]);
        assertEq(payment.donor, user1);
        assertEq(payment.amount, PAYMENT_AMOUNT);
        assertEq(uint256(payment.paymentType), uint256(DeenVerseDistribution.PaymentType.ZAKAT));
        assertEq(payment.subType, "emas");
        assertEq(payment.note, "Zakat emas");
    }

    // Test SBT minting on payment
    function test_SBTMintingOnPayment() public {
        // Make payment
        vm.deal(user1, PAYMENT_AMOUNT);
        vm.prank(user1);
        distribution.makePayment{value: PAYMENT_AMOUNT}(
            ORG1_ID, DeenVerseDistribution.PaymentType.ZAKAT, "emas", "Zakat emas", IPFS_URI
        );

        // Check SBT was minted
        assertEq(sbt.balanceOf(user1), 1);
        assertEq(sbt.ownerOf(1), user1);

        // Check SBT details
        (uint256 amount, address organization,, string memory paymentType, string memory subType) = sbt.donationInfo(1);
        assertEq(amount, PAYMENT_AMOUNT);
        assertEq(organization, org1Wallet);
        assertEq(paymentType, "ZAKAT");
        assertEq(subType, "emas");
    }

    // Test payment reverts with zero amount
    function test_RevertIfZeroAmount() public {
        vm.prank(user1);
        vm.expectRevert("Amount must be greater than 0");
        distribution.makePayment{value: 0}(
            ORG1_ID, DeenVerseDistribution.PaymentType.ZAKAT, "emas", "Zakat emas", IPFS_URI
        );
    }

    // Test payment reverts with invalid org ID
    function test_RevertIfInvalidOrgId() public {
        vm.deal(user1, PAYMENT_AMOUNT);
        vm.prank(user1);
        vm.expectRevert("Organization ID is required");
        distribution.makePayment{value: PAYMENT_AMOUNT}(
            "", DeenVerseDistribution.PaymentType.ZAKAT, "emas", "Zakat emas", IPFS_URI
        );
    }

    // Test payment reverts with inactive organization
    function test_RevertIfOrganizationNotActive() public {
        // Remove organization
        vm.prank(owner);
        distribution.removeOrganization(ORG1_ID);

        vm.deal(user1, PAYMENT_AMOUNT);
        vm.prank(user1);
        vm.expectRevert("Organization is not active");
        distribution.makePayment{value: PAYMENT_AMOUNT}(
            ORG1_ID, DeenVerseDistribution.PaymentType.ZAKAT, "emas", "Zakat emas", IPFS_URI
        );
    }

    // Test organization withdrawal
    function test_WithdrawFunds() public {
        // Make payment
        vm.deal(user1, PAYMENT_AMOUNT);
        vm.prank(user1);
        distribution.makePayment{value: PAYMENT_AMOUNT}(
            ORG1_ID, DeenVerseDistribution.PaymentType.ZAKAT, "emas", "Zakat emas", IPFS_URI
        );

        // Check initial balance
        uint256 expectedOrgShare = (PAYMENT_AMOUNT * 975) / 1000;
        assertEq(distribution.getOrganizationBalance(ORG1_ID), expectedOrgShare);
        assertEq(org1Wallet.balance, 0);

        // Withdraw funds
        uint256 orgInitialBalance = org1Wallet.balance;
        vm.prank(org1Wallet);
        distribution.withdrawFunds();

        // Check withdrawal
        assertEq(org1Wallet.balance, orgInitialBalance + expectedOrgShare);
        assertEq(distribution.getOrganizationBalance(ORG1_ID), 0);
    }

    // Test amil withdrawal
    function test_WithdrawAmilFunds() public {
        // Make payment
        vm.deal(user1, PAYMENT_AMOUNT);
        vm.prank(user1);
        distribution.makePayment{value: PAYMENT_AMOUNT}(
            ORG1_ID, DeenVerseDistribution.PaymentType.ZAKAT, "emas", "Zakat emas", IPFS_URI
        );

        // Check initial balance
        uint256 expectedAmilShare = PAYMENT_AMOUNT - (PAYMENT_AMOUNT * 975) / 1000;
        assertEq(distribution.getAmilBalance(), expectedAmilShare);
        assertEq(amilWallet.balance, 0);

        // Withdraw funds
        uint256 amilInitialBalance = amilWallet.balance;
        vm.prank(amilWallet);
        distribution.withdrawAmilFunds();

        // Check withdrawal
        assertEq(amilWallet.balance, amilInitialBalance + expectedAmilShare);
        assertEq(distribution.getAmilBalance(), 0);
    }

    // Test only amil can withdraw amil funds
    function test_OnlyAmilCanWithdrawAmilFunds() public {
        vm.prank(user1);
        vm.expectRevert("Not authorized");
        distribution.withdrawAmilFunds();
    }

    // Test update amil wallet
    function test_UpdateAmilWallet() public {
        address newAmilWallet = address(7);

        // Update amil wallet as owner
        vm.prank(owner);
        distribution.updateAmilWallet(newAmilWallet);

        assertEq(distribution.amilWallet(), newAmilWallet);
    }

    // Test only owner can update amil wallet
    function test_OnlyOwnerCanUpdateAmilWallet() public {
        address newAmilWallet = address(7);

        vm.prank(user1);
        vm.expectRevert(abi.encodeWithSignature("OwnableUnauthorizedAccount(address)", user1));
        distribution.updateAmilWallet(newAmilWallet);
    }

    // Test multiple payments
    function test_MultiplePayments() public {
        uint256 paymentCount = 5;
        uint256 totalAmount = PAYMENT_AMOUNT * paymentCount;

        for (uint256 i = 0; i < paymentCount; i++) {
            address user = address(uint160(uint256(keccak256(abi.encodePacked(i)))));
            vm.deal(user, PAYMENT_AMOUNT);
            vm.prank(user);
            distribution.makePayment{value: PAYMENT_AMOUNT}(
                ORG1_ID,
                DeenVerseDistribution.PaymentType.ZAKAT,
                "emas",
                string(abi.encodePacked("Zakat emas ", i)),
                IPFS_URI
            );
        }

        // Check balances
        uint256 expectedOrgShare = (totalAmount * 975) / 1000;
        uint256 expectedAmilShare = totalAmount - expectedOrgShare;

        assertEq(distribution.getOrganizationBalance(ORG1_ID), expectedOrgShare);
        assertEq(distribution.getAmilBalance(), expectedAmilShare);

        // Check SBTs
        assertEq(sbt.totalSupply(), paymentCount);
    }

    // Test different payment types
    function test_DifferentPaymentTypes() public {
        vm.startPrank(user1);
        vm.deal(user1, PAYMENT_AMOUNT * 6);

        DeenVerseDistribution.PaymentType[6] memory paymentTypes = [
            DeenVerseDistribution.PaymentType.ZAKAT,
            DeenVerseDistribution.PaymentType.INFAQ,
            DeenVerseDistribution.PaymentType.SADAQAH,
            DeenVerseDistribution.PaymentType.FIDYAH,
            DeenVerseDistribution.PaymentType.QURBAN,
            DeenVerseDistribution.PaymentType.OTHER
        ];

        string[6] memory subTypes = ["zakat", "infaq", "sedekah", "fidyah", "qurban", "other"];

        for (uint256 i = 0; i < paymentTypes.length; i++) {
            distribution.makePayment{value: PAYMENT_AMOUNT}(
                ORG1_ID, paymentTypes[i], subTypes[i], string(abi.encodePacked("Payment ", i)), IPFS_URI
            );
        }

        vm.stopPrank();

        // Check SBTs were minted with correct types
        assertEq(sbt.balanceOf(user1), 6);

        for (uint256 i = 1; i <= 6; i++) {
            (uint256 amount, address organization,, string memory paymentType, string memory subType) =
                sbt.donationInfo(i);
            assertEq(amount, PAYMENT_AMOUNT);
            assertEq(organization, org1Wallet);
            assertEq(paymentType, _paymentTypeToString(paymentTypes[i - 1]));
            assertEq(subType, subTypes[i - 1]);
        }
    }

    function _paymentTypeToString(DeenVerseDistribution.PaymentType paymentType)
        internal
        pure
        returns (string memory)
    {
        if (paymentType == DeenVerseDistribution.PaymentType.ZAKAT) return "ZAKAT";
        if (paymentType == DeenVerseDistribution.PaymentType.INFAQ) return "INFAQ";
        if (paymentType == DeenVerseDistribution.PaymentType.SADAQAH) return "SADAQAH";
        if (paymentType == DeenVerseDistribution.PaymentType.FIDYAH) return "FIDYAH";
        if (paymentType == DeenVerseDistribution.PaymentType.QURBAN) return "QURBAN";
        return "OTHER";
    }

    // Test get user payments
    function test_GetUserPayments() public {
        // Make 3 payments from user1
        vm.deal(user1, PAYMENT_AMOUNT * 3);
        for (uint256 i = 0; i < 3; i++) {
            vm.prank(user1);
            distribution.makePayment{value: PAYMENT_AMOUNT}(
                ORG1_ID,
                DeenVerseDistribution.PaymentType.ZAKAT,
                "emas",
                string(abi.encodePacked("Zakat emas ", i)),
                IPFS_URI
            );
        }

        // Make 2 payments from user2
        vm.deal(user2, PAYMENT_AMOUNT * 2);
        for (uint256 i = 0; i < 2; i++) {
            vm.prank(user2);
            distribution.makePayment{value: PAYMENT_AMOUNT}(
                ORG1_ID,
                DeenVerseDistribution.PaymentType.ZAKAT,
                "emas",
                string(abi.encodePacked("Zakat emas ", i)),
                IPFS_URI
            );
        }

        // Check user payments
        uint256[] memory user1Payments = distribution.getUserPayments(user1);
        uint256[] memory user2Payments = distribution.getUserPayments(user2);

        assertEq(user1Payments.length, 3);
        assertEq(user2Payments.length, 2);
    }

    // Test receive function
    function test_ReceiveFunction() public {
        uint256 amount = 1 ether;
        vm.deal(user1, amount);

        // Send ETH directly to contract
        vm.prank(user1);
        (bool success,) = address(distribution).call{value: amount}("");
        assertTrue(success);
        assertEq(address(distribution).balance, amount);
    }

    // Test payment type to string conversion
    function test_PaymentTypeToString() public {
        // This is tested indirectly through SBT minting
        vm.deal(user1, PAYMENT_AMOUNT);
        vm.prank(user1);
        distribution.makePayment{value: PAYMENT_AMOUNT}(
            ORG1_ID, DeenVerseDistribution.PaymentType.ZAKAT, "emas", "Zakat emas", IPFS_URI
        );

        (uint256 amount, address organization,, string memory paymentType, string memory subType) = sbt.donationInfo(1);
        assertEq(amount, PAYMENT_AMOUNT);
        assertEq(organization, org1Wallet);
        assertEq(paymentType, "ZAKAT");
        assertEq(subType, "emas");
    }
}
