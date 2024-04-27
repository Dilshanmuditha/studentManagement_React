import { Autocomplete, TextField } from "@mui/material"
import { ClearIcon } from "@mui/x-date-pickers"
import { useEffect, useState } from "react"

export interface IdropDown {
  label: string
  value: number | string
}

const CustomSelect = ({
  option,
  label,
  placeHolderText,
  clearableState,
  value: selectedValue,
  autocompleteSize,
  clearSelected,
  onchangeValue,
  style,
}: {
  option: { label: string; value: number | string }[]
  label: string
  placeHolderText?: string
  clearableState?: boolean
  autocompleteSize?: "small" | "medium"
  value: { label: string; value: string | number } | null
  clearSelected?: boolean
  onchangeValue: (
    event: React.ChangeEvent<{}>,
    value: { label: string; value: string | number } | null
  ) => void
  style?: any
}) => {
  const [autocompleteValue, setAutocompleteValue] = useState<{
    label: string
    value: string | number
  } | null>(selectedValue)

  const handleOnChange = (
    event: React.ChangeEvent<{}>,
    newValue: { label: string; value: number | string } | null,
    reason: string
  ) => {
    if (reason === "clear") {
      event.stopPropagation()
    } else {
      setAutocompleteValue(newValue)
      onchangeValue(event, newValue)
    }
  }

  useEffect(() => {
    if (clearSelected) {
      setAutocompleteValue(null)
    }
  }, [clearSelected])

  useEffect(() => {
    setAutocompleteValue(selectedValue)
  }, [selectedValue])

  return (
    <>
      <Autocomplete
        disablePortal
        clearIcon={<ClearIcon style={{ visibility: "hidden" }} />}
        options={option || []}
        value={autocompleteValue}
        size={autocompleteSize}
        onChange={handleOnChange}
        aria-placeholder="test"
        getOptionLabel={(option: any) => option?.label}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label || ""}
            placeholder={placeHolderText}
          />
        )}
        disableClearable={clearableState || false}
        sx={{
          ...style,
          width: "100%",
          "& .MuiOutlinedInput-root": { borderRadius: "10px" },
          "& input": { height: "27px", fontSize: "14px" },
          "& label": { fontSize: "14px", paddingTop: "3px" },
        }}
      />
    </>
  )
}

export default CustomSelect
