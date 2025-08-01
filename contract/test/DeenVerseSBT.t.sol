// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/DeenVerseSBT.sol";

contract DeenVerseSBTTest is Test {
    DeenVerseSBT public sbt;
    address public owner = address(0xABCD);
    address public donor = address(0xBEEF);
    address public org = address(0xCAFE);

    function setUp() public {
        vm.prank(owner);
        sbt = new DeenVerseSBT();
    }

    function testMintingWorks() public {
        // Prank sebagai owner supaya bisa mint
        vm.startPrank(owner);

        uint256 amount = 100 ether;
        string memory paymentType = "USDC";
        string memory subType = "Zakat";

        uint256 tokenId = sbt.mint(donor, amount, org, paymentType, subType);

        vm.stopPrank();

        // Pastikan tokenId benar
        assertEq(tokenId, 1);

        // Pastikan totalSupply naik
        assertEq(sbt.totalSupply(), 1);

        // Pastikan owner token sesuai
        assertEq(sbt.ownerOf(tokenId), donor);

        // Ambil data donasi dan pastikan nilainya benar
        DeenVerseSBT.DonationInfo memory info = sbt.getTokenDetails(tokenId);
        assertEq(info.amount, amount);
        assertEq(info.organization, org);
        assertEq(info.paymentType, paymentType);
        assertEq(info.subType, subType);
    }

    function testOnlyOwnerCanMint() public {
        // Prank sebagai orang lain
        vm.prank(donor);
        vm.expectRevert(abi.encodeWithSignature("OwnableUnauthorizedAccount(address)", donor));
        sbt.mint(donor, 100 ether, org, "USDC", "Zakat");
    }

    function testSoulboundCannotTransfer() public {
        vm.startPrank(owner);
        sbt.mint(donor, 100 ether, org, "USDC", "Zakat");
        vm.stopPrank();

        // Coba transfer
        vm.prank(donor);
        vm.expectRevert(bytes("Soulbound: Token is non-transferable"));
        sbt.transferFrom(donor, address(0x1234), 1);
    }

    function testSoulboundCannotApprove() public {
        vm.startPrank(owner);
        sbt.mint(donor, 100 ether, org, "USDC", "Zakat");
        vm.stopPrank();

        vm.prank(donor);
        vm.expectRevert(bytes("Soulbound: Token is non-transferable"));
        sbt.approve(address(0x1234), 1);
    }
}
