import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#14af71",
  },
  "& label": {
    color: "#14af71",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#14af71",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#14af71",
  },
  "& .MuiInput-underline:hover": {
    borderBottomColor: "#9d14af",
  },
  "& .MuiInput-underline": {
    color: "#b4f3da",
  },
});
