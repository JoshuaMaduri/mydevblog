import { useAppDispatch } from "@/app/lib/hooks";
import React, { useState } from "react";

const TagSelector = ({ tags, selectedTags, onAddTag, onRemoveTag }) => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      setSuggestions(
        tags.filter((tag) =>
          tag.tag.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleAddTag = async (tag) => {
    if (!selectedTags.some((t) => t.id === tag.id)) {
      onAddTag(tag); 
    }
    setQuery("");
    setSuggestions([]);
  };

  const handleRemoveTag = (id) => {
    onRemoveTag(id);
  };

  return (
    <div className="col-span-4">
        <label className="block text-sm font-medium">Tags</label>
        <div className="relative">
            <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Search for tags..."
            value={query}
            onChange={handleInput}
            />

            {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full mt-1 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                {suggestions.map((tag) => (
                <li
                    key={tag.id}
                    className="px-4 py-2 cursor-pointer"
                    onClick={() => handleAddTag(tag)}
                >
                    {tag.tag}
                </li>
                ))}
            </ul>
            )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
            <div
                key={tag.id}
                className="flex items-center px-3 py-1 rounded-full"
            >
                <span className="mr-2">{tag.tag}</span>
                <button
                className="text-blue-600 hover:text-blue-800 focus:outline-none"
                onClick={() => handleRemoveTag(tag.id)}
                >
                &times;
                </button>
            </div>
            ))}
        </div>
    </div>
  );
};

export default TagSelector;
