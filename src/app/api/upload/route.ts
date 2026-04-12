import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "shoreline2026";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = formData.get("password") as string;

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const title = (formData.get("title") as string) || "Untitled";
  const category = (formData.get("category") as string) || "Uncategorized";
  const aspect = (formData.get("aspect") as string) || "wide";

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WebP, and AVIF files are allowed" },
      { status: 400 }
    );
  }

  // 10MB limit
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "File must be under 10MB" }, { status: 400 });
  }

  try {
    // Check if Blob token is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "Storage not configured. Add Vercel Blob to your project." },
        { status: 500 }
      );
    }

    // Upload to Vercel Blob
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `photos/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
    });

    // Store metadata as a separate JSON blob
    const id = `upload-${Date.now()}`;
    const entry = {
      id,
      src: blob.url,
      title,
      category,
      aspect,
      uploadedAt: new Date().toISOString(),
    };

    // Read existing metadata, append, and write back
    const photos = await getPhotos();
    photos.push(entry);
    await savePhotos(photos);

    return NextResponse.json({ success: true, photo: entry });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

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
    allowOverwrite: true,
    contentType: "application/json",
  });
}
