import { useState, useRef } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { HashLink } from "react-router-hash-link";
import {
  School, List,
  MenuBook,
  Login,
  Logout,
} from "@mui/icons-material";
import "./NavBarPhone.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import useAuth from "../hooks/useAuth";

const NavBarPhone = () => {
  const { auth } = useAuth();

  const [industryInvestorsAnchorEl, setIndustryInvestorsAnchorEl] =
    useState(null);

  

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


  const navigate = useNavigate();

  return (
    <div className={`nav-barp${auth.user ? "" : " logged-out"}`}>
      <div>
        <Button
          id="button-Industry and Investors"
          className={
            location.pathname.includes("/") ||
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
          startIcon={<List/>}
        >
          Menu
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
              className={`menu-item${auth.user ? "" : "2"}`}
            >
              Industry and Investors
            </MenuItem>{" "}
          </Link>

          {auth.user && (
          <Link
            to="/FacultyAndStudents/Overview"
            style={{ textDecoration: "none", color: "#000000" }}
          >
            <MenuItem
              onClick={handleIndustryInvestorsClose}
              className={`menu-item${auth.user ? "" : "2"}`}
            >
              Faculty and Students
            </MenuItem>
          </Link> )}


          <Link
            to="/PublishingGuidance"
            style={{ textDecoration: "none", color: "#000000" }}
          >
            <MenuItem
              onClick={handleIndustryInvestorsClose}
              className={`menu-item${auth.user ? "" : "2"}`}
            >
              Software Publishing Guidance
            </MenuItem>
          </Link>

          <Link
            to="/About/OverviewTeam"
            style={{ textDecoration: "none", color: "#000000" }}
          >
            <MenuItem
              onClick={handleIndustryInvestorsClose}
              className={`menu-item${auth.user ? "" : "2"}`}
            >
              About Us
            </MenuItem>
          </Link>
        
        </Menu>
      </div>
      
      <div>
        {auth.user ? <LogoutButton /> : <LoginButton buttonType={"NavBar"} />}
      </div>
    </div>
  );
};

export default NavBarPhone;
