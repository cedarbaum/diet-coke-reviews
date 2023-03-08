import React, { useContext } from "react";
import { SearchContext } from "./SearchContext";

export default function SearchBox() {
  const { search, setSearch } = useContext(SearchContext);

  return (
    <div className="flex">
      <div
        className="relative flex items-center h-12 rounded-lg focus-within:outline-2
                           outline-1 outline-slate-200 outline focus-within:outline-slate-300
                           bg-white overflow-hidden"
      >
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          className="peer h-full w-full outline-none text-[16px] text-gray-700 pr-2"
          type="text"
          id="search"
          placeholder="Search something..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
