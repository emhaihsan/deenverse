// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {DeenVerseSBT} from "../src/DeenVerseSBT.sol";
import {DeenVerseDistribution} from "../src/DeenVerseDistribution.sol";

contract DeployDeenVerse is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        console.log("Deploying DeenVerseSBT...");
        DeenVerseSBT sbt = new DeenVerseSBT();
        console.log("DeenVerseSBT deployed to:", address(sbt));

        console.log("Deploying DeenVerseDistribution...");
        DeenVerseDistribution distribution = new DeenVerseDistribution(address(sbt));
        console.log("DeenVerseDistribution deployed to:", address(distribution));

        // Menambahkan organisasi secara otomatis
        console.log("Adding organizations...");

        // Ganti dengan data asli organisasi Anda
        address baznas = address(0x131E7B1F648d4796865Ed047460CcD9984d590D1);
        address lazisnu = address(0x882DCf9880b3f23136b3eaf74C4630dAD02deA8b);
        address lazismu = address(0x61a8CaF384Cb20a73cDCaAe76B08496dF5827f09);

        distribution.addOrganization(
            "BAZNAS", // orgId singkat
            "Badan Amil Zakat Nasional", // nama lengkap
            baznas // address wallet
        );
        console.log("BAZNAS added successfully.");

        distribution.addOrganization("LAZISNU", "Lembaga Amil Zakat Nahdlatul Ulama", lazisnu);
        console.log("LAZISNU added successfully.");

        distribution.addOrganization("LAZISMU", "Lembaga Amil Zakat Muhammadiyah", lazismu);
        console.log("LAZISMU added successfully.");

        console.log("All organizations added successfully.");

        vm.stopBroadcast();
    }
}
