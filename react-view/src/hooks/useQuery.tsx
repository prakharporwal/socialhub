// A custom hook that builds on useLocation to parse

import { useMemo } from "react";
import { useLocation } from "react-router";

// the query string for you.
function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export { useQuery };
