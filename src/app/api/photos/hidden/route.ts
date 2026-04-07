import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "bloom2026";

async function getHiddenIds(): Promise<number[]> {
  try {
    const { blobs } = await list({ prefix: "metadata/" });
    const metaBlob = blobs.find((b) => b.pathname === "metadata/hidden.json");
    if (!metaBlob) return [];
    const res = await fetch(metaBlob.url);
    return await res.json();
  } catch {
    return [];
  }
}

async function saveHiddenIds(ids: number[]) {
  await put("metadata/hidden.json", JSON.stringify(ids), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

// GET — returns list of hidden static image IDs
export async function GET() {
  const hidden = await getHiddenIds();
  return NextResponse.json(hidden);
}

// POST — hide a static image
export async function POST(request: NextRequest) {
  const { id, password } = await request.json();

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hidden = await getHiddenIds();
  if (!hidden.includes(id)) {
    hidden.push(id);
    await saveHiddenIds(hidden);
  }

  return NextResponse.json({ success: true });
}

// DELETE — unhide a static image (restore it)
export async function DELETE(request: NextRequest) {
  const { id, password } = await request.json();

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hidden = await getHiddenIds();
  const updated = hidden.filter((h) => h !== id);
  await saveHiddenIds(updated);

  return NextResponse.json({ success: true });
}
