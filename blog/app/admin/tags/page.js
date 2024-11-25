'use client';
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchTags } from "@/app/lib/features/tags/tagsSlice";
import { useEffect, useState } from "react";

const Tags = () => {
    const tags = useAppSelector((state) => state.tag.tags);
    const status = useAppSelector((state) => state.tag.status);
    const error = useAppSelector((state) => state.tag.error);
    const dispatch = useAppDispatch();
    

    useEffect(() => {
        if(status === 'idle'){
            dispatch(fetchTags());
        }
    }, [dispatch, status])


    return (
        <div className="border border-solid rounded mt-10 p-10">
            <h1>Tags</h1>
            <div className="flex flex-col justify-center items-center">
                <form>
                    <label className="form-control w-full max-w-xs">
                        Enter a Tag
                    </label>
                    <div className="flex flex-row gap-2 mt-2">
                        <input
                            type="text"
                            placeholder="Type Here..."
                            className="input input-bordered w-full max-w-xs"
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
