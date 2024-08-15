import express from "express";
import { config } from "dotenv";
import * as DB from "../databaseFunctions.js";
import { verify } from "jsonwebtoken";
import { configPath } from "../envFilePath.js";

// Set path to .env file to load them into process.env
config({
  path: configPath,
});

// create router
export const adminRouter = express.Router();

export const verifyJWTAdmin = (req, res, next) => {
  // Note: the http only cookies are not stored in the req.session object
  const jwt = req?.cookies?.jwt;

  if (!jwt) {
    res.json({ auth: false, msg: "No token found in header" });
  } else {
    verify(jwt, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // console.log(err);
        res.json({ auth: false, msg: "Failed to verify JWT" });
      } else {
        const email = decoded.email;
        if (email != process.env.ADMIN_EMAIL) {
          res.json({
            auth: false,
            msg: "User account does not have admin permissions",
          });
        }
        // else pass to route
        next();
      }
    });
  }
};

// all routes require admin verification middleware
adminRouter.use(verifyJWTAdmin);

adminRouter.delete("/listings/delete/:id", async (req, res) => {
  try {
    const listingID = Number(req.params.id);
    // due to 'on delete cascade' constraint, only need to delete listing from listings table
    await DB.deleteListingByID(listingID);
    // send ok status
    res.status(200).json({
      result: "success",
      msg: `listing ID ${listingID} has been deleted from the database`,
    });
  } catch (e) {
    res.status(400).json({ result: "failed", msg: e });
    throw e;
  }
});

adminRouter.patch("/listings/change-approval/:id", async (req, res) => {
  try {
    const listingID = Number(req.params.id);
    const approval = Number(req.body.approval);

    await DB.updateListingApprovalByID(listingID, approval);
    // send ok status
    res.status(200).json({
      result: "success",
      msg: `approved value for listingID ${listingID} has been updated to ${approval}`,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ result: "failed", msg: e });
  }
});

adminRouter.get("/listings/approval-state/:id", async (req, res) => {
  try {
    const listingID = Number(req.params.id);

    const approvalState = await DB.getListingApprovalByID(listingID);
    // send ok status
    res.status(200).json({
      result: "success",
      approvalState: approvalState,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ result: "failed", msg: e });
  }
});

adminRouter.get('/available-tech', async (req, res) => {
  // return project data from DB
  const result = await DB.getAllAvailableTechnologies();
  res.status(200).json(result);
})

adminRouter.get('/past-projects', async (req, res) => {
  // return project data from DB
  const result = await DB.getAllPastProjects();
  res.status(200).json(result);
})

adminRouter.get('/opportunities', async (req, res) => {
  // return project data from DB
  const result = await DB.getAllOpportunities();
  res.status(200).json(result);
})
