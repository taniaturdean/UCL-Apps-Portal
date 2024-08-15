import { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import { Box } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "../axios.js";
import ListingSkeleton from "../components/ListingSkeleton";
import SearchBar from "../components/SearchBar";
import "./ProjectConnect.css";
import { useNavigate } from "react-router-dom";

//TODO: Fix weird bug -- Footer is not visible on the first page but is visible on the other pages, has something to do with the listing.imageLink box.
//                       Page size is also a bit buggy on the second page
//      Make the search bar work and add filtering

const ProjectConnect = () => {
  //Initialise states for listings and pagination
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const listingsPerPage = 2;
  
  const navigate = useNavigate();

  //Fetch listings
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      axios
        .get("/project-connect/browse")
        .then((response) => {
          console.log(response);
          if (response.data.auth === false) {
            // if jwt has expired
            navigate("/expired");
          } else {
            setListings(response.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          navigate("/Error");
        });
    };

    fetchData();
  }, [navigate]);

  //Function to convert the date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we need to add 1
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  //Pagination handling
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = listings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalPages = Math.ceil(listings.length / listingsPerPage);

  return (
    <main className="available-technologies">
      <img className="industry-item" alt="" src="../ellipse-54.svg" />
      <img className="industry-child" alt="" src="../ellipse-55.svg" />
      <img className="industry-icon1" alt="" src="../mask-group1@2x.png" />
      <img className="industry-inner" alt="" src="../ellipse-56.svg" />
      <img className="industry-icon2" alt="" src="../mask-group2@2x.png" />

      <h1 className="title">UCL Project Connect</h1>

      <h2 className="browse-ucl-projects">
        Browse ProjectConnect Opportunities
      </h2>
      <Header />

      <SearchBar page="project-connect"/>
      {loading ? (
        <ListingSkeleton />
      ) : (
        currentListings.map((listing, index) => (
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
            <Box sx={{ fontSize: "60%", marginLeft: 5, marginRight: 5 }}>
              <h3>{listing.listingTitle}</h3>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Box
                sx={{
                  fontSize: "30%",
                  marginLeft: 2,
                  marginRight: 0,
                  padding: 2,
                  paddingRight: 7,
                  width: "fit-content",
                  maxWidth: 500,
                }}
                bgcolor="#ffffff"
                borderRadius="25px"
              >
                <p>
                  <span className="weighty">Opportunity Type: </span>{" "}
                  {listing.opportunityType}
                </p>
                <p>
                  <span className="weighty">Start Date: </span>
                  {formatDate(listing.startDate)}
                </p>
                <p>
                  <span className="weighty">Sector: </span> {listing.sector}
                </p>
                <p>
                  <span className="weighty">Duration: </span> {listing.duration}
                </p>
                <p>
                  <span className="weighty">Requirements: </span>{" "}
                  {listing.requirements}
                </p>
                <p>
                  <span className="weighty">Salary: </span> {listing.salary}
                </p>
                <p>
                  <span className="weighty">Apply By: </span>{" "}
                  {formatDate(listing.applyBy)}
                </p>
                <p><span className="weighty">Contact Email: </span> {listing.contactemail}</p>
              </Box>

              <Box sx={{ borderRadius: "25px", width: "35%", marginRight: 2 }}>
                {listing.imageLink && (
                  <img
                    src={listing.imageLink}
                    alt="Listing"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "25px",
                      width: "auto",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Box>
            </Box>

            <Box
              sx={{
                fontSize: "30%",
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                padding: 2,
              }}
              bgcolor="#ffffff"
              borderRadius="25px"
            >
              <p className="weighty-ul">Role Description:</p>
              <p>{listing.opportunityDescription}</p>
            </Box>
          </Box>
        ))
      )}

      <div>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>

      {/*<Footer />*/}
    </main>
  );
};

export default ProjectConnect;
