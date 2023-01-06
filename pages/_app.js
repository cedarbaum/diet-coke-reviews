import React, { useState } from "react";
import Layout from "../components/layout";
import { SearchContext } from "../components/SearchContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [search, setSearch] = useState('');
  const value = { search, setSearch };

  return (
    <SearchContext.Provider value={value}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SearchContext.Provider>
  );
}

export default MyApp;
