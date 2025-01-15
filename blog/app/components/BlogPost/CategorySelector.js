import React from "react";

const CategorySelector = ({ categories, selectedCategory, handleChange }) => (
  <div className="col-span-full">
    <label className="block text-sm font-medium">Category</label>
    <select
      className="select select-bordered"
      name="category"
      value={selectedCategory}
      onChange={handleChange}
      required
    >
      <option disabled value="">
        Pick Category
      </option>
      {categories.map((category) => (
        <option key={category.id} value={category.category}>
          {category.category}
        </option>
      ))}
    </select>
  </div>
);

export default CategorySelector;