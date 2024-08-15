import React, { useState } from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const SortBy = (props) => {
  const [selectedSort, setSort] = useState("");

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <FormControl
      sx={{
        left: 40,
        borderRadius: "15px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "20px",
          "& fieldset": {
            borderColor: "transparent",
          },
          "&:hover fieldset": {
            borderColor: "transparent",
          },
          "&.Mui-focused fieldset": {
            borderColor: "transparent",
          },
        },
        backgroundColor: "white",
      }}
      required="required"
    >
      <InputLabel id="sort-by">Sort by</InputLabel>
      <Select
        labelId="sort-by"
        id="sort-by"
        defaultValue=""
        style={{ width: 330 }}
        value={selectedSort}
        onChange={handleSortChange}
      >
        <MenuItem key="title-asc" value="title-asc">
          Title (A-Z)
        </MenuItem>
        <MenuItem key="title-desc" value="title-desc">
          Title (Z-A)
        </MenuItem>
        {props.page === "project-connect" ? (
          <div>
            <MenuItem key="start-date" value="start-date">
              Start date
            </MenuItem>
            <MenuItem key="apply-by" value="apply-by">
              Apply by
            </MenuItem>
          </div>
        ) : props.page === "available-tech" ? (
          <div>
            <MenuItem key="invest-goal-asc" value="invest-goal-asc">
              Investment goal (High - Low)
            </MenuItem>
            <MenuItem key="invest-goal-desc" value="invest-goal-desc">
              Investment goal (Low - High)
            </MenuItem>
          </div>
        ) : (
          null
        )}
      </Select>
    </FormControl>
  );
};

export default SortBy;
