import { NextRequest, NextResponse } from "next/server";
import { storeOnWalrus, TrackMetadata } from "@/lib/walrus";
import { getSuiChainInfo } from "@/lib/tatum";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, artist, album, genre, year, description, 
            coverImageUrl, audioPreviewUrl } = body;

    if (!title || !artist) {
      return NextResponse.json(
        { error: "Title and artist are required" },
        { status: 400 }
      );
    }

    // Get Sui chain info via Tatum to prove RPC usage
    const chainInfo = await getSuiChainInfo();

    const metadata: TrackMetadata = {
      title,
      artist,
      album,
      genre,
      year,
      description,
      coverImageUrl,
      audioPreviewUrl,
      uploadedAt: new Date().toISOString(),
    };

    const blobId = await storeOnWalrus(metadata);

    return NextResponse.json({
      success: true,
      blobId,
      metadata,
      sui: chainInfo,
    });

  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}