'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSearchParams } from "next/navigation"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

export const Search = ({ placeholder }) => {

    const searchParams = useSearchParams()

    const handleSearch = (term) => {
        const params = new URLSearchParams(searchParams)

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query')
        }
    }

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
        
            <input type="text" placeholder={placeholder} className="input input-bordered w-full max-w-xs" onChange={(e) => {handleSearch(e.target.value)}}/>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
        </div>


    )
}