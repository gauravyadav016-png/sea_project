import React, { useState, useEffect,useRef } from "react";
import Topnav from "../../common/topNav";
import Footer from "../../common/footer";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Banner from "../../components/banner";
import Webcam from "react-webcam";
import { Grid, TextField } from "@mui/material";

const steps = ['Voter Information', 'Aadhar OTP Verification', 'Voter Details','Face Verification','Vote Selection','Voting Info','OTP Verification','Success'];


function VotingPage() {

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [bannerConfig, setbannerConfig] = useState({bannerType:2});
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
      if(activeStep===2){
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

    const handleFaceMatching =(capturedImage)=>{
      axios.get('https://api.example.com/data')
      .then(response => {
        // handle the response data
        console.log(response.data);
        console.log("capturedImage:",capturedImage);
      })
      .catch(error => {
        // handle the error
        console.error(error);
      });
    };




    return (
        <>
         <Topnav></Topnav> 
         <Banner config={bannerConfig}></Banner>
        <section className="voting-section">
          <div className="container">
              <div className="row">
              <h1>Voting</h1>
                    <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                      const stepProps = {};
                      const labelProps = {};
                      if (isStepOptional(index)) {
                        labelProps.optional = (
                          <Typography variant="caption">Optional</Typography>
                        );
                      }
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

                  {activeStep === 0?(
                    <>
                    <div className="stepper-content">
                    <Typography variant="h6" mb={3} sx={{ color: "#333", }}>
                        Login Details
                     </Typography>
          <form>
            <Box mb={3.5}>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="name"
                    label="Enter Name as on Voter ID"                    
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
                    label="Enter Mobile Number linked to Aadhaar"                   
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="state"
                    label="Enter Address same as Voter ID"                    
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="Consituency"
                    label="Enter Consituency"
                    type="text"                    
                  />
                </Grid>               
              </Grid>
            </Box>
            <Box>
              <Button color="primary" variant="contained" type="submit">
                Save
              </Button>
            </Box>
          </form>
                    </div>
                    
                    </>
                  ):""}

                {activeStep === 1?(
                    <>
                  <div className="stepper-content">
                      step2 data
                    </div>
                    </>
                  ):""}

                  {/* video code */}
                  {activeStep === 2 ? (
                        <>
                        <div className="stepper-content">
                            <div className="video-div">
                                {(picture == '') ? (
                                <Webcam
                                    audio={false}
                                    height={400}
                                    ref={webcamRef}
                                    width={700}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                />
                                ) : (
                                <img src={picture} />
                                )}
                            </div>
                            <div className="video-btn">
                                {(picture != '') ? (
                                <button
                                    onClick={(e) => {
                                    e.preventDefault()
                                    setPicture('')
                                    }}
                                    className="btn-black"
                                >
                                    Retake
                                </button>
                                ) : (
                                <button
                                    onClick={(e) => {
                                    e.preventDefault()
                                    capture()
                                    }}
                                    className="btn-org"
                                >
                                    Capture
                                </button>
                                )}
                            </div>
                            </div>

                            </>
                    ):""}
                    {/* video code ends */}


                  {activeStep === steps.length ? (
                    <React.Fragment>
                      <Typography sx={{ padding: "20px 25px", border: "1px solid #e7e7e7;" }}>
                        All steps completed - you&apos;re finished
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', padding: '10px 10px', background: "#f5f5f5" }}>
                        <Box sx={{ flex: '1 1 auto', }} />
                        <Button className="btn-black" onClick={handleReset}>Reset</Button>
                      </Box>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                      <Box sx={{ display: 'flex', flexDirection: 'row', padding: '10px 10px', background: "#f5f5f5"}}>
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