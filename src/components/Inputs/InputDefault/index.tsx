import React from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";
import "../../../config/style/index.css";

interface InputDefaultProps {
  type: string;
  name: Name;
  label: string;
  value: string;
  helpertext?: string;
  handleChange: (value: string, key: Name) => void;
}

export type Name = "name" | "email" | "password" | "repassword";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#30c88c",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#30c88c",
  },
  "& .MuiInput-underline": {
    color: "#b4f3da",
  },
  "&. MuiFormHelperText-root": {
    color: "#ffff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#30c88c",
    },
    "&:hover fieldset": {
      borderColor: "#30c88c",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#30c88c",
    },
  },
  color: "#30c88c",
});

function InputDefault({
  type,
  name,
  label,
  value,
  helpertext,
  handleChange,
}: InputDefaultProps) {
  return (
    <CssTextField
      focused
      name={name}
      label={label}
      variant="standard"
      type={type}
      value={value}
      helperText={helpertext}
      onChange={(ev) => handleChange(ev.target.value, name)}
    />
  );
}

export default InputDefault;
