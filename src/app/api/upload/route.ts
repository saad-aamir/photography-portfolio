import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

// Allow up to 10MB uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export const maxDuration = 30;

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "bloom2026";
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const DATA_FILE = path.join(process.cwd(), "src", "data", "photos.json");

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

async function savePhotos(photos: PhotoEntry[]) {
  const dir = path.dirname(DATA_FILE);
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
  await writeFile(DATA_FILE, JSON.stringify(photos, null, 2));
}

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

  // Ensure uploads dir exists
  if (!existsSync(UPLOADS_DIR)) {
    await mkdir(UPLOADS_DIR, { recursive: true });
  }

  // Generate unique filename
  const ext = file.name.split(".").pop() || "jpg";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const filePath = path.join(UPLOADS_DIR, safeName);

  // Write file
  const bytes = await file.arrayBuffer();
  await writeFile(filePath, Buffer.from(bytes));

  // Save metadata
  const photos = await getPhotos();
  const entry: PhotoEntry = {
    id: `upload-${Date.now()}`,
    filename: safeName,
    src: `/uploads/${safeName}`,
    title,
    category,
    aspect: aspect as "tall" | "wide" | "square",
    uploadedAt: new Date().toISOString(),
  };
  photos.push(entry);
  await savePhotos(photos);

  return NextResponse.json({ success: true, photo: entry });
}
