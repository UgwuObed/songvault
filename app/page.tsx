"use client";
import { useState } from "react";
import UploadForm from "@/components/UploadForm";
import TrackCard from "@/components/TrackCard";

interface Track {
  blobId: string;
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

export default function Home() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [lookupId, setLookupId] = useState("");
  const [lookupResult, setLookupResult] = useState<Track | null>(null);
  const [lookupError, setLookupError] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);
  const [successBlobId, setSuccessBlobId] = useState("");

  const handleUploadSuccess = (blobId: string, metadata: any) => {
    const track: Track = { blobId, ...metadata };
    setTracks(prev => [track, ...prev]);
    setSuccessBlobId(blobId);
    setTimeout(() => setSuccessBlobId(""), 8000);
  };

  const handleLookup = async () => {
    if (!lookupId.trim()) return;
    setLookupError("");
    setLookupResult(null);
    setLookupLoading(true);
    try {
      const res = await fetch(`/api/track/${lookupId.trim()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setLookupResult({ blobId: lookupId.trim(), ...data.metadata });
    } catch (err: any) {
      setLookupError(err.message || "Track not found");
    } finally {
      setLookupLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-[#1e1e2e] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center 
              justify-center text-sm">🎵</div>
            <div>
              <h1 className="font-bold text-white text-lg leading-none">SongVault</h1>
              <p className="text-xs text-gray-500">Decentralized Music Registry on Sui</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-green-500/10 text-green-400 border 
              border-green-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full 
                animate-pulse inline-block"/>
              Sui Mainnet
            </span>
            <span className="text-xs bg-blue-500/10 text-blue-400 border 
              border-blue-500/20 px-3 py-1 rounded-full">
              Powered by Tatum
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <UploadForm onSuccess={handleUploadSuccess} />

          {/* Success Banner */}
          {successBlobId && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <p className="text-green-400 text-sm font-medium">
                ✅ Track stored on Walrus!
              </p>
              <p className="text-xs text-gray-500 font-mono mt-1 break-all">
                Blob ID: {successBlobId}
              </p>
            </div>
          )}

          {/* Lookup */}
          <div className="bg-[#12121a] border border-[#1e1e2e] rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-semibold text-white">Lookup by Blob ID</h2>
            <div className="flex gap-2">
              <input value={lookupId} onChange={e => setLookupId(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLookup()}
                placeholder="Enter Walrus blob ID..."
                className="flex-1 bg-[#0a0a0f] border border-[#1e1e2e] rounded-lg 
                  px-3 py-2.5 text-sm text-gray-200 placeholder-gray-600 
                  focus:outline-none focus:border-indigo-500 transition-colors" />
              <button onClick={handleLookup} disabled={lookupLoading}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm 
                  font-medium px-4 rounded-lg transition-colors disabled:opacity-50">
                {lookupLoading ? "..." : "Find"}
              </button>
            </div>
            {lookupError && (
              <p className="text-red-400 text-xs">{lookupError}</p>
            )}
            {lookupResult && <TrackCard track={lookupResult} />}
          </div>
        </div>

        {/* Right Column - Vault */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Vault</h2>
            <span className="text-xs text-gray-500">
              {tracks.length} track{tracks.length !== 1 ? "s" : ""} this session
            </span>
          </div>

          {tracks.length === 0 ? (
            <div className="bg-[#12121a] border border-dashed border-[#1e1e2e] 
              rounded-2xl p-12 text-center">
              <div className="text-4xl mb-3">🎶</div>
              <p className="text-gray-500 text-sm">
                No tracks yet. Upload one to store it on Walrus.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {tracks.map(track => (
                <TrackCard key={track.blobId} track={track} />
              ))}
            </div>
          )}

          {/* Info Card */}
          <div className="bg-[#12121a] border border-[#1e1e2e] rounded-2xl p-5 
            space-y-3 mt-4">
            <h3 className="text-sm font-semibold text-gray-300">How it works</h3>
            <div className="space-y-2">
              {[
                ["🎵", "Upload track metadata via the form"],
                ["🌊", "Data stored as a blob on Walrus decentralized storage"],
                ["⛓️", "Sui mainnet verified via Tatum RPC"],
                ["🔍", "Retrieve any track globally using its Blob ID"],
              ].map(([icon, text]) => (
                <div key={text} className="flex items-start gap-2">
                  <span className="text-sm">{icon}</span>
                  <p className="text-xs text-gray-500">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}