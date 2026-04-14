import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sussex2026";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  createdAt: string;
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const { blobs } = await list({ prefix: "metadata/" });
    const metaBlob = blobs.find((b) => b.pathname === "metadata/testimonials.json");
    if (!metaBlob) return [];
    const res = await fetch(metaBlob.url);
    return await res.json();
  } catch {
    return [];
  }
}

async function saveTestimonials(testimonials: Testimonial[]) {
  await put("metadata/testimonials.json", JSON.stringify(testimonials), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

// GET — public, returns all testimonials
export async function GET() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json([]);
  }
  const testimonials = await getTestimonials();
  return NextResponse.json(testimonials);
}

// POST — requires password, adds a testimonial
export async function POST(request: NextRequest) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "Storage not configured. Add Vercel Blob to your project." },
        { status: 500 }
      );
    }

    const { name, role, quote, password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!name || !quote) {
      return NextResponse.json({ error: "Name and quote are required" }, { status: 400 });
    }

    const testimonial: Testimonial = {
      id: `testimonial-${Date.now()}`,
      name,
      role: role || "",
      quote,
      createdAt: new Date().toISOString(),
    };

    const testimonials = await getTestimonials();
    testimonials.push(testimonial);
    await saveTestimonials(testimonials);

    return NextResponse.json({ success: true, testimonial });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to add testimonial";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE — requires password, removes a testimonial
export async function DELETE(request: NextRequest) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: "Storage not configured." }, { status: 500 });
    }

    const { id, password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const testimonials = await getTestimonials();
    const updated = testimonials.filter((t) => t.id !== id);

    if (updated.length === testimonials.length) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    await saveTestimonials(updated);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
