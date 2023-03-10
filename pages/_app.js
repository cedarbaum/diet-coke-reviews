import React, { useState } from "react";
import Layout from "../components/layout";
import { SearchContext } from "../components/SearchContext";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [search, setSearch] = useState("");
  const [isInNotFoundState, setIsInNotFoundState] = useState(false);
  const value = { search, setSearch, isInNotFoundState, setIsInNotFoundState };

  return (
    <SearchContext.Provider value={value}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </SearchContext.Provider>
  );
}

export default MyApp;
