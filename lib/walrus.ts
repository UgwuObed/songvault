const PUBLISHER_URL = process.env.WALRUS_PUBLISHER_URL!;
const AGGREGATOR_URL = process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR_URL!;

export interface TrackMetadata {
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  year?: string;
  description?: string;
  coverImageUrl?: string;
  audioPreviewUrl?: string;
  uploadedAt: string;
}

export async function storeOnWalrus(metadata: TrackMetadata): Promise<string> {
  const blob = new Blob([JSON.stringify(metadata)], { 
    type: "application/json" 
  });

  const response = await fetch(`${PUBLISHER_URL}/v1/blobs?epochs=5`, {
    method: "PUT",
    body: blob,
  });

  if (!response.ok) {
    throw new Error(`Walrus upload failed: ${response.statusText}`);
  }

  const result = await response.json();
  
  const blobId = result.newlyCreated?.blobObject?.blobId 
    ?? result.alreadyCertified?.blobId;

  if (!blobId) {
    throw new Error("No blob ID returned from Walrus");
  }

  return blobId;
}

export async function retrieveFromWalrus(blobId: string): Promise<TrackMetadata> {
  const response = await fetch(`${AGGREGATOR_URL}/v1/blobs/${blobId}`);

  if (!response.ok) {
    throw new Error(`Walrus retrieve failed: ${response.statusText}`);
  }

  return response.json();
}