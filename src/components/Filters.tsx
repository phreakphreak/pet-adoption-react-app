import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { usePet } from "../context/PetContext";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Breed } from "@pet/animal";

type FilterType = "cat" | "dog" | "all";

type FilterProps = {
  type?: ItemOption[];
  coats?: ItemOption[];
  breeds?: ItemOption[];
  colors?: ItemOption[];
  genders?: ItemOption[];
  status?: ItemOption[];
};

function Filters() {
  const [currentType, setCurrentType] = useState<FilterType>("cat");
  const [filters, setFilters] = useState<FilterProps>({});
  const { state, dispatch } = usePet();

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      type: Object.keys(state.filters).map(createOption),
    }));
  }, []);

  const createOption = (item: Breed | string, index: number): ItemOption => {
    if (typeof item === "string") {
      return {
        id: index,
        name: item,
      };
    }
    return {
      id: index,
      name: item.name,
    };
  };

  useEffect(() => {
    if (currentType !== "all") {
      console.log("currentType", currentType);
      setFilters((prev) => ({
        ...prev,
        breeds: state.filters[currentType]?.breeds?.map(createOption),
        coats: state.filters[currentType]?.type?.coats.map(createOption),
        colors: state.filters[currentType]?.type?.colors.map(createOption),
        genders: state.filters[currentType]?.type?.genders.map(createOption),
      }));
    }
  }, [currentType]);

  return (
    <div className="flex flex-col gap-8">
      {Object.entries(filters).map((item) => {
        return (
          <DropDown
            label={item[0]}
            key={item[0]}
            setType={setCurrentType}
            data={item[1]}
          />
        );
      })}

      <button
        onClick={() => dispatch({ type: "SEARCH" })}
        className="w-full h-10 bg-rose-400 rounded-sm text-white"
      >
        {" "}
        Search
      </button>
    </div>
  );
}

type ItemOption = {
  id: number;
  name: string;
};

type DropDownProps = {
  data: ItemOption[];
  setType: any;
  label: string;
};

export function DropDown({ data, setType, label }: DropDownProps) {
  const [selected, setSelected] = useState(data[0] ?? null);
  const { dispatch } = usePet();
  const [options, setOptions] = useState(data);
  const [query, setQuery] = useState("");

  const filteredData =
    query === ""
      ? options
      : options.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleChange: any = (event: any) => {
    setQuery(event.target.value);
    dispatch({
      type: "SET_PARAM",
      payload: {
        param: label,
        value: event.target.value,
      },
    });
    if (label === "type") {
      console.log(label);
      console.log(event.target.value);
      setType(event.target.value);
    }
  };

  return (
    <>
      {data?.length > 0 && (
        <div className="w-72">
          <label htmlFor="" className="font-semibold ">
            {label}
          </label>
          <Combobox value={selected} onChange={setSelected}>
            <div className="mt-1">
              <div className="w-full flex cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="w-full outline-none border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  displayValue={(item: ItemOption) => item.name}
                  onChange={handleChange}
                />
                <Combobox.Button className="inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-800"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-72 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredData.length === 0 && query !== "" ? (
                    <div className="cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredData.map((item) => (
                      <Combobox.Option
                        key={item.id}
                        className={({ active }) =>
                          ` relative cursor-default flex select-none py-2 pl-10 pr-4 ${
                            active ? "bg-slate-300 text-white" : "text-gray-900"
                          }`
                        }
                        value={item}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {item.name}
                            </span>
                            {selected ? (
                              <span
                                className={`inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
      )}
    </>
  );
}

export default Filters;
