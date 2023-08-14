import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { QueryHooks } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { useState, useCallback, useEffect, useMemo } from "react";

interface PaginationProps {
  [key: string | number]: any;
}

interface Res {
  data: {
    metaData: {
      page: number;
      perPage: number;
      total: number;
      totalPages: number;
    };
    pagedList: any[];
  };
  errors: any[];
}

const getList = (res: Res) => {
  return res?.data?.pagedList?.length ? res?.data?.pagedList : [];
};

const getPageKey = (currentPage: number, index: number) => {
  if (index === 0) {
    return currentPage - 1;
  } else if (index === 1) {
    return currentPage;
  }
  return currentPage + 1;
};

function usePaginatedQuery<
  Endpoint extends QueryHooks<QueryDefinition<any, any, any, any, any>>
>(endpoint: Endpoint, options?: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [results, setResults] = useState(new Map());
  const [loading, setLoading] = useState<boolean>(true);

  const next = useCallback(
    () => setCurrentPage((currentPage) => currentPage + 1),
    []
  );
  const prev = useCallback(
    () => setCurrentPage((currentPage) => currentPage - 1),
    []
  );
  const reset = useCallback(() => {
    setCurrentPage(1);
    setMaxPage(1);
    setResults(new Map());
  }, []);
  const lastResult = endpoint.useQuery(
    { ...options, page: currentPage - 1 },
    { skip: currentPage <= 1 }
  );
  const currentResult = endpoint.useQuery({ ...options, page: currentPage });
  const nextResult = endpoint.useQuery({ ...options, page: currentPage + 1 });

  //TO DO
  //Add combined results for loading and error
  // eg loading no prev data, loading with prev data
  // error in 0, 1, 2,or all 3 queries
  // return all this info

  const newResult = useMemo(() => {
    const values = new Map();
    const allResults = [lastResult.data, currentResult.data, nextResult.data];
    let hasDataMeta = 1;

    allResults.forEach((res, index) => {
      if (getList(res).length) {
        hasDataMeta =
          (currentResult.data as Res)?.data?.metaData?.totalPages || 1;
        values.set(getPageKey(currentPage, index), getList(res));
      }
    });

    setMaxPage((max) => {
      if (max < hasDataMeta) {
        return hasDataMeta;
      }
      return max;
    });

    return values;
  }, [currentPage, lastResult.data, currentResult.data, nextResult.data]);

  useEffect(() => {
    setResults((results) => {
      const result = new Map(results);
      const newKeys = newResult.keys();

      // @ts-ignore
      [...newKeys].forEach((k) => result.set(k, newResult.get(k)));
      return result;
    });
  }, [newResult]);

  useEffect(() => {
    // update the laoding state, if any of the result has a truthy loading state
    setLoading(
      lastResult.isLoading || nextResult.isLoading || currentResult.isLoading
    );
  }, [lastResult.isLoading, nextResult.isLoading, currentResult.isLoading]);

  return {
    loading,
    reset,
    currentPage,
    next,
    prev,

    // @ts-ignore
    results: [].concat.apply([], [...results.values()]),
    isLast: currentPage === maxPage,
  };
}

export { usePaginatedQuery };
