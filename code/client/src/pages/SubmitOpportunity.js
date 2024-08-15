import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import {TextField, Select, MenuItem, InputLabel, FormControl} from '@mui/material';
import Container from '@mui/material/Container';
import Header from "../components/Header";
//import Footer from "../components/Footer";
import { Button } from "@mui/material";
import axios from "../axios.js";
import { useNavigate } from "react-router-dom";
import "./SubmitOpportunity.css"


const SubmitOpportunity = () => {
  
  const [title_input, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [req, setReq] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState('')
  const [start, setStart] = useState('')
  const [duration, setDuration] = useState('')
  const [salary, setSalary] = useState('')
  const [apply, setApply] = useState('')
  
  //sectors dropdown
  const [sectors, setSectors] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");

  //opportunityType dropdown
  const [type, setType] = useState([])  
  const [selectedType, setSelectedType] = useState("")

  //remaining characters variables
  const [desc_remainingChars, setDescRemainingChars] = useState(1000);
  const [req_remainingChars, setReqRemainingChars] = useState(1000);


  //navigate back to home page on submit
  const navigate = useNavigate();




  //get sectors for dropdown
  useEffect(() => {
    axios
      .get(`/form-options/sectors`)
      .then((response) => {
        if (response.data.auth === false) {
          // if jwt has expired
          navigate('/expired');
        }
        setSectors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
  };

  //get opportunityType for dropdown
  useEffect(() => {
    axios
      .get(`/form-options/opportunity-types`)
      .then((response) => {
        if (response.data.auth === false) {
          // if jwt has expired
          navigate('/expired');
        }
        setType(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    

    // Form Validation

    if (start < apply) {
        alert('Start date must be after the Apply by date.');
        return;
    }

    if (!selectedSector || !selectedType) {
        alert('Please fill in all required fields marked with an asterisk (*).');
        return;
    }

    if (!start || !apply) {
        alert('Please fill in all required fields marked with an asterisk (*).');
        return;
    }

    if (!title_input || !desc) {
        alert('Please fill in all required fields marked with an asterisk (*).');
        return;
    }

    // Format dates as yyyy-mm-dd

    const startDateFormatted = new Date(start).toISOString().slice(0, 10);
    const applyByFormatted = new Date(apply).toISOString().slice(0, 10);

    axios
      .post(`/project-connect/submit-form`, 
       {
        
        title: title_input,
        sector: selectedSector,
        opportunityType: selectedType,
        roleDescription: desc,
        roleRequirements: req,
        contactemail: email,
        startDate: startDateFormatted, 
        imageLink: image,  
        roleDuration: duration,
        roleSalary: salary,
        applyBy: applyByFormatted, 
      })
      .then(function (response) {
        console.log(`response: ${response}`);
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
  const handleDescInput = (e) => {
    const input = e.target.value;
    if (input.length <= 1000) {
      setDesc(input);
      setDescRemainingChars(1000 - input.length);
    }
  };

  const handleReqInput = (e) => {
    const input = e.target.value;
    if (input.length <= 1000) {
      setReq(input);
      setReqRemainingChars(1000 - input.length);
    }
  };


  const LineComp = () => {
    return <div className="LineComp" />;
  };

  //Get todays date to limit the calendar input to future dates only

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  return (
    <main className="submit-tech">
    <h1 className="title-text">
        Submit a UCL ProjectConnect
        <br></br>
        Opportunity
        
    </h1>
    <h2 className="sub-head">
        Seeking other students to get involved with your software project? Fill out the form to submit your opportunity.
    </h2>
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
            label="Opportunity Title"
            defaultValue="Opportunity Title"
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

          <InputLabel id="product-label">Select Opportunity Type</InputLabel>
          <Select
            labelId="product-label"
            id="product-select"
            defaultValue=""
            style={{ width: 330 }}
            value={selectedType}
            onChange={handleTypeChange}
          >
            {type.map((opportunityTypeObj, index) => (
              <MenuItem key={index} value={opportunityTypeObj.opportunityType}>
                {opportunityTypeObj.opportunityType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        </div>


        <div>
          <TextField
            roleDescription
            
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
            label="Role Description"
            defaultValue="Role Description"
            required="required"
            value={desc} 
            onInput = {handleDescInput}
          />
        </div>

        <div className="char-count">
          {desc_remainingChars} characters remaining
        </div>

        <div>
          <TextField
            roleRequirements

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
            label="Role Requirements"
            defaultValue="Role Requirements"
            required="required"
            value={req} 
            onInput = {handleReqInput}
          />
        </div>

        <div className="char-count">
          {req_remainingChars} characters remaining
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

            style = {{width: 700}}
            multiline
            id="outlined-required"
            label="Submit an image link"
            defaultValue=""
            maxRows={Infinity}
            value={image} 
            onInput = {e=>setImage(e.target.value)}
          />
          </div>

        <div>
          <TextField
            startDate

            type="date"
            InputProps={{inputProps: { min: getTodayDate()} }}
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
            
            id="outlined-required"
            required = "required"
            label="Start Date"
            defaultValue=""
            maxRows={1}
            value={start} 
            InputLabelProps={{
                shrink: true,
              }}
            onInput = {e=>setStart(e.target.value)}
          />

          <TextField
            roleDuration

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
            label="Duration"
            defaultValue=""
            maxRows={Infinity}
            value={duration} 
            onInput = {e=>setDuration(e.target.value)}
          />
        </div>

        <div>
          <TextField
            roleSalary

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
            label="Salary (£)"
            defaultValue=""
            maxRows={Infinity}
            value={salary} 
            onInput = {e=>setSalary(e.target.value)}
          />

          <TextField
            applyBy

            type="date"
            InputProps={{inputProps: { min: getTodayDate()} }}
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
     
            id="outlined-required"
            required = "required"
            label="Apply By"
            defaultValue=""
            maxRows={1}
            value={apply}
            InputLabelProps={{
                shrink: true,
              }}
            onInput = {e=>setApply(e.target.value)}
          />
        </div>

        <div>
          <TextField
            contactEmail

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
            label="Contact Email"
            defaultValue=""
            required = "required"
            maxRows={Infinity}
            value={email} 
            onInput = {e=>setEmail(e.target.value)}
          />
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


export default SubmitOpportunity;
