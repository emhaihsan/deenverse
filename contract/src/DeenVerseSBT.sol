// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract DeenVerseSBT is ERC721, Ownable {
    // Use uint256 instead of Counter
    uint256 private _nextTokenId;

    // Mapping from token ID to token URI
    mapping(uint256 => string) private _tokenURIs;

    struct DonationInfo {
        uint256 amount;
        address organization;
        uint256 timestamp;
        string paymentType;
        string subType;
    }

    // Mapping from token ID to donation details
    mapping(uint256 => DonationInfo) public donationInfo;

    constructor() ERC721("DeenVerse Donation SBT", "DVDSBT") Ownable(msg.sender) {
        _nextTokenId = 1; // Start from 1
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "ERC721Metadata: URI query for nonexistent token");
        string memory uri = _tokenURIs[tokenId];
        require(bytes(uri).length > 0, "ERC721Metadata: URI not set for token");
        return uri;
    }

    function mint(
        address to,
        string memory tokenURI_,
        uint256 amount,
        address organization,
        string memory paymentType,
        string memory subType
    ) external onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;

        _safeMint(to, tokenId);
        _tokenURIs[tokenId] = tokenURI_;

        donationInfo[tokenId] = DonationInfo({
            amount: amount,
            organization: organization,
            timestamp: block.timestamp,
            paymentType: paymentType,
            subType: subType
        });

        return tokenId;
    }

    // Get total supply
    function totalSupply() external view returns (uint256) {
        return _nextTokenId - 1;
    }

    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        // Cegah transfer jika token sudah pernah dimint dan ini bukan burn
        if (_ownerOf(tokenId) != address(0) && to != address(0)) {
            revert("Soulbound: Token is non-transferable");
        }
        return super._update(to, tokenId, auth);
    }

    // Override approval functions
    function approve(address, uint256) public pure override {
        revert("Soulbound: Token is non-transferable");
    }

    function setApprovalForAll(address, bool) public pure override {
        revert("Soulbound: Token is non-transferable");
    }

    function getTokenDetails(uint256 tokenId) external view returns (DonationInfo memory) {
        require(donationInfo[tokenId].amount != 0, "Token does not exist");
        return donationInfo[tokenId];
    }
}
