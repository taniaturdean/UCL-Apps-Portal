import mysql from 'mysql2';
import fs from 'fs';
import { config } from 'dotenv';
config(); // loads environment variables from .env file into process.env object

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME, 
    port: process.env.DB_PORT, 
    ssl:{ca:fs.readFileSync(process.env.DB_SSL_CERT_PATH)}
    }).promise();

// Get form data functions

export async function getSectors () {
    const [result] = await pool.query('SELECT * FROM sectors;');
    return result
}

export async function getInvestmentOfferings () {
    const [result] = await pool.query('SELECT * FROM investmentOfferings;');
    return result
}

export async function getOpportunityTypes () {
    const [result] = await pool.query('SELECT * FROM opportunityTypes;');
    return result
}

export async function getProductTypes () {
    const [result] = await pool.query('SELECT * FROM productTypes;');
    return result
}

// Opportunities

// Get opportunities data AND filter by approved (includes imageLink from other tables)
export async function getAllApprovedOpportunities () {
    const [result] = await pool.query(`select listings.listingID, listings.listingTitle, opportunities.opportunityType, opportunities.sector, opportunities.opportunityDescription, opportunities.startDate, opportunities.requirements, opportunities.salary, opportunities.duration, opportunities.applyBy, opportunities.contactEmail, images.imageLink from listings 
    inner join opportunities on listings.listingID = opportunities.listingID 
    left join images on listings.listingID = images.listingID
    where (listings.approved = 1);`)
    return result
}

// Get a specific opportunity by listingID 
export async function getOpportunityByID (ID) {
    const [result] = await pool.query(`select listings.listingID, listings.listingTitle, opportunities.opportunityType, opportunities.sector, opportunities.opportunityDescription, opportunities.startDate, opportunities.requirements, opportunities.salary, opportunities.duration, opportunities.applyBy, images.imageLink 
    from listings inner join opportunities on listings.listingID = opportunities.listingID  
    left join images on listings.listingID = images.listingID
    where (listings.approved = 1) AND (opportunities.listingID = ${ID});`);
    return result
}

// Past Projects

// Past projects - just the summary info for browse page
export async function getAllApprovedPastProjects () {
    const [result] = await pool.query(`select listings.listingID, listings.listingTitle, pastProjects.productType, pastProjects.abstract, pastProjects.sector, images.imageLink from listings 
    inner join pastProjects on listings.listingID = pastProjects.listingID
    left join images on listings.listingID = images.listingID
    where (listings.approved = 1);`)
    return result
}

// past project by id - all of the info for specific project profile page
export async function getPastProjectByID (ID) {
    const [result] = await pool.query(`select listings.listingID, listings.listingTitle, pastProjects.abstract, pastProjects.sector, pastProjects.productEvolution, pastProjects.publishingJourney, pastProjects.githubLink, pastProjects.productType, images.imageLink, videos.videoLink from listings 
    inner join pastProjects on listings.listingID = pastProjects.listingID
    left join images on listings.listingID = images.listingID
    left join videos on listings.listingID = videos.listingID
    where (listings.approved = 1) and (pastProjects.listingID = ${ID});`)
    return result
}

// Members (pastProject and availableTech)

// Get all details of memembers associated with a specific project
export async function getMembersByListingID (ID) {
    const [result] = await pool.query(`select teamMembers.memberID, teamMembers.firstName, teamMembers.lastName, teamMembers.roleTitle, teamMembers.roleDescription, linkedin.linkedinLink from teamMembers
    left join linkedin on teamMembers.memberID = linkedin.memberID
    left join listings on teamMembers.listingID = listings.listingID
    where teamMembers.listingID = ${ID} and listings.approved = 1;`)
    return result
}

// Available Tech

// Past projects - just the summary info for browse page
export async function getAllApprovedAvailableTechnologies () {
    const [result] = await pool.query(`select listings.listingID, listings.listingTitle, availableTechnologies.productType, availableTechnologies.sector, availableTechnologies.investmentGoal, availableTechnologies.investmentOffering, availableTechnologies.abstract, images.imageLink from listings 
    inner join availableTechnologies on listings.listingID = availableTechnologies.listingID 
    left join images on listings.listingID = images.listingID
    where (listings.approved = 1);`)
    return result
}

// past project by id - all of the info for specific project profile page
export async function getAvailableTechnologiesByID (ID) {
    const [result] = await pool.query(`select listings.listingID, listings.listingTitle, availableTechnologies.productType, availableTechnologies.sector, availableTechnologies.investmentGoal, availableTechnologies.investmentOffering, availableTechnologies.abstract, availableTechnologies.story, availableTechnologies.investmentDetails, availableTechnologies.githubLink, images.imageLink, videos.videoLink, pitchdecks.pitchdeckLink from listings 
    inner join availableTechnologies on listings.listingID = availableTechnologies.listingID
    left join images on listings.listingID = images.listingID
    left join videos on listings.listingID = videos.listingID
    left join pitchdecks on listings.listingID = pitchdecks.listingID
    where (listings.approved = 1) and (listings.listingID = ${ID});`)
    return result
}

// Enter form data into database - Update these

export async function insertListing (listingTitle, listingType) {
    return pool.query(`INSERT INTO listings (listingTitle, listingType, approved)
    VALUES ('${listingTitle}', '${listingType}', 0);`);
}

export async function insertPastProject (listingID, abstract, sector, productEvolution, publishingJourney, githubLink, productType) {
    return pool.query(`insert into pastProjects 
    values (${Number(listingID)}, '${abstract}', '${sector}', '${productEvolution}', '${publishingJourney}', '${githubLink}', '${productType}');`);
}

export async function insertMember (listingID, firstName, lastName, roleTitle, roleDesc) {
    return pool.query(`insert into teamMembers (listingID, firstName, lastName, roleTitle, roleDescription)
    values (${Number(listingID)}, '${firstName}', '${lastName}', '${roleTitle}', '${roleDesc}');`);
}

export async function insertLinkedin (memberID, linkedin) {
    return pool.query(`insert into linkedin
    values (${Number(memberID)}, '${linkedin}')`);
}

export async function insertAvailableTechology (listingID, abstract, sector, investmentGoal, investmentOffering, story, investmentDetails, githubLink, productType) {
    return pool.query(`insert into availableTechnologies 
    values (${Number(listingID)}, '${sector}', ${Number(investmentGoal)}, '${investmentOffering}', '${abstract}', '${story}', '${investmentDetails}', '${githubLink}', '${productType}');`);
}

export async function insertOpportunity (listingID, sector, opportunityDescription, opportunityType, startDate, requirements, salary, duration, contactEmail, applyBy) {
    return pool.query(`insert into opportunities 
    values ('${Number(listingID)}', '${opportunityType}', '${sector}', '${opportunityDescription}', '${startDate}', '${requirements}', '${salary}', '${duration}', '${contactEmail}', '${applyBy}');`);
}

export async function insertImage (listingID, imageLink) {
    return pool.query(`insert into images
    values (${Number(listingID)}, '${imageLink}')`);
}

export async function insertVideo (listingID, videoLink) {
    return pool.query(`insert into videos
    values (${Number(listingID)}, '${videoLink}')`);
}

export async function insertPitchdeck (listingID, pitchdeckLink) {
    return pool.query(`insert into pitchdecks
    values (${Number(listingID)}, '${pitchdeckLink}')`);
}

// admin functions

export async function updateListingApprovalByID (listingID, approval) {
    return pool.query(`update listings 
    set approved = ${approval}
    where listingID = ${listingID};`);
}

export async function deleteListingByID (listingID) {
    return pool.query(`delete from listings
    where listingID = ${Number(listingID)};`);
}

export async function getListingApprovalByID (listingID) {
    return pool.query(`select approved from listings
    where listingID = ${Number(listingID)};`);
}

export async function getAllAvailableTechnologies () {
    const [result] = await pool.query(`select listings.listingID, listings.approved, listings.listingTitle, availableTechnologies.productType, availableTechnologies.sector, availableTechnologies.investmentGoal, availableTechnologies.investmentOffering, availableTechnologies.abstract, images.imageLink from listings 
    inner join availableTechnologies on listings.listingID = availableTechnologies.listingID 
    left join images on listings.listingID = images.listingID;`)
    return result
}

export async function getAllPastProjects () {
    const [result] = await pool.query(`select listings.listingID, listings.approved, listings.listingTitle, pastProjects.productType, pastProjects.abstract, pastProjects.sector, images.imageLink from listings 
    inner join pastProjects on listings.listingID = pastProjects.listingID
    left join images on listings.listingID = images.listingID;`)
    return result
}

export async function getAllOpportunities () {
    const [result] = await pool.query(`select listings.listingID, listings.approved, listings.listingTitle, opportunities.opportunityType, opportunities.sector, opportunities.opportunityDescription, opportunities.startDate, opportunities.requirements, opportunities.salary, opportunities.duration, opportunities.applyBy, opportunities.contactEmail, images.imageLink from listings 
    inner join opportunities on listings.listingID = opportunities.listingID 
    left join images on listings.listingID = images.listingID;`)
    return result
}
