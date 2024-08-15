import {
  Routes,
  Route,
  useNavigationType,
  useLocation
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import IndustryandInvestors from "./pages/IndustryAndInvestors";
import SubmitAvailableTechnology from "./pages/SubmitAvailableTechnology";
import SubmitPastProject from "./pages/SubmitPastProject";
import SubmitOpportunity from "./pages/SubmitOpportunity";
import AvailableTechnologies from "./pages/AvailableTechnologies";
import PublishingGuidance from "./pages/PublishingGuidance";
import AdminDashboard from "./pages/AdminDashboard";
import LoginCallback from "./pages/LoginCallback";
import FacultyAndStudents from "./pages/FacultyAndStudents";
import OpportunitiesForStudents from "./pages/OpportunitiesForStudents";
import ExAvTech from "./pages/ExAvTech";
import About from "./pages/About";
import Faqs from "./pages/faqs";
import PastProjects from "./pages/PastProjects";
import ProjectConnect from "./pages/ProjectConnect";
import { useEffect } from "react";
import React from "react";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Unauthorised from "./pages/Unauthorised";
import Forbidden from "./pages/Forbidden";
import FormSubmitted from "./pages/FormSubmitted";
import Error from "./pages/Error";
import DetailedPastProject from './pages/DetailedPastProject';
import DetailedAvailTech from "./pages/DetailedAvailTech";
import Expired from "./pages/Expired";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "UCL Apps Portal";
        metaDescription = "";
        break;
      case "/IndustryAndInvestors/Overview":
        title = "Industry and Investors";
        metaDescription = "";
        break;
      case "/FacultyAndStudents/SubmitAvailableTechnology":
        title = "Submit Available Technology";
        metaDescription = "";
        break;
      case "/IndustryAndInvestors/AvailableTechnologies":
        title = "Available Technologies";
        break;
      case "/PublishingGuidance":
        title = "Software Publishing Guidance";
        break;
      case "/Admin":
        title = "Admin portal";
        break;
      case "/FacultyAndStudents/Overview":
        title = "FacultyAndStudents";
        break;
      case "/FacultyAndStudents/OpportunitiesForStudents":
        title = "OpportunitiesForStudents";
        break;
      case "/ExAvTech":
        title = "ExAvTech";
        break;
      case "/About/OverviewTeam":
        title = "FacultyAndStudents";
        break;
      case "/About/FaqsContact":
        title = "Faqs";
        break;
      case "/IndustryAndInvestors/SuccessStories":
        title = "Past Projects";
        break;
      case "/Sectors":
        title = "Sectors";
        break;
      case "/FacultyAndStudents/SubmitPastProject":
        title = "Submit past project";
        break;
      case "/FacultyAndStudents/ProjectConnect":
        title = "Project Connect";
        break;
      case "/FacultyAndStudents/SubmitOpportunity":
        title = "Submit Opportunity";
        break;
      case "/LoginCallback":
        title = "Login callback";
        break;
      default:
      //do nothing
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/LoginCallback" element={<LoginCallback />} />
        <Route path="/IndustryAndInvestors/Overview" element={<IndustryandInvestors />} />
        <Route path="/IndustryAndInvestors/AvailableTechnologies" element={<AvailableTechnologies />}/>
        <Route path="/IndustryAndInvestors/SuccessStories" element={<PastProjects />}/>
        <Route path="/IndustryAndInvestors/SuccessStories/:id" element={<DetailedPastProject />} />
        <Route path="/IndustryAndInvestors/AvailableTechnologies/:id" element={<DetailedAvailTech />} />
        {/* This route needs to be redone with dynamic rendering - something like /IndustryAndInvestors/AvailableTechnologies/:id */}
        <Route path="/ExAvTech" element={<ExAvTech />} />
        
        <Route path="/PublishingGuidance" element={<PublishingGuidance />} />
        <Route path="/About/OverviewTeam" element={<About />} />
        <Route path="/About/FaqsContact" element={<Faqs />} />
        
        <Route path="/Error" element={<Error/>} />
        <Route path="/Unauthorised" element={<Unauthorised/>}/>
        <Route path="/Forbidden" element={<Forbidden/>}/>
        <Route path="/Expired" element={<Expired/>} />

        {/* putting this as public for dev purposes */}
        {/* <Route path="/Admin" element={<Admin />} /> */}

        {/* protected Routes - ucl staff/student*/}
        <Route element={<RequireAuth allowedRoles={[101]} />}>
          <Route path="/FacultyAndStudents/Overview" element={<FacultyAndStudents />}/>
          <Route path="/FacultyAndStudents/ProjectConnect" element={<ProjectConnect />} />
          <Route path="/FacultyAndStudents/OpportunitiesForStudents" element={<OpportunitiesForStudents />}/>

          <Route path="/FacultyAndStudents/SubmitAvailableTechnology" element={<SubmitAvailableTechnology />}/>
          <Route path="/FacultyAndStudents/SubmitPastProject" element={<SubmitPastProject />} />
          <Route path="/FacultyAndStudents/SubmitOpportunity" element={<SubmitOpportunity />} />
          <Route path="/FormSubmitted" element={<FormSubmitted/>} />
        </Route>

        {/* protected Routes - admin only*/}
        <Route element={<RequireAuth allowedRoles={[102]} />}>
          <Route path="/Admin" element={<AdminDashboard />} />
        </Route>

        {/* catch all - could create a "Missing" component to be rendered to any incorrect urls at our root */}
        {/* <Route path="*" element={<Missing />} /> */}
        
      </Route>
    </Routes>
  );
}
export default App;
