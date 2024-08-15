import { useEffect,useRef} from "react";
import { Button} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import {LineComponentLongUpper} from "../components/LineComponentLong";
import "./FacultyAndStudents.css";
import useScrollTo from "../hooks/useScrollTo";
import { useMediaQuery } from "react-responsive";

//TO BE COMPLETED

const FacultyAndStudents = () => {

  useScrollTo();
  
  const svgIcon = (
    <svgIcon>
      <img alt="circle_button" src="../icon_button.svg" />
    </svgIcon>
  )

  const isPhone = useMediaQuery({ minWidth: 0, maxWidth: 450 });
  const isLaptop = useMediaQuery({ minWidth: 451, maxWidth: 1823 });
  const isLargeMonitor = useMediaQuery({ minWidth: 1824});

  const getClassName = (baseClassName) => {
    if (isLargeMonitor) return `${baseClassName}--large-monitor`;
    if (isLaptop) return `${baseClassName}--laptop`;
    if (isPhone) return `${baseClassName}--phone`;
    return baseClassName;
  };

  return (
    <main className="industry-and-investors">
      <img className="home-page-item" alt="" src="../ellipse-54.svg" />
      <img className="home-page-child" alt="" src="../ellipse-55.svg" />
      <img className="mask-group-icon" alt="" src="../mask-groupfff@2x.png" />
      <img className="mask-group-icon1" alt="" src="../people.png" />
      <img className="mask-group-icon2" alt="" src="../mask-group2@2x.png" />
      <img className="light-bulb2" alt="" src="../mask-group3@2x.png" />

      <h1 className={getClassName("industry-investors")}>
        Faculty and Students
      </h1>
      <Header />
      <div className={getClassName("ii-text")}>
        Some text about why projects started at UCL are great.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada.
      </div>
      <Link to= "/IndustryAndInvestors/SuccessStories" style={{ textDecoration: 'none', color: '#000000'}} >
      <Button
        className="rectangle-button"
        sx={{ width: 345 }}
        variant="contained"
        color="primary"
      >
        Learn more about our projects
      </Button>
      </Link>
      <Link to = "/About/FaqsContact#contact" >
      <Button
        className="get-in-touch"
        variant="text"
        color="info"
        endIcon = {svgIcon}
      >
        Get in touch with the UCL Apps Portal Team
      </Button>
      </Link>

      <LineComponentLongUpper/>
      
      <h2 className="display" id="display-software">
        Display your software on the UCL Apps Portal
      </h2>
      <Link to = "/IndustryAndInvestors/AvailableTechnologies" style={{ textDecoration: 'none', color: '#000000'}}>
      <Button
        className="browse"
        variant="text"
        color="info"
        startIcon = {svgIcon}
      >
        Browse Available Technologies
      </Button>
      </Link>
      <Link to= "/IndustryAndInvestors/SuccessStories" style={{ textDecoration: 'none', color: '#000000'}} >
      <Button
        className="browse2"
        variant="text"
        color="info"
        startIcon = {svgIcon}
      >
        Browse Past Projects
      </Button>
      </Link>

      <Link to= "/FacultyAndStudents/SubmitAvailableTechnology" style={{ textDecoration: 'none', color: '#000000'}} >
      <Button
        className="browse3"
        variant="text"
        color="info"
        startIcon = {svgIcon}
      >
        Advertise your technology
      </Button>
      </Link>

      <Link to= "/FacultyAndStudents/SubmitPastProject" style={{ textDecoration: 'none', color: '#000000'}} >
      <Button
        className="browse31"
        variant="text"
        color="info"
        startIcon = {svgIcon}
      >
        Advertise past project
      </Button>
    </Link>
      <div className="line-div22" />

      <div className="textt">
      Text about UCL student opportunities, how to submit etc.
      </div>

      <div className="textt2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada.
      </div>

      <div className="Line-middle22" />

      <h2 className="connect">
       UCL ProjectConnect
      </h2>

      <div className="text3">
      Browse all available technology projects for licensing and investment etc via our extensive project database. And also some more information blah blah blah etc. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada.
      </div>
      <Link to = "/FacultyAndStudents/ProjectConnect" style={{ textDecoration: 'none', color: '#000000'}}>
      <Button
        className="r2"
        sx={{ width: 440 }}
        variant="contained"
        color="primary"
      >
        Browse ProjectConnect Opportunities
      </Button>
      </Link>
      
      <Link to = "/FacultyAndStudents/SubmitOpportunity" style={{ textDecoration: 'none', color: '#000000'}}>
      <Button
        className="r3"
        sx={{ width: 440 }}
        variant="contained"
        color="primary"
      >
        Advertise a ProjectConnect Opportunity
      </Button>
      </Link>

      <div className="Line-low" />

      <h2 className="opportunity">
        Opportunities for Students
      </h2>
      <Link to = "/FacultyAndStudents/OpportunitiesForStudents" style={{ textDecoration: 'none', color: '#000000'}}>
      <Button
        className="browse4"
        variant="text"
        color="info"
        startIcon = {svgIcon}
      >
        View all opportunities for students
      </Button>
      </Link>

      <div className="text4">
      Browse all of our past projects for licensing and investment etc via our extensive project database. And also some more information blah blah blah etc. 
      </div>

      <div className="text5">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec
      </div>

      <Footer />
    </main>
  );
};

export default FacultyAndStudents;
