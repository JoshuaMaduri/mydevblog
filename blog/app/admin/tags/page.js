'use client';
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchTags, addTags, removeTag } from "@/app/lib/features/tags/tagsSlice";
import { useEffect, useState } from "react";
import Link from "next/link";

const Tags = () => {
    const tags = useAppSelector((state) => state.tag.tags);
    const status = useAppSelector((state) => state.tag.status);
    const error = useAppSelector((state) => state.tag.error);
    const dispatch = useAppDispatch();
    
    const [tagInput, setTagInput] = useState('')

    useEffect(() => {
        if(status === 'idle'){
            dispatch(fetchTags());
        }
    }, [dispatch, status])

    const handleAddTag = (e) => {
        e.preventDefault();
        if(tagInput.trim()){
            dispatch(addTags({tag: tagInput.trim() }))
            setTagInput('')
        }
    }

    const handleRemoveTag = (id) => {
        dispatch(removeTag(id))
    }

    return (
        <div className="mt-10 p-10">
            <h1 className="text-xl font-extrabold">Tags</h1>
            <div className="flex flex-col justify-center items-center gap-10">
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
                            <tr className="hover">
                                <th>Tags</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tags.map((tag) => (
                                <tr key={tag.id}>
                                    <td>{tag.tag}</td>
                                    <td>
                                        <button
                                            className="btn btn-error btn-sm"
                                            onClick={() => handleRemoveTag(tag.id)}
                                        >       
                                            Remove
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-info btn-sm">
                                            Edit
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
