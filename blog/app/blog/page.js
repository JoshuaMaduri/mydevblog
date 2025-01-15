"use client"

import { useEffect } from "react";
import { fetchBlogs } from "../lib/features/blog/blogSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";


const Blog = () => {
    
    const dispatch = useAppDispatch();
    const posts = useAppSelector((state) => state.blog.posts);
    const postsStatus = useAppSelector((state) => state.blog.status);

    useEffect(() => {
        if(postsStatus === 'idle'){
            dispatch(fetchBlogs())
        }
    }, [postsStatus, dispatch])

    return (
        <div className="mx-auto ">
            <div className="grid grid-cols-1 lg:grid-cols-3 ">
                {posts.map((posts) => (
                    <div className="card bg-base-100 w-96 shadow-xl xs:w-48 md:w-64 lg:w-80">
                        <figure>
                            <img
                            src={posts.image}
                            alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{posts.title}</h2>
                            <p>{posts.categories}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Blog