import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import {TextField, Select, MenuItem, InputLabel, FormControl} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Container from '@mui/material/Container';
import Header from "../components/Header";
//import Footer from "../components/Footer";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SubmitAvailableTechnology.css"


const SubmitAvailableTechnology = () => {
  
  const [title_input, setTitle] = useState('');
  const [abs_input, setAbstract] = useState('');

  // need to configure investment goal so form only allows number inputs, or else will crash server

  const [goal, setGoal] = useState('')
  const [story, setStory] = useState('')
  const [investDetails, setInvestDetails] = useState('')
  const [github, setGithub] = useState('')
  const [image, setImage] = useState('')
  const [video, setVideo] = useState('')
  const [pitch, setPitch] = useState('')
  
  //sectors dropdown
  const [sectors, setSectors] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");

  //productType dropdown
  const [product, setProduct] = useState([])  
  const [selectedProduct, setSelectedProduct] = useState("")

  //investmentOffering dropdown
  const [offering, setOffering] = useState([])  
  const [selectedOffering, setSelectedOffering] = useState("")

  //remaining characters variables
  const [abs_remainingChars, setAbsRemainingChars] = useState(1000);
  const [story_remainingChars, setStoryRemainingChars] = useState(1000);
  const [invest_remainingChars, setInvestRemainingChars] = useState(1000);

  //navigate back to home page on submit
  const navigate = useNavigate();


  //get sectors for dropdown
  useEffect(() => {
    axios
      .get(`/form-options/sectors`)
      .then((response) => {
        if (response.data.auth === false) {
          // if jwt has expired
          navigate('/Expired');
        } else {
          setSectors(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
  };

  //get productType for dropdown
  useEffect(() => {
    axios
      .get(`/form-options/product-types`)
      .then((response) => {
        if (response.data.auth === false) {
          // if jwt has expired
          navigate('/Expired');
        } else {
          setProduct(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  //get Investment offering for dropdown
  useEffect(() => {
    axios
      .get(`/form-options/investment-offerings`)
      .then((response) => {
        if (response.data.auth === false) {
          // if jwt has expired
          navigate('/Expired');
        } else {
          setOffering(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  const handleOfferingChange = (event) => {
    setSelectedOffering(event.target.value);
  };

  function validateGoal(goal) {
    const goalNumber = Number(goal);
    return Number.isInteger(goalNumber);
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    //Form Validation

    if (!selectedSector || !selectedProduct) {
      alert('Please fill in all required fields marked with an asterisk (*).');
      return;
    }

    if (!title_input || !abs_input) {
      alert('Please fill in all required fields marked with an asterisk (*).');
      return;
    }

    if (!validateGoal(goal)) {
      alert('Please enter a valid goal (integer value).');
      return;
    }

    axios
      .post(`/available-tech/submit-form`,  //update to actual path
       {
        abstract: abs_input,
        title: title_input,
        sector: selectedSector,
        story: story,
        investmentDetails: investDetails,
        githubLink: github,
        pitchDeck: pitch,
        productType: selectedProduct,
        imageLink: image,   //check routes and db functions are handling this
        videoLink: video,   //check routes and db functions are handling this
        investmentGoal: goal,
        investmentOffering: selectedOffering,
        members: teamMembers,
      })
      .then(function (response) {
        if (response.status === 200) {
          // success
          navigate("/FormSubmitted");
        } else if (response.data.auth === false) {
          // jwt expired
          navigate("/Expired");
        } else {
          // 400 status - something went wrong
          navigate("/Error");
        }
      })
      .catch(function (error) {
        console.log(error);
        
      });
  };

  //handlers for character countdown
  const handleAbstractInput = (e) => {
    const input = e.target.value;
    if (input.length <= 1000) {
      setAbstract(input);
      setAbsRemainingChars(1000 - input.length);
    }
  };

  const handleStoryInput = (e) => {
    const input = e.target.value;
    if (input.length <= 1000) {
      setStory(input);
      setStoryRemainingChars(1000 - input.length);
    }
  };

  const handleInvestInput = (e) => {
    const input = e.target.value;
    if (input.length <= 1000) {
      setInvestDetails(input);
      setInvestRemainingChars(1000 - input.length);
    }
  };


  //Render Team members: minimum of 1, maximum of 3 with add+remove feature
  const [teamMembers, setTeamMembers] = useState([
    {
      firstName: "",
      lastName: "",
      roleTitle: "",
      roleDesc: "",
      linkedin: "",
    },
  ]);
  
  const handleTeamMemberChange = (index, field, value) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index][field] = value;
    setTeamMembers(newTeamMembers);
  };

  const renderTeamMemberFields = (index) => {
    return (
      <div key={index}>
        <h4 className="member">Team Member {index+1}</h4>
        <div>
        <TextField

          sx={{ borderRadius: '15px','& .MuiOutlinedInput-root': {borderRadius: '20px',
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover fieldset': {
            borderColor: 'transparent',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'transparent',
          },}, backgroundColor:"white"}}

          style={{ width: 330 }}
          multiline
          fullWidth
          id="outlined-required"
          label={`Team Member ${index + 1}: First Name`}
          defaultValue=""
          maxRows={Infinity}
          value={teamMembers[index].firstName}
          onInput={(e) => handleTeamMemberChange(index, "firstName", e.target.value)}
        />

        <TextField

          sx={{left:40, borderRadius: '15px','& .MuiOutlinedInput-root': {borderRadius: '20px',
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover fieldset': {
            borderColor: 'transparent',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'transparent',
          },}, backgroundColor:"white"}}

          style={{ width: 330 }}
          multiline
          fullWidth
          id="outlined-required"
          label={`Team Member ${index + 1}: Last Name`}
          defaultValue=""
          maxRows={Infinity}
          value={teamMembers[index].lastName}
          onInput={(e) => handleTeamMemberChange(index, "lastName", e.target.value)}
        />
        </div>

        <div>
        <TextField

          sx={{ borderRadius: '15px','& .MuiOutlinedInput-root': {borderRadius: '20px',
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover fieldset': {
            borderColor: 'transparent',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'transparent',
          },}, backgroundColor:"white"}}

          style={{ width: 330 }}
          multiline
          fullWidth
          id="outlined-required"
          label={`Team Member ${index + 1}: Role Title`}
          defaultValue=""
          maxRows={Infinity}
          value={teamMembers[index].roleTitle}
          onInput={(e) => handleTeamMemberChange(index, "roleTitle", e.target.value)}
        />

        <TextField

          sx={{left:40, borderRadius: '15px','& .MuiOutlinedInput-root': {borderRadius: '20px',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },}, backgroundColor:"white"}}

          style={{ width: 330 }}
          multiline
          fullWidth
          id="outlined-required"
          label={`Team Member ${index + 1}: Linkedin Profile Link`}
          defaultValue=""
          maxRows={Infinity}
          value={teamMembers[index].linkedin}
          onInput={(e) => handleTeamMemberChange(index, "linkedin", e.target.value)}
        />
        </div>

        <div>
        <TextField

          sx={{ borderRadius: '15px','& .MuiOutlinedInput-root': {borderRadius: '20px',
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover fieldset': {
            borderColor: 'transparent',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'transparent',
          },}, backgroundColor:"white"}}

          style={{ width: 700 }}
          multiline
          fullWidth
          rows="5"
          id="outlined-required"
          label={`Team Member ${index + 1}: Role Description`}
          defaultValue=""
          maxRows={Infinity}
          value={teamMembers[index].roleDesc}
          onInput={(e) => handleTeamMemberChange(index, "roleDesc", e.target.value)}
        />
        </div>


      </div>
    );
  };

  const addTeamMember = () => {
    if (teamMembers.length < 3) {
      setTeamMembers([
        ...teamMembers,
        {
          firstName: "",
          lastName: "",
          roleTitle: "",
          roleDesc: "",
          linkedin: "",
        },
      ]);
    }
  };
  
  const removeTeamMember = () => {
    if (teamMembers.length > 1) {
      setTeamMembers(teamMembers.slice(0, teamMembers.length - 1));
    }
  };


  const LineComp = () => {
    return <div className="LineComp" />;
  };

  
  return (
    <main className="submit-tech">
    <h1 className="title-text">
        Submit your technology
    </h1>
    <h2 className="sub-head">
        Create profiles on software projects seeking investment.    </h2>
    <LineComp/>

    <Header />
    <Container maxWidth="md" sx={{paddingTop: 5, marginLeft:"7%", paddingBottom: 5}}>
      <Box
          className='main-box'
          bgcolor="#00808010"
          borderRadius={4}
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
      >
        <form className="form-container" action="" id="pastProjectForm">
        <div>
          <TextField
            Title

            sx={{ borderRadius: '15px','& .MuiOutlinedInput-root': {borderRadius: '20px',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },}, backgroundColor:"white",
          }}

            style = {{width: 700}}
            multiline
            fullWidth
            id="outlined-required"
            label="Title"
            defaultValue="Title"
            required="required"
            maxRows={Infinity}
            value={title_input} 
            onInput = {e=>setTitle(e.target.value)}
          />
        </div>

        <div className="drop">
        <FormControl sx={{ borderRadius: '15px','& .MuiOutlinedInput-root': {borderRadius: '20px',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },}, backgroundColor:"white"}}
            required = "required">

          <InputLabel id="sector-label">Select Sector</InputLabel>
          <Select
            labelId="sector-label"
            id="sector-select"
            defaultValue=""
            style={{ width: 330 }}
            value={selectedSector}
            onChange={handleSectorChange}
          >
            {sectors.map((sectorObj, index) => (
              <MenuItem key={index} value={sectorObj.sector}>
                {sectorObj.sector}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{left:40, borderRadius: '15px','& .MuiOutlinedInput-root': {borderRadius: '20px',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },}, backgroundColor:"white"}}
            required = "required"> 

          <InputLabel id="product-label">Select Product Type</InputLabel>
          <Select
            labelId="product-label"
            id="product-select"
            defaultValue=""
            style={{ width: 330 }}
            value={selectedProduct}
            onChange={handleProductChange}
          >
            {product.map((productTypeObj, index) => (
              <MenuItem key={index} value={productTypeObj.productType}>
                {productTypeObj.productType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        </div>
        
        <div>
          <TextField
            investmentGoal

            sx={{ borderRadius: '15px','& .MuiOutlinedInput-root': {borderRadius: '20px',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },}, backgroundColor:"white"}}

            style = {{width: 330}}
            multiline
            fullWidth
            id="outlined-required"
            label="Investment Goal"
            defaultValue=""
            maxRows={Infinity}
            value={goal} 
            onInput = {e=>setGoal(e.target.value)}
          />


          <FormControl sx={{left:40, borderRadius: '15px','& .MuiOutlinedInput-root': {borderRadius: '20px',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },}, backgroundColor:"white"}}> 

          <InputLabel id="offering-label">Select Investment Offering</InputLabel>
          <Select
            labelId="offering-label"
            id="offering-select"
            defaultValue=""
            style={{ width: 330 }}
            value={selectedOffering}
            onChange={handleOfferingChange}
          >
            {offering.map((investmentOfferingObj, index) => (
              <MenuItem key={index} value={investmentOfferingObj.investmentOffering}>
                {investmentOfferingObj.investmentOffering}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </div>

        <div>
          <TextField
            Abstract
            
            sx={{ borderRadius: '15px','& .MuiOutlinedInput-root': {borderRadius: '20px',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },}, backgroundColor:"white"}}

            style = {{width: 700}}
            multiline
            fullWidth
            rows="5"
            id="outlined-required"
            label="Product Description (Abstract)"
            defaultValue="Abstract"
            required="required"
            value={abs_input} 
            onInput = {handleAbstractInput}
          />
        </div>

        <div className="char-count">
          {abs_remainingChars} characters remaining
        </div>

        <div>
          <TextField
            story

            sx={{ borderRadius: '15px','& .MuiOutlinedInput-root': {borderRadius: '20px',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },}, backgroundColor:"white"}}

            style = {{width: 700}}
            multiline
            fullWidth
            rows="5"
            id="outlined-required"
            label="Tell us your story"
            defaultValue="Story"
            required="required"
            value={story} 
            onInput = {handleStoryInput}
          />
        </div>

        <div className="char-count">
          {story_remainingChars} characters remaining
        </div>

        <div>
          <TextField
            imageLink

            sx={{ borderRadius: '15px','& .MuiOutlinedInput-root': {borderRadius: '20px',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },}, backgroundColor:"white"}}

            style = {{width: 330}}
            multiline
            id="outlined-required"
            label="Submit an image link"
            defaultValue=""
            maxRows={Infinity}
            value={image} 
            onInput = {e=>setImage(e.target.value)}
          />

          <TextField
            videoLink

            sx={{left:40 , borderRadius: '15px','& .MuiOutlinedInput-root': {borderRadius: '20px',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },}, backgroundColor:"white"}}

            style = {{width: 330}}
            multiline
            id="outlined-required"
            label="Submit a YouTube link"
            defaultValue=""
            maxRows={Infinity}
            value={video} 
            onInput = {e=>setVideo(e.target.value)}
          />
        </div>

        <div>
          <TextField
            githubLink

            sx={{ borderRadius: '15px','& .MuiOutlinedInput-root': {borderRadius: '20px',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },}, backgroundColor:"white"}}

            style = {{width: 700}}
            multiline
            fullWidth
            id="outlined-required"
            label="Github Link"
            defaultValue=""
            maxRows={Infinity}
            value={github} 
            onInput = {e=>setGithub(e.target.value)}
          />
        </div>

        <div>
          <TextField
            pitchDeck

            sx={{ borderRadius: '15px','& .MuiOutlinedInput-root': {borderRadius: '20px',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },}, backgroundColor:"white"}}

            style = {{width: 700}}
            multiline
            fullWidth
            id="outlined-required"
            label="Pitch Deck Link"
            defaultValue=""
            maxRows={Infinity}
            value={pitch} 
            onInput = {e=>setPitch(e.target.value)}
          />
        </div>

        <div>
          <TextField
            investmentDetails

            sx={{ borderRadius: '15px','& .MuiOutlinedInput-root': {borderRadius: '20px',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },}, backgroundColor:"white"}}

            style = {{width: 700}}
            multiline
            fullWidth
            rows="5"
            id="outlined-required"
            label="Investment Details"
            defaultValue="Investment Details"
            required="required"
            value={investDetails} 
            onInput = {handleInvestInput}
          />
        </div>

        <div className="char-count">
          {invest_remainingChars} characters remaining
        </div>

        {teamMembers.map((_, index) => renderTeamMemberFields(index))}

        <div>
          {teamMembers.length < 3 && (
            <Button sx={{color:"black"}} onClick={addTeamMember} startIcon={<PersonAddIcon />}>Add Team Member</Button>
          )}
          {teamMembers.length > 1 && (
            <Button sx={{color:"black", left:20}} onClick={removeTeamMember} startIcon={<PersonRemoveIcon />}>Remove Team Member</Button>
          )}
        </div>
        
      </form >

      <Button
        sx={{ width: 267 , height: 50, left:220, fontWeight:"bold"}}
        variant="contained"
        color="primary"
        type="submit"
      >
        Submit
      </Button>

      </Box>
      </Container>  

      {/*<Footer/>*/}

    </main>

  );
};


export default SubmitAvailableTechnology;
