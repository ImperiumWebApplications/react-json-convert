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
      const unescapedJsonString = JSON.parse(inputValue);
      const actualJsonObject = JSON.parse(unescapedJsonString);

      setOutputValue(actualJsonObject);
    } catch (error) {
      setOutputValue("Invalid JSON format");
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
