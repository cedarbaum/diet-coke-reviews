import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import SearchBox from "./SearchBox";
import { SearchContext } from "./SearchContext";

const EMAIL_SUBJECT = encodeURI("Diet Coke review submission");
const EMAIL_BODY = encodeURI(`Please include:
- The restaurant name
- At least one photo
- Your review notes`);

export default function Layout({ children }) {
  const router = useRouter();
  const { isInNotFoundState } = useContext(SearchContext);
  const canImage = !isInNotFoundState
    ? "/images/diet-coke/full-can.svg"
    : "/images/diet_pepsi_icon.svg";

  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 p-8 sticky top-0 z-30 bg-white">
        <div className="flex justify-between">
          <div className="flex">
            <Link href="/">
              <Image
                width={35}
                height={63}
                src={canImage}
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
        <div className="flex w-full justify-center align-center mt-2 md:mt-0">
          <a
            href={`mailto:hello@dietcoke.reviews?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`}
            className="underline font-bold"
          >
            Submit a review 📧
          </a>
        </div>
      </header>
      <main className="container mx-auto flex flex-1">{children}</main>
      <footer className="mt-8 py-4">
        <div className="container mx-auto flex justify-center">
          <span className="text-4xl md:text-2xl">🗽❤️🥤</span>
        </div>
      </footer>
    </div>
  );
}
