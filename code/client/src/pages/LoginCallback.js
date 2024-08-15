import axios from "../axios.js";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

axios.defaults.withCredentials = true;

// Handle call back from auth url and set global auth state
function LoginCallback() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"

  const queryParams = new URLSearchParams(location.search);
  const result = queryParams.get("result");

  useEffect(() => {
    if (result === "allowed") {
      const code = queryParams.get("code");
      const state = queryParams.get("state");

      axios
        .get(`/oauth/token?state=${state}&code=${code}`)
        .then((response) => {
          console.log(response);
          if (response.data.auth) {
            const user = response.data.result;
            const roles = response.data.roles;

            setAuth({ user: user, roles: roles });

            // redirects user to where they were trying to go (or to home page)
            navigate(from, {replace: true});
          } else {
            setAuth({});
            console.log("Failed to get token.");
            // Redirect to a 404 unauthorised page
            navigate('/Unauthorised', {replace: true});
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Authorisation request denied");
      // Redirect to a 404 unauthorised page
      navigate('/Unauthorised', {replace: true});

    }
  }, []); // empty dependency array to ensure this effect only runs once on mount
}

export default LoginCallback;