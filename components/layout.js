import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SearchContext } from "./SearchContext";

export default function Layout({ children }) {
  const { search, setSearch } = useContext(SearchContext);
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="mb-8 py-4 p-8 sticky top-0 z-30 bg-white">
        <div className="flex justify-between">
          <div className="flex">
            <Link href="/">
              <a>
                <img
                  width={35}
                  src={"/images/diet-coke/full-can.svg"}
                />
              </a>
            </Link>
          </div>
          {router.pathname === "/" && (
            <div className="flex">
              <div class="relative flex items-center h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                <div class="grid place-items-center h-full w-12 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                  type="text"
                  id="search"
                  placeholder="Search something..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </header>
      <main className="container mx-auto flex-1">{children}</main>
      <footer className="mt-8 py-4">
        <div className="container mx-auto flex justify-center">&copy; 2023</div>
      </footer>
    </div>
  );
}
