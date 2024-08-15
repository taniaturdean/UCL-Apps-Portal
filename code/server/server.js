import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
config(); // loads environment variables from .env file into process.env object
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from "path";

// create express app
export const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,
            maxAge: 300000, // 5 mins
            sameSite: "none",
            httpOnly: true
          }}));
app.use(cookieParser());
app.use(express.static('../client')); // App can access any static files in the client folder?
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: 'False'}));

app.set("trust proxy", 1);

// import routers
import { availableTechRouter } from './routes/availableTech.js';
import { pastProjectsRouter } from './routes/pastProjects.js';
import { projectConnectRouter } from './routes/projectConnect.js';
import { formOptionsRouter } from './routes/formDropdowns.js';
import { oauth } from './routes/auth.js';
import { adminRouter } from './routes/admin.js';

// mount routers
app.use('/available-tech', availableTechRouter);
app.use('/past-projects', pastProjectsRouter);
app.use('/project-connect', projectConnectRouter);
app.use('/form-options', formOptionsRouter);
app.use('/oauth', oauth)
app.use('/admin', adminRouter);

// integration into a single port
export const filepath = path.join(process.cwd(), '/views');
app.use(express.static(filepath));

app.get('/*', (req, res) => {
  res.sendFile(filepath + '/index.html');
})

// listen for requests
export const listener = app.listen(process.env.SERVER_PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});