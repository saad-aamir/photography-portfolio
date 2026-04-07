import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "bloom2026";

interface PhotoEntry {
  id: string;
  src: string;
  title: string;
  category: string;
  aspect: string;
  uploadedAt: string;
}

async function getPhotos(): Promise<PhotoEntry[]> {
  try {
    const { blobs } = await list({ prefix: "metadata/" });
    const metaBlob = blobs.find((b) => b.pathname === "metadata/photos.json");
    if (!metaBlob) return [];
    const res = await fetch(metaBlob.url);
    return await res.json();
  } catch {
    return [];
  }
}

async function savePhotos(photos: PhotoEntry[]) {
  await put("metadata/photos.json", JSON.stringify(photos), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

// GET — public, returns all uploaded photos
export async function GET() {
  const photos = await getPhotos();
  return NextResponse.json(photos);
}

// DELETE — requires password, removes a photo
export async function DELETE(request: NextRequest) {
  const { id, password } = await request.json();

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const photos = await getPhotos();
  const photo = photos.find((p) => p.id === id);

  if (!photo) {
    return NextResponse.json({ error: "Photo not found" }, { status: 404 });
  }

  // Delete image blob
  try {
    await del(photo.src);
  } catch {
    // Blob may already be deleted
  }

  // Update metadata
  const updated = photos.filter((p) => p.id !== id);
  await savePhotos(updated);

  return NextResponse.json({ success: true });
}
