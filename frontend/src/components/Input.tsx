import React, { useState } from "react";

interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  [x: string]: any;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  label,
  name,
  placeholder = "",
  ...rest
}) => {
  const [value, setValue] = useState(type === "number" ? 0 : "");
  return (
    <div className="inputgroup">
      <label htmlFor={name}>{label}</label>
      {type !== "textarea" ? (
        <input
          placeholder={placeholder}
          name={name}
          id={name}
          type={type}
          {...rest}
          value={value}
          onChange={(e) => setValue((prev) => (prev = e.target.value))}
        />
      ) : (
        <textarea
          placeholder={placeholder}
          name={name}
          id={name}
          {...rest}
          value={value}
          onChange={(e) => setValue((prev) => (prev = e.target.value))}
        ></textarea>
      )}
    </div>
  );
};

export default Input;
