import "./styles.css";
import { useState } from "react";
import { Select } from "./Select";

const options = [
  { label: "Blue", value: 1, style: { color: "blue" } },
  { label: "Red", value: 2, style: { color: "red" } },
  { label: "Green", value: 3, style: { color: "green" } },
  { label: "Yellow", value: 4, style: { color: "yellow" } },
  { label: "Orange", value: 5, style: { color: "orange" } },
  { label: "Purple", value: 6, style: { color: "purple" } },
  { label: "Pink", value: 7, style: { color: "pink" } },
  { label: "Gray", value: 8, style: { color: "gray" } },
  { label: "Brown", value: 9, style: { color: "brown" } },
  { label: "Black", value: 10, style: { color: "black" } }
];

function App() {
  const [valueMult, setValueMult] = useState([options[0]]);
  return (
    <div className="App">
      <br />
      <Select
        multiple
        options={options}
        value={valueMult}
        onChange={(option) => setValueMult(option)}
      />
    </div>
  );
}

export default App;
