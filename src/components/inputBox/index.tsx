import { TextField } from "@mui/material";

const CustomInput = ({
  id,
  TextFieldName,
  labelText,
  variant,
  TextFieldType,
  value,
  placeHolderText,
  onchangeFunction,
  errorTextState,
  textFieldSize,
  errorText,
  style,
  startAdornment,
  endAdornment,
}: {
  id: number;
  TextFieldName: string;
  labelText: string;
  TextFieldType: string
  variant: "outlined" | "filled" | "standard";
  value?: any;
  textFieldSize?: "small" | "medium"
  onchangeFunction:any
  errorTextState: boolean;
  errorText: string;
  style?: any;
  placeHolderText?: string
  startAdornment?: any;
  endAdornment?: any;
}) => {

  return (
    <>
      <TextField
        key={id}
        name={TextFieldName}
        label={labelText}
        variant={variant}
        placeholder={placeHolderText || ""}
        value={value}
        size={textFieldSize}
        type={TextFieldType}
        error={errorTextState}
        helperText={errorText}
        sx={{ ...style}}
        InputProps={{
          startAdornment: startAdornment ? (startAdornment) : null,
          endAdornment: endAdornment ? (endAdornment):null,
        }}
        onChange={onchangeFunction}
      />
    </>
  );
};

export default CustomInput;
