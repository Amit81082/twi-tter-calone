// ✅ NEW FILE

import cloudinary from "@/libs/cloudinary";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { image } = body;

    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "twitter-clone",
    });

    return Response.json(
      {
        url: uploadedImage.secure_url,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        error: "Upload failed",
      },
      {
        status: 500,
      },
    );
  }
}
