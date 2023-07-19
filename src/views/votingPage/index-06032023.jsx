import React, { useState, useEffect, useRef } from "react";
import Topnav from "../../common/topNav";
import TopnavVoting from "../../common/topNav/votingPagetopNav";
import Footer from "../../common/footer";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Banner from "../../components/banner";
import Webcam from "react-webcam";
import axios from 'axios';
import * as faceapi from 'face-api.js';
import LivenessCheck from "./livenessCheck";
import { Grid, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ForwardIcon from '@mui/icons-material/Forward';

import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';


import bjp from "../../assets/images/bjp-logo.png";
import admk from "../../assets/images/aiadmk-logo.png";
import dmk from "../../assets/images/dmk-logo.png";


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:before': {
    display: 'none',
  },
}));



const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '17px' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',  
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const steps = ['Voter Information', 'Aadhar OTP Verification', 'Voter Details', 'Face Verification', 'Vote Selection', 'Voting Info', 'OTP Verification', 'Success'];


function VotingPage() {

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [selectedValue, setSelectedValue] = React.useState('a');
  const handleChanged = (event) => {
    setSelectedValue(event.target.value);
  };


  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [bannerConfig, setbannerConfig] = useState({ bannerType: 2 });
  //video code 
  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user"
  };
  const [picture, setPicture] = useState('')
  const webcamRef = React.useRef(null)

  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot()
    setPicture(pictureSrc)
    if (activeStep === 2) {
      handleFaceMatching(pictureSrc);
    }
  })
  //video code ends


  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log(activeStep);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleFaceMatching = (capturedImage) => {
    axios.get('https://api.example.com/data')
      .then(response => {
        // handle the response data
        console.log(response.data);
        console.log("capturedImage:", capturedImage);
      })
      .catch(error => {
        // handle the error
        console.error(error);
      });
  };


  return (
    <>
      <TopnavVoting></TopnavVoting>
      {/* <Banner config={bannerConfig}></Banner> */}

      <section className="voting-section">
        <div className="container">
          <div className="row">
            {/* <h1>Voting</h1> */}
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  // if (isStepOptional(index)) {
                  //   labelProps.optional = (
                  //     <Typography variant="caption">Optional</Typography>
                  //   );
                  // }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>

              {/* ====== step 0 starts  ====== */}
              {activeStep === 0 ? (
                <>
                  <div className="stepper-content">
                    <Typography variant="h6" mb={3} sx={{ color: "#333", }}>
                      Voter Information
                    </Typography>
                    <form>
                      <Box mb={3.5}>
                        <Grid container spacing={3}>
                          <Grid item sm={6} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="name"
                              label="Enter Voter Name"
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="voter id"
                              label="Enter Voter ID number"
                            />
                          </Grid>

                          <Grid item sm={6} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="aadhaar number"
                              label="Enter Aadhaar Number"
                            />
                          </Grid>

                          <Grid item sm={6} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="phone"
                              label="Enter Mobile Number (linked with Aadhaar)"
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <TextField
                              fullWidth
                              name="state"
                              label="Enter Address same as Voter ID"
                              multiline
                              rows={3}
                              maxRows={10}
                            />
                          </Grid>

                          <Grid item sm={6} xs={12}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Constituency</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Constituency"
                              >
                                <MenuItem value={10}>Coimbatore North</MenuItem>
                                <MenuItem value={20}>Coimbatore South</MenuItem>
                                <MenuItem value={30}>Erode</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Box>


                      <Box mb={3.5} pt={1} className="upload-div">
                        <Grid container spacing={3}>
                          <Grid item sm={6} xs={12}>
                            <div className="control-div">
                              <p>Upload Voter Id Front </p>
                              <Button
                                variant="contained"
                                component="label"
                              >
                                Upload File
                                <input
                                  type="file"
                                  hidden
                                />
                              </Button>
                            </div>

                            <div className="control-div">
                              <p>Upload Voter Id Back </p>
                              <Button
                                variant="contained"
                                component="label"
                              >
                                Upload File
                                <input
                                  type="file"
                                  hidden
                                />
                              </Button>
                            </div>

                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <div className="control-div">
                              <p>Upload Aadhaar Front </p>
                              <Button
                                variant="contained"
                                component="label"
                              >
                                Upload File
                                <input
                                  type="file"
                                  hidden
                                />
                              </Button>
                            </div>

                            <div className="control-div">
                              <p>Upload Aadhaar Back </p>
                              <Button
                                variant="contained"
                                component="label"
                              >
                                Upload File
                                <input
                                  type="file"
                                  hidden
                                />
                              </Button>
                            </div>

                          </Grid>

                        </Grid>
                      </Box>

                      {/* <Box>
                        <Button color="primary" variant="contained" type="submit">
                          Save
                        </Button>
                      </Box> */}
                    </form>
                  </div>

                </>
              ) : ""}

              {/* ====== step 0 ends  ====== */}

              {/* ====== step 1 starts  ====== */}
              {activeStep === 1 ? (
                <>
                  <div className="stepper-content">
                    <Typography variant="h6" mb={3} sx={{ color: "#333", }}>
                      Aadhar OTP Validation
                    </Typography>
                    <form>
                      <Box mb={3.5} className="otp-box">
                        <Grid container spacing={3} sx={{ justifyContent: "center", }}>
                          <Grid item sm={1} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="name"
                              label=""
                            />
                          </Grid>
                          <Grid item sm={1} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="name"
                              label=""
                            />
                          </Grid>
                          <Grid item sm={1} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="name"
                              label=""
                            />
                          </Grid>
                          <Grid item sm={1} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="name"
                              label=""
                            />
                          </Grid>
                          <Grid item sm={1} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="name"
                              label=""
                            />
                          </Grid>
                          <Grid item sm={1} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="name"
                              label=""
                            />
                          </Grid>

                        </Grid>
                      </Box>
                      <Box mb={3.5} sx={{ display: "flex", justifyContent: "center", }}>
                        <a href="javascript:void(0);">Re-Generate OTP</a>
                      </Box>

                      {/* <Box>
                        <Button color="primary" variant="contained" type="submit">
                          Save
                        </Button>
                      </Box> */}
                    </form>
                  </div>
                </>
              ) : ""}
              {/* ====== step 1 ends  ====== */}

              {/* ====== step 2 starts  ====== */}

              {activeStep === 2 ? (
                <>
                  <div className="stepper-content">
                    <Typography variant="h6" mb={3} sx={{ color: "#333", }}>
                      Voter Details
                    </Typography>

                    <Box mb={5} className="voter-detail-box">
                      <Grid container spacing={3}>
                        <Grid item sm={6} xs={12}>
                          <div className="detail-div">
                            <div className="match-placeholder">
                              <Alert severity="success">
                                Matched
                              </Alert>
                            </div>
                            <div className="label">Voter Number :</div> <div className="value">ATS012393</div>
                          </div>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <div className="detail-div">
                            <div className="match-placeholder">
                              <Alert severity="success">
                                Matched
                              </Alert>
                            </div>
                            <div className="label">Aadhaar Number :</div> <div className="value">989 456 998 345</div>
                          </div>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <div className="detail-div">
                            <div className="label">Full Name :</div> <div className="value">Santhosh </div>
                          </div>
                        </Grid>                        
                        <Grid item sm={6} xs={12}>
                          <div className="detail-div">
                            <div className="label">Mobile :</div> <div className="value">9894 xxx xxx </div>
                          </div>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <div className="detail-div">
                            <div className="label">Address :</div> <div className="value">Sample, Coimbatore, Tamilnadu </div>
                          </div>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <div className="detail-div">
                            <div className="label">Constituency :</div> <div className="value">Coimbatore North </div>
                          </div>
                        </Grid>

                      </Grid>
                    </Box>

                    <Box mb={3.5} sx={{ display: "flex", justifyContent: "center", }}>
                      <div className="detail-div-checkbox">
                        Voting Eligibility with Sections
                        <div className="checkbox-div">
                          <FormControlLabel control={<Checkbox defaultChecked />} label="Center" />
                          <FormControlLabel control={<Checkbox />} label="State" />
                          <FormControlLabel control={<Checkbox />} label="Municipal" />
                          <FormControlLabel control={<Checkbox />} label="Panchayat" />
                        </div>
                      </div>
                    </Box>

                    <div >

                    </div>
                  </div>
                </>
              ) : ""}
              {/* ====== step 2 ends  ====== */}

              {/* ====== step 3 starts  ====== */}
              {activeStep === 3 ? (
                <>
                  <div className="stepper-content">
                    <Typography variant="h6" mb={3} sx={{ color: "#333", }}>
                      Face Verification
                    </Typography>
                    <Box mb={5} className="face-detail-box">
                      <Grid container spacing={5}>
                        <Grid item sm={3} xs={12}>
                          <div className="disclaimer-div">
                            <h6>Disclaimer</h6>
                            <p>This is to inform that For Liveness check Hold and smile
                              pose while capture</p>
                          </div>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <div className="video-content">
                            <div className="video-div">
                              <div className="webcam-out">
                                <div className="webcam-name">
                                  Capature in Webcam
                                </div>
                                <div className="webcam-image">
                                  <i className="ion-person"></i>
                                </div>
                              </div>
                            </div>
                            <div className="video-btn">
                              <button className="btn-org">
                                Capture
                              </button>
                              <button className="btn-black">
                                Retake
                              </button>
                            </div>
                            <div className="video-btn video-btn-btm">
                              <Button variant="contained" color="success">
                                Process Match
                              </Button>
                            </div>
                          </div>
                        </Grid>
                        <Grid item sm={3} xs={12}>
                          <div className="status-div mb-30">
                            <p>Face Match Status</p>
                            <Button variant="contained" color="success">
                              Success
                            </Button>
                          </div>
                          <div className="status-div">
                            <p>Liveness Status</p>
                            <Button variant="contained" color="error">
                              Fail
                            </Button>
                          </div>
                        </Grid>

                      </Grid>
                    </Box>
                  </div>
                </>
              ) : ""}
              {/* ====== step 3 ends  ====== */}


              {/* video code */}
              {/* {activeStep === 3 ? (
            <>
                <div>
                    {(picture == '') ? (
                    <Webcam
                        audio={false}
                        height={400}
                        ref={webcamRef}
                        width={400}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                    ) : (
                    <img src={picture} />
                    )}
                </div>
                <div>
                    {(picture != '') ? (
                    <button
                        onClick={(e) => {
                        e.preventDefault()
                        setPicture('')
                        }}
                        className="btn btn-primary"
                    >
                        Retake
                    </button>
                    ) : (
                    <button
                        onClick={(e) => {
                        e.preventDefault()
                        capture()
                        }}
                        className="btn btn-danger"
                    >
                        Capture
                    </button>
                    )}
                </div>
                </>
         ):""} */}
              {/* video code ends */}

              {/* {activeStep===3?(
        <LivenessCheck></LivenessCheck>
      ):""} */}
              {/* video code ends */}

              {/* ====== step 4 starts  ====== */}

              {activeStep === 4 ? (
                <>
                  <div className="stepper-content">
                    <Typography variant="h6" mb={3} sx={{ color: "#333", }}>
                      Voting Selection
                    </Typography>

                    {/* Accordian starts */}
                    <div className="acc-div">
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} defaultExpanded={true}>
                          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography sx={{ fontSize: '18px', color: "#333", fontWeight: "600" }}>Center</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor: "rgb(255, 244, 229)", color: "rgb(237, 108, 2)" }}>1</Avatar>
                                </ListItemAvatar>

                                <ListItemText>
                                <Typography sx={{ fontSize: '20px', color: "#333", fontWeight: "600" }}>Mr. Shankar Rao</Typography>
                                </ListItemText>
                                <ListItemAvatar sx={{ width: "100px", }}>
                                    <Avatar sx={{ width: "60px", height: "60px" }} alt="BJP" src={bjp} />
                                </ListItemAvatar>
                                <ListItemAvatar >
                                  <ForwardIcon sx={{ color: "#0079d6", fontSize: "40px" }}></ForwardIcon>
                                </ListItemAvatar>
                                <ListItemAvatar>
                                  <Radio sx={{'& .MuiSvgIcon-root': {fontSize: 36, }, }}
                                    checked={selectedValue === 'a'}
                                    onChange={handleChanged}
                                    value="a"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                  />
                                </ListItemAvatar>

                              </ListItem>
                              <Divider variant="inset" component="li" />

                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor: "rgb(255, 244, 229)", color: "rgb(237, 108, 2)" }}>2</Avatar>
                                </ListItemAvatar>

                                <ListItemText>
                                <Typography sx={{ fontSize: '20px', color: "#333", fontWeight: "600" }}>Mr. Willson</Typography>
                                </ListItemText>
                                <ListItemAvatar sx={{ width: "100px", }}>
                                    <Avatar sx={{ width: "60px", height: "60px" }} alt="DMK" src={dmk} />
                                </ListItemAvatar>
                                <ListItemAvatar>
                                <ForwardIcon sx={{ color: "#0079d6", fontSize: "40px" }}></ForwardIcon>
                                </ListItemAvatar>
                                <ListItemAvatar>
                                <Radio sx={{'& .MuiSvgIcon-root': {fontSize: 36, }, }}
                                    onChange={handleChanged}
                                    value="a"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                  />
                                </ListItemAvatar>

                              </ListItem>
                              <Divider variant="inset" component="li" />

                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor: "rgb(255, 244, 229)", color: "rgb(237, 108, 2)" }}>3</Avatar>
                                </ListItemAvatar>

                                <ListItemText>
                                <Typography sx={{ fontSize: '20px', color: "#333", fontWeight: "600" }}>Mrs. Vanaja</Typography>
                                </ListItemText>
                                <ListItemAvatar sx={{ width: "100px", }}>
                                    <Avatar sx={{ width: "60px", height: "60px" }} alt="AIDMK" src={admk} />
                                </ListItemAvatar>
                                <ListItemAvatar>
                                <ForwardIcon sx={{ color: "#0079d6", fontSize: "40px" }}></ForwardIcon>
                                </ListItemAvatar>
                                <ListItemAvatar>
                                  <Radio sx={{'& .MuiSvgIcon-root': {fontSize: 36, }, }}
                                    onChange={handleChanged}
                                    value="a"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                  />
                                </ListItemAvatar>

                              </ListItem>
                            </List>
                          </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                            <Typography sx={{ fontSize: '18px', color: "#333", fontWeight: "600" }}>State</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor: "rgb(255, 244, 229)", color: "rgb(237, 108, 2)" }}>1</Avatar>
                                </ListItemAvatar>

                                <ListItemText>
                                <Typography sx={{ fontSize: '20px', color: "#333", fontWeight: "600" }}>Mr. Shankar Rao</Typography>
                                </ListItemText>
                                <ListItemAvatar sx={{ width: "100px", }}>
                                    <Avatar sx={{ width: "60px", height: "60px" }} alt="BJP" src={bjp} />
                                </ListItemAvatar>
                                <ListItemAvatar >
                                  <ForwardIcon sx={{ color: "#0079d6", fontSize: "40px" }}></ForwardIcon>
                                </ListItemAvatar>
                                <ListItemAvatar>
                                  <Radio sx={{'& .MuiSvgIcon-root': {fontSize: 36, }, }}
                                    checked={selectedValue === 'a'}
                                    onChange={handleChanged}
                                    value="a"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                  />
                                </ListItemAvatar>

                              </ListItem>
                              <Divider variant="inset" component="li" />

                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor: "rgb(255, 244, 229)", color: "rgb(237, 108, 2)" }}>2</Avatar>
                                </ListItemAvatar>

                                <ListItemText>
                                <Typography sx={{ fontSize: '20px', color: "#333", fontWeight: "600" }}>Mr. Willson</Typography>
                                </ListItemText>
                                <ListItemAvatar sx={{ width: "100px", }}>
                                    <Avatar sx={{ width: "60px", height: "60px" }} alt="DMK" src={dmk} />
                                </ListItemAvatar>
                                <ListItemAvatar>
                                <ForwardIcon sx={{ color: "#0079d6", fontSize: "40px" }}></ForwardIcon>
                                </ListItemAvatar>
                                <ListItemAvatar>
                                <Radio sx={{'& .MuiSvgIcon-root': {fontSize: 36, }, }}
                                    onChange={handleChanged}
                                    value="a"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                  />
                                </ListItemAvatar>

                              </ListItem>
                              <Divider variant="inset" component="li" />

                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor: "rgb(255, 244, 229)", color: "rgb(237, 108, 2)" }}>3</Avatar>
                                </ListItemAvatar>

                                <ListItemText>
                                <Typography sx={{ fontSize: '20px', color: "#333", fontWeight: "600" }}>Mrs. Vanaja</Typography>
                                </ListItemText>
                                <ListItemAvatar sx={{ width: "100px", }}>
                                    <Avatar sx={{ width: "60px", height: "60px" }} alt="AIDMK" src={admk} />
                                </ListItemAvatar>
                                <ListItemAvatar>
                                <ForwardIcon sx={{ color: "#0079d6", fontSize: "40px" }}></ForwardIcon>
                                </ListItemAvatar>
                                <ListItemAvatar>
                                  <Radio sx={{'& .MuiSvgIcon-root': {fontSize: 36, }, }}
                                    onChange={handleChanged}
                                    value="a"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                  />
                                </ListItemAvatar>

                              </ListItem>
                            </List>
                          </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography sx={{ fontSize: '18px', color: "#333", fontWeight: "600" }}>Municipality</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor: "rgb(255, 244, 229)", color: "rgb(237, 108, 2)" }}>1</Avatar>
                                </ListItemAvatar>

                                <ListItemText>
                                <Typography sx={{ fontSize: '20px', color: "#333", fontWeight: "600" }}>Mr. Shankar Rao</Typography>
                                </ListItemText>
                                <ListItemAvatar sx={{ width: "100px", }}>
                                    <Avatar sx={{ width: "60px", height: "60px" }} alt="BJP" src={bjp} />
                                </ListItemAvatar>
                                <ListItemAvatar >
                                  <ForwardIcon sx={{ color: "#0079d6", fontSize: "40px" }}></ForwardIcon>
                                </ListItemAvatar>
                                <ListItemAvatar>
                                  <Radio sx={{'& .MuiSvgIcon-root': {fontSize: 36, }, }}
                                    checked={selectedValue === 'a'}
                                    onChange={handleChanged}
                                    value="a"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                  />
                                </ListItemAvatar>

                              </ListItem>
                              <Divider variant="inset" component="li" />

                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor: "rgb(255, 244, 229)", color: "rgb(237, 108, 2)" }}>2</Avatar>
                                </ListItemAvatar>

                                <ListItemText>
                                <Typography sx={{ fontSize: '20px', color: "#333", fontWeight: "600" }}>Mr. Willson</Typography>
                                </ListItemText>
                                <ListItemAvatar sx={{ width: "100px", }}>
                                    <Avatar sx={{ width: "60px", height: "60px" }} alt="DMK" src={dmk} />
                                </ListItemAvatar>
                                <ListItemAvatar>
                                <ForwardIcon sx={{ color: "#0079d6", fontSize: "40px" }}></ForwardIcon>
                                </ListItemAvatar>
                                <ListItemAvatar>
                                <Radio sx={{'& .MuiSvgIcon-root': {fontSize: 36, }, }}
                                    onChange={handleChanged}
                                    value="a"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                  />
                                </ListItemAvatar>

                              </ListItem>
                              <Divider variant="inset" component="li" />

                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor: "rgb(255, 244, 229)", color: "rgb(237, 108, 2)" }}>3</Avatar>
                                </ListItemAvatar>

                                <ListItemText>
                                <Typography sx={{ fontSize: '20px', color: "#333", fontWeight: "600" }}>Mrs. Vanaja</Typography>
                                </ListItemText>
                                <ListItemAvatar sx={{ width: "100px", }}>
                                    <Avatar sx={{ width: "60px", height: "60px" }} alt="AIDMK" src={admk} />
                                </ListItemAvatar>
                                <ListItemAvatar>
                                <ForwardIcon sx={{ color: "#0079d6", fontSize: "40px" }}></ForwardIcon>
                                </ListItemAvatar>
                                <ListItemAvatar>
                                  <Radio sx={{'& .MuiSvgIcon-root': {fontSize: 36, }, }}
                                    onChange={handleChanged}
                                    value="a"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                  />
                                </ListItemAvatar>

                              </ListItem>
                            </List>
                          </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                          <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                            <Typography sx={{ fontSize: '18px', color: "#333", fontWeight: "600" }}>Panchayat</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor: "rgb(255, 244, 229)", color: "rgb(237, 108, 2)" }}>1</Avatar>
                                </ListItemAvatar>

                                <ListItemText>
                                <Typography sx={{ fontSize: '18px', color: "#333", fontWeight: "600" }}>Mr. Shankar Rao</Typography>
                                </ListItemText>
                                <ListItemAvatar sx={{ width: "100px", }}>
                                    <Avatar sx={{ width: "60px", height: "60px" }} alt="BJP" src={bjp} />
                                </ListItemAvatar>
                                <ListItemAvatar >
                                  <ForwardIcon sx={{ color: "#0079d6", fontSize: "40px" }}></ForwardIcon>
                                </ListItemAvatar>
                                <ListItemAvatar>
                                  <Radio sx={{'& .MuiSvgIcon-root': {fontSize: 36, }, }}
                                    checked={selectedValue === 'a'}
                                    onChange={handleChanged}
                                    value="a"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                  />
                                </ListItemAvatar>

                              </ListItem>
                              <Divider variant="inset" component="li" />

                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor: "rgb(255, 244, 229)", color: "rgb(237, 108, 2)" }}>2</Avatar>
                                </ListItemAvatar>

                                <ListItemText>
                                <Typography sx={{ fontSize: '18px', color: "#333", fontWeight: "600" }}>Mr. Willson</Typography>
                                </ListItemText>
                                <ListItemAvatar sx={{ width: "100px", }}>
                                    <Avatar sx={{ width: "60px", height: "60px" }} alt="DMK" src={dmk} />
                                </ListItemAvatar>
                                <ListItemAvatar>
                                <ForwardIcon sx={{ color: "#0079d6", fontSize: "40px" }}></ForwardIcon>
                                </ListItemAvatar>
                                <ListItemAvatar>
                                <Radio sx={{'& .MuiSvgIcon-root': {fontSize: 36, }, }}
                                    onChange={handleChanged}
                                    value="a"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                  />
                                </ListItemAvatar>

                              </ListItem>
                              <Divider variant="inset" component="li" />

                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor: "rgb(255, 244, 229)", color: "rgb(237, 108, 2)" }}>3</Avatar>
                                </ListItemAvatar>

                                <ListItemText>
                                <Typography sx={{ fontSize: '18px', color: "#333", fontWeight: "600" }}>Mrs. Vanaja</Typography>
                                </ListItemText>
                                <ListItemAvatar sx={{ width: "100px", }}>
                                    <Avatar sx={{ width: "60px", height: "60px" }} alt="AIDMK" src={admk} />
                                </ListItemAvatar>
                                <ListItemAvatar>
                                <ForwardIcon sx={{ color: "#0079d6", fontSize: "40px" }}></ForwardIcon>
                                </ListItemAvatar>
                                <ListItemAvatar>
                                  <Radio sx={{'& .MuiSvgIcon-root': {fontSize: 36, }, }}
                                    onChange={handleChanged}
                                    value="a"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                  />
                                </ListItemAvatar>

                              </ListItem>
                            </List>
                          </AccordionDetails>
                        </Accordion>
                    </div>

                    {/* Accordian ends */}

                  </div>
                </>
              ) : ""}
              {/* ====== step 4 ends  ====== */}
              {/* ====== step 5 starts  ====== */}
              {activeStep === 5 ? (
                <>
                  <div className="stepper-content">
                    <Typography variant="h6" mb={3} sx={{ color: "#333", }}>
                      Voter Details
                    </Typography>
                    <Box mb={5} className="voter-detail-box1">
                      <Grid container spacing={3}>

                        <Grid item sm={6} xs={12}>
                          <Grid container spacing={2}>
                            <Grid item sm={12} xs={12}>
                              <div className="detail-div">
                                <div className="label">Voter Number :</div> <div className="value">ATS012393</div>
                              </div>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <div className="detail-div">
                                <div className="label">Aadhaar Number :</div> <div className="value">989 456 998 345</div>
                              </div>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <div className="detail-div">
                                <div className="label">Full Name :</div> <div className="value">Santhosh </div>
                              </div>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <div className="detail-div">
                                <div className="label">Mobile :</div> <div className="value">9894 xxx xxx </div>
                              </div>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <div className="detail-div">
                                <div className="label">Address :</div> <div className="value">Sample, Coimbatore, Tamilnadu </div>
                              </div>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <div className="detail-div">
                                <div className="label">Constituency :</div> <div className="value">Coimbatore North </div>
                              </div>
                            </Grid>

                          </Grid>

                        </Grid>
                        <Grid item sm={6} xs={12}>

                          <Grid container spacing={2}>
                            <Grid item sm={12} xs={12}>
                              <div className="candidate-div">
                                <div className="candidate-name">
                                  <div className="candi-out">
                                    <div className="cand-name">
                                      Candidate 1
                                    </div>
                                    <div className="cand-image">
                                      <i className="ion-person"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="candidate-detail">
                                  <ul>
                                    <li>
                                      <p>Name of Candidate</p>
                                    </li>
                                    <li>
                                      <p>Constitution</p>
                                    </li>
                                    <li>
                                      <p>Party Name</p>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <div className="candidate-div">
                                <div className="candidate-name">
                                  <div className="candi-out">
                                    <div className="cand-name">
                                      Candidate 1
                                    </div>
                                    <div className="cand-image">
                                      <i className="ion-person"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="candidate-detail">
                                  <ul>
                                    <li>
                                      <p>Name of Candidate</p>
                                    </li>
                                    <li>
                                      <p>Constitution</p>
                                    </li>
                                    <li>
                                      <p>Party Name</p>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <div className="candidate-div">
                                <div className="candidate-name">
                                  <div className="candi-out">
                                    <div className="cand-name">
                                      Candidate 1
                                    </div>
                                    <div className="cand-image">
                                      <i className="ion-person"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="candidate-detail">
                                  <ul>
                                    <li>
                                      <p>Name of Candidate</p>
                                    </li>
                                    <li>
                                      <p>Constitution</p>
                                    </li>
                                    <li>
                                      <p>Party Name</p>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </Grid>

                          </Grid>

                        </Grid>


                      </Grid>
                    </Box>
                  </div>
                </>
              ) : ""}
              {/* ====== step 5 ends  ====== */}

              {/* ====== step 6 starts  ====== */}
              {activeStep === 6 ? (
                <>
                  <div className="stepper-content">
                    <Typography variant="h6" mb={3} sx={{ color: "#333", }}>
                      OTP Verification
                    </Typography>
                    <form>
                      <Box mb={3.5} className="otp-box">
                        <Grid container spacing={3} sx={{ justifyContent: "center", }}>
                          <Grid item sm={1} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="name"
                              label="" 
                            />
                          </Grid>
                          <Grid item sm={1} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="name"
                              label=""
                            />
                          </Grid>
                          <Grid item sm={1} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="name"
                              label=""
                            />
                          </Grid>
                          <Grid item sm={1} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="name"
                              label=""
                            />
                          </Grid>
                          <Grid item sm={1} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="name"
                              label=""
                            />
                          </Grid>
                          <Grid item sm={1} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="name"
                              label=""
                            />
                          </Grid>

                        </Grid>
                      </Box>
                      <Box mb={3.5} sx={{ display: "flex", justifyContent: "center", }}>
                        <a href="javascript:void(0);">Re-Generate OTP</a>
                      </Box>

                      {/* <Box>
                        <Button color="primary" variant="contained" type="submit">
                          Save
                        </Button>
                      </Box> */}
                    </form>
                  </div>
                </>
              ) : ""}
              {/* ====== step 6 ends  ====== */}

              {/* ====== step 7 starts  ====== */}
              {activeStep === 7 ? (
                <>
                  <div className="stepper-content">
                    <Typography sx={{ minHeight: "340px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", }}>
                      <Alert severity="success" sx={{ fontSize: "20px", }}>You have successfully Completed your Voting</Alert>
                    </Typography>
                  </div>
                </>
              ) : ""}
              {/* ====== step 7 ends  ====== */}

              {activeStep === steps.length ? (
                <React.Fragment>
                  <div className="stepper-content">
                  <Typography sx={{ minHeight: "340px", textAlign: "center",
                   display: "flex", alignItems: "center", justifyContent: "center", }}>

                    <Alert severity="success" sx={{ fontSize: "20px", }}>All steps completed - you're finished</Alert>

                  </Typography>
                  </div>
                  <Box sx={{ display: 'flex', flexDirection: 'row', padding: '10px 10px', background: "#f5f5f5" }}>
                    <Box sx={{ flex: '1 1 auto', }} />
                    <Button className="btn-black" onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                  <Box sx={{ display: 'flex', flexDirection: 'row', padding: '10px 10px', background: "#f5f5f5" }}>
                    <Button className="btn-black"
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                      <Button className="btn-black" color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        Skip
                      </Button>
                    )}

                    <Button className="btn-org" onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
}

export default VotingPage;