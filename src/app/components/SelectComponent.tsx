import React from "react";
import Select, { SingleValue, MultiValue, StylesConfig, ActionMeta } from "react-select";

type SelectOption = {
  value: string;
  label: string;
};

interface SelectComponentProps {
  selectOptions: SelectOption[];
  placeholder?: string;
  handleSelectChange: (value: string) => void;
}

const selectStyles: StylesConfig<SelectOption> = {
  control: (baseStyles) => ({
    ...baseStyles,
    color: "#ffffff",
    backgroundColor: "#1f2937",
    minWidth: "180px",
    border: 0,
    boxShadow: "none",
  }),
  option: (baseStyles, { isFocused }) => ({
    ...baseStyles,
    color: "#ffffff",
    backgroundColor: isFocused ? "#22c55e" : "#1f2937",
    "&:hover": {
      backgroundColor: "#22c55e",
      color: "#151515",
    },
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#1f2937",
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: "#ffffff",
  }),
};

// Type guard to check if the value is an array (MultiValue)
const isMulti = <T,>(value: SingleValue<T> | MultiValue<T>): value is MultiValue<T> => {
  return Array.isArray(value);
};

const SelectComponent: React.FC<SelectComponentProps> = ({
  selectOptions,
  placeholder = "Select Category",
  handleSelectChange,
}) => {
  const handleChange = (
    option: SingleValue<SelectOption> | MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ) => {
    if (!isMulti(option) && option) {
      handleSelectChange(option.value);
    }
  };

  return (
    <Select
      className="flex-1"
      placeholder={placeholder}
      options={selectOptions}
      defaultValue={selectOptions[0]}
      onChange={handleChange}
      styles={selectStyles}
    />
  );
};

export default SelectComponent;
