import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import SearchBox from "./SearchBox";
import { SearchContext } from "./SearchContext";
import PageSwitcher from "./PageSwitcher";
import SortSelector from "./SortSelector";

const EMAIL_SUBJECT = encodeURI("Diet Coke review submission");
const EMAIL_BODY = encodeURI(`Please include:
- Name of the restaurant
- Location
- Rating (0-5 in increments of 0.5)
- Images (at least 1 required)
- Review notes
- Include your name/alias in review? (optional)
- Name or alias (optional)`);

const sortFields = ["Date", "Rating"];

export default function Layout({ children }) {
  const router = useRouter();
  const page = router.pathname;
  const { isInNotFoundState } = useContext(SearchContext);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const canImage = !isInNotFoundState
    ? "/images/diet-coke/full-can.svg"
    : "/images/diet_pepsi_icon.svg";

  return (
    <div className="flex flex-col mx-auto min-h-screen container">
      <header
        className={`p-4 sticky top-0 z-30 bg-white ${
          offset > 0 ? "border-b border-slate-300" : ""
        }`}
      >
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
          <span className="font-bold">Submit a review:&nbsp;</span>
          <a
            href="https://forms.gle/YbaYBBjfnudPJQ58A"
            className="underline"
            target="_blank"
          >
            Form ✏️
          </a>
          <span>&nbsp;or&nbsp;</span>
          <a
            href={`mailto:hello@dietcoke.reviews?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`}
            className="underline"
          >
            Email 📧
          </a>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-center mt-4">
          <PageSwitcher />
          {page === "/" && (
            <div className="mt-4 md:mt-0">
              <SortSelector sortFields={sortFields} />
            </div>
          )}
        </div>
      </header>
      <main className="flex flex-1">{children}</main>
      {page !== "/map" && (
        <footer className="mt-8 py-4">
          <div className="flex justify-center">
            <span className="text-4xl md:text-2xl">❤️🥤</span>
          </div>
        </footer>
      )}
    </div>
  );
}
