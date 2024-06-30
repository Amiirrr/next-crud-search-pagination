"use client"
import { IoSearch } from "react-icons/io5"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
export const Search = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams); // Create a copy of the search params
        params.set("page", "1")
        if (term) {
            params.set("query", term) // Set the query parameter to the search term
        } else {
            params.delete("query") // Remove the query parameter if the search term is empty
        }
        replace(`${pathname}?${params.toString()}`) // Update the URL with the new search params
    }, 300)

    //Using setTimeout
    // const handleSearch = (term: string) => {
    //     setTimeout(() => {
    //         const params = new URLSearchParams(searchParams);
    //         if (term) {
    //             params.set("query", term);
    //         } else {
    //             params.delete("query");
    //         }
    //         replace(`${pathname}?${params.toString()}`);
    //     }, 1000)
    // }
    return (
        <div className="relative flex flex-1">
            <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-200 py-2 pl-10 text-sm outline-2 rounded-md focus:outline-gray-300"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("query")?.toString()}
            />
            <IoSearch className="absolute left-3 top-2 h-5 w-5 text-gray-500" />
        </div>
    )

}