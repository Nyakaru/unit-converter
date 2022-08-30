import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { getData } from "../../utils/server";

interface IPossibilities {
  abbr: string;
  measure: string;
  system: string;
  singular: string;
  plural: string;
}

const UnitConverter = () => {
  const [isSelected, setIsSelected] = React.useState(false);
  const [units, setUnits] = React.useState(["Select Unit Type"]);
  const [unit, setUnit] = React.useState<string>("Select Unit Type");
  const [measumerements, setMeasurements] = React.useState<IPossibilities[]>(
    []
  );
  const [convert, setConvert] = React.useState({
    fromUnit: "",
    toUnit: "",
    number: undefined,
  });
  const [result, setResult] = React.useState({
    result: "",
  });

  React.useEffect(() => {
    const getInitialData = async () => {
      const data = await getData("measures");
      setUnits(["Select Unit Type", ...data]);
      setIsSelected(false);
    };
    getInitialData();
  }, []);

  const handleChangeUnitType = async (e: { target: { value: any } }) => {
    const selectedUnit = e.target.value as string;
    const data: IPossibilities[] = await getData(
      `possibilities?unit=${selectedUnit.toLowerCase()}`
    );
    setUnits(units.filter((item) => item !== "Select Unit Type"));
    setUnit(selectedUnit);
    setIsSelected(true);
    setMeasurements(data);
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

  const handleSubmit = async () => {
    const convertedValue = await getData(
      `conversion?fromUnit=${convert.fromUnit}&toUnit=${convert.toUnit}&number=${convert.number}`
    );

    if (convertedValue["value"] != null) {
      setResult({
        result: convertedValue["value"],
      });
      toast.success("Success ✓");
    }
  };

  const handleReset = () => {
    setIsSelected(false);
    setUnit("Select Unit Type");
    const newData = units.includes("Select Unit Type")
      ? [...units]
      : ["Select Unit Type", ...units];
    setUnits(newData);
    setMeasurements([]);
    setConvert({
      fromUnit: "",
      toUnit: "",
      number: "" as unknown as undefined,
    });
    setResult({
      result: "",
    });
  };

  const disableSubmit =
    convert.number !== "" &&
    convert.toUnit !== "Select To Unit" &&
    convert.toUnit !== "" &&
    convert.toUnit !== "Select Unit Type First" &&
    convert.fromUnit !== "Select From Unit" &&
    convert.fromUnit !== "" &&
    convert.fromUnit !== "Select Unit Type First";

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
      <ToastContainer />
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
                {id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()}
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
            {measumerements.map((item) => {
              return (
                <option key={item.abbr} id={item.abbr} value={item.abbr}>
                  {item.plural}
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
            {measumerements.map((item) => {
              return (
                <option key={item.abbr} id={item.abbr} value={item.abbr}>
                  {item.plural}
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
            placeholder="Enter Number"
            value={convert.number}
          />
          {/* RESULT */}
          <TextField
            value={result.result}
            disabled
            placeholder="Result"
            label="Result"
            sx={{
              "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled":
                {
                  backgroundColor: "#F0F8FF",
                },
            }}
          />
        </Stack>
        {/* ACTIONS */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            fullWidth
            disabled={!disableSubmit}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="secondary"
            onClick={handleReset}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </FormControl>
  );
};

export default UnitConverter;
