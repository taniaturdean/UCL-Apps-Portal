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
export const pastProjectsRouter = express.Router();

// browse past projects
pastProjectsRouter.get("/browse", async (req, res, next) => {
  // return project data from DB
  const result = await DB.getAllApprovedPastProjects();
  res.status(200).json(result);
});

// past projects - project profile returned in the format [project info, members info]
pastProjectsRouter.get("/browse/:id", async (req, res, next) => {
  // return specific project data from DB
  const projectId = req.params.id;
  const pastProject = await DB.getPastProjectByID(projectId);
  const teamMembers = await DB.getMembersByListingID(projectId);
  const result = await [pastProject, teamMembers];
  res.status(200).json(result);
});

pastProjectsRouter.post("/submit-form", verifyJWT, async (req, res, next) => {
  // Extract variables

  const result = req.body;

  // console.log(`result: ${JSON.stringify(req.body)}`);

  const title = result["title"];
  const abstract = result["abstract"];
  const sector = result["sector"];
  const productEvolution = result["productEvolution"];
  const publishingJourney = result["publishingJourney"];
  const githubLink = result["githubLink"];
  const productType = result["productType"];
  const imageLink = result["imageLink"];
  const videoLink = result["videoLink"];
  const members = result["members"]; // list of members

  try {
    // begin transaction
    await DB.pool.query("BEGIN");

    // enter listing into listings table
    const listingResult = await DB.insertListing(title, "Past Project");

    // get auto incremented id from result
    const listingID = await listingResult[0]["insertId"];

    // enter listing into past projects table
    await DB.insertPastProject(
      listingID,
      abstract,
      sector,
      productEvolution,
      publishingJourney,
      githubLink,
      productType
    );

    if (imageLink != "") {
      await DB.insertImage(listingID, imageLink);
    }

    if (videoLink != "") {
      await DB.insertVideo(listingID, videoLink);
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
    // send error status
    res.status(400).json({ msg: e });
    // console.log(e);
    throw e;
  }
  // send ok status
  res.status(200).json({ msg: "Form successfully posted" });
});
