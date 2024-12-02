"use client"
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchCategories } from "@/app/lib/features/categories/categoriesSlice"
import { fetchTags } from "@/app/lib/features/tags/tagsSlice";
import { useEffect } from "react";
 
 const Admin = () => {

    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.categories.category);
    const categoriesStatus = useAppSelector((state) => state.categories.status);
    const categoriesError = useAppSelector((state) => state.categories.error);

    const tags = useAppSelector((state) => state.tag.tags);
    const tagsStatus = useAppSelector((state) => state.tag.status);
    const tagsError = useAppSelector((state) => state.tag.error);


    useEffect(() => {
        if(categoriesStatus === 'idle'){
            dispatch(fetchCategories());
        }
    }, [categoriesStatus, dispatch])

    return (
        <div className="mt-10 p-10 ">
            <form className="form-control md:max-w-2xl m-auto flex flex-col gap-10">
                <div className="mb-1">
                    <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        className="w-full p-2 mt-2"
                        required
                    />
                    </label>
                </div>

                <div className="flex flex-row justify-between items-center">

                    <div className="input-group">
                        <select className="select select-bordered" defaultValue="" required>
                            <option disabled value="">Pick category</option>
                            {categories.map((category) => (
                               <option key={category.id} value={category.category}>
                                    {category.category}
                               </option> 
                            ))}
                        </select>
                        
                        {/* Add Function to be able to link it to add categories page. Make sure to save the current blog */}
                        <button className='btn btn-secondary ml-3 text-lg'>+</button> 
                    </div>
                    
                    <div className="input-group">
                        
                    </div>


                </div>

                <div className="mb-1">
                    <label>
                    Content:
                    <textarea
                        name="content"
                        // value={formData.content}
                        required
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', minHeight: '150px' }}
                    />
                    </label>
                </div>

                <button className="btn">Add Post</button>

            </form>
            
        </div>

    )
}

export default Admin