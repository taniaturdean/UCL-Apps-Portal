import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import {
  Info,
  School,
  MenuBook,
  TrendingUp
} from "@mui/icons-material";
import "./NavBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
  const { auth } = useAuth();

  const isLaptop = useMediaQuery({ minWidth: 451,maxWidth:1823});
  const isLargeMonitor = useMediaQuery({ minWidth: 1824, maxWidth: 2359 });
  const isLandscapeTablet = useMediaQuery({ minWidth: 2360 });

  const getClassName = (baseClassName) => {
    if (isLargeMonitor) return `${baseClassName}--large-monitor`;
    if (isLaptop) return `${baseClassName}--laptop`;
    if (isLandscapeTablet) return `${baseClassName}--landscape-tablet`;
    return baseClassName;
  };

  const [industryInvestorsAnchorEl, setIndustryInvestorsAnchorEl] =
    useState(null);

  const [facultyAndStudentsAnchorEl, setFacultyAndStudentsAnchorEl] =
    useState(null);

  const [softwarePublishingAnchorEl, setSoftwarePublishingAnchorEl] =
    useState(null);

  const [aboutUsAnchorEl, setAboutUsAnchorEl] = useState(null);

  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const industryInvestorsOpen = Boolean(industryInvestorsAnchorEl);
  const handleIndustryInvestorsClick = (event) => {
    setIndustryInvestorsAnchorEl(event.currentTarget);
    handleMenuClick("button-Industry and Investors");
  };
  const handleIndustryInvestorsClose = () => {
    setIndustryInvestorsAnchorEl(null);
    setActiveMenu(null);
  };

  const facultyAndStudentsOpen = Boolean(facultyAndStudentsAnchorEl);
  const handleFacultyAndStudentsClick = (event) => {
    setFacultyAndStudentsAnchorEl(event.currentTarget);
    handleMenuClick("Faculty and Students");
  };
  const handleFacultyAndStudentsClose = () => {
    setFacultyAndStudentsAnchorEl(null);
    setActiveMenu(null);
  };

  const softwarePublishingOpen = Boolean(softwarePublishingAnchorEl);
  const handleSoftwarePublishingClick = (event) => {
    setSoftwarePublishingAnchorEl(event.currentTarget);
    handleMenuClick("Software Publishing Guidance");
  };
  const handleSoftwarePublishingClose = () => {
    setSoftwarePublishingAnchorEl(null);
    setActiveMenu(null);
  };

  const aboutUsOpen = Boolean(aboutUsAnchorEl);
  const handleAboutUsClick = (event) => {
    setAboutUsAnchorEl(event.currentTarget);
    handleMenuClick("About Us");
  };
  const handleAboutUsClose = () => {
    setAboutUsAnchorEl(null);
    setActiveMenu(null);

  };

  const navigate = useNavigate();

  return (
    <div className={`nav-bar ${getClassName(auth.user ? "" : "logged-out")}`}>
      <div>
        <Button
          id="button-Industry and Investors"
          className={
            location.pathname.includes("/IndustryAndInvestors") ||
            activeMenu === "button-Industry and Investors"
              ? "active"
              : ""
          }
          aria-controls="menu-Industry and Investors"
          aria-haspopup="true"
          aria-expanded={industryInvestorsOpen ? "true" : undefined}
          onMouseEnter={handleIndustryInvestorsClick}
          //className={location.pathname.includes("/IndustryAndInvestors") || activeMenu === "button-Industry and Investors" ? "active" : ""}
          color="info"
          startIcon={<TrendingUp />}
        >
          Industry and Investors
        </Button>
        <Menu
          anchorEl={industryInvestorsAnchorEl}
          open={industryInvestorsOpen}
          onClose={handleIndustryInvestorsClose}
        >
          <Link
            to="/IndustryAndInvestors/Overview"
            style={{ textDecoration: "none", color: "#000000" }}
          >
            <MenuItem
              onClick={handleIndustryInvestorsClose}
              className={`${getClassName("menu-item")}${auth.user ? "" : "2"}`}
            >
              Overview
            </MenuItem>{" "}
          </Link>
          <Link
            to="/IndustryAndInvestors/AvailableTechnologies"
            style={{ textDecoration: "none", color: "#000000" }}
          >
            <MenuItem
              onClick={handleIndustryInvestorsClose}
              className={`${getClassName("menu-item")}${auth.user ? "" : "2"}`}
            >
              Available Technologies
            </MenuItem>
          </Link>
          <Link
            to="/IndustryAndInvestors/SuccessStories"
            style={{ textDecoration: "none", color: "#000000" }}
          >
            <MenuItem
              onClick={handleIndustryInvestorsClose}
              className={`${getClassName("menu-item")}${auth.user ? "" : "2"}`}
            >
              Success Stories
            </MenuItem>
          </Link>
          <Link
            to="/IndustryAndInvestors/Overview#advertise-opportunity"
            style={{ textDecoration: "none", color: "#000000" }}
          >
            <MenuItem
              onClick={handleIndustryInvestorsClose}
              className={`${getClassName("menu-item")}${auth.user ? "" : "2"}`}
            >
              Submit an Internship Opportunity
            </MenuItem>
          </Link>
        </Menu>
      </div>
      {auth.user && (
        <div>
          <Button
            id="button-Faculty and Students"
            aria-controls="menu-Faculty and Students"
            aria-haspopup="true"
            aria-expanded={facultyAndStudentsOpen ? "true" : undefined}
            onMouseEnter={handleFacultyAndStudentsClick}
            className={
              location.pathname.includes("/FacultyAndStudents") ||
              activeMenu === "button-Faculty and Students"
                ? "active"
                : ""
            }
            color="info"
            startIcon={<School />}
          >
            Faculty and Students
          </Button>
          <Menu
            anchorEl={facultyAndStudentsAnchorEl}
            open={facultyAndStudentsOpen}
            onClose={handleFacultyAndStudentsClose}
          >
            <Link
              to="/FacultyAndStudents/Overview"
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <MenuItem
                onClick={handleFacultyAndStudentsClose}
                className={`${getClassName("menu-item")}${
                  auth.user ? "" : "2"
                }`}
              >
                Overview
              </MenuItem>{" "}
            </Link>
            <Link
              to="/FacultyAndStudents/Overview#display-software"
              // onClick={() => scrollToRef(displaySection)}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <MenuItem
                onClick={handleFacultyAndStudentsClose}
                className={`${getClassName("menu-item")}${
                  auth.user ? "" : "2"
                }`}
              >
                Display your Software on the UCL Apps Portal{" "}
              </MenuItem>{" "}
            </Link>
            <Link
              to="/FacultyAndStudents/ProjectConnect"
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <MenuItem
                onClick={handleFacultyAndStudentsClose}
                className={`${getClassName("menu-item")}${
                  auth.user ? "" : "2"
                }`}
              >
                UCL Project Connect
              </MenuItem>{" "}
            </Link>
            <Link
              to="/FacultyAndStudents/OpportunitiesForStudents"
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <MenuItem
                onClick={handleFacultyAndStudentsClose}
                className={`${getClassName("menu-item")}${
                  auth.user ? "" : "2"
                }`}
              >
                Opportunities for Students
              </MenuItem>{" "}
            </Link>
          </Menu>
        </div>
      )}
      <div>
        <Button
          id="button-Software Publishing Guidance"
          aria-controls="menu-Software Publishing Guidance"
          aria-haspopup="true"
          aria-expanded={softwarePublishingOpen ? "true" : undefined}
          onMouseEnter={handleSoftwarePublishingClick}
          className={
            location.pathname.includes("/PublishingGuidance") ||
            activeMenu === "button-Software Publishing Guidance"
              ? "active"
              : ""
          }
          color="info"
          startIcon={<MenuBook />}
        >
          Software Publishing Guidance
        </Button>
        <Menu
          anchorEl={softwarePublishingAnchorEl}
          open={softwarePublishingOpen}
          onClose={handleSoftwarePublishingClose}
        >
          <Link
            to="/PublishingGuidance"
            style={{ textDecoration: "none", color: "#000000" }}
          >
            <MenuItem
              onClick={handleSoftwarePublishingClose}
              className={`${getClassName("menu-item")}${auth.user ? "" : "2"}`}
            >
              Overview
            </MenuItem>
          </Link>
          <MenuItem
            onClick={() => {
              handleSoftwarePublishingClose();
              navigate("/PublishingGuidance#licensing", {
                state: { accordionId: "accordion1" },
              });
            }}
            className={`${getClassName("menu-item")}${auth.user ? "" : "2"}`}
          >
            Licensing and Legal
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleSoftwarePublishingClose();
              navigate("/PublishingGuidance#financials", {
                state: { accordionId: "accordion2" },
              });
            }}
            className={`${getClassName("menu-item")}${auth.user ? "" : "2"}`}
          >
            Financials
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleSoftwarePublishingClose();
              navigate("/PublishingGuidance#marketing", {
                state: { accordionId: "accordion3" },
              });
            }}
            className={`${getClassName("menu-item")}${auth.user ? "" : "2"}`}
          >
            Marketing and Communications
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleSoftwarePublishingClose();
              navigate("/PublishingGuidance#deployment", {
                state: { accordionId: "accordion4" },
              });
            }}
            className={`${getClassName("menu-item")}${auth.user ? "" : "2"}`}
          >
            Deployment and Maintenance
          </MenuItem>
        </Menu>
      </div>

      <div>
        <Button
          id="button-About Us"
          aria-controls="menu-About Us"
          aria-haspopup="true"
          aria-expanded={aboutUsOpen ? "true" : undefined}
          onMouseEnter={handleAboutUsClick}
          className={
            location.pathname.includes("/About") ||
            activeMenu === "button-About Us"
              ? "active"
              : ""
          }
          color="info"
          startIcon={<Info />}
        >
          About Us
        </Button>
        <Menu
          anchorEl={aboutUsAnchorEl}
          open={aboutUsOpen}
          onClose={handleAboutUsClose}
        >
          <Link
            to="/About/OverviewTeam"
            style={{ textDecoration: "none", color: "#000000" }}
          >
            <MenuItem
              onClick={handleAboutUsClose}
              className={`${getClassName("menu-item")}${auth.user ? "" : "2"}`}
            >
              Overview
            </MenuItem>{" "}
          </Link>
          <Link
            to="/About/OverviewTeam#team"
            style={{ textDecoration: "none", color: "#000000" }}
          >
            <MenuItem
              onClick={handleAboutUsClose}
              className={`${getClassName("menu-item")}${auth.user ? "" : "2"}`}
            >
              UCL Apps Portal Team
            </MenuItem>{" "}
          </Link>
          <Link
            to="/About/FaqsContact"
            style={{ textDecoration: "none", color: "#000000" }}
          >
            <MenuItem
              onClick={handleAboutUsClose}
              className={`${getClassName("menu-item")}${auth.user ? "" : "2"}`}
            >
              FAQs
            </MenuItem>{" "}
          </Link>
          <Link
            to="/About/FaqsContact#contact"
            style={{ textDecoration: "none", color: "#000000" }}
          >
            <MenuItem
              onClick={handleAboutUsClose}
              className={`${getClassName("menu-item")}${auth.user ? "" : "2"}`}
            >
              Contact
            </MenuItem>{" "}
          </Link>
        </Menu>
      </div>

      <div>
        {auth.user ? <LogoutButton /> : <LoginButton buttonType={"NavBar"} />}
      </div>
    </div>
  );
};

export default NavBar;
