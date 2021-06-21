import React, { useState } from "react";
import { InputContainer } from "./Input";

interface SelectProps {
  label: string;
  name: string;
  options: string[];
  [x: string]: any;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  ...rest
}) => {
  const [value, setValue] = useState(options[0]);
  return (
    <InputContainer>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        value={value}
        {...rest}
        onChange={(e) => setValue((prev) => (prev = e.target.value))}
      >
        {options.map((o) => (
          <option value={o}>{o.toUpperCase()}</option>
        ))}
      </select>
    </InputContainer>
  );
};

export default Select;
