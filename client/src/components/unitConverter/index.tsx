import React from "react";
// @mui
import {
  Button,
  Divider,
  FormControl,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// @local
import { unitTypes, allUnits } from "./constant"

const UnitConverter = () => {
    const [isSelected, setIsSelected] = React.useState(false);
  const [units, setUnits] = React.useState(["Select Unit Type", ...unitTypes]);
  const [unit, setUnit] = React.useState<
    "Length" | "Temperature" | "Speed" | "Select Unit Type"
  >("Select Unit Type");
  const [measumerements, setMeasurements] = React.useState<string[]>([]);
  const [convert, setConvert] = React.useState({
    fromUnit: "",
    toUnit: "",
    number: "",
  });
  const [result, setResult] = React.useState({
    result: "",
  });

  const handleChangeUnitType = (e: { target: { value: any } }) => {
    const selectedUnit = e.target.value as "Length" | "Temperature" | "Speed";
    setUnits(unitTypes);
    setUnit(selectedUnit);
    setIsSelected(true);
    setMeasurements(allUnits[selectedUnit]);
  };

  const handleChange = (e: {
    target: { name: any; value: any };
    preventDefault: () => void;
  }) => {
    const { name, value } = e.target;

    e.preventDefault();

    setConvert({
      ...convert,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setResult({
      result: "200"
    })

  }

  const handleReset = () => {
    setIsSelected(false);
    setUnit("Select Unit Type");
    setUnits(["Select Unit Type", ...unitTypes])
    setMeasurements([])
    setConvert({
      fromUnit: "",
      toUnit: "",
      number: "",
    })

  }

  const disableSubmit =
    Number(convert.number) >= 1 &&
    convert.toUnit !== "Select To Unit" &&
    convert.toUnit !== "Select Unit First" &&
    convert.fromUnit !== "Select From Unit" &&
    convert.fromUnit !== "Select Unit First";

  return (
    <FormControl
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#ffffff",
        overflowY: "hidden",
        width: "100%",
      }}
    >
      {/* Unit Type */}
      <Typography variant="h5" mb={2}>
        Unit Converter
      </Typography>
      <Stack divider={<Divider flexItem />} spacing={2}>
        <Select
          native
          name="units"
          onChange={handleChangeUnitType}
          value={unit}
        >
          {units.map((id) => {
            return (
              <option key={id} id={id} value={id}>
                {id}
              </option>
            );
          })}
        </Select>
        {/* FROM */}
        <Stack direction="row" spacing={2}>
          <Select
            native
            name="fromUnit"
            fullWidth
            onChange={handleChange}
            value={convert.fromUnit}
          >
            <option>
              {isSelected ? "Select From Unit" : "Select Unit Type First"}
            </option>
            {measumerements.map((id) => {
              return (
                <option key={id} id={id} value={id}>
                  {id}
                </option>
              );
            })}
          </Select>
          {/* TO */}
          <Select
            native
            name="toUnit"
            fullWidth
            onChange={handleChange}
            value={convert.toUnit}
          >
            <option>
              {isSelected ? "Select To Unit" : "Select Unit Type First"}
            </option>
            {measumerements.map((id) => {
              return (
                <option key={id} id={id} value={id}>
                  {id}
                </option>
              );
            })}
          </Select>
        </Stack>
        <Stack direction="row" spacing={2}>
          {/* AMOUNT */}
          <TextField
            name="number"
            onChange={handleChange}
            placeholder="Enter Whole Number"
            value={convert.number}
          />
          {/* RESULT */}
          <TextField
            value={Number(convert.number) > 0.5 ? result.result : ""}
            disabled
            placeholder="Result"
            label="Result"
            sx={{ '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled': {
              backgroundColor: '#F0F8FF'
            }}}
          />
        </Stack>
          {/* ACTIONS */}
        <Stack direction="row" spacing={2}>
          <Button variant="contained" fullWidth disabled={!disableSubmit} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="contained" fullWidth color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Stack>
      </Stack>
    </FormControl>
  );
}

export default UnitConverter;
