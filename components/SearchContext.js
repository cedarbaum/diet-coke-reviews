import { createContext } from "react";

export const SearchContext = createContext({
  search: "",
  setSearch: () => {},
  isInNotFoundState: false,
  setIsInNotFoundState: () => {},
});
