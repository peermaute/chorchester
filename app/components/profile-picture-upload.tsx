"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_FILE_SIZE_MB = MAX_FILE_SIZE / (1024 * 1024);

interface ProfilePictureUploadProps {
  currentPicture: string;
  onUploadSuccess?: (url: string) => void;
}

export function ProfilePictureUpload({
  currentPicture,
  onUploadSuccess,
}: ProfilePictureUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError(`File size should be less than ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("oldUrl", currentPicture);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await response.json();
      onUploadSuccess?.(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-48 rounded-full overflow-hidden">
        <Image
          src={currentPicture}
          alt="Profile picture"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button variant="default" asChild>
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            {isUploading ? "Uploading..." : "Change Picture"}
          </label>
        </Button>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}
