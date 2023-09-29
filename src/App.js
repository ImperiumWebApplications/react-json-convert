import React, { useState } from "react";
import { TextareaAutosize, Button } from "@mui/material";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleJsonConversion = () => {
    try {
      // Replace escaped characters and attempt to parse the JSON string
      const unescapedString = inputValue.replace(/\\"/g, '"');
      const parsedValue = JSON.parse(unescapedString);

      // Stringify the parsed value to ensure it is displayed correctly
      setOutputValue(JSON.stringify(parsedValue, null, 2)); // Pretty print the output
    } catch (error) {
      try {
        // If the first attempt fails, try parsing the inputValue directly
        const parsedValue = JSON.parse(inputValue);
        setOutputValue(JSON.stringify(parsedValue, null, 2)); // Pretty print the output
      } catch (error) {
        // If both attempts fail, set the output value to an error message
        setOutputValue("Invalid JSON format");
      }
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TextareaAutosize
        style={{ width: "100%", marginBottom: "20px" }}
        minRows={20}
        placeholder="Enter your unescaped string here."
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button
        style={{ marginBottom: "20px" }}
        variant="contained"
        color="primary"
        onClick={handleJsonConversion}
      >
        Convert to JSON
      </Button>
      <TextareaAutosize
        style={{ width: "100%" }}
        minRows={20}
        value={outputValue}
        readOnly
      />
    </div>
  );
};

export default App;
