import { Button, svgIcon } from "@mui/material";
import { Login } from "@mui/icons-material";
import axios from "axios";
import { v4 } from "uuid";
import moment from "moment";
import "../pages/HomePage.css";
import { useMediaQuery } from "react-responsive";
import { ArrowForwardIosOutlined } from "@mui/icons-material";

axios.defaults.withCredentials = true;

// login button triggers auth process when clicked
const LoginButton = (props) => {

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

  const handleAuth = () => {
    const state = v4();
    const stateInitiated = moment();

    axios
      .get(
        `/oauth/auth-url?state=${state}&stateInitiated=${stateInitiated}`
      )
      .then((response) => {
        console.log(response);

        const auth_url = response.data;
        window.location.href = auth_url;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (props.buttonType === "NavBar") {
    return (
      <div>
        <Button
          id="button-login"
          onClick={handleAuth}
          color="info"
          startIcon={<Login />}
        >
          {"Login"}
        </Button>
      </div>
    );
  } else {
    const svgIcon = (
      <svgIcon>
        <img alt="circle_button" src="../icon_button.svg" />
      </svgIcon>
    );

    return (
      // <Button
      //     className="browse-available-technologies-home"
      //     variant="text"
      //     color="info"
      //     endIcon = {svgIcon}
      //     onClick = {handleAuth}
      //   >
      //     Click here to login
      //   </Button>
      <Button

        className={getClassName("rectangle-button")}
        sx={{ width: 267 }}
        variant="contained"
        color="primary"
        onClick={handleAuth}
      >
        Login
      </Button>
    );

  }
};

export default LoginButton;