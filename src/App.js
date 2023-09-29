import React, { useState } from "react";
import { TextareaAutosize, Button } from "@mui/material";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const formatJSON = () => {
    try {
      let formattedString = inputValue.trim();
      let parsedJson;

      // If the string starts with a single quote, assume the whole string is enclosed in single quotes
      if (formattedString.startsWith("'") && formattedString.endsWith("'")) {
        formattedString = formattedString.slice(1, -1); // Remove the surrounding single quotes
        parsedJson = JSON.parse(JSON.stringify(formattedString));
      } else {
        // For doubly escaped JSON
        formattedString = formattedString
          .replace(/^"|"$/g, "") // Remove surrounding double quotes
          .replace(/\\"/g, '"') // Unescape double quotes
          .replace(/\\\\/g, "\\"); // Unescape backslashes
        parsedJson = JSON.parse(formattedString);
      }

      // Set the parsed JSON object as the output value
      setOutputValue(
        typeof parsedJson === "object" ? JSON.stringify(parsedJson) : parsedJson
      );
    } catch (e) {
      // If parsing fails, set an error message as the output value
      setOutputValue("Invalid JSON: " + e.message);
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
        onClick={formatJSON}
      >
        Format JSON
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
