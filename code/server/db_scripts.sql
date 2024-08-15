-- Drop tables in reverse order due to foreign key constraints

DROP TABLE pitchdecks;
DROP TABLE images;
DROP TABLE videos;
DROP TABLE linkedin;

DROP TABLE teamMembers;

DROP TABLE pastProjects;
DROP TABLE availableTechnologies;
DROP TABLE opportunities;

DROP TABLE admins;
DROP TABLE listings;

DROP TABLE investmentOfferings;
DROP TABLE opportunityTypes;
DROP TABLE listingTypes;
DROP TABLE productTypes;
DROP TABLE sectors;

-- create drop down tables first (and foreign key tables)

-- sectors
CREATE TABLE sectors (
    sector varchar(255) PRIMARY KEY
);
INSERT INTO sectors VALUES 
    ('Energy'), 
    ('Materials'),
    ('Industrials'),
    ('Consumer Discretionary'),
    ('Consumer Staples'),
    ('Healthcare'),
    ('Financial'),
    ('Information Technology'),
    ('Telecommunications'),
    ('Utilities'),
    ('Real Estate'),
    ('Other');

-- product types
CREATE TABLE productTypes (
    productType varchar(255) PRIMARY KEY
    );

INSERT INTO productTypes VALUES
    ('Application Software'),
    ('System Software'),
    ('Firmware'),
    ('Programming Software'),
    ('Driver Software'),
    ('Freeware'),
    ('Shareware'),
    ('Open Source Software'),
    ('Closed Source Software'),
    ('Utility Software');

-- investmentOffering
CREATE TABLE investmentOfferings (
    investmentOffering varchar(255) PRIMARY KEY
);
INSERT INTO investmentOfferings VALUES 
    ('Equity'),
    ('Convertibles'),
-- add more options in here
    ('Other');

-- opportunityTypes
CREATE TABLE opportunityTypes (
    opportunityType varchar(255) PRIMARY KEY
);
INSERT INTO opportunityTypes VALUES 
    ('Part-time'),
    ('Full-time');

CREATE TABLE listingTypes (
    listingType varchar(255) PRIMARY KEY
);
INSERT INTO listingTypes VALUES 
    ('Available Technology'), 
    ('Past Project'), 
    ('Opportunity');


-- admins table

CREATE TABLE admins (
	adminID int AUTO_INCREMENT,
    email varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (adminID)
    );
INSERT INTO admins (email) VALUES ('isobel.barkley.22@ucl.ac.uk');


-- listings lookup table

CREATE TABLE listings (
	listingID int AUTO_INCREMENT,
    listingTitle varchar(255) NOT NULL,
    listingType varchar(255) NOT NULL,
    approved boolean NOT NULL,
    PRIMARY KEY (listingID),
    FOREIGN KEY (listingType) REFERENCES listingTypes(listingType)
    );

-- Populate some past projects
INSERT INTO listings (listingTitle, listingType, approved) VALUES
    ('HoloPipelines V2 IntelOptimiser', 'Past Project', TRUE),
    ('HoloSketch', 'Past Project', FALSE),
    ('ANCSSC Mapping Tool', 'Past Project', TRUE),
    ('Multiplayer AR Game', 'Past Project', FALSE),
    ('Colour Ground-Truthing Tool', 'Past Project', TRUE),

-- some available technologies (that are actually past projects)
    ('Orthopaedic PROMS', 'Available Technology', TRUE),
    ('GetMyPolicy', 'Available Technology', FALSE),
    ('Speech Emotion Recognition', 'Available Technology', TRUE),
    ('HoloPipelines V2 IntelOptimiser', 'Available Technology', TRUE),
    ('Safe Browsing Box', 'Available Technology', TRUE),

-- some opportunities
    ('Summer Reasearch Intern', 'Opportunity', TRUE),
    ('VR Start-up Co-Founder', 'Opportunity', TRUE),
    ('Start-up CFO', 'Opportunity', FALSE),
    ('AI Developer', 'Opportunity', TRUE);


-- Listing specific info

-- past projects
CREATE TABLE pastProjects (
    listingID int,
    abstract varchar(1000),
    sector varchar(255),
    productEvolution varchar(1000),
    publishingJourney varchar(1000),
    githubLink varchar(255),
    productType varchar(255),
    PRIMARY KEY (listingID),
    FOREIGN KEY (listingID) REFERENCES listings(listingID) ON DELETE CASCADE,
    FOREIGN KEY (sector) REFERENCES sectors(sector),
    FOREIGN KEY (productType) REFERENCES productTypes(productType)
);

INSERT INTO pastProjects VALUES
    (1, 'HoloPipelines version 2 is a proof of
concept iteration to optimise the generation of 3D
models from CT imaging. As part of the 2018-2019
MSc project solution, HoloRepository, HoloPipelines
was created. This is currently a cloud-based service
that performs the automatic generation of 3D models
from 2D image stacks using several pipelines for
neural network libraries and other image processing
with Machine Learning to apply to medical data
visualisation. Operations for optimising include
offline local processing, multithreaded architecture
scalability, GPU acceleration and applying design
patterns to the core module units. Offloading and
directing Python code for Intel specific processes
such as from the Neural Stick was also investigated.', 'Healthcare',
'<Insert product evolution details here >', '<Insert publishing and investment journey details here >', 'www.github.com', 'Application Software'),

    (2, 'Rapid Prototyping is a widely used
technique to conceptualise, visualise and interact
with novel ideas without investing huge amounts
of time or resources, reducing the risk of project
failure. Augmented Reality (AR) is a rapidly growing
technology that could potentially be used to enhance
the rapid prototyping workflow as it brings a user’s
ideas further into reality. It allows users to interact
with their ideas in ways that were not possible if
they were static objects. It is envisioned that the
prototypes created in AR shall only be limited to one’s
imaginations and the feasibility of implementing it in
the real world. This project aims to demonstrate how
AR could be applied to rapid prototyping within the
transportation industry to encourage the uptake of
such technologies, with the hope of other industries
seeing the potential benefits and integrating it into
their rapid prototyping workflows.', 'Information Technology',
'<Insert product evolution details here >', '<Insert publishing and investment journey details here >', 'www.github.com', 'Application Software'),

    (3, 'The project is designing a Visual
Mapping Tool for the ANCSSC. The tool will use
IATI data which could then be replaced later with
the ANCSSC’s member’s data. When the tool uses
International Aid Transparency Initiative (IATI) data, it
could be used by NGOs and CSOs to understand
the types of projects, donors and locations. They
could use this tool to understand the data and create
strategies to maximise their impact. CSOs and NGOs
often do not have enough time or resources to do
fundraising research. Data licensing also needs to
be taken into account, most of the IATI data is open
to use and modify, however some do not so the tool
could keep track of this.', 'Information Technology',
'<Insert product evolution details here >', '<Insert publishing and investment journey details here >', 'www.github.com', 'Application Software'),

    (4, 'The project is designing a Visual
Mapping Tool for the ANCSSC. The tool will use
IATI data which could then be replaced later with
the ANCSSC’s member’s data. When the tool uses
International Aid Transparency Initiative (IATI) data, it
could be used by NGOs and CSOs to understand
the types of projects, donors and locations. They
could use this tool to understand the data and create
strategies to maximise their impact. CSOs and NGOs
often do not have enough time or resources to do
fundraising research. Data licensing also needs to
be taken into account, most of the IATI data is open
to use and modify, however some do not so the tool
could keep track of this.', 'Information Technology',
'<Insert product evolution details here >', '<Insert publishing and investment journey details here >', 'www.github.com', 'Application Software'),

    (5, 'A tool or software is developed for the
user to accurately mark the basic colour of each pixel
or region of an image based on existing data. The tool
29 or software reads the provided image and labels the
basic colour of each pixel or region based on built-in
algorithms, data or models. Users can mark, modify
and save the data as ground truth easily.', 'Information Technology',
'<Insert product evolution details here >', '<Insert publishing and investment journey details here >', 'www.github.com', 'Application Software');

-- available technologies

CREATE TABLE availableTechnologies (
    listingID int,
    sector varchar(255),
    investmentGoal int,
    investmentOffering varchar(255),
    abstract varchar(1000),
    story varchar(1000),
    investmentDetails varchar(1000),
    githubLink varchar(255),
    productType varchar(255),
    PRIMARY KEY (listingID),
    FOREIGN KEY (listingID) REFERENCES listings(listingID) ON DELETE CASCADE,
    FOREIGN KEY (sector) REFERENCES sectors(sector),
    FOREIGN KEY (investmentOffering) REFERENCES investmentOfferings(investmentOffering),
    FOREIGN KEY (productType) REFERENCES productTypes(productType)
);

-- add new column data into availabletech listings

INSERT INTO availableTechnologies VALUES
    (5, 'Healthcare', 5000, 'Equity', 'There is a lack of open source, easy to
use Patient Recorded Outcome Measures (PROMS)
visualisation and collection software. Our project is
an open platform web app that visualises patients’
progress. This will aid doctors and public health
professionals in understanding the recovery of
patients, and also aid patients in understanding
their own recovery. The system is built as modules
that can be adapted for other applications (e.g.,
the graphs, the survey pulled in from operational
templates, etc.).', 
'Insert here a very nice story about how the team met and came together and created an awesome product.',
'Some cool investment details here', 'www.github.com', 'Application Software');
-- Add values for listings 6-10 

-- Opportunities table

CREATE TABLE opportunities(
    listingID int,
    opportunityType varchar(255),
    sector varchar(255),
    opportunityDescription varchar(1000),
    startDate date,
    requirements varchar(1000),
    salary varchar(255), -- this is a varchar so that "unpaid" is also an option
    duration varchar(255), -- this is a varchar so "indefinite" is an option and units unspecified (e.g. week, years, whatever)
    contactEmail varchar (100),
    applyBy date, -- Have made this a mandatory field for the opportunities listings
    PRIMARY KEY (listingID),
    FOREIGN KEY (listingID) REFERENCES listings(listingID) ON DELETE CASCADE,
    FOREIGN KEY (opportunityType) REFERENCES opportunityTypes(opportunityType),
    FOREIGN KEY (sector) REFERENCES sectors(sector)
);

-- Add applyBy dates into opportunities

INSERT INTO opportunities VALUES 
    (11, 'Part-time', 'Energy', 'Here is a description about how great it would be to be my summer intern. This is what you would be doing.', '2023-04-21',
    'The requirements are that you are a postgrad and that you have an interest in energy.', 'Unpaid', '3 months', 'john_smith@gmail.com', '2023-05-06'),
    (12, 'Full-time', 'Materials', 'Here is a description about how great it would be to be my summer intern. This is what you would be doing.', '2023-04-21', 'The requirements are that you are a postgrad and that you have an interest in energy.', '£24,000 per anum', '6 months', 'clark-kent@hotmail.co.uk', '2023-04-20');

-- Add opportunities for listingID from 13-15

-- Create tables for optional fields in listing specific tables

-- team members of projects
CREATE TABLE teamMembers (
    memberID int AUTO_INCREMENT,
    listingID int,
    firstName varchar(255),
    lastName varchar(255),
    roleTitle varchar(255),
    roleDescription varchar(255),
    PRIMARY KEY (memberID),
    FOREIGN KEY (listingID) REFERENCES listings(listingID) ON DELETE CASCADE
);

INSERT INTO teamMembers (listingID, firstName, lastName, roleTitle, roleDescription) VALUES
    (1, 'Isobel', 'Barkley', 'Team Lead', 'Some stuff about me here'),
    (1, 'Arjun', 'Bahra', 'Lead Backend Developer', 'Some stuff about Arjun'),
    (1, 'Tania', 'Turdean', 'Lead Frontend Developer', 'Some stuff about Tania');


-- linkedin profiles of team members
CREATE TABLE linkedin (
    memberID int,
    linkedinLink varchar(255),
    PRIMARY KEY (memberID),
    FOREIGN KEY (memberID) REFERENCES teamMembers (memberID) ON DELETE CASCADE
);

INSERT INTO linkedin VALUES
    (1, 'www.linkedin/Isobel-Barkley.com'),
    (2, 'www.linkedin/Arjun-Bahra.com'),
    (3, 'www.linkedin/Tania-Turdean.com');

-- Decided to drop closing dates for availableTech since it's not in the figma or form, and might not be relevant

-- Create tables for optional fields

CREATE TABLE images (
    listingID int,
    imageLink varchar(255),
    PRIMARY KEY (listingID),
    FOREIGN KEY (listingID) REFERENCES listings(listingID) ON DELETE CASCADE
);

-- Populate images table

CREATE TABLE videos (
    listingID int,
    videoLink varchar(255),
    PRIMARY KEY (listingID),
    FOREIGN KEY (listingID) REFERENCES listings(listingID) ON DELETE CASCADE
);

-- populate videos

CREATE TABLE pitchdecks (
    listingID int,
    pitchdeckLink varchar(255),
    PRIMARY KEY (listingID),
    FOREIGN KEY (listingID) REFERENCES listings(listingID) ON DELETE CASCADE
);

-- populate pitchdecks