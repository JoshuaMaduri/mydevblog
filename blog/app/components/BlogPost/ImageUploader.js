import React from "react";

const ImageUploader = ({ handleImageChange }) => (
  <div className="col-span-full">
    <label className="block text-sm font-medium">Image</label>
    <input
      type="file"
      className="file-input file-input-bordered w-full max-w-xs"
      onChange={(e) => handleImageChange(e.target.files[0])}
    />
  </div>
);

export default ImageUploader;