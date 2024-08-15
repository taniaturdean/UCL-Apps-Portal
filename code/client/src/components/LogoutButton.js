import useAuth from "../hooks/useAuth";
import { Button } from "@mui/material";
import { Logout } from "@mui/icons-material";
import axios from "../axios.js";

axios.defaults.withCredentials = true;

const LogoutButton = () => {
  const { setAuth } = useAuth();

  const handleLogout = () => {
    setAuth({});

    axios
      .get("/oauth/logout")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button
        id="button-login"
        onClick={handleLogout}
        color="info"
        startIcon={<Logout />}
      >
        {"Logout"}
      </Button>
    </div>
  );
};

export default LogoutButton;
