"use client"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchCategories } from "@/app/lib/features/categories/categoriesSlice";
import { fetchTags } from "@/app/lib/features/tags/tagsSlice";
import { addBlog } from "../lib/features/blog/blogSlice";
import CategorySelector from "../components/BlogPost/CategorySelector";
import TagSelector from "../components/BlogPost/TagSelector";
import ImageUploader from "../components/BlogPost/ImageUploader";
import ContentEditor from "../components/BlogPost/ContentEditor";
import { upload } from "@vercel/blob/client";

const Admin = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.category);
  const tags = useAppSelector((state) => state.tag.tags);

  const [selectedTags, setSelectedTags] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: [],
    image: null,
  });

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTags());
  }, [dispatch]);


  const handleImageChange = (file) => {
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || selectedTags.length === 0) {
      alert("Please fill in all fields and select at least one tag.");
      return;
    }

    let imageUrl = null;
    if (formData.image) {
      const uploadedBlob = await upload(formData.image.name, formData.image, {
        access: "public",
        handleUploadUrl: "/api/imageUpload",
      });
      imageUrl = uploadedBlob.url;
    }

    const blogData = {
      ...formData,
      tags: selectedTags,
      image: imageUrl,
      published: false,
    };

    dispatch(addBlog(blogData))
      .unwrap()
      .then(() => alert("Post added successfully!"))
      .catch(() => alert("An error occurred while adding the post."));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="border pb-12">
        <h2 className="text-base font-semibold">Blog Post</h2>
        <p className="text-sm">Please enter the following fields</p>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-10">
          <div className="sm:col-span-4">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full py-1.5"
              required
            />
          </div>
          <CategorySelector
            categories={categories}
            selectedCategory={formData.category}
            handleChange={handleChange}
          />
          <TagSelector
            tags={tags}
            selectedTags={selectedTags}
            onAddTag={(tag) => {setSelectedTags((prev) => [...prev, tag])}}
            onRemoveTag={(id) => setSelectedTags((prev) => prev.filter((tag) => tag.id !== id))}
          />
          <ImageUploader handleImageChange={handleImageChange} />
          <ContentEditor content={formData.content} handleChange={handleChange} />
        </div>
        <button type="submit" className="btn mt-5">
          Add Post
        </button>
      </div>
    </form>
  );
};

export default Admin;
