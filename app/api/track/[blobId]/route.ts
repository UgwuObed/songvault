import { NextRequest, NextResponse } from "next/server";
import { retrieveFromWalrus } from "@/lib/walrus";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ blobId: string }> }
) {
  try {
    const { blobId } = await context.params;

    if (!blobId) {
      return NextResponse.json(
        { error: "Blob ID is required" },
        { status: 400 }
      );
    }

    const metadata = await retrieveFromWalrus(blobId);

    return NextResponse.json({
      success: true,
      blobId,
      metadata,
    });

  } catch (error: any) {
    console.error("Retrieve error:", error);
    return NextResponse.json(
      { error: error.message || "Retrieve failed" },
      { status: 500 }
    );
  }
}