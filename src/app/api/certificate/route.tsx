import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

// Helper function to fetch Google Fonts
async function getFont(fontFamily: string, weight: number = 400) {
  const url = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${weight}&display=swap`;
  const css = await (await fetch(url)).text();
  const fontUrl = css.match(/src: url\((.+?)\)/)?.[1];
  if (!fontUrl) throw new Error("Could not find font URL");
  return fetch(fontUrl).then((res) => res.arrayBuffer());
}

// This function handles POST requests to create a certificate NFT
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { walletAddress, amount, ethAmount, date, type, orgName } = body;

    if (!walletAddress || !amount || !ethAmount || !date || !type || !orgName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const dateObj = new Date(date);
    const displayDate = dateObj.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const formattedAmount = new Intl.NumberFormat("id-ID").format(
      Number(amount)
    );

    // Fetch logo and fonts in parallel
    const logoUrl = new URL(
      "/DeenVerse-Green.png",
      new URL(req.url).origin
    ).toString();
    const [logo, interRegular, interBold, interExtraBold] = await Promise.all([
      fetch(logoUrl).then((res) => res.arrayBuffer()),
      getFont("Inter", 400),
      getFont("Inter", 700),
      getFont("Inter", 800),
    ]);

    // Generate the certificate image
    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#f0fdfa",
            fontFamily: '"Inter"',
            padding: "60px",
            border: "20px solid #047857",
            borderRadius: "10px",
            color: "#064e3b",
            position: "relative",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <img
              src={`data:image/png;base64,${Buffer.from(logo).toString(
                "base64"
              )}`}
              alt="Logo"
              width="100"
              height="100"
            />
          </div>

          {/* Main Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontSize: 72,
                margin: "0 0 20px 0",
                color: "#065f46",
                fontWeight: 800,
              }}
            >
              Sertifikat Donasi
            </h1>
            <p style={{ fontSize: 28, color: "#047857", marginBottom: 20 }}>
              Diberikan kepada pemegang alamat dompet:
            </p>
            <h2
              style={{
                fontSize: 36,
                color: "#064e3b",
                marginBottom: 30,
                fontFamily: "monospace",
                fontWeight: 600,
                backgroundColor: "#d1fae5",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "2px solid #6ee7b7",
              }}
            >
              {walletAddress}
            </h2>
            <p style={{ fontSize: 26, color: "#047857", maxWidth: "800px" }}>
              Atas partisipasinya dalam donasi&nbsp;<strong>{type}</strong>
              &nbsp;sebesar
            </p>
            <p
              style={{
                fontSize: 56,
                color: "#064e3b",
                margin: "10px 0 20px 0",
                fontWeight: 700,
              }}
            >
              Rp {formattedAmount} / {ethAmount} ETH
            </p>
            <p style={{ fontSize: 24, color: "#047857" }}>
              Disalurkan melalui&nbsp;<strong>{orgName}</strong>&nbsp;pada
              tanggal: {displayDate}
            </p>
          </div>

          {/* Footer */}
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <p style={{ fontSize: 24, color: "#064e3b", fontWeight: "bold" }}>
              Powered by DeenVerse
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 800,
        fonts: [
          {
            name: "Inter",
            data: interRegular,
            weight: 400,
            style: "normal",
          },
          {
            name: "Inter",
            data: interBold,
            weight: 700,
            style: "normal",
          },
          {
            name: "Inter",
            data: interExtraBold,
            weight: 800,
            style: "normal",
          },
        ],
      }
    );

    // Convert the image to a buffer
    const imageBuffer = await imageResponse.arrayBuffer();

    // 1. Upload image to Pinata
    const formData = new FormData();
    formData.append("file", new Blob([imageBuffer]), "certificate.png");

    const imageUploadRes = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
        body: formData,
      }
    );

    if (!imageUploadRes.ok) {
      console.error("Pinata image upload error:", await imageUploadRes.text());
      return NextResponse.json(
        { error: "Failed to upload certificate image to IPFS" },
        { status: 500 }
      );
    }

    const imageUploadData = await imageUploadRes.json();
    const imageIpfsHash = imageUploadData.IpfsHash;

    // 2. Create and upload metadata JSON to Pinata
    const metadata = {
      name: `Sertifikat Donasi: ${type}`,
      description: `Sertifikat ini membuktikan donasi sebesar Rp ${formattedAmount} yang disalurkan melalui ${orgName} oleh ${walletAddress} pada ${displayDate}. Divalidasi oleh DeenVerse.`,
      image: `ipfs://${imageIpfsHash}`,
      attributes: [
        { trait_type: "Jenis Donasi", value: type },
        { trait_type: "Lembaga Penyalur", value: orgName },
        {
          display_type: "date",
          trait_type: "Tanggal Donasi",
          value: Math.floor(dateObj.getTime() / 1000),
        },
        { display_type: "number", trait_type: "Nominal (IDR)", value: amount },
        { trait_type: "Nominal (ETH)", value: ethAmount },
        {
          trait_type: "Alamat Wallet",
          value: walletAddress,
        },
      ],
    };

    const metadataUploadRes = await fetch(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
        body: JSON.stringify(metadata),
      }
    );

    if (!metadataUploadRes.ok) {
      console.error(
        "Pinata metadata upload error:",
        await metadataUploadRes.text()
      );
      return NextResponse.json(
        { error: "Failed to upload metadata to IPFS" },
        { status: 500 }
      );
    }

    const metadataUploadData = await metadataUploadRes.json();
    const tokenURI = `ipfs://${metadataUploadData.IpfsHash}`;

    return NextResponse.json({ tokenURI });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
