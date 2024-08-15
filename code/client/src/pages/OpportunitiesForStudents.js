import { Button} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./OpportunitiesForStudents.css";
import { Link } from 'react-router-dom';
//TO BE COMPLETED

const OpportunitiesForStudents = () => {
  const svgIcon = (
    <svgIcon>
      <img alt="circle_button" src="../icon_button.svg" />
    </svgIcon>
  )

  return (
    <main className="op">
      <img className="icons" alt="" src="../group-4@2x.png" />
      <img className="light-bulb2" alt="" src="../mask-group5@2x.png" />
      <img className="home-page-item-op" alt="" src="../ellipse-54.svg" />
      <img className="home-page-child-op" alt="" src="../ellipse-55.svg" />
      <img className="mask-group-icon-op" alt="" src="../mask-group33@2x.png" />
      <img className="mask-group-icon1-op" alt="" src="../teacher.png" />
      <img className="mask-group-icon2-op" alt="" src="../mask-group2@2x.png" />

      <h1 className="opp">
        Opportunities for Students
      </h1>

      <div className="Line-up" />

      <h1 className="nxi">
        UCL NXI
      </h1>
      <Header />
      <div className="text1">
        UCL Next-Step Experience Internships - Industry-ready students for summer and winter internships
      </div>
      <div className="text12">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada.
      </div>
      <Button
        className="r-button"
        sx={{ width: 245 }}
        variant="contained"
        color="primary"
      >
        Learn more about NXI
      </Button>
      <Button
        className="get-in-touch2"
        variant="text"
        color="info"
        endIcon = {svgIcon}
      >
        Get in touch with the NXI Team
      </Button>

      <div className="Line-middle2" />
      
      <h2 className="ucl">
        UCL Finishing School
      </h2>
      
      <Button
        className="browse-op"
        variant="text"
        color="info"
        startIcon = {svgIcon}
      >
        Get in touch with Finishing School
      </Button>

      <Button
        className="browse2-op"
        variant="text"
        color="info"
        startIcon = {svgIcon}
      >
        Something else to link to here
      </Button>

      <Button
        className="browse3-op"
        variant="text"
        color="info"
        startIcon = {svgIcon}
      >
        And another cool link here
      </Button>

      <div className="line-div2-op" />

      <div className="text-op">
      UCL Next-Step Experience Internships - Industry-ready students for summer and winter internships. And also some more information blah blah blah etc
      </div>

      <div className="text2-op">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada.
      </div>

     
      <div className="Line-low-op" />

      <h2 className="connect-op">
       UCL ProjectConnect
      </h2>

      <div className="text3-op">
      UCL Next-Step Experience Internships - Industry-ready students for summer and winter internships.
      </div>

      <Link to = "/FacultyAndStudents/ProjectConnect" style={{ textDecoration: 'none', color: '#000000'}}>
      <Button
        className="browse4-op"
        variant="text"
        color="info"
        startIcon = {svgIcon}
      >
         Browse ProjectConnect Opportunities
      </Button>
      </Link>

      <Link to = "/FacultyAndStudents/SubmitOpportunity"style={{ textDecoration: 'none', color: '#000000'}}>
      <Button
        className="browse5-op"
        variant="text"
        color="info"
        endIcon = {svgIcon}
      >
          Advertise a ProjectConnect Opportunity
      </Button>
    </Link>

      <div className="line-div3-op" />

      <div className="text4-op">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada. Vivamus porta faucibus erat a rutrum. Fusce sed dui vitae orci elementum tempus. Vestibulum eu nunc velit.
      </div>

      <div className="text5-op">
      Sed interdum interdum cursus. Cras arcu odio, tincidunt quis rutrum nec, scelerisque vel augue. Aliquam vitae blandit mauris, vitae faucibus urna. Sed vitae ipsum faucibus, tempus nibh vitae, efficitur mi. Quisque magna tortor, feugiat non tortor et, porta commodo leo. Proin suscipit condimentum ante, id mattis lacus scelerisque maximus. Ut risus leo, accumsan nec consequat lacinia, pretium nec orci.
      </div>

      <Footer />
    </main>
  );
};

export default OpportunitiesForStudents;
