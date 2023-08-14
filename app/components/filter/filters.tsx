import { useGetCategoriesQuery } from "app/api/categoriesApi";
import React from "react";

interface FilterProps {
  value: string;
  onChange: Function;
}

const Filters = (props: FilterProps) => {
  const { data, isLoading, isError, isSuccess, error } =
    useGetCategoriesQuery();

  return (
    <div>
      <div className="flex items-center mb-3">
        <input
          id="default-radio-1"
          type="radio"
          value=""
          name="default-radio"
          checked={props?.value === ""}
          onChange={() => props.onChange("")}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
        />
        <label
          htmlFor="default-radio-1"
          className="ml-2 text-sm font-normal text-black "
        >
          All
        </label>
      </div>
      {data?.data?.map((opt: any) => (
        <div className="flex items-center mb-3" key = {opt.id}>
          <input
            id={opt.id}
            type="radio"
            value={opt.id}
            name={opt.id}
            checked={props?.value === opt.id}
            onChange={() => props.onChange(opt.id)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
          />
          <label
            htmlFor={opt.id}
            className="ml-2 text-sm font-normal text-black "
          >
            {opt.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export { Filters };
