"use client";

import React, { useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Image from 'next/image'


interface ImageUploadProps {
onChange: (base64: string) => void;
value?: string;
disabled?: boolean;
label:string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
onChange,
value,
disabled,
label,
}) => {
  const [base64, setBase64] = useState(value);
  const handleChange = useCallback((base64: string) => {
    onChange(base64);
  }, [onChange]);

  const handleDrop = useCallback((files: any) => {
    const file = files[0];
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      setBase64(event.target?.result as string);
      handleChange(event.target?.result as string);
    };
    fileReader.readAsDataURL(file);
  }, [handleChange]);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    }
  });
  return (
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-600",
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center gap-4">
          <div className="relative h-24 w-24">
            <Image
              fill
              src={base64}
              alt="Uploaded image"
              className="object-cover rounded-md"
              sizes="96px"
            />
          </div>
        </div>
      ) : (
        <p className="text-white">{label}</p>
      )}
    </div>
  );
}
export default ImageUpload
