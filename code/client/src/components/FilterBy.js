import React, { useState, useEffect } from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../axios.js";

const FilterBy = (props) => {
  const navigate = useNavigate();

  // arrays from DB
  const [sectors, setSectors] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [opportunityTypes, setOpportunityTypes] = useState([]);

  // selected form options
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedOppType, setSelectedOppType] = useState("");

  // event handlers
  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
  };
  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };
  const handleOppTypeChange = (event) => {
    setSelectedOppType(event.target.value);
  };

  useEffect( () => {
    //get sectors for dropdown
    axios
      .get(`/form-options/sectors`)
      .then((response) => {
        if (response.data.auth === false) {
          // if jwt has expired
          navigate("/expired");
        }
        setSectors(response.data);
        console.log(sectors);
      })
      .catch((error) => {
        console.log(error);
      });
    
    // get second drop-down depending on page
    const endpoint = {
        "project-connect": "opportunity-types",
        "past-projects": "product-types",
        "available-tech": "product-types"
    }

    axios
        .get(`/form-options/${endpoint[props.page]}`)
        .then((response) => {
          if (response.data.auth === false) {
            // if jwt has expired
            navigate("/expired");
          }
          else if (props.page === "project-connect") {
            setOpportunityTypes(response.data)
          } else {
            setProductTypes(response.data)
          }
        })
        .catch((error) => {
          console.log(error);
        });

  }, [navigate]);

  // ternary operator returning different menu items depending on the page prop
  return (
    <div>
      <FormControl
        sx={{
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
        <InputLabel id="sector-label">Select Sector</InputLabel>
        <Select
          labelId="sector-label"
          id="sector-dropdown"
          defaultValue=""
          style={{ width: 330 }}
          value={selectedSector}
          onChange={handleSectorChange}
        >
          {sectors.map((sectorObj, index) => (
            <MenuItem key={index} value={sectorObj.sector}>
              {sectorObj.sector}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {props.page === "project-connect" ? (
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
          <InputLabel id="opp-type-label">Select Opportunity Type</InputLabel>
          <Select
            labelId="opp-type-label"
            id="opp-type-select"
            defaultValue=""
            style={{ width: 330 }}
            value={selectedOppType}
            onChange={handleOppTypeChange}
          >
            {opportunityTypes.map((opportunityTypeObj, index) => (
              <MenuItem key={index} value={opportunityTypeObj.opportunityType}>
                {opportunityTypeObj.opportunityType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
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
          <InputLabel id="product-label">Select Product Type</InputLabel>
          <Select
            labelId="product-label"
            id="product-select"
            defaultValue=""
            style={{ width: 330 }}
            value={selectedProduct}
            onChange={handleProductChange}
          >
            {productTypes.map((productTypeObj, index) => (
              <MenuItem key={index} value={productTypeObj.productType}>
                {productTypeObj.productType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default FilterBy;
