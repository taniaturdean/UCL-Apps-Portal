import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import SortBy from "./SortBy";
import FilterBy from "./FilterBy";

const Search = (props) => {
  const [textInput, setTextInput] = useState("");

  const [selectedSector, setSelectedSector] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedOppType, setSelectedOppType] = useState("");

  const handleFilterData = () => {
    
  }

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  return (
    <div className="search" style={{ marginTop: "400px", marginLeft: "62px" }}>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <SearchIcon sx={{ color: "action.active", mr: 1, my: 2 }} />
          <TextField
            id="search-bar"
            label="Search by Keyword"
            style={{ width: 800 }}
            variant="filled"
            value={textInput}
            onChange={handleTextInputChange}
          />
        </Box>

        {/* <FilterBy page={props.page} onData={handleFilterData} />
        <SortBy page={props.page}/> */}

      </Box>
    </div>
  );
};

/*
First we create a state to store the text input called textInput and assign it the value ''.
Then we return a material UI <TextField /> component whose value attribute is set to the textInput state.
Doing this we display the current value of the textInput in the <TextField />. Any changes to the value of textInput will change the value attribute of the <TextField />,
courtesy of React.
Then we use the onChange attribute of <TextField /> to run a handler function every time the value of the <TextField /> value attribute changes.
This handler function is an arrow function stored in the constant handleTextInputChange. It takes an event as an argument.
When the onChange attribute runs the handler function, it sends the event as an argument to the handler function.
The value of the <TextField /> is stored in event.target.value. We then use the setTextInput method of the state to set the state to the value attribute of the <TextField />.
Thus this change is reflected in the <TextField /> whose value attribute is the value of the textInput state.
Thus the data input into the <TextField /> is stored in the state textInput, ready to be used when required.
*/

export default Search;
