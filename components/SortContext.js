import { createContext } from "react";

export const SortContext = createContext({
  sortType: {
    name: "Date",
    direction: "desc",
  },
  setSortType: () => {},
});
