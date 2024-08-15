import Header from "../components/Header";
import Footer from "../components/Footer";
import "./HomePage.css";
import ApprovalSwitch from "../components/ApprovalSwitch";
import DeleteListingButton from "../components/DeleteListingButton";
import axios from "../axios.js";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box } from "@mui/material";

axios.defaults.withCredentials = true;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState(null);
  const [pastProjects, setPastProjects] = useState(null);
  const [availableTech, setAvailableTech] = useState(null);

  useEffect(() => {
    // get all opportunities
    axios
      .get("/admin/opportunities")
      .then((response) => {
        console.log(response);
        if (response.data.auth === false) {
          // if jwt has expired
          navigate("/expired");
        } else {
          setOpportunities(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/Error");
      });

    // get all past projects
    axios
      .get("/admin/past-projects")
      .then((response) => {
        console.log(response);
        if (response.data.auth === false) {
          // if jwt has expired
          navigate("/expired");
        } else {
          setPastProjects(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/Error");
      });

    // get all available tech
    axios
      .get("/admin/available-tech")
      .then((response) => {
        console.log(response);
        if (response.data.auth === false) {
          // if jwt has expired
          navigate("/expired");
        } else {
          setAvailableTech(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/Error");
      });
  }, [navigate]);


  return (
    <main className="home-page">
      <Header />

      <section>
      <section>
          <h1>Available Technologies</h1>
          {availableTech ? (availableTech.map((listing, index) => (
            <Box
              key={listing.listingID}
              className="listing-container"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                width: "55%",
                minHeight: "fit-content",
                margin: 7,
                paddingBottom: 5,
              }}
              bgcolor="#00808010"
              borderRadius="25px"
            >
              <Link
                to={`/IndustryAndInvestors/AvailableTechnologies/${listing.listingID}`}
                key={listing.listingID}
                style={{ textDecoration: "none", color: "#000000" }}
              >
              <h2>{listing.listingTitle}</h2>
              </Link>

              <ApprovalSwitch listingID={listing.listingID} approved={listing.approved}/>
              <DeleteListingButton listingID={listing.listingID}/>
            </Box>
          ))) : (null)}
          
        </section>

        <section>
          <h1>Past Projects</h1>
          {pastProjects ? (pastProjects.map((listing, index) => (
            <Box
              key={listing.listingID}
              className="listing-container"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                width: "55%",
                minHeight: "fit-content",
                margin: 7,
                paddingBottom: 5,
              }}
              bgcolor="#00808010"
              borderRadius="25px"
            >
              <Link
                to={`/IndustryAndInvestors/SuccessStories/${listing.listingID}`}
                key={listing.listingID}
                style={{ textDecoration: "none", color: "#000000" }}
              >
              <h2>{listing.listingTitle}</h2>
              </Link>
              
              <ApprovalSwitch listingID={listing.listingID} approved={listing.approved}/>
              <DeleteListingButton listingID={listing.listingID}/>
            </Box>
          ))) : (null)}
        </section>

        <section>
          <h1>Opportunities</h1>
          {opportunities ? (opportunities.map((listing, index) => (
            <Box
              key={listing.listingID}
              className="listing-container"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                width: "55%",
                minHeight: "fit-content",
                margin: 7,
                paddingBottom: 5,
              }}
              bgcolor="#00808010"
              borderRadius="25px"
            >
              <h2>{listing.listingTitle}</h2>
              <ApprovalSwitch listingID={listing.listingID} approved={listing.approved}/>
              <DeleteListingButton listingID={listing.listingID}/>
            </Box>
          ))) : (null)}
        </section>
      </section>

      {/* <Footer /> */}
    </main>
  );
};

export default AdminDashboard;
