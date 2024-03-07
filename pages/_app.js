import React, { useState } from "react";
import Layout from "../components/layout";
import { SearchContext } from "../components/SearchContext";
import { SortContext } from "../components/SortContext";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState({
    name: "Date",
    direction: "desc",
  });
  const [isInNotFoundState, setIsInNotFoundState] = useState(false);
  const value = { search, setSearch, isInNotFoundState, setIsInNotFoundState };

  return (
    <SearchContext.Provider value={value}>
      <SortContext.Provider value={{ sortType, setSortType }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Analytics />
      </SortContext.Provider>
    </SearchContext.Provider>
  );
}

export default MyApp;
