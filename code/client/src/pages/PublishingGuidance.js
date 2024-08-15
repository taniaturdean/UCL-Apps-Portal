import * as React from 'react';
import { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Button, Box} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./PublishingGuidance.css";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import {  useRef} from "react";
import useScrollTo from '../hooks/useScrollTo';
import { useMediaQuery } from "react-responsive";
import { ArrowForwardIosOutlined } from "@mui/icons-material";

const PlusIcon = () => {
  return <span style={{ fontSize: '24px' }}>+</span>;
};

const MinusIcon = () => {
  return <span style={{ fontSize: '24px' }}>-</span>;
};

const CustomExpandIcon = ({ expanded }) => {
  return expanded ? <MinusIcon /> : <PlusIcon />;
};

const PublishingGuidance = () => {

    useScrollTo();

    const location = useLocation();
    const accordionId = location.state?.accordionId || null;

    const [expanded, setExpanded] = React.useState(false);

    useEffect(() => {
      if (accordionId) {
        setExpanded(accordionId);
      } else {
        setExpanded(false);
      }
    }, [accordionId]);

    const handleChange = (panel) => (event, isExpanded) => {
      if (expanded === panel) {
        setExpanded(false);
      } else {
        setExpanded(isExpanded ? panel : false);
      }
    };


    const svgIcon = (
      <svgIcon>
        <img alt="circle_button" src="../icon_button.svg" />
      </svgIcon>
    )


  const isPhone = useMediaQuery({ minWidth: 0, maxWidth: 450 });
  const isLaptop = useMediaQuery({ minWidth: 451, maxWidth: 1823 });
  const isLargeMonitor = useMediaQuery({ minWidth: 1824});

  const getClassName = (baseClassName) => {
    if (isLargeMonitor) return `${baseClassName}--large-monitor`;
    if (isLaptop) return `${baseClassName}--laptop`;
    if (isPhone) return `${baseClassName}--phone`;
    return baseClassName;
  };
  
    return (
      <main className="publishing-guidance">
        <img className={getClassName("home-page-item")}alt="" src="../ellipse-54.svg" />
        <img className={getClassName("home-page-child")} alt="" src="../ellipse-55.svg" />
        <img className={getClassName("mask-group-icon")} alt="" src="../network-nodes@2x.png" />
        <img className={getClassName("mask-group-icon1")}  alt="" src="../man-screen@2x.png" />
        <img className={getClassName("mask-group-icon2")}  alt="" src="../mask-group2@2x.png" />
  
        <h1 className={getClassName("soft-pub")}>
          Software Publishing Guidance
        </h1>
        <Header />
        <div className={getClassName("ucl-apps-portal")}>
        From invention to commercialisation, find  all you need to know about the publishing process.
        
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar.

        </div>
        <Link to= "/IndustryAndInvestors/SuccessStories" style={{ textDecoration: 'none', color: '#000000'}} >
        <Button
          className={getClassName("rectangle-buttoni")}
          sx={{ width: 345 }}
          variant="contained"
          color="primary"
        >
          View Publishing Success Stories
        </Button>
        </Link>
  
        <Link to= "/About/FaqsContact#contact" >
        <Button
          className={getClassName("get-in-touch")}
          variant="text"
          color="info"
          endIcon = {
             <span>
            {getClassName("get-in-touch") !== "get-in-touch--phone" ? (
              <span className="end-icon regular-icon">{svgIcon}</span>
            ) : (
              <span className="end-icon phone-icon">
                <ArrowForwardIosOutlined />
              </span>
            )}
          </span>
          }
        >
          Need more help? Get in contact with our team
        </Button>
        </Link>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'40%', padding:'1%' }}>
        <div >
          <p>
          <Accordion expanded={expanded === 'panel1' || accordionId === "accordion1"} onChange={handleChange('panel1')} sx={{'@media (max-width:600px)':{marginTop:'100%'}}}>

            <AccordionSummary
               expandIcon={<CustomExpandIcon expanded={expanded === 'panel1' || accordionId === "accordion1"} />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{ minHeight: '90px' }}
             
            >
              <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold' }} id="licensing">
                Licensing and Legal
              </Typography>
            
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: 'white' }}>
              <Typography>
              <p>Test text about a part of software publishing</p>

              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada. Vivamus porta faucibus erat a rutrum. Fusce sed dui vitae orci elementum tempus. Vestibulum eu nunc velit.
              Sed interdum interdum cursus. Cras arcu odio, tincidunt quis rutrum nec, scelerisque vel augue. Aliquam vitae blandit mauris, vitae faucibus urna. Sed vitae ipsum faucibus, tempus nibh vitae, efficitur mi. Quisque magna tortor, feugiat non tortor et, porta commodo leo. Proin suscipit condimentum ante, id mattis lacus scelerisque maximus. Ut risus leo, accumsan nec consequat lacinia, pretium nec orci.
              </Typography>
            </AccordionDetails>
          </Accordion>
          </p>

          <p>
          <Accordion expanded={expanded === 'panel2' || accordionId === "accordion2" } onChange={handleChange('panel2')}>
            <AccordionSummary
              expandIcon={<CustomExpandIcon expanded={expanded === 'panel2' || accordionId === "accordion2"} />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
              sx={{ minHeight: '90px' }}
            >
              <Typography sx={{ width: '33%', flexShrink: 0 , fontWeight: 'bold' }} id="financials">
                Financials
              </Typography>

            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: 'white' }}>
              <Typography>
              <p>Test text about a part of software publishing</p>

              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada. Vivamus porta faucibus erat a rutrum. Fusce sed dui vitae orci elementum tempus. Vestibulum eu nunc velit.
              Sed interdum interdum cursus. Cras arcu odio, tincidunt quis rutrum nec, scelerisque vel augue. Aliquam vitae blandit mauris, vitae faucibus urna. Sed vitae ipsum faucibus, tempus nibh vitae, efficitur mi. Quisque magna tortor, feugiat non tortor et, porta commodo leo. Proin suscipit condimentum ante, id mattis lacus scelerisque maximus. Ut risus leo, accumsan nec consequat lacinia, pretium nec orci.
              </Typography>
            </AccordionDetails>
          </Accordion>
          </p>

          <p>
          <Accordion expanded={expanded === 'panel3' || accordionId === "accordion3"} onChange={handleChange('panel3')} >
            <AccordionSummary
              expandIcon={<CustomExpandIcon expanded={expanded === 'panel3' || accordionId === "accordion3"} />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
              sx={{ minHeight: '90px' }}
            >
              <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold' }} id="marketing">
                Marketing and Communication
              </Typography>

            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: 'white' }}>
              <Typography>
              <p>Test text about a part of software publishing</p>

              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada. Vivamus porta faucibus erat a rutrum. Fusce sed dui vitae orci elementum tempus. Vestibulum eu nunc velit.
              Sed interdum interdum cursus. Cras arcu odio, tincidunt quis rutrum nec, scelerisque vel augue. Aliquam vitae blandit mauris, vitae faucibus urna. Sed vitae ipsum faucibus, tempus nibh vitae, efficitur mi. Quisque magna tortor, feugiat non tortor et, porta commodo leo. Proin suscipit condimentum ante, id mattis lacus scelerisque maximus. Ut risus leo, accumsan nec consequat lacinia, pretium nec orci.
              </Typography>
            </AccordionDetails>
          </Accordion>
          </p>

          <Accordion expanded={expanded === 'panel4' || accordionId === "accordion4"} onChange={handleChange('panel4')}>
            <AccordionSummary
              expandIcon={<CustomExpandIcon expanded={expanded === 'panel4' || accordionId === "accordion4"} />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
              sx={{ minHeight: '90px' }}
            >
              <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold' }} id="deployment">
                Deployment and Maintenance
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: 'white' }}>
              <Typography>
              <p>Test text about a part of software publishing</p>

              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum nibh nisi, sit amet imperdiet arcu mattis sed. Morbi ultricies tortor sem, ut sollicitudin est varius non. Morbi eleifend quis tellus quis fermentum. Quisque cursus, lacus non malesuada pulvinar, felis mauris eleifend dui, nec efficitur urna nibh nec felis. Aenean varius eros id facilisis malesuada. Vivamus porta faucibus erat a rutrum. Fusce sed dui vitae orci elementum tempus. Vestibulum eu nunc velit.
              Sed interdum interdum cursus. Cras arcu odio, tincidunt quis rutrum nec, scelerisque vel augue. Aliquam vitae blandit mauris, vitae faucibus urna. Sed vitae ipsum faucibus, tempus nibh vitae, efficitur mi. Quisque magna tortor, feugiat non tortor et, porta commodo leo. Proin suscipit condimentum ante, id mattis lacus scelerisque maximus. Ut risus leo, accumsan nec consequat lacinia, pretium nec orci.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>

        </Box>
        
      
      <Footer/>
      </main>
      
    );
  };
  
  export default PublishingGuidance;