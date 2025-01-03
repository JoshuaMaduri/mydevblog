"use client"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchCategories } from "@/app/lib/features/categories/categoriesSlice"
import { fetchTags } from "@/app/lib/features/tags/tagsSlice";
import { addBlog, fetchBlogs } from "../lib/features/blog/blogSlice";
import { useEffect, useState } from "react";
 
 const Admin = () => {

    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.categories.category);
    const categoriesStatus = useAppSelector((state) => state.categories.status);
    const categoriesError = useAppSelector((state) => state.categories.error);

    const tags = useAppSelector((state) => state.tag.tags);
    const tagsStatus = useAppSelector((state) => state.tag.status);
    const tagsError = useAppSelector((state) => state.tag.error);

    const [selectedTags, setSelectedTags] = useState("")
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        tags: []
    });

    useEffect(() => {
        if(categoriesStatus === 'idle'){
            dispatch(fetchCategories());
        }

        if(tagsStatus === "idle"){
            dispatch(fetchTags())
        }

    }, [categoriesStatus, tagsStatus, dispatch])

    const handleTagChange = (tag) => {
        if (selectedTags.includes(tag)) {
          setSelectedTags((prev) => prev.filter((t) => t !== tag)); // Remove tag
        } else if (selectedTags.length < 5) {
          setSelectedTags((prev) => [...prev, tag]); // Add tag
        }
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!formData.title || !formData.category || selectedTags.length === 0) {
          alert("Please fill in all fields and select at least one tag.");
          return;
        }
    
        const blogData = {
          ...formData,
          tags: selectedTags, 
          published: false
        };
    
        dispatch(addBlog(blogData))
          .unwrap()
          .then(() => {
            alert("Post added successfully!");
            setFormData({ title: "", content: "", category: "" });
            setSelectedTags([]);
          })
          .catch((error) => {
            console.error("Failed to add post:", error);
            alert("An error occurred while adding the post.");
          });
      };


      return (
        <div className="mt-10 p-10 ">
          <form className="form-control md:max-w-2xl m-auto flex flex-col gap-10" onSubmit={handleSubmit}>
            <div className="mb-1">
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 mt-2"
                  required
                />
              </label>
            </div>
    
            <div className="flex flex-row justify-between items-center">
              <div className="input-group">
                <select
                  name="category"
                  className="select select-bordered"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option disabled value="">
                    Pick category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.category}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </div>
    
              <div className="input-group">
                <div className="form-control border rounded max-h-40 overflow-scroll">
                  {tags.map((tag) => (
                    <label className="label cursor-pointer gap-3" key={tag.id}>
                      <span className="label-text">{tag.tag}</span>
                      <input
                        type="checkbox"
                        value={tag.tag}
                        checked={selectedTags.includes(tag.tag)}
                        className="checkbox-sm"
                        onChange={() => handleTagChange(tag.tag)}
                        disabled={!selectedTags.includes(tag.tag) && selectedTags.length >= 5}
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
    
            <div className="mb-1">
              <label>
                Content:
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem", minHeight: "150px" }}
                />
              </label>
            </div>
    
            <button type="submit" className="btn">
              Add Post
            </button>
          </form>
        </div>
      );
    };

export default Admin