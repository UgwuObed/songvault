"use client";

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

export default function TrackCard({ track }: { track: Track }) {
  const walrusUrl = `${process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR_URL}/v1/blobs/${track.blobId}`;

  return (
    <div className="bg-[#12121a] border border-[#1e1e2e] rounded-2xl p-5 
      hover:border-indigo-500/40 transition-colors group">
      <div className="flex gap-4">
        {track.coverImageUrl ? (
          <img src={track.coverImageUrl} alt={track.title}
            className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-indigo-500/10 border border-indigo-500/20 
            flex items-center justify-center flex-shrink-0 text-2xl">
            🎵
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{track.title}</h3>
          <p className="text-sm text-gray-400">{track.artist}</p>
          <div className="flex gap-2 mt-1 flex-wrap">
            {track.album && (
              <span className="text-xs bg-[#1e1e2e] text-gray-400 px-2 py-0.5 rounded-full">
                {track.album}
              </span>
            )}
            {track.genre && (
              <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full">
                {track.genre}
              </span>
            )}
            {track.year && (
              <span className="text-xs bg-[#1e1e2e] text-gray-400 px-2 py-0.5 rounded-full">
                {track.year}
              </span>
            )}
          </div>
        </div>
      </div>

      {track.description && (
        <p className="text-xs text-gray-500 mt-3 line-clamp-2">{track.description}</p>
      )}

      {track.audioPreviewUrl && (
        <audio controls src={track.audioPreviewUrl}
          className="w-full mt-3 h-8 opacity-70 hover:opacity-100 transition-opacity" />
      )}

      <div className="mt-3 pt-3 border-t border-[#1e1e2e] flex items-center justify-between">
        <a href={walrusUrl} target="_blank" rel="noopener noreferrer"
          className="text-xs text-indigo-400 hover:text-indigo-300 font-mono truncate 
            max-w-[200px] transition-colors">
          {track.blobId.slice(0, 20)}...
        </a>
        <span className="text-xs text-gray-600">
          {new Date(track.uploadedAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}