import express from 'express';
import { config } from 'dotenv';
import * as DB from '../databaseFunctions.js';
import { verifyJWT } from './auth.js';

// Set path to .env file to load them into process.env
config({path: '/Users/isobelbarkley/Documents/appeng/COMP0067_2023_Team09/ucl-apps-portal/server/.env'});

// create router
export const formOptionsRouter = express.Router();

// All formOptions routes should be protected
formOptionsRouter.use(verifyJWT);

// Get form drop downs - sectors
formOptionsRouter.get('/sectors', async (req, res, next) => {
      // return data required for form dropdowns from DB
      const sectors = await DB.getSectors();
      res.status(200).json(sectors);
})

// Get form drop downs - investment offerings
formOptionsRouter.get('/investment-offerings', async (req, res, next) => {
    // return data required for form dropdowns from DB
    const investmentOfferings = await DB.getInvestmentOfferings();
    res.status(200).json(investmentOfferings);
  })

// Get form drop downs - opportunity types
formOptionsRouter.get('/opportunity-types', async (req, res, next) => {
    // return data required for form dropdowns from DB
    const opportunityTypes = await DB.getOpportunityTypes();
    res.status(200).json(opportunityTypes);
})

// Get form drop downs - opportunity types
formOptionsRouter.get('/product-types', async (req, res, next) => {
  // return data required for form dropdowns from DB
  const productTypes = await DB.getProductTypes();
  res.status(200).json(productTypes);
})