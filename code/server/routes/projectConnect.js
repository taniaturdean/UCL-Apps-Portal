import express from 'express';
import { config } from 'dotenv';
import * as DB from '../databaseFunctions.js';
import { verifyJWT } from './auth.js'

// Set path to .env file to load them into process.env
config({path: '/Users/isobelbarkley/Documents/appeng/COMP0067_2023_Team09/ucl-apps-portal/server/.env'});

// create router
export const projectConnectRouter = express.Router();

// All project connect routes are protected
projectConnectRouter.use(verifyJWT);

// projectconnect browse
projectConnectRouter.get('/browse', async (req, res, next) => {
    // return project data from DB
    const result = await DB.getAllApprovedOpportunities();
    res.status(200).json(result);
})

// projectconnect - project profile
projectConnectRouter.get('/browse/:id', async (req, res, next) => {
    // return specific project data from DB 
    const projectId = req.params.id;
    const result = await DB.getOpportunityByID(projectId);
    res.status(200).json(result);
})

// projectConnect advertise form
projectConnectRouter.post('/submit-form', async (req, res, next) => {

    // Extract variables
    const result = req.body;
  
    const title = result['title'];
    const opportunityType = result['opportunityType'];
    const sector = result['sector'];
    const opportunityDescription = result['roleDescription'];
    const startDate = result['startDate'];
    const requirements = result['roleRequirements'];
    const salary = result['roleSalary'];
    const duration = result['roleDuration'];
    const contactEmail = result['contactemail'];
    const applyBy = result['applyBy'];

    const imageLink = result['imageLink'];
  
    try {
      // begin transaction
      await DB.pool.query('BEGIN');
      
      // enter listing into listings table
      const listingResult = await DB.insertListing(title, 'Opportunity');
      
      // get auto incremented id from result
      const listingID = await listingResult[0]['insertId'];
   
      // enter listing into past projects table
      await DB.insertOpportunity(listingID, sector, opportunityDescription, opportunityType, startDate, requirements, salary, duration, contactEmail, applyBy);

      if (imageLink != '') {
        await DB.insertImage(listingID, imageLink);
      }
  
      // commit transaction
      await DB.pool.query('COMMIT')
  
    } catch (e) {
      // if errors, rollback transaction
      await DB.pool.query('ROLLBACK');
      res.status(400).json(result);
      throw e;
    }
    // send ok status
    res.status(200).json(result);
  
  })