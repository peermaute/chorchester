import { put, del } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const oldUrl = formData.get("oldUrl") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size must be less than 2MB" },
        { status: 400 }
      );
    }

    // Generate a unique filename using timestamp
    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    const filename = `profile-pictures/${timestamp}.${extension}`;

    // Upload new file
    const blob = await put(filename, file, {
      access: "public",
    });

    // Delete old file if it exists and is from our blob storage
    if (oldUrl && oldUrl.includes("blob.vercel-storage.com")) {
      try {
        await del(oldUrl);
      } catch (error) {
        console.error("Error deleting old file:", error);
        // Continue even if deletion fails
      }
    }

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
