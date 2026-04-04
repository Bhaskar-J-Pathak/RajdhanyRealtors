import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

export async function uploadImage(
  file: Buffer,
  folder: string = "rajdhani-realtors"
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "image",
          transformation: [
            { width: 1920, height: 1080, crop: "limit" },
            { quality: "auto:good" },
            { fetch_format: "auto" },
          ],
        },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error("Upload failed"));
            return;
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
          });
        }
      )
      .end(file);
  });
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export function getOptimizedUrl(
  url: string,
  options: { width?: number; height?: number; quality?: string } = {}
): string {
  const { width = 800, height, quality = "auto:good" } = options;

  // If it's not a cloudinary URL, return as-is
  if (!url.includes("cloudinary.com")) {
    return url;
  }

  // Transform the URL to use cloudinary transformations
  const transformation = `w_${width}${height ? `,h_${height}` : ""},c_limit,q_${quality},f_auto`;
  return url.replace("/upload/", `/upload/${transformation}/`);
}

export default cloudinary;
