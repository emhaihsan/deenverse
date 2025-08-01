// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/DeenVerseSBT.sol";

contract DeenVerseSBTTest is Test {
    DeenVerseSBT public sbt;
    address public owner = address(0xABCD);
    address public donor = address(0xBEEF);
    address public org = address(0xCAFE);

    string public constant IPFS_URI = "ipfs://QmExampleMetadataHash";

    function setUp() public {
        vm.prank(owner);
        sbt = new DeenVerseSBT();
    }

    function testMintingWorks() public {
        vm.startPrank(owner);

        uint256 amount = 100 ether;
        string memory paymentType = "USDC";
        string memory subType = "Zakat";

        uint256 tokenId = sbt.mint(
            donor,
            IPFS_URI, // tokenURI_
            amount,
            org,
            paymentType,
            subType
        );

        vm.stopPrank();

        // Pastikan tokenId benar
        assertEq(tokenId, 1);

        // Pastikan totalSupply naik
        assertEq(sbt.totalSupply(), 1);

        // Pastikan owner token sesuai
        assertEq(sbt.ownerOf(tokenId), donor);

        // Pastikan tokenURI sesuai
        assertEq(sbt.tokenURI(tokenId), IPFS_URI);

        // Ambil data donasi dan pastikan nilainya benar
        DeenVerseSBT.DonationInfo memory info = sbt.getTokenDetails(tokenId);
        assertEq(info.amount, amount);
        assertEq(info.organization, org);
        assertEq(info.paymentType, paymentType);
        assertEq(info.subType, subType);
    }

    function testOnlyOwnerCanMint() public {
        vm.prank(donor);
        vm.expectRevert(abi.encodeWithSignature("OwnableUnauthorizedAccount(address)", donor));
        sbt.mint(donor, IPFS_URI, 100 ether, org, "USDC", "Zakat");
    }

    function testSoulboundCannotTransfer() public {
        vm.startPrank(owner);
        sbt.mint(donor, IPFS_URI, 100 ether, org, "USDC", "Zakat");
        vm.stopPrank();

        vm.prank(donor);
        vm.expectRevert(bytes("Soulbound: Token is non-transferable"));
        sbt.transferFrom(donor, address(0x1234), 1);
    }

    function testSoulboundCannotApprove() public {
        vm.startPrank(owner);
        sbt.mint(donor, IPFS_URI, 100 ether, org, "USDC", "Zakat");
        vm.stopPrank();

        vm.prank(donor);
        vm.expectRevert(bytes("Soulbound: Token is non-transferable"));
        sbt.approve(address(0x1234), 1);
    }

    function testGetTokenDetails() public {
        vm.startPrank(owner);
        uint256 tokenId = sbt.mint(donor, IPFS_URI, 50 ether, org, "ETH", "Infaq");
        vm.stopPrank();

        DeenVerseSBT.DonationInfo memory info = sbt.getTokenDetails(tokenId);
        assertEq(info.amount, 50 ether);
        assertEq(info.organization, org);
        assertEq(info.paymentType, "ETH");
        assertEq(info.subType, "Infaq");
    }

    function testTotalSupplyIncreases() public {
        vm.startPrank(owner);

        sbt.mint(donor, IPFS_URI, 1 ether, org, "ETH", "Type1");
        sbt.mint(donor, IPFS_URI, 2 ether, org, "ETH", "Type2");

        vm.stopPrank();

        assertEq(sbt.totalSupply(), 2);
    }
}
