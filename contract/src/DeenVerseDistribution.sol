// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./DeenVerseSBT.sol";
/**
 * @title PenyaluranManager
 * @dev Manages all penyaluran payments with 97.5% to organization and 2.5% to amil
 */

contract DeenVerseDistribution is Ownable {
    DeenVerseSBT public deenVerseSBT;
    // Payment type enum

    enum PaymentType {
        ZAKAT, // 0
        INFAQ, // 1
        SADAQAH, // 2
        FIDYAH, // 3
        QURBAN, // 4
        OTHER // 5

    }

    // Payment details structure
    struct Payment {
        address donor;
        uint256 amount;
        uint256 timestamp;
        PaymentType paymentType;
        string subType;
        string note;
        bool isPaid;
    }

    // Organization details
    struct Organization {
        string name;
        address wallet;
        bool isActive;
    }

    // State variables
    address public amilWallet;
    uint256 public totalPayments;
    uint256 public constant AMIL_SHARE = 25; // 2.5%
    uint256 public constant SHARE_DIVISOR = 1000; // For 1 decimal place precision (25 = 2.5%)

    // Mappings
    mapping(uint256 => Payment) public payments;
    mapping(address => uint256[]) public userPayments;
    mapping(string => Organization) public organizations;
    mapping(address => uint256) public organizationBalances;
    mapping(address => uint256) public amilBalances;

    // Events
    event PaymentReceived(
        address indexed donor,
        address indexed organization,
        uint256 amount,
        PaymentType paymentType,
        string subType,
        string note
    );

    event OrganizationAdded(string orgId, string name, address wallet);
    event OrganizationRemoved(string orgId);
    event AmilWalletUpdated(address newWallet);
    event FundsWithdrawn(address indexed to, uint256 amount, bool isAmil);

    /**
     * @dev Constructor sets the initial amil wallet
     * @param initialAmilWallet Address to receive the amil share (2.5%)
     */
    constructor(address initialAmilWallet) Ownable(msg.sender) {
        require(initialAmilWallet != address(0), "Invalid amil wallet address");
        amilWallet = initialAmilWallet;
        deenVerseSBT = new DeenVerseSBT();
    }

    /**
     * @dev Makes a payment to an organization
     * @param orgId Organization ID to receive the funds
     * @param paymentType Type of payment (ZAKAT, INFQ, etc.)
     * @param subType Subtype of the payment (e.g., "emas", "fitrah")
     * @param note Optional note for the payment
     * @param tokenURI The unique metadata URI from IPFS for the SBT
     */
    function makePayment(
        string calldata orgId,
        PaymentType paymentType,
        string calldata subType,
        string calldata note,
        string calldata tokenURI
    ) external payable {
        require(msg.value > 0, "Amount must be greater than 0");
        require(bytes(orgId).length > 0, "Organization ID is required");
        require(organizations[orgId].isActive, "Organization is not active");

        // Calculate shares
        uint256 amilAmount = (msg.value * AMIL_SHARE) / SHARE_DIVISOR;
        uint256 orgAmount = msg.value - amilAmount;

        // Update balances
        organizationBalances[organizations[orgId].wallet] += orgAmount;
        amilBalances[amilWallet] += amilAmount;

        // Record payment
        uint256 paymentId = totalPayments++;
        payments[paymentId] = Payment({
            donor: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp,
            paymentType: paymentType,
            subType: subType,
            note: note,
            isPaid: false
        });

        userPayments[msg.sender].push(paymentId);

        // Mint Soulbound Token for the donor
        deenVerseSBT.mint(
            msg.sender, tokenURI, msg.value, organizations[orgId].wallet, _paymentTypeToString(paymentType), subType
        );

        emit PaymentReceived(msg.sender, organizations[orgId].wallet, msg.value, paymentType, subType, note);
    }

    /**
     * @dev Adds a new organization
     * @param orgId Unique ID for the organization
     * @param name Display name of the organization
     * @param wallet Wallet address of the organization
     */
    function addOrganization(string calldata orgId, string calldata name, address wallet) external onlyOwner {
        require(bytes(orgId).length > 0, "Organization ID is required");
        require(bytes(name).length > 0, "Organization name is required");
        require(wallet != address(0), "Invalid wallet address");
        require(!organizations[orgId].isActive, "Organization already exists");

        organizations[orgId] = Organization({name: name, wallet: wallet, isActive: true});

        emit OrganizationAdded(orgId, name, wallet);
    }

    /**
     * @dev Removes an organization
     * @param orgId ID of the organization to remove
     */
    function removeOrganization(string calldata orgId) external onlyOwner {
        require(organizations[orgId].isActive, "Organization does not exist");
        organizations[orgId].isActive = false;
        emit OrganizationRemoved(orgId);
    }

    /**
     * @dev Updates the amil wallet address
     * @param newWallet New amil wallet address
     */
    function updateAmilWallet(address newWallet) external onlyOwner {
        require(newWallet != address(0), "Invalid wallet address");
        amilWallet = newWallet;
        emit AmilWalletUpdated(newWallet);
    }

    /**
     * @dev Allows an organization to withdraw their funds
     */
    function withdrawFunds() external {
        uint256 amount = organizationBalances[msg.sender];
        require(amount > 0, "No funds to withdraw");

        organizationBalances[msg.sender] = 0;
        (bool success,) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");

        emit FundsWithdrawn(msg.sender, amount, false);
    }

    /**
     * @dev Allows the amil to withdraw their share
     */
    function withdrawAmilFunds() external {
        require(msg.sender == amilWallet, "Not authorized");
        uint256 amount = amilBalances[msg.sender];
        require(amount > 0, "No funds to withdraw");

        amilBalances[msg.sender] = 0;
        (bool success,) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");

        emit FundsWithdrawn(msg.sender, amount, true);
    }

    /**
     * @dev Returns the balance of an organization
     * @param orgId ID of the organization
     * @return Balance in wei
     */
    function getOrganizationBalance(string calldata orgId) external view returns (uint256) {
        require(organizations[orgId].isActive, "Organization does not exist");
        return organizationBalances[organizations[orgId].wallet];
    }

    /**
     * @dev Returns the amil balance
     * @return Balance in wei
     */
    function getAmilBalance() external view returns (uint256) {
        return amilBalances[amilWallet];
    }

    /**
     * @dev Returns the payment details for a specific payment ID
     * @param paymentId ID of the payment
     * @return Payment details
     */
    function getPayment(uint256 paymentId) external view returns (Payment memory) {
        return payments[paymentId];
    }

    /**
     * @dev Returns all payment IDs for a specific user
     * @param user Address of the user
     * @return Array of payment IDs
     */
    function getUserPayments(address user) external view returns (uint256[] memory) {
        return userPayments[user];
    }

    // Fallback function to receive ETH
    receive() external payable {}

    // Add this helper function
    function _paymentTypeToString(PaymentType paymentType) internal pure returns (string memory) {
        if (paymentType == PaymentType.ZAKAT) return "ZAKAT";
        if (paymentType == PaymentType.INFAQ) return "INFAQ";
        if (paymentType == PaymentType.SADAQAH) return "SADAQAH";
        if (paymentType == PaymentType.FIDYAH) return "FIDYAH";
        if (paymentType == PaymentType.QURBAN) return "QURBAN";
        return "OTHER";
    }
}
