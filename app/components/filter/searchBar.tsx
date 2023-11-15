import { useRouter } from 'next/router';
import React, { ReactNode, useState } from 'react';

interface SearchBarProps {
  query?: string;
  children?: ReactNode;
  resetSearch?: Function;
}

const SearchBar = ({ query = '', resetSearch, children }: SearchBarProps) => {
  const [search, setSearch] = useState(query?.toString()?.trim() || '');

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = search.trim();

    if (query) {
      resetSearch && resetSearch();
      router.push({
        pathname: `/courses/search`,
        query: { query },
      });
    }
  };

  const handleClearSearch = () => {
    setSearch('');
    router.push({
      pathname: '/courses/filterCourses',
      query: {
        SortByDateCreated: 'Newest',
      },
    });
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row md:items-center md:gap-4 md:p-0 pb-3 md:mb-4"
      >
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative md:w-[80%]">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="search"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block search-input w-full pl-10 p-4 "
            placeholder="Search courses..."
            required
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          {search && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 focus:outline-none cursor-pointer"
            >
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 6.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414L11.414 13l2.293 2.293a1 1 0 01-1.414 1.414L10 14.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 13 6.293 10.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
        {children}
      </form>
    </div>
  );
};

export { SearchBar };
