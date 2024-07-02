"use client";
import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderColor: "border-gray-300",
    "&:hover": {
      borderColor: "border-gray-400",
    },
    boxShadow: "none",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "rounded-md",
    borderColor: "border-gray-300",
  }),
};

export default function Multiselected({ products }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <div>
      <Select
        required
        name="allproducts"
        isMulti
        options={products.map((product) => ({
          value: product.id,
          label: product.name,
        }))}
        value={selectedOptions}
        onChange={handleChange}
        styles={customStyles}
        classNamePrefix="tailwind"
        id={"multiselector"}
      />
      <div className="flex">
        <p className="mx-1">Selected Values </p>
        {selectedOptions.map((option) => (
          <div className="flex mx-2" key={option.value}>
            {option.label}/
          </div>
        ))}
      </div>
    </div>
  );
}
