import { render, fireEvent } from "@testing-library/react";
import { Select } from "./Select";

const options = [
  { label: "Blue", value: 1 },
  { label: "Red", value: 2 },
  { label: "Green", value: 3 }
];

test("Select component renders and updates correctly", () => {
  const onChangeMock = jest.fn();
  const { getByText, getByPlaceholderText } = render(
    <Select options={options} value={options[0]} onChange={onChangeMock} />
  );

  // Open the dropdown by clicking on the select container
  fireEvent.click(getByText("Blue"));

  // Verify that all options are visible in the dropdown
  options.forEach((option) => {
    expect(getByText(option.label)).toBeVisible();
  });

  // Select a different option from the dropdown
  fireEvent.click(getByText("Green"));

  // Verify that the onChange callback was called with the new value
  expect(onChangeMock).toHaveBeenCalledWith(options[2]);

  // Close the dropdown
  fireEvent.keyDown(getByPlaceholderText("Select..."), {
    key: "Escape"
  });
  expect(getByText("Green")).toBeVisible();
});
