'use client';
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchCategories, addCategories, removeCategories} from "@/app/lib/features/categories/categoriesSlice"
import { useEffect, useState } from "react";

const Categories = () => {
    const categories = useAppSelector((state) => state.categories.category);
    const status = useAppSelector((state) => state.categories.status);
    const error = useAppSelector((state) => state.categories.error);
    const dispatch = useAppDispatch();

    const [categoriesInput, setCategoriesInput] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategories());
        }
    }, [dispatch, status]);

    const handleAddCategories = (e) => {
        e.preventDefault();
        if (categoriesInput.trim()) {
            dispatch(addCategories({ category: categoriesInput.trim() })); // Fixed payload
            setCategoriesInput('');
        }
    };

    const handleRemoveCategories = (id) => {
        dispatch(removeCategories({ id })); // Fixed payload
    };

    return (
        <div className="mt-10 p-10">
            <h1 className="text-xl font-extrabold">Categories</h1>
            <div className="flex flex-col justify-center items-center gap-10">
                <form onSubmit={handleAddCategories} className="form-control w-full max-w-xs">
                    <label>Enter a Category</label>
                    <div className="flex gap-2 mt-2">
                        <input
                            type="text"
                            placeholder="Type here..."
                            className="input input-bordered w-full max-w-xs"
                            value={categoriesInput}
                            onChange={(e) => setCategoriesInput(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </form>

                {status === 'loading' && <p>Loading categories...</p>}
                {status === 'failed' && <p>Error: {error}</p>}

                <div className="overflow-x-auto">
                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat) => (
                                <tr key={cat.id}>
                                    <td>{cat.category}</td>
                                    <td>
                                        <button onClick={() => handleRemoveCategories(cat.id)} className="btn btn-error btn-sm">Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Categories;
