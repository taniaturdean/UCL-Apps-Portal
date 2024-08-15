import { Button} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import {LineComponentLongUpper} from "../components/LineComponentLong";
import "./About.css";
import useScrollTo from "../hooks/useScrollTo";
import { useMediaQuery } from "react-responsive";
import { ArrowForwardIosOutlined } from "@mui/icons-material";

//TO BE COMPLETED

const About = () => {

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
    <main className={getClassName("about-overview")}>
      <img className={getClassName("home-page-item")}  alt="" src="../ellipse-54.svg" />
      <img className={getClassName("home-page-child")}alt="" src="../ellipse-55.svg" />
      <img className={getClassName("mask-group-icon")} alt="" src="../mask-groupfff@2x.png" />
      <img className={getClassName("mask-group-icon1")} alt="" src="../people.png" />
      <img className={getClassName("mask-group-icon2")} alt="" src="../mask-group2@2x.png" />
      

      <h1 className={getClassName("industry-investors")}>
        About Us
      </h1>
      <Header />
      <div className={getClassName("par1")}>
        Some text about UCL Apps Portal.
        
      </div>
      <div className={getClassName("par2")}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada.

      </div>
      <Link to = "/About/FaqsContact" style={{ textDecoration: 'none', color: '#000000'}}>
      <Button
        className={getClassName("rectangle-buttoni")}
        sx={{ width: 345 }}
        variant="contained"
        color="primary"
      >
        Frequently Asked Questions
      </Button>
      </Link>
      
      <Link to = "/About/FaqsContact#contact">
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
      
      <h2 className={getClassName("display")} id="team">
        UCL Apps Portal Team
      </h2>


      <h2 className={getClassName("name1a")} >Benjamin</h2>
      <h2 className={getClassName("name2a")}>Inez</h2>
      <h2 className={getClassName("name3a")}>Lauren</h2>
      <div className={getClassName("pos1a")}>Admin </div>
      <div className={getClassName("pos2a")}>Lead Developer </div>
      <div className={getClassName("pos3a")}>UX Designer </div>


      <Button
        className={getClassName("l1a")}
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
        View LinkedIn Profile
      </Button>

      <Button
        className={getClassName("l2a")}
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
        View LinkedIn Profile
      </Button>

      <Button
        className={getClassName("l3a")}
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
        View LinkedIn Profile
      </Button>

      <div className={getClassName("line-div-teama")} />

      <div className={getClassName("line-div-team2a")} />

      <div className={getClassName("text-bena")}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada.
      </div>

      <div className={getClassName("text-ineza")}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada.
      </div>
      
      <div className={getClassName("text-laurena")}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada.
      </div>

      <Footer />
    </main>
  );
};

export default About;
