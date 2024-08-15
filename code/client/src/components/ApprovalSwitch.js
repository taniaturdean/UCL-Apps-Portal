import "../pages/HomePage.css";
import { useState, useEffect } from "react";
import { Switch, FormControlLabel } from "@mui/material";
import axios from "../axios.js";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const ApprovalSwitch = (props) => {

  var initialState;

  if (props.approved === 1) {
    initialState = true
  } else {
    initialState = false
  }
  
  const navigate = useNavigate();
  const [approved, setApproved] = useState(initialState);

  // useEffect(() => {
  //   const listingID = props.listingID;
  //   // get initial approval state of listing from db
  //   axios
  //     .get(`/admin/listings/approval-state/${listingID}`)
  //     .then((response) => {
  //       if (response.data.auth === false) {
  //         // if jwt has expired
  //         navigate('/expired');
  //       } else {
  //         // set state to api response
  //         setApproved(response.data.approvalState[0][0]['approved']);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [navigate]);

  const handleToggle = () => {
    const listingID = props.listingID;
    var approval;

    if (listingID) {
      if (!approved) {
        // If not approved send request to approve (approval = 1)
        approval = 1;
      } else {
        // If approved send request to unapprove
        approval = 0;
      }
      axios
        .patch(`/admin/listings/change-approval/${listingID}`, {
          approval: approval,
        })
        .then((response) => {
          console.log(response);
          if (response.data.auth === false) {
            navigate("/unauthorised");
          } else if (response.data.result === "success") {
            // change state
            setApproved(!approved);
          } else {
            navigate("/error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Listing ID prop not defined");
    }
  };

  return (
    <main className="home-page">
      <FormControlLabel
        control={
          <Switch
            checked={approved}
            onChange={handleToggle}
            color="primary"
            name="approvalSwitch"
            inputProps={{ "aria-label": "approve or disapprove" }}
          />
        }
        label={approved ? "approved" : "unapproved"}
      />
    </main>
  );
};

export default ApprovalSwitch;
