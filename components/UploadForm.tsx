"use client";
import { useState } from "react";

interface UploadFormProps {
  onSuccess: (blobId: string, metadata: any) => void;
}

export default function UploadForm({ onSuccess }: UploadFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    year: "",
    description: "",
    coverImageUrl: "",
    audioPreviewUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.artist) {
      setError("Title and artist are required");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onSuccess(data.blobId, data.metadata);
      setForm({
        title: "", artist: "", album: "", genre: "",
        year: "", description: "", coverImageUrl: "", audioPreviewUrl: "",
      });
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full bg-[#12121a] border border-[#1e1e2e] rounded-lg px-4 py-2.5 
    text-sm text-gray-200 placeholder-gray-600 focus:outline-none 
    focus:border-indigo-500 transition-colors`;

  return (
    <div className="bg-[#12121a] border border-[#1e1e2e] rounded-2xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-white">Upload Track Metadata</h2>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Title *</label>
          <input name="title" value={form.title} onChange={handleChange}
            placeholder="e.g. Essence" className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Artist *</label>
          <input name="artist" value={form.artist} onChange={handleChange}
            placeholder="e.g. Wizkid" className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Album</label>
          <input name="album" value={form.album} onChange={handleChange}
            placeholder="e.g. Made in Lagos" className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Genre</label>
          <input name="genre" value={form.genre} onChange={handleChange}
            placeholder="e.g. Afrobeats" className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Year</label>
          <input name="year" value={form.year} onChange={handleChange}
            placeholder="e.g. 2021" className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Cover Image URL</label>
          <input name="coverImageUrl" value={form.coverImageUrl} onChange={handleChange}
            placeholder="https://..." className={inputClass} />
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-500 mb-1 block">Audio Preview URL</label>
        <input name="audioPreviewUrl" value={form.audioPreviewUrl} onChange={handleChange}
          placeholder="https://..." className={inputClass} />
      </div>

      <div>
        <label className="text-xs text-gray-500 mb-1 block">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange}
          placeholder="About this track..." rows={3}
          className={`${inputClass} resize-none`} />
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 
          rounded-lg px-3 py-2">{error}</p>
      )}

      <button onClick={handleSubmit} disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 
          disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl 
          transition-colors text-sm">
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" 
                stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Storing on Walrus...
          </span>
        ) : "Store on Walrus →"}
      </button>
    </div>
  );
}