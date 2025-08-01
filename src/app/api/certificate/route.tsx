import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";
import PinataSDK from "@pinata/sdk";
import { Readable } from "stream";

// Initialize Pinata SDK
const pinata = new PinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

// The new function will handle POST requests
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { walletAddress, amount, date, type, orgName } = body;

    if (!walletAddress || !amount || !date || !type || !orgName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const formattedAddress = `${walletAddress.substring(
      0,
      6
    )}...${walletAddress.substring(walletAddress.length - 4)}`;
    const formattedAmount = new Intl.NumberFormat("id-ID").format(
      Number(amount)
    );

    // 1. Generate the certificate image
    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0fdfa",
            fontFamily: '"Inter", sans-serif',
            position: "relative",
            border: "20px solid #047857",
            borderRadius: "10px",
            color: "#064e3b",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "40px",
            }}
          >
            <p style={{ fontSize: 28, color: "#059669", fontWeight: "bold" }}>
              DEENVERSE CERTIFICATE
            </p>
            <h1
              style={{
                fontSize: 64,
                margin: "20px 0",
                color: "#065f46",
                fontWeight: 800,
              }}
            >
              Sertifikat Donasi
            </h1>
            <p style={{ fontSize: 32, color: "#047857", marginBottom: 40 }}>
              Diberikan kepada pemegang alamat dompet:
            </p>
            <h2
              style={{
                fontSize: 48,
                color: "#064e3b",
                marginBottom: 40,
                fontFamily: "monospace",
                fontWeight: 600,
              }}
            >
              {formattedAddress}
            </h2>
            <p style={{ fontSize: 28, color: "#047857", textAlign: "center" }}>
              Atas partisipasinya dalam donasi <strong>{type}</strong> sebesar
            </p>
            <p
              style={{
                fontSize: 48,
                color: "#064e3b",
                margin: "20px 0",
                fontWeight: 700,
              }}
            >
              Rp {formattedAmount}
            </p>
            <p style={{ fontSize: 24, color: "#047857" }}>
              Disalurkan melalui <strong>{orgName}</strong> pada tanggal: {date}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 40,
                position: "absolute",
                bottom: 40,
              }}
            >
              <p style={{ fontSize: 28, color: "#065f46", fontWeight: "bold" }}>
                DeenVerse
              </p>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );

    const imageBuffer = await imageResponse.arrayBuffer();
    const stream = Readable.from(Buffer.from(imageBuffer));

    // 2. Upload the image to Pinata
    const imageResult = await pinata.pinFileToIPFS(stream, {
      pinataMetadata: { name: `Certificate-${walletAddress}.png` },
    });

    const imageUrl = `https://gateway.pinata.cloud/ipfs/${imageResult.IpfsHash}`;

    // 3. Create NFT metadata
    const metadata = {
      name: `Sertifikat Donasi: ${type}`,
      description: `Sertifikat ini membuktikan donasi sebesar Rp ${formattedAmount} yang disalurkan melalui ${orgName} oleh ${walletAddress} pada ${date}. Divalidasi oleh DeenVerse.`,
      image: imageUrl,
      attributes: [
        { trait_type: "Jenis Donasi", value: type },
        { trait_type: "Lembaga Penyalur", value: orgName },
        { trait_type: "Alamat Donatur", value: walletAddress },
        {
          display_type: "date",
          trait_type: "Tanggal Donasi",
          value: new Date(date).getTime() / 1000,
        },
        {
          display_type: "number",
          trait_type: "Jumlah (IDR)",
          value: Number(amount),
        },
      ],
    };

    // 4. Upload metadata to Pinata
    const metadataUploadResult = await pinata.pinJSONToIPFS(metadata, {
      pinataMetadata: {
        name: `DeenVerse-Metadata-${walletAddress}-${Date.now()}.json`,
      },
    });

    const metadataIpfsHash = metadataUploadResult.IpfsHash;
    const tokenURI = `ipfs://${metadataIpfsHash}`;

    // 5. Return the tokenURI
    return NextResponse.json({ tokenURI }, { status: 200 });
  } catch (e: any) {
    console.error("Error generating certificate NFT:", e.message);
    return NextResponse.json(
      { error: "Failed to generate certificate NFT" },
      { status: 500 }
    );
  }
}
