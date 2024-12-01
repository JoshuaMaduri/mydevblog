 import { Search } from "../lib/components/CategorySearch"
 
 const Admin = () => {


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
                            <option>T-shirts</option>
                            <option>Mugs</option>
                        </select>

                        <button className='btn btn-secondary ml-3 text-lg'>+</button>
                    </div>

                    <div className="input-group">
                        <Search placeholder="Emter tag name"/>
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