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

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const MAX_FILE_SIZE_MB = MAX_FILE_SIZE / (1024 * 1024);
const TARGET_FILE_SIZE = 1024 * 1024; // 1MB target size

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

  const compressImage = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement("img");
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions while maintaining aspect ratio
          const maxDimension = 1200; // Maximum dimension for profile picture
          if (width > height && width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Could not get canvas context"));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Start with high quality and reduce until we hit target size
          let quality = 0.9;
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Failed to create blob"));
                return;
              }

              // If the blob is still too large, reduce quality
              if (blob.size > TARGET_FILE_SIZE) {
                quality = 0.7;
                canvas.toBlob(
                  (smallerBlob) => {
                    if (!smallerBlob) {
                      reject(new Error("Failed to create blob"));
                      return;
                    }
                    resolve(smallerBlob);
                  },
                  "image/jpeg",
                  quality
                );
              } else {
                resolve(blob);
              }
            },
            "image/jpeg",
            quality
          );
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Bitte lade eine Bilddatei hoch");
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError(
        `Die Dateigröße sollte weniger als ${MAX_FILE_SIZE_MB}MB betragen`
      );
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Compress the image
      const compressedBlob = await compressImage(file);
      const compressedFile = new File([compressedBlob], file.name, {
        type: "image/jpeg",
        lastModified: Date.now(),
      });

      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("oldUrl", currentPicture);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 429) {
          throw new Error("Zu viele Uploads. Bitte versuche es später erneut.");
        }
        throw new Error(data.error || "Upload fehlgeschlagen");
      }

      const data = await response.json();
      onUploadSuccess?.(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload fehlgeschlagen");
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
            {isUploading ? "Wird hochgeladen..." : "Bild ändern"}
          </label>
        </Button>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}
