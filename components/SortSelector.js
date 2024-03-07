import { Fragment, useContext } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/20/solid";
import { SortContext } from "./SortContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function stringifySortType(sortType) {
  return `${sortType.name} ${sortType.direction}`;
}

function parseSortType(sortTypeString) {
  const [name, direction] = sortTypeString.split(" ");
  return { name, direction };
}

function displaySortType(sortType) {
  return (
    <div className="flex flex-row w-full justify-between items-center">
      <span>{sortType.name}</span>
      {sortType.direction === "asc" ? (
        <ArrowUpIcon className="h-4 w-4 ml-2" />
      ) : (
        <ArrowDownIcon className="h-4 w-4 ml-2" />
      )}
    </div>
  );
}

export default function SortSelector({ sortFields }) {
  const sortTypes = sortFields.flatMap((field) => {
    return [
      { name: field, direction: "desc" },
      { name: field, direction: "asc" },
    ];
  });
  const { sortType: selectedSortType, setSortType } = useContext(SortContext);

  return (
    <Listbox
      value={stringifySortType(selectedSortType)}
      onChange={(st) => setSortType(parseSortType(st))}
    >
      {({ open }) => (
        <div className="flex flex-row items-center">
          <div className="relative min-w-[150px]">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600 sm:text-sm sm:leading-6">
              <div className="flex flex-row block truncate">
                <div className="mr-2">
                  <span className="font-bold">Sort by:</span>
                </div>
                {displaySortType(selectedSortType)}
              </div>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {sortTypes.map((sortType) => (
                  <Listbox.Option
                    key={stringifySortType(sortType)}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-slate-200 text-black" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-8 pr-4",
                      )
                    }
                    value={stringifySortType(sortType)}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate",
                          )}
                        >
                          {displaySortType(sortType)}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-black" : "text-slate-600",
                              "absolute inset-y-0 left-0 flex items-center pl-1.5",
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
