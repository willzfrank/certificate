import React, { Fragment } from "react";

import { Listbox, Transition, Dialog } from "@headlessui/react";

interface DropDownProps<T> {
  value?: T;
  options: T[];
  onSelect: (item: T) => void;
  renderItem?: (item: T) => React.ReactNode;
}

const stringify = (item: any) => {
  if (typeof item === "object") {
    return JSON.stringify(item);
  }
  return item?.toString();
};

const DropDown = <T extends {}>({
  value,
  options = [],
  onSelect = () => {},
  renderItem,
}: DropDownProps<T>) => {
  return (
    <div>
      <Listbox value={value} onChange={onSelect}>
        <div className="relative mt-1 md:mt-0">
          <Listbox.Button className="text-black w-[full] mt-0 md:mt-0 justify-around font-medium rounded-lg text-sm p-4 text-center inline-flex items-center border border-black ">
            <span className="flex items-center justify-between truncate">
              <span className="truncate">
                {!value ? (
                  "Sort by"
                ) : (
                  <>
                    Sort by (
                    {renderItem && value ? renderItem(value) : stringify(value)}
                    )
                  </>
                )}
              </span>
              <span className="pointer-events-none flex items-center justify-center">
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 min-w-[199px]  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value=""
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      Select...
                    </span>
                  </>
                )}
              </Listbox.Option>

              {options.map((opt, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={opt}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {renderItem ? renderItem(opt) : stringify(opt)}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export { DropDown };
