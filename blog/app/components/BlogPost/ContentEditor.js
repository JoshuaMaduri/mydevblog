import React from "react";

const ContentEditor = ({ content, handleChange }) => (
  <div className="col-span-full">
    <label className="block text-sm font-medium">Content</label>
    <textarea
      name="content"
      value={content}
      onChange={handleChange}
      className="textarea textarea-bordered w-full"
      rows="5"
      required
    ></textarea>
  </div>
);

export default ContentEditor;