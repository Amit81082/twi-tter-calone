// src/hooks/useImageUpload.ts

import axios from "axios";

const useImageUpload = () => {
  const uploadImage = async (base64: string) => {
    try {
      const { data } = await axios.post("/api/upload", {
        image: base64,
      });

      return data.url;
    } catch (error) {
      console.log("IMAGE UPLOAD ERROR:", error);
      throw error; // ✅ IMPORTANT
    }
  };

  return {
    uploadImage,
  };
};

export default useImageUpload;
