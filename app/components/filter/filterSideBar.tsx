import React, { useState, Fragment, useReducer, useEffect } from "react";
import { useRouter } from "next/router";
import { usePaginatedQuery } from "app/hooks";
import { ParsedUrlQueryInput } from "querystring";
import { Filters } from "./filters";
import { RatingFilters } from "./ratingFilters";

interface FilterState extends ParsedUrlQueryInput {
  CategoryId: string;
  MinumumRating: string;
}

interface FilterAction {
  type: string;
  payload: string;
}

interface SetAll {
  catid: string;
  minr: string;
}

const initialState = {
  CategoryId: "",
  MinumumRating: "",
};

const actions = {
  UPDATECAT: "UPDATECAT",
  UPDATERATING: "UPDATERATING",
  SETALL: "SETALL",
};

function reducer(state: FilterState, action: FilterAction) {
  let newState;
  switch (action.type) {
    case actions.UPDATECAT:
      newState = { ...state, CategoryId: action.payload };
      break;
    case actions.UPDATERATING:
      newState = { ...state, MinumumRating: action.payload };
      break;
    case actions.SETALL:
      const payload = action.payload as unknown as SetAll;
      newState = {
        ...state,
        CategoryId: payload.catid,
        MinumumRating: payload.minr,
      };
    default:
      newState = state;
  }
  return newState;
}

const FilterSideBar = ({ reset }: { reset?: Function }) => {
  const router = useRouter();

  const params = router.query;
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChange = (field: keyof typeof actions) => (payload: string) => {
    dispatch({
      type: field,
      payload,
    });
  };

  const onApplyFilter = () => {
    reset ? reset() : null;

    router.push({
      pathname: "/courses/filterCourses",
      query: state,
    });
  };

  useEffect(() => {
    dispatch({
      type: actions.SETALL,
      //@ts-ignore
      payload: {
        catid: params?.CategoryId as string,
        minr: params?.MinumumRating as string,
      },
    });
  }, [params]);

  return (
    <div>
      <div className="mb-6">
        <div className="mb-6 font-medium text-base">Category</div>
        <Filters
          value={state.CategoryId}
          onChange={onChange(actions.UPDATECAT as keyof typeof actions)}
        />
      </div>
      <div className="mb-7">
        <div className="mb-6 font-medium text-base">Ratings</div>
        <RatingFilters
          value={state.MinumumRating}
          onChange={onChange(actions.UPDATERATING as keyof typeof actions)}
        />
      </div>
      <div className="text-center mt-3">
        <button
          type="button"
          onClick={onApplyFilter}
          className="text-black font-normal p-1 px-9 text-base border border-black"
        >
          Apply filter
        </button>
      </div>
    </div>
  );
};

export { FilterSideBar };
