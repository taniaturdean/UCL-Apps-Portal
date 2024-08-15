import { useCallback } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./HomePage.css";
import { useMediaQuery } from "react-responsive";
import { ArrowForwardIosOutlined } from "@mui/icons-material";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { auth } = useAuth();

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

  const svgIcon = (
    <svgIcon>
      <img alt="circle_button" src="../icon_button.svg" />
    </svgIcon>
  );

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
        Advancing Next Generation Software Projects
      </h1>
      <Header />
      <div className={getClassName("ucl-apps-portal")}>
        UCL Apps Portal connects students and investors and blah blah blah add
        some stuff here
      </div>
      <Link
        to="/About/OverviewTeam"
        style={{ textDecoration: "none", color: "#000000" }}
      >
        <Button
          className={getClassName("rectangle-button")}
          sx={{ width: 267 }}
          variant="contained"
          color="primary"
        >
          About UCL Apps Portal
        </Button>
      </Link>

      {auth?.roles?.includes(102) ? (
        <Link
        to="/Admin"
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
          View Admin Dashboard
        </Button>
      </Link>
      ) : (<Link
        to="/IndustryAndInvestors/AvailableTechnologies"
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
          Browse Available Technologies
        </Button>
      </Link>)}

      <div className={getClassName("statistics")}>
        <div className={getClassName("single-stat")}>
          <div className="number">46</div>
          <b className={getClassName("tag-line")}>
            Software Projects Published
          </b>
        </div>
        <div className={getClassName("single-stat1")}>
          <div className="number">74</div>
          <b className={getClassName("tag-line")}>UCL Students Connected</b>
        </div>
        <div className={getClassName("single-stat1")}>
          <div className="number">21</div>
          <b className={getClassName("tag-line")}>Successful UCL Startups</b>
        </div>
      </div>
      <div className={getClassName("line-div")} />
      <div className={getClassName("home-page-child1")} />
      <Footer />
    </main>
  );
};

export default HomePage;
