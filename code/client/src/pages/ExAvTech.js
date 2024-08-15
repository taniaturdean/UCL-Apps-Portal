import { useCallback } from "react";
import { Button, svgIcon} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {LineComponentLongUpper, LineComponentLongMiddle, LineComponentLongLower} from "../components/LineComponentLong";
import "./ExAvTech.css";
import { Link } from 'react-router-dom';
import { useRef } from "react";
import React from "react";
import PropTypes from "prop-types";


//TO BE COMPLETED

const ExAvTech = () => {
  const productSection = useRef(null);
  const investmentSection = useRef(null);
  const aboutSection = useRef(null);


  const scrollDown = () => {
    window.scrollTo({
      top: productSection.current.offsetTop,
      behavior: 'smooth',
    });
  };

  const scrollDown2 = () => {
    window.scrollTo({
      top: investmentSection.current.offsetTop,
      behavior: 'smooth',
    });
  };

  const scrollDown3 = () => {
    window.scrollTo({
      top: aboutSection.current.offsetTop,
      behavior: 'smooth',
    });
  };

  const onBrowseAvailableTechnologiesClick = useCallback(() => {
    // Direct to "Browse Available Technologies"
  }, []);


  const svgIcon = (
    <svgIcon>
      <img alt="circle_button" src="../icon_button.svg" />
    </svgIcon>
  )

  const svgIcon2 = (
    <svgIcon2>
      <img alt="circle_button" src="../icon2.svg" />
    </svgIcon2>
  )

  const svgIcon3 = (
    <svgIcon2>
      <img alt="circle_button" src="../download.svg" />
    </svgIcon2>
  )

  const YoutubeEmbed = ({ embedId }) => (
    <div className="video-responsive">
      <iframe
        width="1000"
        height="1000"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
  
  YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
  };

  const onButtonClick = () => {
    // using Java Script method to get PDF file
    fetch('SamplePDF.pdf').then(response => {
        response.blob().then(blob => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = 'PitchDeck.pdf';
            alink.click();
        })
    })
}

  return (
    <main className="example">
     

      <h1 className="indycare">
      IndyCare Healthcare App
      </h1>
      <Header />
      <h2 className="project-profile">
        Project Profile
        </h2>

        <h2 className="story">
        Our Story
        </h2>

      
      <Button
        className="product"
        variant="text"
        color="info"
        onClick={scrollDown}
        startIcon = {svgIcon2}
      >
       Our Product
      </Button>

      <Button
        className="investment"
        variant="text"
        color="info"
        onClick={scrollDown2}
        startIcon = {svgIcon2}
      >
        Investment Details
      </Button>

      <Button
        className="about"
        variant="text"
        color="info"
        onClick={scrollDown3}
        startIcon = {svgIcon2}
      >
        About Us
      </Button>

      <Button
        className="get-in"
        variant="text"
        color="info"
        onClick={onBrowseAvailableTechnologiesClick}
        endIcon = {svgIcon}
      >
        Get in Touch with our Team
      </Button>


      <div className="line-divex" />

      <LineComponentLongUpper/>
      
      <h2 className="display"  ref={productSection}>
        Our Product
      </h2>

      <div className="text-ex">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. 
      </div>

      <div className="text2-ex">
      Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada. Sed interdum interdum cursus. Cras arcu odio, tincidunt quis rutrum nec, scelerisque vel augue. Aliquam vitae blandit mauris, vitae faucibus urna. Sed vitae ipsum faucibus, tempus nibh vitae, efficitur mi. 
      </div>

      <div className="text3-ex">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada. Cras arcu odio, tincidunt quis rutrum nec, scelerisque vel augue. Aliquam vitae blandit mauris, vitae faucibus urna. Sed vitae ipsum faucibus, tempus nibh vitae, efficitur mi. 
      </div>

      <Button
        className="git"
        variant="text"
        color="info"
        onClick={onBrowseAvailableTechnologiesClick}
        endIcon = {svgIcon}
      >
         View Code on GitHub
      </Button>

      <YoutubeEmbed embedId="t6MtYVdHNv0" />

      <div className="Line-middle-ex" />

      <h2 className="inv"  ref={investmentSection}>
       Investment Details
      </h2>

      <div className="inv-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada. Vivamus porta faucibus erat a rutrum. 
      </div>

      <div className="line-divex2" />

      <div className="inv-text2">
      Sed interdum interdum cursus. Cras arcu odio, tincidunt quis rutrum nec, scelerisque vel augue. Aliquam vitae blandit mauris, vitae faucibus urna. Sed vitae ipsum faucibus, tempus nibh vitae, efficitur mi. Quisque magna tortor, feugiat non tortor et, porta commodo leo. Proin suscipit condimentum ante, id mattis lacus scelerisque maximus. 
      </div>

      <Button
        className="pdf"
        variant="text"
        color="info"
        onClick={onButtonClick}
        endIcon = {svgIcon3}
      >
         Download Pitch Deck
      </Button>

      <div className="Line-low-ex" />

      <h2 className="opportunity"  ref={aboutSection}>
        About Us
      </h2>

      <h2 className="name1">Benjamin</h2>
      <h2 className="name2">Inez</h2>
      <h2 className="name3">Lauren</h2>
      <div className="pos1">Founder </div>
      <div className="pos2">Lead Developer </div>
      <div className="pos3">UX Designer </div>


      <Button
        className="l1"
        variant="text"
        color="info"
        onClick={onBrowseAvailableTechnologiesClick}
        endIcon = {svgIcon}
      >
        View LinkedIn Profile
      </Button>

      <Button
        className="l2"
        variant="text"
        color="info"
        onClick={onBrowseAvailableTechnologiesClick}
        endIcon = {svgIcon}
      >
        View LinkedIn Profile
      </Button>

      <Button
        className="l3"
        variant="text"
        color="info"
        onClick={onBrowseAvailableTechnologiesClick}
        endIcon = {svgIcon}
      >
        View LinkedIn Profile
      </Button>

      <div className="line-div-team" />

      <div className="line-div-team2" />

      <div className="text-ben">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada.
      </div>

      <div className="text-inez">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada.
      </div>
      
      <div className="text-lauren">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada.
      </div>

      <Footer />
    </main>
  );
};

export default ExAvTech;
