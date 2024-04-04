import React, { FC, useState } from "react";
import css from "./Filter.module.css";
import { Dropdown } from "../Dropdown/Dropdown";
import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/psychologists/slice";

export const Filter: FC = () => {
  const defaultFilter = "Show all";
  const dispatch = useDispatch();
  const options = [
    "A to Z",
    "Z to A",
    "Less than 10$",
    "Greater than 10$",
    "Popular",
    "Not popular",
    "Show all",
  ];
  const [selectedOption, setSelectedOption] = useState<string>(defaultFilter);

  const handleFilterChange = (selectedFilter: string) => {
    setSelectedOption(selectedFilter);
    dispatch(setFilter(selectedFilter));
  };

  return (
    <div>
      <label className={css.filterLabel}>Filters</label>
      <Dropdown
        defaultOption={defaultFilter}
        selectedOption={selectedOption}
        onSelect={handleFilterChange}
      >
        {options.map((option) => (
          <span key={option} data-value={option}>
            {option}
          </span>
        ))}
      </Dropdown>
    </div>
  );
};
