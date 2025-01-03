"use client"

import { useEffect } from "react";
import Search from "../components/search";
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
        <div>
            {/* {posts.map((post) => {
                {console.log(post)}
            })}
            <div className="container flex flex-col justify-between">
                <div className="card bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="grid grid-cols-3">
                {posts.map((posts) => (
                    <div className="container flex flex-col justify-between">
                        <div className="card bg-base-100 w-96 shadow-xl">
                            <figure>
                                <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{posts.title}</h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Blog