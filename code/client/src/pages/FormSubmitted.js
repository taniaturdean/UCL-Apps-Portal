import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, svgIcon } from "@mui/material";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { useMediaQuery } from "react-responsive";
import { ArrowForwardIosOutlined } from "@mui/icons-material";

const FormSubmitted = () => {
  const svgIcon = (
    <svgIcon>
      <img alt="circle_button" src="../icon_button.svg" />
    </svgIcon>
  );

  const isPhone = useMediaQuery({ minWidth: 0, maxWidth: 450 });
  const isLaptop = useMediaQuery({ minWidth: 451, maxWidth: 1823 });
  const isLargeMonitor = useMediaQuery({ minWidth: 1824, maxWidth: 2359 });
  const isLandscapeTablet = useMediaQuery({ minWidth: 2360 });

  const getClassName = (baseClassName) => {
    if (isLargeMonitor) return `${baseClassName}--large-monitor`;
    if (isLaptop) return `${baseClassName}--laptop`;
    if (isLandscapeTablet) return `${baseClassName}--landscape-tablet`;
    if (isPhone) return `${baseClassName}--phone`;
    return baseClassName;
  };

  return (
    <main className={getClassName("home-page")}>
      <img
        className={getClassName("home-page-child")}
        alt=""
        src="../ellipse-55.svg"
      />
      <img
        className={getClassName("mask-group-icon")}
        alt=""
        src="../mask-group@2x.png"
      />
      <img
        className={getClassName("mask-group-icon1")}
        alt=""
        src="../mask-group1@2x.png"
      />
      <img
        className={getClassName("home-page-item")}
        alt=""
        src="../ellipse-54.svg"
      />
      <img
        className={getClassName("home-page-inner")}
        alt=""
        src="../ellipse-56.svg"
      />
      <img
        className={getClassName("mask-group-icon2")}
        alt=""
        src="../mask-group2@2x.png"
      />
      <h1 className={getClassName("advancing-next-generation")}>
        Form successfully submitted!
      </h1>
      <Header />
      <div className={getClassName("ucl-apps-portal")}>
      Your listing will be displayed after it has been approved by the site administrator. Please check back in a few days.
      </div>
      <Link
        to="/About/FaqsContact#contact"
        style={{ textDecoration: "none", color: "#000000" }}
      >
        <Button
          className={getClassName("rectangle-button")}
          sx={{ width: 267 }}
          variant="contained"
          color="primary"
        >
          Contact Us
        </Button>
      </Link>

      <Link
        to="/"
        style={{ textDecoration: "none", color: "#000000" }}
      >
        <Button
          className={getClassName("browse-available-technologies-home")}
          variant="text"
          color="info"
          endIcon={
            <span>
              <span className="end-icon regular-icon">{svgIcon}</span>
              <span className="end-icon phone-icon">
                {" "}
                {<ArrowForwardIosOutlined />}
              </span>
            </span>
          }
        >
          Home Page
        </Button>
      </Link>

      <Footer />
    </main>
  );
};

export default FormSubmitted;