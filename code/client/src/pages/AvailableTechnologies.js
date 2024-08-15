import { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import { Box } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import ListingSkeleton from "../components/ListingSkeleton";
import SearchBar from "../components/SearchBar";
import "./AvailableTechnologies.css";

//TODO: Fix weird bug -- Footer is not visible on the first page but is visible on the other pages, has something to do with the listing.imageLink box. 
//                       Page size is also a bit buggy on the second page
//      Make the search bar work and add filtering


const AvailableTechnologies = () => {
    
//Initialise states for listings and pagination
const [listings, setListings] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [loading, setLoading] = useState(true);
const listingsPerPage = 2;
  
//Fetch listings
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get("/available-tech/browse");
    setListings(response.data);
    setLoading(false);
  };

  fetchData();
}, []);

//Pagination handling
const indexOfLastListing = currentPage * listingsPerPage;
const indexOfFirstListing = indexOfLastListing - listingsPerPage;
const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing);

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

      <h1 className="title">
        Available Technologies
      </h1>

      <h2 className="browse-ucl-projects">
        Browse UCL Software Projects seeking investment
      </h2>
      <Header />

      <SearchBar page="available-tech"/>
      {loading ? (
      <ListingSkeleton />
      ) : (
      currentListings.map((listing, index) => (
        <Link
            to={`/IndustryAndInvestors/AvailableTechnologies/${listing.listingID}`}
            key={listing.listingID}
            style={{ textDecoration: "none", color: "#000000" }}
          >
        <Box

         key={listing.listingID} 
         className="listing-container" 
         sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          width: '55%',
          minHeight: 'fit-content',
          margin: 7,
          paddingBottom:5
          }}
         bgcolor="#00808010"
         borderRadius='25px'>

          <Box sx={{fontSize:'60%', marginLeft:5, marginRight:5}} >
          <h3>{listing.listingTitle}</h3>
          </Box>
          
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
            <Box sx={{fontSize:'30%', marginLeft:0, marginRight:0, padding:2, paddingRight:7 , width: 'fit-content', maxWidth:500}} bgcolor='#ffffff' borderRadius='25px'>
            <p><span className="weighty">Product Type: </span> {listing.productType}</p>
            <p><span className="weighty">Sector: </span>{listing.sector}</p>
            <p><span className="weighty">Investment Goal: </span>£ {listing.investmentGoal}</p>
            <p><span className="weighty">Investment Offering: </span> {listing.investmentOffering}</p>
            </Box>

            <Box sx={{borderRadius:'25px', width:'40%'}}>
            {listing.imageLink && (
              <img
                src={listing.imageLink}
                alt="Listing"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '25px', width: 'auto', objectFit: 'cover',
                }}
              />
            )}
            </Box>

          </Box>


          <Box sx={{fontSize:'30%', marginLeft:5, marginRight:5, marginTop:5, padding:2}} bgcolor='#ffffff' borderRadius='25px'>
          <p className="weighty-ul">Product Description:</p>
          <p>{listing.abstract}</p>
          </Box>
          
        </Box>
        </Link>
      ))
    )}

    <div><Pagination count={totalPages} page={currentPage} onChange={handlePageChange} /></div>

    
    {/*<Footer />*/}
  </main>
);
};
  
  export default AvailableTechnologies;