import React, { useState, useEffect, useRef } from "react";
import Topnav from "../../common/topNav";
import TopnavVoting from "../../common/topNav/votingPagetopNav";
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Footer from "../../common/footer";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { FormHelperText } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Banner from "../../components/banner";
import Webcam from "react-webcam";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PersonIcon from '@mui/icons-material/Person';

import bjp from "../../assets/images/bjp-logo.png";
import admk from "../../assets/images/aiadmk-logo.png";
import dmk from "../../assets/images/dmk-logo.png";
import avatar from "../../assets/images/avatar.jpg";

import VolumeDownIcon from '@mui/icons-material/VolumeDown';
// ------------- Snack Bar ---------------
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { async } from "q";

// ------------- Snack Bar ---------------
let FormData = require('form-data');


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
  
  const [mySet, setMySet] = useState(new Set());

  function handleInsert() {
    const newObject = { id: 1, name: 'John' };
    const updatedSet = new Set([...mySet, newObject]);
    setMySet(updatedSet);
  }

// --------------- Snack Bar -------------
const [open, setOpen] = React.useState(false);
const [openMessage, setOpenMessage] = React.useState("");

const handleClick = () => {
  setOpen(true);
  setOpenMessage("Welcome Hellow");
};

// --------------- SnackBar ----------------
  let [loader,setLoader] = useState(false)
  
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [bannerConfig, setbannerConfig] = useState({ bannerType: 2 });
  //video code 
  const videoConstraints = {
    width: 597,
    height: 400,
    facingMode: "user"
  };
  const [picture, setPicture] = useState('')
  const [faceMatchStatus, setfaceMatchStatus] = useState(false)
  const [faceMatchPercentage, setfaceMatchPercentage] = useState(0)

  const webcamRef = React.useRef(null)

  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot()
    setPicture(pictureSrc)
    // if (activeStep === 2) {
    //   handleFaceMatching(pictureSrc);
    // }
  })
  //video code ends


const [VoterInfo, setVoterInfo] = useState({});        
const candidate_list = [{
   candidate_code: "CAN001",
   candidate_name: "Mr. Santhosh kumar",
   election_type_code: "E001",
   symbol: "Laptop",
   party_name: "AES",
   manifisto: "sample",
   state_code: "S001",
  
},
{
  candidate_code: "CAN002",
   candidate_name: "Mr. Shankar Rao",
   election_type_code: "E001",
   symbol: "Laptop",
   party_name: "AES",
   manifisto: "sample",
   state_code: "S001",
  
},{
   candidate_code: "CAN003",
   candidate_name: "Mr. Shankar Rao",
   election_type_code: "E002",
   symbol: "Laptop",
   party_name: "AES",
   manifisto: "sample",
   state_code: "S001",
  
},
{
  candidate_code: "CAN004",
   candidate_name: "Mr. Shankar Rao",
   election_type_code: "E002",
   symbol: "Laptop",
   party_name: "AES",
   manifisto: "sample",
   state_code: "S001",
  
},{
   candidate_code: "CAN005",
   candidate_name: "Mr. Shankar Rao",
   election_type_code: "E003",
   symbol: "Laptop",
   party_name: "AES",
   manifisto: "sample",
   state_code: "S001",
  
},
{
  candidate_code: "CAN006",
   candidate_name: "Mr. Shankar Rao",
   election_type_code: "E003",
   symbol: "Laptop",
   party_name: "AES",
   manifisto: "sample",
   state_code: "S001",
  
},{
   candidate_code: "CAN007",
   candidate_name: "Mr. Shankar Rao",
   election_type_code: "E004",
   symbol: "Laptop",
   party_name: "AES",
   manifisto: "sample",
   state_code: "S001",
  
},
{
  candidate_code: "CAN008",
   candidate_name: "Mr. Shankar Rao",
   election_type_code: "E004",
   symbol: "Laptop",
   party_name: "AES",
   manifisto: "sample",
   state_code: "S001",
  
}]
const votingSelection = [
  {
    election_type_code: "E001",
    election_type_name: "Center",
    candidate_list: [
      {
         candidate_code: "CAN001",
         candidate_name: "Mr. Santhosh kumar",
         election_type_code: "E001",
         symbol: "Laptop",
         party_name: "AES",
         manifisto: "sample",
         state_code: "S001",
        
      },
      {
        candidate_code: "CAN002",
         candidate_name: "Mr. Shankar Rao",
         election_type_code: "E001",
         symbol: "Laptop",
         party_name: "AES",
         manifisto: "sample",
         state_code: "S001",
        
      }
    ]
  },
  {
    election_type_code: "E002",
    election_type_name: "State",
    candidate_list: [
      {
         candidate_code: "CAN003",
         candidate_name: "Mr. Shankar Rao",
         election_type_code: "E002",
         symbol: "Laptop",
         party_name: "AES",
         manifisto: "sample",
         state_code: "S001",
        
      },
      {
        candidate_code: "CAN004",
         candidate_name: "Mr. Shankar Rao",
         election_type_code: "E002",
         symbol: "Laptop",
         party_name: "AES",
         manifisto: "sample",
         state_code: "S001",
        
      }
    ]
  },
  {
    election_type_code: "E003",
    election_type_name: "Municipality",
    candidate_list: [
      {
         candidate_code: "CAN005",
         candidate_name: "Mr. Shankar Rao",
         election_type_code: "E003",
         symbol: "Laptop",
         party_name: "AES",
         manifisto: "sample",
         state_code: "S001",
        
      },
      {
        candidate_code: "CAN006",
         candidate_name: "Mr. Shankar Rao",
         election_type_code: "E003",
         symbol: "Laptop",
         party_name: "AES",
         manifisto: "sample",
         state_code: "S001",
        
      }
    ]
  },
  {
    election_type_code: "E004",
    election_type_name: "Panchayat",
    candidate_list: [
      {
         candidate_code: "CAN007",
         candidate_name: "Mr. Shankar Rao",
         election_type_code: "E004",
         symbol: "Laptop",
         party_name: "AES",
         manifisto: "sample",
         state_code: "S001",
        
      },
      {
        candidate_code: "CAN008",
         candidate_name: "Mr. Shankar Rao",
         election_type_code: "E004",
         symbol: "Laptop",
         party_name: "AES",
         manifisto: "sample",
         state_code: "S001",
        
      }
    ]
  }
];



const [VotingSelectionList, setVotingSelectionList] = useState(votingSelection);  
const [candidate_list_state, setcandidate_list_state] = useState(candidate_list);  


//  ================== Voting Selection Logic ======================
const [selectedValue, setSelectedValue] = React.useState(new Set());
  
const handleChanged = (event,type) => {
  // console.log("Old",selectedValue);
  
  const resp = {candidate:event.target.value, election_type:type}
  if (!Array.from(selectedValue).some((obj) => obj.election_type === resp.election_type)) {
    const updateSet = new Set([...selectedValue,resp]);
    setSelectedValue(updateSet);
   } else if (Array.from(selectedValue).some((obj) => obj.election_type === resp.election_type)) {
    const objectIndex = Array.from(selectedValue).findIndex(obj => obj.election_type === resp.election_type);
    const newArray = [...selectedValue];
    newArray[objectIndex] = { ...newArray[objectIndex], candidate: event.target.value };
    setSelectedValue(new Set(newArray));
   }
 
  
  
  // console.log("Updated Set",updateSet);
  console.log("After Set",selectedValue);
};

//  ================== Voting Selection Logic ======================

// Santhosh Code
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const [voterFront, setvoterFront] = useState('')
const [voterBack, setvoterBack] = useState('')
const [aadharFront, setaadharFront] = useState('')
const [aadharBack, setaadharBack] = useState('')
const [aadharFrontImage, setaadharFrontImage] = useState('')


// useEffect(() => {
//   // Update the document title using the browser API
//   setvoterFront('')
//   setvoterBack('')
//   setaadharFront('')
//   setaadharBack('')
// })
const voterInformation = yup.object().shape({
  voter_name: yup.string().required("Voter Name Required").matches(/^[A-Za-z\s]*$/,"Only Alphabets allowed"),
  voter_number: yup.string().required("Voter Number Required").matches(/^[A-Z]{3}[0-9]{7}$/,"Invalid EPIC Number"),
  aadhar_number: yup.string().required("Aadhar Number Required").matches(/^[0-9]{12}$/,"Invalid Aadhar Number"),
  mobile_number: yup.string().required("Mobile Number Required").matches(/^[0-9]{10}$/,"Invalid Mobile Number"),
  voter_address: yup.string().required("Address Same as Voter Id Required"),
  constituency: yup.string().required("Select Constituency"),
  // voter_front: yup.mixed().required("File required")
  // .test('fileSize', 'Please upload the Voter Front Image', (value) => {
   
  //   if (value.length === 0){
  //     setvoterFront({'message':"Please upload the file",'error':true})
  //     return false
  //   } else {
  //     setvoterFront({'message':"",'error':false})
  //     return true
  //   }
  // }),
  // voter_back: yup.mixed().required('A file is required')
  // .test('fileSize', 'Please upload the Voter Front Image', (value) => {
   
  //   if (value.length === 0){
  //     setvoterBack({'message':"Please upload the file",'error':true})
  //     return false
  //   } else {
  //     setvoterBack({'message':"",'error':false})
  //     return true
  //   }
  // }),
  // aadhar_front: yup.mixed().required('A file is required')
  // .test('fileSize', 'Please upload the Voter Front Image', (value) => {
   
  //   if (value.length === 0){
  //     setaadharFront({'message':"Please upload the file",'error':true})
  //     return false
  //   } else {
  //     setaadharFront({'message':"",'error':false})
  //     return true
  //   }
  // }),
  // aadhar_back: yup.mixed().required('A file is required')
  // .test('fileSize', 'Please upload the Voter Front Image', (value) => {
   
  //   if (value.length === 0){
  //     setaadharBack({'message':"Please upload the file",'error':true})
  //     return false
  //   } else {
  //     setaadharBack({'message':"",'error':false})
  //     return true
  //   }
  // })
});

const OTPInformation = yup.object().shape({
  digit_one: yup.number().required(),
  digit_two: yup.number().required(),
  digit_three: yup.number().required(),
  digit_four: yup.number().required(),
  digit_five: yup.number().required(),
  digit_six: yup.number().required(),
  
});

  
  const { register:voterInfoHandler ,handleSubmit: voterInfoHandlerSubmit,reset:voterInfoReset, formState:{ errors:voterInfoErrors }} = useForm({
    resolver: yupResolver(voterInformation),
  });
  const { register:OTPHandler ,handleSubmit: OTPHandlerSubmit,reset:OTPReset, formState:{ errors:OTPErrors }} = useForm({
    resolver: yupResolver(OTPInformation),
  });

  
  
// Santhosh Code
  const voterFrontHandler = (event) => {
    console.log(event.target.files)
  }

  const OnSubmitOTP = (data) =>{
    console.log(data)
    if (data['digit_one'] && data['digit_two'] && data['digit_three'] && data['digit_four'] && data['digit_five'] && data['digit_six']){
      alert("OTP Verified");
      handleNext()
    }
  }

  const toast_message = (type,message) => {
   
        if(type === 1){
          toast.success(String(message), {
            position: toast.POSITION.BOTTOM_CENTER,
            theme: "colored",
          });
        } else if( type === 2){
          toast.warning(String(message), {
            position: toast.POSITION.BOTTOM_CENTER,
            theme: "colored",
        });
        }
        
      
        
     
    
  }

  const onSubmit = async(data) => {
    // data.preventDefault();
    // handleNext();
    // toast_message(1,"File Processed Matched");
    setLoader(true);
     handleNext();
     setaadharFrontImage(data["aadhar_front"][0]);
    // setError(null);
    try {
      // // First API call
      // const VoterData = {"front_image":data["voter_front"][0], "back_image": data["voter_back"][0], "voter_no": data["voter_number"].toUpperCase(),"voter_name": data["voter_name"].toUpperCase(),"address": data["voter_address"].toUpperCase()};
      // const AadharData = {"front_image":data["aadhar_front"][0], "back_image": data["aadhar_back"][0], "aadhar_no": data["aadhar_number"]};
      
      // const response1 = await axios.post('http://3.108.132.228:5009/', VoterData,{ headers: { 'Content-Type': 'multipart/form-data'} });
      // console.log(response1.data);

      // // Second API call
      // const response2 = await axios.post('http://3.108.132.228:5008/', AadharData,{ headers: { 'Content-Type': 'multipart/form-data'} });
      // console.log(response2.data.Response);

      // // setLoader(false);
      // if(response1.data.Response.voter_card_valid === true && response2.data.Response.aadhar_card_valid === true){
      //   setLoader(false);
      //   let voterFormInformation = {
      //     "voter_name":data["voter_name"],
      //     "voter_no":data["voter_number"],
      //     "voter_address":data["voter_address"],
      //     "aadhar_number":data["aadhar_number"],
      //     "mobile_number":data["mobile_number"],
      //     "constituency":data["constituency"],
      //     "voter_match" : response1.data.Response.voter_card_valid,
      //     "aadhar_match" : response2.data.Response.aadhar_card_valid
      //   }
      //   setVoterInfo(voterFormInformation);
      //   toast_message(1,"File Processed Matched");
      //   console.log(VoterInfo);
      //   handleNext();
        
      //   voterInfoReset();
      // } else if(response1.data.Response.voter_card_valid === false && response2.data.Response.aadhar_card_valid === false){
      //   setLoader(false);
      //   // toast_message(2,"Voter & Aadhar Doesn't Matched. Please try again...");
      //   toast.warning(String("Voter & Aadhar Doesn't Matched. Please try again..."), {
      //     position: toast.POSITION.BOTTOM_CENTER,
      //     theme: "colored",
      //   });
      //   voterInfoReset();
      // } else if(response1.data.Response.voter_card_valid === true && response2.data.Response.aadhar_card_valid === false){
      //   //toast_message(2,);
      //   toast.warning(String(response2.data.Response.message), {
      //     position: toast.POSITION.BOTTOM_CENTER,
      //     theme: "colored",
      //   });
      //   setLoader(false);
      //   voterInfoReset();
      // } else if(response1.data.Response.voter_card_valid === false && response2.data.Response.aadhar_card_valid === true){
      //   setLoader(false);
      //   toast.warning(String(response1.data.Response.message), {
      //     position: toast.POSITION.BOTTOM_CENTER,
      //     theme: "colored",
      //   });
      //  // toast_message(2,);
      //   voterInfoReset();
      // }

     
      
    } catch (error) {
      console.error(error);
      // if (error)
      if (error){
        alert("Some thing When wrong. Please try again Later....")
      }
      console.log(error.code);
      // setError(error.message);
      setLoader(false);
    }

    
    
  
    
  //------------------- Voter Information check ---------------------------
  }



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


  const base64ToBlob = (base64Data, contentType) => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };


  const processFaceMatch=async()=>{
    
    const base64Data = picture;
    const [imageType, imageData] = base64Data.split(";base64,");
    const blob = base64ToBlob(imageData, imageType);
    const temporaryFile = new File([blob], "image.jpg", { type: imageType });
    // Now you can use `temporaryFile` for whatever you need.
    // When you're done with it, you should delete the temporary file:
    // URL.revokeObjectURL(temporaryFile);

    const MatchData = {"matchFile":aadharFrontImage, "file": temporaryFile}; 
    // alert("faceImage:"+temporaryFile);

    await axios.post('http://3.108.132.228:5003',MatchData,{ headers: { 'Content-Type': 'multipart/form-data'} })
      .then(result => {
        if(result.data.Status=="Success"){
          if(result.data.Response.match_result=="[True]"){
            const match_result = result.data.Response.match_result;
            const match_result_final = match_result.replace(/\[|\]/g, '');
            const match_result_per= result.data.Response.match_result_per;
            const match_result_percentage = match_result_per.replace(/\[|\]/g, '');
            setfaceMatchStatus(Boolean(match_result_final));
            setfaceMatchPercentage(match_result_percentage);
            // console.log(Boolean(match_result_final));
            // console.log(result.data.Response.match_result_per);

          }else{
            setfaceMatchStatus(false);
          }
          
        }
        
       
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
                <> <form onSubmit={voterInfoHandlerSubmit(onSubmit)}>
                  <div className="stepper-content">
                    <Typography variant="h6" mb={3} sx={{ color: "#333", }}>
                      Voter Information
                    </Typography>
                   
                      <Box mb={3.5}>
                        <Grid container spacing={3}>
                          <Grid item sm={6} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="voter_name"
                              label="Enter Voter Name"
                              {...voterInfoHandler("voter_name")}
                              id="outlined-error"
                              error={!!voterInfoErrors['voter_name']}
                              helperText={voterInfoErrors['voter_name'] ? voterInfoErrors['voter_name'].message : ''}
                            />
                              
                            
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="voter_number"
                              label="Enter Voter ID number"
                              {...voterInfoHandler("voter_number")}
                              id="outlined-error"
                              error={!!voterInfoErrors['voter_number']}
                              helperText={voterInfoErrors['voter_number'] ? voterInfoErrors['voter_number'].message : ''}
                            />
                          
                          </Grid>

                          <Grid item sm={6} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="aadhar_number"
                              label="Enter Aadhaar Number"
                              id="outlined-error"
                              {...voterInfoHandler("aadhar_number")}
                              error={!!voterInfoErrors['aadhar_number']}
                              helperText={voterInfoErrors['aadhar_number'] ? voterInfoErrors['aadhar_number'].message : ''}
                            />
                            
                          </Grid>

                          <Grid item sm={6} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="mobile_number"
                              label="Enter Mobile Number (linked with Aadhaar)"
                              {...voterInfoHandler("mobile_number")}
                              id="outlined-error"
                              error={!!voterInfoErrors['mobile_number']}
                              helperText={voterInfoErrors['mobile_number'] ? voterInfoErrors['mobile_number'].message : ''}
                             
                            />
                            {/* {errors.mobile_number?.type === "required" && <p className="error-messages">Enter the Mobile Number</p>} */}
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <TextField
                              fullWidth
                              name="voter_address"
                              label="Enter Address same as Voter ID"
                              multiline
                              minRows={3}
                              maxRows={10}
                              {...voterInfoHandler("voter_address")}
                              id="outlined-error"
                              error={!!voterInfoErrors['voter_address']}
                              helperText={voterInfoErrors['voter_address'] ? voterInfoErrors['voter_address'].message : ''}
                            />
                           
                          </Grid>

                          <Grid item sm={6} xs={12}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Constituency</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Constituency"
                                {...voterInfoHandler("constituency")}                               
                                error={!!voterInfoErrors['constituency']}
                                helperText={voterInfoErrors['constituency'] ? voterInfoErrors['constituency'].message : ''}
                              >
                                <MenuItem value={10}>Coimbatore North</MenuItem>
                                <MenuItem value={20}>Coimbatore South</MenuItem>
                                <MenuItem value={30}>Erode</MenuItem>
                              </Select>
                              {voterInfoErrors.constituency && <FormHelperText error={!!voterInfoErrors['constituency']}>{voterInfoErrors.constituency.message}</FormHelperText>}
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
                                  name="voter_front"
                                  onChange={voterFrontHandler}
                                  hidden
                                  {...voterInfoHandler("voter_front")}  
                                />
                                
                              </Button>
                              
                              {voterFront.error && <FormHelperText error={voterFront.error}>{voterFront.message}</FormHelperText>}
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
                                  name="voter_back"
                                  hidden
                                  {...voterInfoHandler("voter_back")}  
                                />
                              </Button>
                              {voterBack.error && <FormHelperText error={voterBack.error}>{voterBack.message}</FormHelperText>}
                              
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
                                  name="aadhar_front"
                                  
                                  hidden
                                  {...voterInfoHandler("aadhar_front")}  
                                />
                              </Button>
                              {aadharFront.error && <FormHelperText error={aadharFront.error}>{aadharFront.message}</FormHelperText>}
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
                                  name="aadhar_back"
                                  hidden
                                  {...voterInfoHandler("aadhar_back")}  
                                />
                              </Button>
                              {aadharBack.error && <FormHelperText error={aadharBack.error}>{aadharBack.message}</FormHelperText>}
                            </div>

                          </Grid>

                        </Grid>
                      </Box>
                      {
                        loader === true && (<Box sx={{ width: '100%' }}>
                        <LinearProgress />
                        <p>Process Image.....</p>
                      </Box>)
                      }
                      <Button variant="outlined">
        Open success snackbar
      </Button>
      
        <ToastContainer />
                      {/* <Box>
                        <Button color="primary" variant="contained" type="submit">
                          Save
                        </Button>
                      </Box> */}
                    
                    
                  </div>
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

                    <Button type="submit" className="btn-org">
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
                </form>
                </>
              ) : ""}

              {/* ====== step 0 ends  ====== */}

              {/* ====== step 1 starts  ====== */}
              {activeStep === 1 ? (
                <> <form onSubmit={OTPHandlerSubmit(OnSubmitOTP)}>
                  <div className="stepper-content">
                    <Typography variant="h6" mb={3} sx={{ color: "#333", }}>
                      Aadhar OTP Validation
                    </Typography>
                   

                      <Box className="otp-box-top">
                        <Box className="otp-box-out">
                          <Box mb={3.5} className="otp-box">
                            <Grid container spacing={3} sx={{ justifyContent: "center", }}>
                              <Grid item sx={{ width: "100px", }}>
                                <TextField
                                  fullWidth
                                  type="text"
                                  name="digit_one"
                                  label=""
                                  {...OTPHandler("digit_one")}
                                  id="outlined-error"
                                  error={!!OTPErrors['digit_one']}
                                  inputProps={{ maxLength: 1 }}
                            />
                              </Grid>
                              <Grid item sx={{ width: "100px", }}>
                                <TextField
                                  fullWidth
                                  type="text"
                                  name="name"
                                  label=""
                                  {...OTPHandler("digit_two")}
                                  id="outlined-error"
                                  error={!!OTPErrors['digit_two']}
                                  inputProps={{ maxLength: 1 }}
                            />
                              </Grid>
                              <Grid item sx={{ width: "100px", }}>
                                <TextField
                                  fullWidth
                                  type="text"
                                  name="name"
                                  label=""
                                  {...OTPHandler("digit_three")}
                                  id="outlined-error"
                                  error={!!OTPErrors['digit_three']}
                                  inputProps={{ maxLength: 1 }}
                            />
                              </Grid>
                              <Grid item sx={{ width: "100px", }}>
                                <TextField
                                  fullWidth
                                  type="text"
                                  name="name"
                                  label=""
                                  {...OTPHandler("digit_four")}
                                  id="outlined-error"
                                  error={!!OTPErrors['digit_four']}
                                  inputProps={{ maxLength: 1 }}
                            />
                              </Grid>
                              <Grid item sx={{ width: "100px", }}>
                                <TextField
                                  fullWidth
                                  type="text"
                                  name="name"
                                  label=""
                                  {...OTPHandler("digit_five")}
                                  id="outlined-error"
                                  error={!!OTPErrors['digit_five']}
                                  inputProps={{ maxLength: 1 }}
                            />
                              </Grid>
                              <Grid item sx={{ width: "100px", }}>
                                <TextField
                                  fullWidth
                                  type="text"
                                  name="name"
                                  label=""
                                  {...OTPHandler("digit_six")}
                                  id="outlined-error"
                                  error={!!OTPErrors['digit_six']}
                                  inputProps={{ maxLength: 1 }}
                            />
                              </Grid>

                        </Grid>
                      </Box>
                      <Box mb={3.5} sx={{ display: "flex", justifyContent: "center", }}>
                        <a href="javascript:void(0);">Re-Generate OTP</a>
                      </Box>
                    </Box>
                    </Box>
                      {/* <Box>
                        <Button color="primary" variant="contained" type="submit">
                          Save
                        </Button>
                      </Box> */}
                   
                  </div>
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

                    <Button type="submit" className="btn-org" >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
                </form>
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
                            
                            {VoterInfo.voter_match === true && (<Alert severity="success">Matched</Alert>)}
                            {VoterInfo.voter_match === false && (<Alert severity="error">UnMatched</Alert>)}
                              
                            </div>
                            <div className="label">Voter Number :</div> <div className="value"> {VoterInfo.voter_no ? VoterInfo.voter_no : ""} </div>
                          </div>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <div className="detail-div">
                            <div className="match-placeholder">
                            {VoterInfo.aadhar_match === true && (<Alert severity="success">Matched</Alert>)}
                            {VoterInfo.aadhar_match === false && (<Alert severity="error">UnMatched</Alert>)}
                            </div>
                            <div className="label">Aadhaar Number :</div> <div className="value">{VoterInfo.aadhar_number ? VoterInfo.aadhar_number : ""}</div>
                          </div>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <div className="detail-div">
                            <div className="label">Full Name :</div> <div className="value">{VoterInfo.voter_name ? VoterInfo.voter_name : ""}</div>
                          </div>
                        </Grid>                        
                        <Grid item sm={6} xs={12}>
                          <div className="detail-div">
                            <div className="label">Mobile :</div> <div className="value">{VoterInfo.mobile_number ? VoterInfo.mobile_number : ""}</div>
                          </div>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <div className="detail-div">
                            <div className="label">Address :</div> <div className="value">{VoterInfo.voter_address ? VoterInfo.voter_address : ""} </div>
                          </div>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <div className="detail-div">
                            <div className="label">Constituency :</div> <div className="value">{VoterInfo.constituency ? VoterInfo.constituency : ""} </div>
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

                    <Button type="submit" className="btn-org" onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
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
                                {/* <div className="webcam-image">
                                  <i className="ion-person"></i>
                                </div> */}
                              </div>
                            </div>
                            <div className="video-btn">
                              <button className="btn-org"  onClick={(e) => {
                                e.preventDefault()
                                capture()
                                }}>
                                Capture
                              </button>
                              <button className="btn-black"  onClick={(e) => {
                              e.preventDefault()
                              setPicture('')
                              }}>
                                Retake
                              </button>
                            </div>
                            <div className="video-btn video-btn-btm">
                              <Button variant="contained" color="success" onClick={(e) => {
                              e.preventDefault()
                              processFaceMatch()
                              }}>
                                Process Match
                              </Button>
                            </div>
                          </div>
                        </Grid>
                        <Grid item sm={3} xs={12}>
                        
                        
                          <div className="status-div mb-30">
                          <p>Face Match Status</p>
                          {/* {faceMatchPercentage==0 &&(
                            <p>-</p>
                           )} */}
                          {faceMatchStatus===true?(
                            <>
                                <Button variant="contained" color="success">
                                  Success
                                </Button>
                            </>
                          ):
                          ( <>
                              <Button variant="contained" color="error">
                                Fail
                              </Button>
                            </>
                          )
                          }
                         
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

                    <Button type="submit" className="btn-org" onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
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
                      {
                        VotingSelectionList.map((resp,index) => (
                          
                          <Accordion expanded={expanded === 'panel'+index+1} onChange={handleChange('panel'+index+1)} defaultExpanded={index === 0 ? true : false}>
                          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography sx={{ fontSize: '18px', color: "#333", fontWeight: "600" }}>{resp.election_type_name}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                           
                              {
                                resp.candidate_list.map((candidate_list,index) => (
                                  <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor: "rgb(255, 244, 229)", color: "rgb(237, 108, 2)" }}>{index + 1}</Avatar>
                                </ListItemAvatar>

                                <ListItemText>
                                <Typography sx={{ fontSize: '20px', color: "#333", fontWeight: "600" }}>{candidate_list.candidate_name}</Typography>
                                </ListItemText>
                                <ListItemAvatar sx={{ width: "100px", }}>
                                    <Avatar sx={{ width: "60px", height: "60px" }} alt="BJP" src={bjp} />
                                </ListItemAvatar>
                                <ListItemAvatar >
                                  <ForwardIcon sx={{ color: "#0079d6", fontSize: "40px" }}></ForwardIcon>
                                </ListItemAvatar>
                                <ListItemAvatar>
                                
                                  <Radio sx={{'& .MuiSvgIcon-root': {fontSize: 36, }, }}
                                    checked={(Array.from(selectedValue).some((obj) => obj.election_type === candidate_list.election_type_code) && Array.from(selectedValue).some((obj) => obj.candidate === candidate_list.candidate_code)) ? true : false}
                                    onChange={(event) => handleChanged(event, candidate_list.election_type_code)}
                                    value={candidate_list.candidate_code}
                                    name={"radio-buttons-" + candidate_list.election_type_code}
                                    
                                  />
                                </ListItemAvatar>

                              </ListItem>
                              <Divider variant="inset" component="li" />
                              </List>
                              ))
                                }
                              

                            
                          </AccordionDetails>
                        </Accordion>
                        
                        ))

                        
                      }
                      
                    </div>

                    {/* Accordian ends */}

                  </div>
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

                    <Button type="submit" className="btn-org" onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
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
                                <div className="label">Voter Number :</div> <div className="value">{VoterInfo.voter_no ? VoterInfo.voter_no : ""}</div>
                              </div>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <div className="detail-div">
                                <div className="label">Aadhaar Number :</div> <div className="value">{VoterInfo.aadhar_number ? VoterInfo.aadhar_number : ""}</div>
                              </div>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <div className="detail-div">
                                <div className="label">Full Name :</div> <div className="value">{VoterInfo.voter_name ? VoterInfo.voter_name : ""} </div>
                              </div>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <div className="detail-div">
                                <div className="label">Mobile :</div> <div className="value">{VoterInfo.mobile_number ? VoterInfo.mobile_number : ""} </div>
                              </div>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <div className="detail-div">
                                <div className="label">Address :</div> <div className="value">{VoterInfo.voter_address ? VoterInfo.voter_address : ""} </div>
                              </div>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <div className="detail-div">
                                <div className="label">Constituency :</div> <div className="value">{VoterInfo.constituency ? VoterInfo.constituency : ""} </div>
                              </div>
                            </Grid>

                          </Grid>

                        </Grid>
                        <Grid item sm={6} xs={12}>

                          <Grid container spacing={2}>
                          {
                          Array.from(selectedValue).map((object,index) => (
                              // <div key={index}>{object.candidate} {object.election_type}</div>
                              candidate_list_state.map((response) => (

                                (response.candidate_code === object.candidate) &&
                                  (<Grid item sm={12} xs={12}>
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
                                      <p>Name of Candidate : {response.candidate_name}</p>
                                    </li>
                                    <li>
                                      <p>Constitution : {response.candidate_code}</p>
                                    </li>
                                    <li>
                                      <p>Party Name : {response.party_name}</p>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </Grid>
                              ):("")
                            
                              ))
                          ))
                        }

                          </Grid>

                        </Grid>


                      </Grid>
                    </Box>
                  </div>
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

                    <Button type="submit" className="btn-org" onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
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

                    <Button type="submit" className="btn-org" onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
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

                    <Button type="submit" className="btn-org" onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
                </>
              ) : ""}
              {/* ====== step 7 ends  ====== */}

              {activeStep === steps.length ? (
                <React.Fragment>
                  <div className="stepper-content">
                  <Typography sx={{
                      minHeight: "340px", textAlign: "center",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>

                      <Alert severity="success" className="alert-message" sx={{ fontSize: "20px", padding:"35px 30px", fontWeight: "600", 
                    color: "#2e7d32", }}>All steps completed - you're finished</Alert>

                    </Typography>
                  </div>
                  <Box sx={{ display: 'flex', flexDirection: 'row', padding: '10px 10px', background: "#f5f5f5" }}>
                    <Box sx={{ flex: '1 1 auto', }} />
                    <Button className="btn-black" onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : ("")}
            </Box>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
}

export default VotingPage;