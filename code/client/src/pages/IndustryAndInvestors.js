import {useRef} from "react";
import { Button} from "@mui/material";
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import {LineComponentLongUpper, LineComponentLongMiddle, LineComponentLongLower} from "../components/LineComponentLong";
import "./IndustryAndInvestors.css";
import useScrollTo from "../hooks/useScrollTo";
import { useMediaQuery } from "react-responsive";
import { ArrowForwardIosOutlined } from "@mui/icons-material";

//TO BE COMPLETED

const IndustryAndInvestors = () => {
  
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
    <main className={getClassName("industry-and-investors")}>
      <img className={getClassName("home-page-item")} alt="" src="../ellipse-54.svg" />
      <img className={getClassName("home-page-child")} alt="" src="../ellipse-55.svg" />
      <img className={getClassName("mask-group-icon")} alt="" src="../network-nodes@2x.png" />
      <img className={getClassName("mask-group-icon1")} alt="" src="../man-screen@2x.png" />
      <img className={getClassName("mask-group-icon2")} alt="" src="../mask-group2@2x.png" />
      <img className={getClassName("light-bulb")} alt="" src="../mask-group3@2x.png" />

      <h1 className={getClassName("industry-investors")}>
        Industry and Investors
      </h1>
      <Header />
      <div className={getClassName("ii-text")}>
        Some text about why projects started at UCL are great.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada.
      </div>
      <Link to= "/IndustryAndInvestors/SuccessStories" style={{ textDecoration: 'none', color: '#000000'}} >
      <Button
        className={getClassName("rectangle-buttoni")}
        sx={{ width: 345 }}
        variant="contained"
        color="primary"
      >
        Learn more about our projects
      </Button>
      </Link>

      <Link to= "/About/FaqsContact#contact" >
      <Button
        className={getClassName("get-in-touch")}
        variant="text"
        color="info"
        endIcon = {
           <span>
          {getClassName("get-in-touch") !== "get-in-touch--phone" ? (
            <span className="end-icon regular-icon">{svgIcon}</span>
          ) : (
            <span className="end-icon phone-icon">
              <ArrowForwardIosOutlined />
            </span>
          )}
        </span>
        }
      >
        Get in touch with us
      </Button>
      </Link>

      {window.innerWidth > 450 && <LineComponentLongUpper />}
     
      
      <h2 className={getClassName("browse-technology")}>
        Browse All Available Technologies
      </h2>

      <div className={getClassName("text-browse")}>
      Browse all available technology projects for licensing and investment etc via our extensive project database. And also some more information blah blah blah etc
      </div>

      <Link to= "/IndustryAndInvestors/AvailableTechnologies" style={{ textDecoration: 'none', color: '#000000'}} >
      <Button
        className={getClassName("rectangle-button2")}
        sx={{ width: 345 }}
        variant="contained"
        color="primary"
      >
        View Available Technology
      </Button>
      </Link>

      {window.innerWidth > 450 && <LineComponentLongMiddle />} 

      <h2 className={getClassName("browse-past-projects")}>
        Browse Our Past Projects
      </h2>

      <div className={getClassName("text-browse2")}>
      Browse all of our past projects for licensing and investment etc via our extensive project database. And also some more information blah blah blah etc
      </div>

      {window.innerWidth > 450 &&<LineComponentLongLower />}

      <h2 className={getClassName("advertise-opportunity" )} id="advertise-opportunity">
        Have an Opportunity You Want to Advertise?
      </h2>
      <Link to= "/IndustryAndInvestors/SuccessStories" style={{ textDecoration: 'none', color: '#000000'}} >
      <Button
        className={getClassName("rectangle-button3")}
        sx={{ width: 345 }}
        variant="contained"
        color="primary"
      >
        View our past projects
      </Button>
      </Link>

      <Button
        className={getClassName("advertise-opp")}
        variant="text"
        color="info"
        startIcon={
          getClassName("advertise-opp") !== "advertise-opp--phone" && (
            <span className="start-icon regular-icon">{svgIcon}</span>
          )
        }
        endIcon={
          getClassName("advertise-opp") === "advertise-opp--phone" && (
            <span className="end-icon phone-icon">
              <ArrowForwardIosOutlined />
            </span>
          )
        }
      >
        Click here to find out more
      </Button>

      <Button
        className={getClassName("nxi-ind")}
        variant="text"
        color="info"
        startIcon={
          getClassName("nxi-ind") !== "nxi-ind--phone" && (
            <span className="start-icon regular-icon">{svgIcon}</span>
          )
        }
        endIcon={
          getClassName("nxi-ind") === "nxi-ind--phone" && (
            <span className="end-icon phone-icon">
              <ArrowForwardIosOutlined />
            </span>
          )
        }
      >
        UCL NXI
      </Button>

      <Button
        className={getClassName("finshing-school")}
        variant="text"
        color="info"
        startIcon={
          getClassName("finshing-school") !== "finshing-school--phone" && (
            <span className="start-icon regular-icon">{svgIcon}</span>
          )
        }
        endIcon={
          getClassName("finshing-school") === "finshing-school--phone" && (
            <span className="end-icon phone-icon">
              <ArrowForwardIosOutlined />
            </span>
          )
        }
      >
        UCL Finishing School
      </Button>
      <div className={getClassName("line-ii")} />
      <div className={getClassName("text-low")}>
      Text about UCL student opportunities, how to submit etc.
      </div>
      <div className={getClassName("text-low2")}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada.
      </div>
      <Footer />
    </main>
  );
};

export default IndustryAndInvestors;
