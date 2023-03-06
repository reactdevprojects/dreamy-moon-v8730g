import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./select.module.css";

export function Select({ multiple, value, onChange, options }) {
  const [isShown, setIsShown] = useState(false);
  const [isFocus, setFocus] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef(null);

  useEffect(() => {
    if (isShown) setFocus(0);
  }, [isShown]);

  const selectedOption = useCallback(
    (option) => {
      if (multiple) {
        if (value.includes(option)) {
          onChange(value.filter((ele) => ele !== option));
        } else {
          onChange([...value, option]);
        }
      } else {
        if (option !== value) onChange(option);
      }
    },
    [multiple, value, onChange]
  );

  const isOptionAdded = (option) => {
    return multiple ? value.includes(option) : option === value;
  };

  const deleteOptions = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handler = (event) => {
      if (event.target !== selectRef.current) return;
      switch (event.code) {
        case "Enter":
        case "Space":
          setIsShown((prevState) => !prevState);
          if (isShown) selectedOption(filteredOptions[isFocus]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isShown) {
            setIsShown(true);
            break;
          }

          const newValue = isFocus + (event.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < filteredOptions.length) {
            setFocus(newValue);
          }
          break;
        }
        case "Escape":
          setIsShown(false);
          break;
        default:
          break;
      }
    };

    selectRef.current?.addEventListener("keydown", handler);

    return () => {
      selectRef.current?.removeEventListener("keydown", handler);
    };
  }, [isShown, isFocus, filteredOptions, selectedOption]);

  return (
    <div
      ref={selectRef}
      onClick={() => setIsShown((prevState) => !prevState)}
      tabIndex={0}
      className={styles.container}
    >
      <span id="inputField" className={styles.value}>
        {multiple
          ? value.map((ele) => (
              <div key={ele.value}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    selectedOption(ele);
                  }}
                  className={styles["option-badge"]}
                >
                  {ele.label}
                  <span className={styles["remove-btn"]}>&times;</span>
                </button>
              </div>
            ))
          : value?.label}
      </span>
      <input
        placeholder="Select..."
        className={styles.inputHiden}
        value={searchTerm}
        onChange={(e) => {
          setIsShown(true);
          setSearchTerm(e.target.value);
          e.stopPropagation();
        }}
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteOptions();
        }}
        className={styles["clear-btn"]}
        onMouseDown={(e) => e.preventDefault()}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>

      <ul className={`${styles.options} ${isShown ? styles.show : ""}`}>
        {filteredOptions?.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectedOption(option);
              setIsShown(false);
              setSearchTerm("");
            }}
            onMouseEnter={() => setFocus(index)}
            key={option.value}
            className={`${styles.option} ${
              isOptionAdded(option) ? styles.selected : ""
            } ${isFocus === index ? styles.higlited : ""} `}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
