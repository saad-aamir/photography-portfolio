"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Image from "next/image";
import { galleryImages } from "@/lib/images";

interface PhotoEntry {
  id: string;
  src: string;
  title: string;
  category: string;
  aspect: "tall" | "wide" | "square";
  uploadedAt: string;
}

const CATEGORIES = ["Portraits", "Family Moments", "Two's in Love", "Children", "Pets"];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [hiddenIds, setHiddenIds] = useState<number[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");

  // Upload form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Portraits");
  const [aspect, setAspect] = useState<"tall" | "wide" | "square">("wide");
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchPhotos = async () => {
    const res = await fetch("/api/photos");
    const data = await res.json();
    setPhotos(data);
  };

  const fetchHidden = async () => {
    const res = await fetch("/api/photos/hidden");
    const data = await res.json();
    setHiddenIds(data);
  };

  useEffect(() => {
    if (authenticated) {
      fetchPhotos();
      fetchHidden();
    }
  }, [authenticated]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password.length > 0) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Enter a password");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setUploadMsg("Please select a file");
      return;
    }

    setUploading(true);
    setUploadMsg("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("aspect", aspect);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (res.ok) {
        setUploadMsg("Photo uploaded successfully!");
        setTitle("");
        setPreview(null);
        if (fileRef.current) fileRef.current.value = "";
        fetchPhotos();
      } else {
        setUploadMsg(data.error || "Upload failed");
        if (res.status === 401) {
          setAuthenticated(false);
          setError("Invalid password");
        }
      }
    } catch (err) {
      setUploadMsg(`Upload error: ${err instanceof Error ? err.message : "Network error"}`);
    }

    setUploading(false);
  };

  const handleDeleteUploaded = async (id: string) => {
    if (!confirm("Delete this uploaded photo?")) return;

    const res = await fetch("/api/photos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password }),
    });

    if (res.ok) {
      fetchPhotos();
    } else {
      const data = await res.json();
      alert(data.error || "Delete failed");
    }
  };

  const handleHideStatic = async (id: number) => {
    if (!confirm("Hide this photo from the gallery?")) return;

    const res = await fetch("/api/photos/hidden", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password }),
    });

    if (res.ok) {
      fetchHidden();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to hide");
    }
  };

  const handleRestoreStatic = async (id: number) => {
    const res = await fetch("/api/photos/hidden", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password }),
    });

    if (res.ok) {
      fetchHidden();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to restore");
    }
  };

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="font-serif text-3xl italic text-[#B5D4C0]">
              shoreline stories
            </h1>
            <p className="text-white/30 text-sm mt-2">Admin Panel</p>
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[#6BAB80] transition-colors"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-[#6BAB80] text-black text-sm tracking-widest uppercase rounded-lg hover:bg-[#5a9a6f] transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  const visibleStaticPhotos = galleryImages.filter((img) => !hiddenIds.includes(img.id));
  const hiddenStaticPhotos = galleryImages.filter((img) => hiddenIds.includes(img.id));

  // Admin dashboard
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/5 px-6 md:px-12 py-5 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-xl italic text-[#B5D4C0]">
            shoreline stories
          </h1>
          <p className="text-white/30 text-xs mt-1">Photo Management</p>
        </div>
        <div className="flex gap-4 items-center">
          <a
            href="/"
            className="text-xs tracking-widest uppercase text-white/40 hover:text-[#6BAB80] transition-colors"
          >
            View Site
          </a>
          <button
            onClick={() => {
              setAuthenticated(false);
              setPassword("");
            }}
            className="text-xs tracking-widest uppercase text-white/40 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-10">
        {/* Upload section */}
        <div className="bg-[#141414] rounded-xl border border-white/5 p-6 md:p-8 mb-10">
          <h2 className="text-lg font-serif mb-6">Upload Photo</h2>
          <form onSubmit={handleUpload} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="border-2 border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] hover:border-[#6BAB80]/40 transition-colors cursor-pointer relative"
                onClick={() => fileRef.current?.click()}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-[180px] object-contain rounded"
                  />
                ) : (
                  <>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20 mb-3">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <p className="text-sm text-white/30">Click to select a photo</p>
                    <p className="text-xs text-white/15 mt-1">JPEG, PNG, WebP — max 10MB</p>
                  </>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-white/30 mb-1.5 tracking-wider uppercase">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Photo title"
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-[#6BAB80] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/30 mb-1.5 tracking-wider uppercase">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-[#6BAB80] transition-colors appearance-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} className="bg-[#141414]">{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/30 mb-1.5 tracking-wider uppercase">Aspect Ratio</label>
                  <div className="flex gap-3">
                    {(["tall", "wide", "square"] as const).map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => setAspect(a)}
                        className={`px-4 py-2 text-xs rounded-lg border transition-all ${
                          aspect === a
                            ? "border-[#6BAB80] text-[#6BAB80] bg-[#6BAB80]/10"
                            : "border-white/10 text-white/30 hover:border-white/20"
                        }`}
                      >
                        {a.charAt(0).toUpperCase() + a.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {uploadMsg && (
              <p className={`text-sm ${uploadMsg.includes("success") ? "text-[#6BAB80]" : "text-red-400"}`}>
                {uploadMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={uploading}
              className="px-8 py-3 bg-[#6BAB80] text-black text-xs tracking-widest uppercase rounded-lg hover:bg-[#5a9a6f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading..." : "Upload Photo"}
            </button>
          </form>
        </div>

        {/* Gallery Photos (static) */}
        <div className="mb-10">
          <h2 className="text-lg font-serif mb-6">
            Gallery Photos{" "}
            <span className="text-white/20 text-sm">({visibleStaticPhotos.length} visible)</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {visibleStaticPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative rounded-lg overflow-hidden bg-[#141414] border border-white/5"
              >
                <div className="aspect-square relative">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm truncate">{photo.title}</p>
                  <p className="text-[10px] text-white/30 tracking-wider uppercase mt-0.5">
                    {photo.category}
                  </p>
                </div>
                <button
                  onClick={() => handleHideStatic(photo.id)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white/50 hover:text-red-400 hover:bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-sm"
                  aria-label="Hide photo"
                  title="Hide from gallery"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Hidden photos (can restore) */}
        {hiddenStaticPhotos.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-serif mb-6">
              Hidden Photos{" "}
              <span className="text-white/20 text-sm">({hiddenStaticPhotos.length})</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {hiddenStaticPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative rounded-lg overflow-hidden bg-[#141414] border border-white/5 opacity-50"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      className="object-cover grayscale"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm truncate">{photo.title}</p>
                    <p className="text-[10px] text-white/30 tracking-wider uppercase mt-0.5">
                      {photo.category} — hidden
                    </p>
                  </div>
                  <button
                    onClick={() => handleRestoreStatic(photo.id)}
                    className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/60 text-white/50 hover:text-[#6BAB80] hover:bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-[10px] tracking-wider uppercase"
                    aria-label="Restore photo"
                  >
                    Restore
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Uploaded Photos */}
        <div>
          <h2 className="text-lg font-serif mb-6">
            Uploaded Photos{" "}
            <span className="text-white/20 text-sm">({photos.length})</span>
          </h2>

          {photos.length === 0 ? (
            <div className="text-center py-16 text-white/20">
              <p>No photos uploaded yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative rounded-lg overflow-hidden bg-[#141414] border border-white/5"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm truncate">{photo.title}</p>
                    <p className="text-[10px] text-white/30 tracking-wider uppercase mt-0.5">
                      {photo.category}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteUploaded(photo.id)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white/50 hover:text-red-400 hover:bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-sm"
                    aria-label="Delete photo"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
