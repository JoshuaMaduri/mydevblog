'use client';
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { getTags, createTag, deleteTag } from '@/app/lib/features/tags/tagService';
import { useEffect, useState } from "react";

const Tags = () => {
    const tags = useAppSelector((state) => state.tag.tags);
    const status = useAppSelector((state) => state.tag.status);
    const error = useAppSelector((state) => state.tag.error);
    const dispatch = useAppDispatch();
    
    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        if (status === "idle" && tags.length === 0) {
            dispatch(getTags());
        }
    }, [status, tags.length, dispatch]);

    const handleAddTag = (e) => {
        e.preventDefault();
        if (tagInput.trim()) {
            dispatch(createTag({ tag: tagInput.trim() }));
            setTagInput('');  // Clear input field after adding
        }
    }

    const handleRemoveTag = (id) => {
        dispatch(deleteTag(id));
    }

    return (
        <div className="border border-solid rounded mt-10 p-10">
            <h1>Tags</h1>
            <div className="flex flex-col justify-center items-center">
                <form onSubmit={handleAddTag}>
                    <label className="form-control w-full max-w-xs">
                        Enter a Tag
                    </label>
                    <div className="flex flex-row gap-2 mt-2">
                        <input
                            type="text"
                            placeholder="Type Here..."
                            className="input input-bordered w-full max-w-xs"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </form>

                {status === "loading" && <p>Loading tags...</p>}
                {status === "failed" && <p>Error: {error}</p>}

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tag</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tags.map((tag) => (
                                <tr key={tag.id}>
                                    <td>{tag.id}</td>
                                    <td>{tag.tag}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleRemoveTag(tag.id)}
                                        >
                                            Remove
                                        </button>
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

export default Tags;
