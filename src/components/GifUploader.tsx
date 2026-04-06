'use client';

import React, { useState } from 'react';

interface GifUploaderProps {
  isPro: boolean;
  onGifUpload: (gif: File) => void;
}

const GifUploader: React.FC<GifUploaderProps> = ({ isPro, onGifUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'image/gif') {
        setFile(selectedFile);
        onGifUpload(selectedFile);
      }
    }
  };

  if (!isPro) {
    return (
      <div className="mb-8 p-6 border border-accent/30 rounded-lg bg-black/50">
        <h3 className="text-xl font-semibold mb-2">GIF Support</h3>
        <p className="text-foreground/70 mb-4">Upload animated GIFs for your profile background</p>
        <button className="bg-accent/20 text-accent px-6 py-3 rounded-md font-medium">
          Upgrade to Pro for GIF Support
        </button>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">GIF Upload (Pro)</h3>
      <div className="border border-accent/30 rounded-lg p-6 bg-black/50">
        <input
          type="file"
          accept="image/gif"
          onChange={handleFileChange}
          className="block w-full text-sm text-foreground/70 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-accent/20 file:text-accent file:font-medium"
        />
        {file && (
          <div className="mt-4">
            <p className="text-sm text-foreground/70 mb-2">Selected GIF: {file.name}</p>
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="max-w-full h-auto rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GifUploader;