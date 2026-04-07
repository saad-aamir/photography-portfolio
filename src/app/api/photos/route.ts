import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { existsSync, unlinkSync } from "fs";
import path from "path";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "bloom2026";
const DATA_FILE = path.join(process.cwd(), "src", "data", "photos.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

interface PhotoEntry {
  id: string;
  filename: string;
  src: string;
  title: string;
  category: string;
  aspect: "tall" | "wide" | "square";
  uploadedAt: string;
}

async function getPhotos(): Promise<PhotoEntry[]> {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
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

  // Delete file from disk
  const filePath = path.join(UPLOADS_DIR, photo.filename);
  if (existsSync(filePath)) {
    unlinkSync(filePath);
  }

  // Remove from data
  const updated = photos.filter((p) => p.id !== id);
  await writeFile(DATA_FILE, JSON.stringify(updated, null, 2));

  return NextResponse.json({ success: true });
}
