import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { SearchContext } from "./SearchContext";
import SearchBox from "./SearchBox";

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
                <Image
                  width={35}
                  height={62.3667}
                  src="/images/diet-coke/full-can.svg"
                  alt="Diet Coke can"
                />
              </a>
            </Link>
          </div>
          {router.pathname === "/" && <SearchBox />}
        </div>
      </header>
      <main className="container mx-auto flex-1">{children}</main>
      <footer className="mt-8 py-4">
        <div className="container mx-auto flex justify-center">
          <span>🗽❤️🥤</span>
        </div>
      </footer>
    </div>
  );
}
