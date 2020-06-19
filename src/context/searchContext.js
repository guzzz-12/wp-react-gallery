import {createContext} from "react";

export const SearchContext = createContext({
  searchTerm: "",
  isSearching: false,
  setSearchTerm: () => {},
  search: async () => {},
  searchResults: [],
  searchError: null
})