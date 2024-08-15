import express from "express";
import { config } from "dotenv";
import * as DB from "../databaseFunctions.js";
import { verifyJWT } from "./auth.js";
import { configPath } from "../envFilePath.js";

// Set path to .env file to load them into process.env
config({
  path: configPath,
});

// create router
export const availableTechRouter = express.Router();

// browse available technologies
availableTechRouter.get("/browse", async (req, res, next) => {
  // return project data from DB
  const result = await DB.getAllApprovedAvailableTechnologies();
  res.status(200).json(result);
});

// available technologies - project profile
availableTechRouter.get("/browse/:id", async (req, res, next) => {
  // return specific project data from DB
  const projectId = req.params.id;
  const availableTechnologies = await DB.getAvailableTechnologiesByID(
    projectId
  );
  const members = await DB.getMembersByListingID(projectId);
  const result = await [availableTechnologies, members];
  res.status(200).json(result);
});

availableTechRouter.post("/submit-form", verifyJWT, async (req, res, next) => {
  // Extract variables
  const result = req.body;

  const title = result["title"];
  const abstract = result["abstract"];
  const sector = result["sector"];
  const investmentGoal = result["investmentGoal"];
  const investmentOffering = result["investmentOffering"];
  const story = result["story"];
  const investmentDetails = result["investmentDetails"];
  const githubLink = result["githubLink"];
  const productType = result["productType"];

  const imageLink = result["imageLink"];
  const videoLink = result["videoLink"];
  const pitchdeckLink = result["pitchdeckLink"];

  const members = result["members"];

  try {
    // begin transaction
    await DB.pool.query("BEGIN");

    // enter listing into listings table
    const listingResult = await DB.insertListing(title, "Available Technology");

    // get auto incremented id from result
    const listingID = await listingResult[0]["insertId"];

    // enter listing into past projects table
    await DB.insertAvailableTechology(
      listingID,
      abstract,
      sector,
      investmentGoal,
      investmentOffering,
      story,
      investmentDetails,
      githubLink,
      productType
    );

    if (imageLink != "") {
      await DB.insertImage(listingID, imageLink);
    }

    if (videoLink != "") {
      await DB.insertVideo(listingID, videoLink);
    }

    if (pitchdeckLink != "") {
      await DB.insertPitchdeck(listingID, pitchdeckLink);
    }

    const numMembers = members.length;

    // for the number of members
    for (let i = 0; i < numMembers; i++) {
      // select member object from array
      let member = members[i];

      // extract data
      let firstName = member["firstName"];
      let lastName = member["lastName"];
      let roleTitle = member["roleTitle"];
      let roleDesc = member["roleDesc"];
      let linkedin = member["linkedin"];

      let memberResult = await DB.insertMember(
        listingID,
        firstName,
        lastName,
        roleTitle,
        roleDesc
      );

      // get auto incremented id from result
      let memberID = await memberResult[0]["insertId"];
      console.log(await memberID);

      // if linkedin not empty
      if (linkedin != "") {
        await DB.insertLinkedin(memberID, linkedin);
      }
    }

    // commit transaction
    await DB.pool.query("COMMIT");
  } catch (e) {
    // if errors, rollback transaction
    await DB.pool.query("ROLLBACK");
    res.status(400).json(result);
    throw e;
  }
  // send ok status
  res.status(200).json(result);
});
