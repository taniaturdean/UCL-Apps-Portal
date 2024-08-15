import express from "express";
import axios from "axios";
import moment from "moment";
import { config } from "dotenv";
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import { configPath } from "../envFilePath.js";

// a local object to keep track of states (can't do it using sessions cause session id changes after oauth callback)
const states = {};

// Set path to .env file to load them into process.env
config({
  path: configPath,
});

export const oauth = express.Router();

const defaultRedirect = `http://localhost:${process.env.CLIENT_PORT}`;

export const verifyJWT = (req, res, next) => {

  const jwt = req?.cookies?.jwt;

  if (!jwt) {
    res.json({ auth: false, msg: "No token found in header" });
  } else {
    verify(jwt, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // console.log(err);
        res.json({ auth: false, msg: "Failed to authenticate" });
      } else {
        next();
      }
    });
  }
};

oauth.get("/logout", (req, res) => {
  try {
    res.clearCookie("jwt", { httpOnly: true });
    res.send("jwt deleted");
  } catch (error) {
    res.send("failed to delete jwt");
  }
});

oauth.get("/auth-url", (req, res) => {
  console.log("auth-url");

  const state = req.query.state;
  var stateInitiated = req.query.stateInitiated;

  // create moment object from string
  const formatString = "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ";
  var stateInitiated = moment(stateInitiated, formatString);

  states[state] = stateInitiated;

  const auth_URL = `https://uclapi.com/oauth/authorise?client_id=${process.env.CLIENT_ID}&state=${state}`;
  res.send(auth_URL);
});

oauth.get("/token", (req, res) => {
  console.log("getting token");

  console.log(`\nrequest state: ${req.query.state}`);
  console.log(`states ${states}`);

  const timeNow = moment();
  console.log(states);

  // If the state query param is the same as the session state param
  if (req.query.state in states) {
    // If the timeNow is less than the time at which the state key was generated + 300 seconds
    if (moment(states[req.query.state]).add(300, "seconds") > timeNow) {
      // Successful authorisation
      var tokenUrl = `https://uclapi.com/oauth/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${req.query.code}`;

      console.log(tokenUrl);

      // get user access token
      axios
        .get(tokenUrl)
        .then((response) => {
          // handle success

          const token = response.data.token;
          const userDataUrl = `https://uclapi.com/oauth/user/data?client_secret=${process.env.CLIENT_SECRET}&token=${token}`;

          // get user data
          axios
            .get(userDataUrl)
            .then((response) => {
              // handle success
              const data = response.data;

              const userData = {
                name: data.full_name,
                email: data.email,
                id: data.upi,
              };

              // delete state after it has been used to access data
              delete states[req.query.state];

              // get user email for jwt payload
              const email = userData.email;

              const role_codes = {
                student: 101,
                admin: 102,
              };

              // every ucl user is assigned student permissions
              const roles = [role_codes.student];

              // if the user's email matches the admin email, admin permissions are also applied
              if (email == process.env.ADMIN_EMAIL) {
                roles.push(role_codes.admin);
              }

              // create jwt from unique user upi
              const jwt = sign({ email }, process.env.JWT_SECRET, {
                expiresIn: 60*60, // 60 mins
              });

              res.cookie("jwt", jwt, { httpOnly: true });

              res.send({ auth: true, result: userData, roles: roles });
            })
            .catch((error) => {
              // handle error
              console.log(error);
              delete states[req.query.state];
              res.send({ auth: false, msg: "Failed to get user data" });
            });
        })
        .catch((error) => {
          // handle error
          console.log(error);
          delete states[req.query.state];
          res.send({ auth: false, msg: "Failed to get access token" });
        });
    } else {
      delete states[req.query.state];
      res.send({
        auth: false,
        msg: "Authorisation took more than 5 minutes, so it has failed",
      });
    }
  } else {
    res.send({ auth: false, msg: "state does not exist" });
  }
});