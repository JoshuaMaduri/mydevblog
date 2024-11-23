
 
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
                        // value={formData.title}
                        className="w-full p-2 mt-2"
                        required
                    />
                    </label>
                </div>

                <div className="flex flex-row justify-between items-center">

                    <div className="input-group">
                        <select className="select select-bordered">
                            <option disabled selected>Pick category</option>
                            <option>T-shirts</option>
                            <option>Mugs</option>
                        </select>

                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn m-1 text-lg">+</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>Add a Category</a></li>
                                <li><a>Edit a Category</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>
                            Tags:
                            <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                marginTop: '0.5rem',
                            }}
                            >
                            {/* {tags.map((tag, index) => (
                                <div
                                key={index}
                                style={{
                                    backgroundColor: '#0070f3',
                                    color: '#fff',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '3px',
                                    marginRight: '0.5rem',
                                    marginBottom: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <span>{tag}</span>
                                <button
                                    // onClick={() => handleRemoveTag(index)}
                                    style={{
                                    backgroundColor: 'transparent',
                                    color: '#fff',
                                    border: 'none',
                                    marginLeft: '0.5rem',
                                    cursor: 'pointer',
                                    }}
                                >
                                    ×
                                </button>
                                </div>
                            ))} */}
                            </div>
                            <textarea
                            // value={inputValue}
                            // onChange={(e) => setInputValue(e.target.value)}
                            // onKeyDown={handleKeyDown}
                            // placeholder={tags.length >= 5 ? 'Tag limit reached!' : 'Press Enter or Comma to add tags'}
                            // disabled={tags.length >= 5}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                marginTop: '0.5rem',
                                resize: 'none',
                                height: '50px',
                                // borderColor: tags.length >= 5 ? '#d32f2f' : '#ddd',
                            }}
                            />
                        </label>
                        {/* {tags.length >= 5 && (
                            <p style={{ color: '#d32f2f', marginTop: '0.5rem' }}>
                                You can add a maximum of 5 tags.
                            </p>
                        )} */}
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn m-1 text-lg">+</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>Add a Category</a></li>
                                <li><a>Edit a Category</a></li>
                            </ul>
                        </div>


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