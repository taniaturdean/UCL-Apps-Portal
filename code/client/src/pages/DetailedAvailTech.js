import React, { useState, useEffect } from 'react';
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Divider, Breadcrumbs, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer"
import axios from 'axios';
import "./DetailedAvailTech.css";

const DetailedAvailTech = () => {
  const [listing, setListing] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const svgIcon = (
    <svgIcon>
      <img alt='' src = "../../public/icon_button.svg"/>
    </svgIcon>
  )

  const svgIcon2 = (
    <svgIcon2>
      <img alt='' src="../../public/icon2.svg" />
    </svgIcon2>
  )

  const svgIcon3 = (
    <svgIcon3>
      <img alt="" src="../../public/download.svg" />
    </svgIcon3>
  )

  const ourProductSection = useRef(null);
  const publishingSection = useRef(null);
  const aboutSection = useRef(null);

  const scrollDown = () => {
    window.scrollTo({
      top: ourProductSection.current.offsetTop,
      behavior: 'smooth',
    });
  };

  const scrollDown2 = () => {
    window.scrollTo({
      top: publishingSection.current.offsetTop,
      behavior: 'smooth',
    });
  };

  const scrollDown3 = () => {
    window.scrollTo({
      top: aboutSection.current.offsetTop,
      behavior: 'smooth',
    });
  };

  function extractYouTubeVideoId(url) {
    const regex = /(?:\?v=|\/embed\/|youtu\.be\/)([0-9A-Za-z_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  }

  //fetch listing data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/available-tech/browse/${id}`);
        setListing(response.data[0][0]);
        setTeamMembers(response.data[1]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  console.log(listing);
  console.log(teamMembers);

  // Detailed listing information
  return (
    <main className="detailed-avail-tech">
    <div>
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching data</p>
      ) : listing ? (
        <div>
           <Box

            key={listing.listingID} 
            className="listing-container" 
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            width: '100%',
            minHeight: 'fit-content',
            margin: '10%',
            marginLeft:'25%',
            paddingBottom:5,
            }}
            borderRadius='25px'>
            
            <Header />

            <Box sx={{ marginBottom: 1 }}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link style={{ textDecoration: "none", color: "#000000" }} to="../IndustryAndInvestors/Overview">
                  Industry and Investors
                </Link>
                <Link style={{ textDecoration: "none", color: "#000000" }} to="../IndustryAndInvestors/AvailableTechnologies">
                  Available Technologies
                </Link>
                <Typography >{listing.listingTitle}</Typography>
              </Breadcrumbs>
            </Box>
            
            <Box sx={{fontSize: '130%'}}>
              <h1 className='weighty'>{listing.listingTitle}</h1>
              <h3>Project Profile</h3>
            </Box>
            
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left|space-around',
            }}>
            
              <Box sx={{paddingTop:'2%'}}>
                <p>
                <Button
                  className="weighty"
                  variant="text"
                  color="info"
                  onClick={scrollDown}
                  startIcon={svgIcon2}
                >
                  Our Story
                </Button>
                </p>

                <p>
                <Button
                  className="weighty"
                  variant="text"
                  color="info"
                  startIcon={svgIcon2}
                  onClick={scrollDown2}
                >
                  Investment Details
                </Button>
                </p>

                <Button
                  className="weighty"
                  variant="text"
                  color="info"
                  startIcon={svgIcon2}
                  onClick={scrollDown3}
                >
                  About Us
                </Button>
              </Box>

              <Box sx={{borderRadius:'25px', width:'40%', marginLeft:'15%'}}>
                {listing.imageLink && (
                  <img
                    src={listing.imageLink}
                    alt="Listing"
                    style={{
                      maxWidth: '50%',
                      height: 'auto',
                      borderRadius: '25px', 
                      width: 'auto', 
                      objectFit: 'cover',
                    }}
                  />
                )}
                <Box sx={{bgcolor:'#F0F4F4', width:'fill', maxWidth: '50%', paddingLeft:'5%', paddingY:'0.5%', marginTop:'1%'}} borderRadius='25px'>
                  <p><span className="weighty">Product Type: </span> {listing.productType}</p>
                  <p><span className="weighty">Sector: </span>{listing.sector}</p>
                  <p><span className="weighty">Investment Goal: </span>£{listing.investmentGoal}</p>
                  <p><span className="weighty">Investment Offering: </span>{listing.investmentOffering}</p>
                </Box>
              </Box>
            </Box>

            <Box sx={{marginTop:'1%',maxWidth:"50%"}}><Divider color='#A8D0D0'/></Box>

            <Box sx={{fontSize: '110%', marginTop:'1%'}}>
              <h1 className='weighty' ref={ourProductSection}>Our Story</h1>

              <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left|space-around',
              }}>
                
                <Box sx={{maxWidth:'25%'}}>
                  <p>{listing.story}</p>
                </Box>

                <Box sx={{borderRadius:'25px', width:'40%', marginLeft:'5%'}}>
                {listing.videoLink && (
                  <div className="video-container">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${extractYouTubeVideoId(listing.videoLink)}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}

                <Box>
                    {listing.githubLink ? (
                      <Button
                        className="weighty"
                        variant="text"
                        color='info'
                        href={listing.githubLink.startsWith('http') ? listing.githubLink : `https://${listing.githubLink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textAlign: 'left' }}
                        endIcon = {svgIcon}
                      >
                        View on GitHub
                      </Button>
                    ) : null}
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box sx={{marginTop:'1%',maxWidth:"50%"}}><Divider color='#A8D0D0'/></Box>

            <Box sx={{fontSize: '110%', marginTop:'1%', maxWidth:'50%'}}>
              <h1 className='weighty' ref={publishingSection}>Investment Details</h1>
              <p>{listing.investmentDetails}</p>
              <Box>
                    {listing.pitchdeckLink ? (
                      <Button
                        className="weighty"
                        variant="text"
                        color='info'
                        href={listing.pitchdeckLink.startsWith('http') ? listing.pitchdeckLink : `https://${listing.pitchdeckLink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textAlign: 'left' }}
                        endIcon = {svgIcon3}
                      >
                        Download Pitch Deck
                      </Button>
                    ) : null}
                </Box>
            </Box>

            <Box sx={{marginTop:'1%',maxWidth:"50%"}}><Divider color='#A8D0D0'/></Box>

            <Box sx={{fontSize: '110%', marginTop:'1%'}}>
              {teamMembers.length > 0 && (
                  <h1 className='weighty' ref={aboutSection}>
                    About Us
                  </h1>
              )}
            </Box>
            
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'left',
                flexWrap: 'wrap',
              }}
            >
              {teamMembers.map((member) => (
                <Box
                  key={member.memberID}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginRight: '3%',
                    maxWidth: '15%',
                    textAlign: 'left',
                  }}
                >
                  <h3 style={{marginBottom: '0.2em', lineHeight: '1.2',}}>
                    {member.firstName} {member.lastName}
                  </h3>
                  <p style={{marginTop: '0.2em', lineHeight: '1.2',}}>{member.roleTitle}</p>
                  <p>{member.roleDescription}</p>
                  
                  
                  {member.linkedinLink ? (
                    <Button
                      className="weighty"
                      variant="text"
                      color='info'
                      href={member.linkedinLink.startsWith('http') ? member.linkedinLink : `https://${member.linkedinLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textAlign: 'left' }}
                      endIcon = {svgIcon}
                    >
                      View LinkedIn Profile
                    </Button>
                  ) : null}
                  

                </Box>
              ))}
            </Box>
          </Box>
        </div>
      ) : (
        <p>Listing not found</p>
      )}
    </div>

    </main>
  );
};

export default DetailedAvailTech;