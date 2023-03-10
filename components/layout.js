import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import SearchBox from "./SearchBox";

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 p-8 sticky top-0 z-30 bg-white">
        <div className="flex justify-between">
          <div className="flex">
            <Link href="/">
              <Image
                width={35}
                height={63}
                src="/images/diet-coke/full-can.svg"
                alt="Diet Coke can"
                style={{
                  maxWidth: "100%",
                  width: 35,
                  height: 63,
                }}
              />
            </Link>
          </div>
          {router.pathname === "/" && <SearchBox />}
        </div>
      </header>
      <main className="container mx-auto flex-1">{children}</main>
      <footer className="mt-8 py-4">
        <div className="container mx-auto flex justify-center">
          <span className="text-4xl md:text-2xl">🗽❤️🥤</span>
        </div>
      </footer>
    </div>
  );
}
