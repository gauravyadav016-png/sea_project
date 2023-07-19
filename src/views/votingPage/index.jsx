import React, { useState, useEffect, useRef } from "react";
import Topnav from "../../common/topNav";
import TopnavVoting from "../../common/topNav/votingPagetopNav";
import { MuiOtpInput } from "mui-one-time-password-input";
import Footer from "../../common/footer";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import PhoneInput from 'react-phone-input-2'
import tick from "../../assets/images/sailor/tick.png"
import passport_img from "../../assets/images/sailor/pass.jpg"
import bank_verified from "../../assets/images/sailor/verified.png"

import 'react-phone-input-2/lib/material.css'
import InputAdornment from '@mui/material/InputAdornment';
import PhoneIcon from "@mui/icons-material/Phone";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormHelperText } from '@mui/material';
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
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { config } from "../../util/apiconfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { download_img } from '@mui/icons-material/FileDownload';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ForwardIcon from '@mui/icons-material/Forward';
import Swal from 'sweetalert2'

import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Navigate, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PersonIcon from '@mui/icons-material/Person';
import { useParams } from "react-router";
import bjp from "../../assets/images/bjp-logo.png";
import admk from "../../assets/images/aiadmk-logo.png";
import dmk from "../../assets/images/dmk-logo.png";
import avatar from "../../assets/images/avatar.jpg";

import loc_img from "../../assets/images/loc-img.jpg";
import ELogo from "../../assets/images/election-commision-logo.svg";

import VolumeDownIcon from '@mui/icons-material/VolumeDown';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:before': {
    display: 'none',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,

  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,

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


const steps = ['Personal Information', 'Review and Submit'];


function VotingPage() {
  let CryptoJS = require("crypto-js");
  const baseurl = useLocation();
  const [expanded, setExpanded] = React.useState('panel1');


  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  //  ================== Voting Selection Logic ======================

  const [selectedValue, setSelectedValue] = React.useState(new Set());
  const handleChanged = (event, state_code, constitution_code, type) => {
    // console.log("Old",selectedValue);
    const resp = { candidate: event.target.value, election_type: type, state_code: state_code, constitution: constitution_code }
    if (!Array.from(selectedValue).some((obj) => obj.election_type === resp.election_type)) {
      const updateSet = new Set([...selectedValue, resp]);
      setSelectedValue(updateSet);
    } else if (Array.from(selectedValue).some((obj) => obj.election_type === resp.election_type)) {
      const objectIndex = Array.from(selectedValue).findIndex(obj => obj.election_type === resp.election_type);
      const newArray = [...selectedValue];
      newArray[objectIndex] = { ...newArray[objectIndex], candidate: event.target.value };
      setSelectedValue(new Set(newArray));
    }
    // console.log("Updated Set",updateSet);
    console.log("After Set", selectedValue);
  };

  //  ================== Voting Selection Logic ======================

  // =================== Face Match State Declaration ================
  const [voterFront, setvoterFront] = useState('')
  const [voterBack, setvoterBack] = useState('')
  const [aadharFront, setaadharFront] = useState('')
  const [aadharBack, setaadharBack] = useState('')
  const [aadharFrontImage, setaadharFrontImage] = useState('')
  const [sailor_info, setsailor_info] = useState([])


  //video code ends

  //Geo Location Capture code starts
  const [location, setLocation] = useState({});
  console.log(location)
  const [locationAddress, setLocationAddress] = useState({});
  let params = useParams();
  useEffect(() => {
    geolocation()
    fetchVoterInfo(params)

  }, []);

  const geolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        const locationData = { "latitude": position.coords.latitude, "longitude": position.coords.longitude };
        // axios.post(config.geo_api, locationData,{ headers: { 'Content-Type': 'multipart/form-data'} }).then((response)=>{
        //   // console.log(response.data.Response.location);
        //   setLocationAddress(response.data.Response.location);
        //   dateTimeCalc();

        // }).catch((err)=>{
        //   console.log("error in fetching Geo Location");
        // });


      },
      (error) => {
        console.error(error);
      }
    );
  }

  const fetchVoterInfo = async (params) => {
    if (params.id) {
      const bytes = CryptoJS.AES.decrypt(params.id, config.secret_key);
      const voterno = bytes.toString(CryptoJS.enc.Utf8);
      console.log("fet", voterno)
      const voter_no_check = await axios.get(config.mongo_endpoint + 'api/v1/votinglog/all', { params: { "voter_id": voterno } },)
      console.log("fetch", voter_no_check.data);
      // setActiveStep(Number(originalText))
    } else {
      setActiveStep(0)
    }
  }

  //Geo Location Capture code ends

  // =================== Voter Info Validation Logic - Using Yup / React Hooks Form ================

  // =================== Voter Info Tab-1 Validation  ================

  const voterInformation = yup.object().shape({
    // first_name: yup.string().required("First Name Required").matches(/^[A-Za-z\s]*$/,"Only Alphabets allowed"),
    // last_name: yup.string().required("Last Name Required").matches(/^[A-Za-z\s]*$/,"Only Alphabets allowed"),
    // middle_name: yup.string().required("Aadhar Number Required").matches(/^[A-Za-z\s]*$/,"Only Alphabets allowed"),
    // age: yup.string().required("Age Required"),
    // place_of_birth: yup.string().required("Place of birth Required").matches(/^[A-Za-z\s]*$/,"Only Alphabets allowed"),
    // blood_group: yup.string().required("Blood Group Required"),
    // marital_status: yup.string().required("Marital Status Required"),
    // country: yup.string().required("Country Required"),
    // nationality: yup.string().required("Nationality Required"),
    // mobile_number: yup
    //       .string()
    //       .required("Phone Number is required")
    //       .matches(
    //         /^[0-9]{10,15}$/,
    //         'Phone number must be between 10 to 15 digits'
    //       ), // Use regex pattern to validate phone number format,
    // emergency_person: yup.string().required("Emergency Contact Person Required"),
    // emergency_number: yup.string().required("Emergency Contact Number Required"),
    // address: yup.string().required("Address Required"),
    // permanent_address: yup.string().required("Permanent Address Required"),
    //   email_Id: yup.string().required("Email Id Required"),
    //   password: yup
    //   .string()
    //   .required('Password is required')
    //   .min(8, 'Password must be at least 8 characters'),
    // confirm_password: yup
    //   .string()
    //   .required('Confirm Password is required')
    //   .oneOf([yup.ref('password'), null], 'Passwords must match'),
    // holder_name: yup.string().required("Account Holder Name Required"),
    // account_number: yup.string().required("Account Number Required"),
    // ifsc_code: yup.string().required("IFSC Code Required"),
    // passport_no: yup.string().required("Passport No Required"),
    // date_of_issued: yup.string().required("Date of Issued Required"),
    // valid_till: yup.string().required("Valid Till Required"),
    // insurance_no: yup.string().required("Insurance No Required"),
    // post_held: yup.string().required("Last Post Held Required"),
    // last_held: yup.string().required("Year of Experience of Last Held Required"),
    // rows: yup.array().of(
    //   yup.object().shape({
    //     certificate: yup.string().required("Select the Certificate"),
    //     issue_authority: yup.string().required("Issuing Authority Required"),
    //     valid_date: yup.string().required("Select Valid Date"),
    //   })
    // ),

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
    // }),

  });

  // =================== Voter Info Tab-1 Validation  ================
  // =================== Voter Info Yup Resolver Starts  ================
  const { register: voterInfoHandler,
    handleSubmit: voterInfoHandlerSubmit,
    reset: voterInfoReset,
    control,
    watch,
    formState: { errors: voterInfoErrors } } = useForm({
      resolver: yupResolver(voterInformation),
      mode: 'OnSubmit',
      defaultValues: {
        rows: [{ certificate: "", issue_authority: "", course_document: "", valid_date: "" }],
      },
    });

  console.log(voterInfoErrors)

  const { control: aadharcontrol, handleSubmit: OTPHandlerSubmit, } = useForm({
    defaultValues: {
      otp: ""
    }
  });

  const { control: otpcontrol, handleSubmit: OTPVerifiyHandlerSubmit, } = useForm({
    defaultValues: {
      otps: ""
    }
  });
  const [Agree, setAgree] = useState('')
  const [links, setLinks] = useState(null)
  const Agreeterms = (event) => {

    if (event.target.checked === true) {
      setAgree(true)
      setLinks("/evoting")
    } else {
      setAgree(false)
      setLinks(null)
    }
  }

  const AgreeNow = () => {
    if (Agree === true) {
      handleNext()
    } else {
      setAgree(false)
    }
  }
  // =================== Voter Info Yup Resolver Ends  ================

  // =================== Voter Info Validation Logic - Using Yup / React Hooks Form ================


  // =================== Voter Info Submit Handler Starts  ================
  const [otpError, setotpError] = useState(false);
  const [voterCount, setvoterCount] = useState([]);
  const OnSubmitAadharOTP = (data) => {

    // alert(JSON.stringify(data));
    if (data.otps === '123456') {
      // const voter_count,setvoterCount = [];

      Array.from(selectedValue).map(async (values) => {
        let data = {
          voter_id: VoterInfo.voter_no,
          candidate_code: values.candidate,
          state_code: values.state_code,
          constitution_code: values.constitution,
          election_type_code: values.election_type,
          voter_ip: '0',
          geo_coordinates: location.latitude + "," + location.longitude,
          voting_status: 'success'
        };
        const response1 = await axios.post(config.mongo_endpoint + 'api/v1/votingmaster/add', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        console.log(response1.data);
        // setvoterCount(null)
        if (response1.data.status === "success") {
          // voter_count.push(response1.data.totalvoted);
          setvoterCount(...voterCount, response1.data.totalvoted)
        } else {
          toast.error("No Record Found", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
        }

      })
      console.log("voter_count", voterCount);
      // console.log("voter_count",voter_count.length);
      // console.log("voter_count",voter_count[voter_count.length - 1])
      // if (voter_count.length > 0){
      //   setvoterCount(voter_count[voter_count.length - 1])

      // }
      handleNext();
      // let lastElement = voter_count[arry.length - 1];

      setotpError(false)
    } else {
      // alert("das");
      toast.error("Invalid OTP.", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
      setotpError(true)
    }

  }


  const [aadharotpError, setaadharotpError] = useState(false);
  const OnSubmitOTP = (data) => {

    // alert(JSON.stringify(data));
    if (data.otp === '123456') {



      handleNext();
      setaadharotpError(false)

    } else {
      toast.error("Invalid OTP.", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      })
      setaadharotpError(true)
    }

  }


  const onSubmit = async (data) => {
    console.log(data)
    setsailor_info(data)
    console.log("sailor_info", sailor_info);
    // console.log("location", Object.keys(location).length)
    handleNext()
    // setaadharFrontImage(data["aadhar_front"][0]);
    // setError(null);
    // try {
    // First API call
    // const VoterData = {"front_image":data["voter_front"][0], "back_image": data["voter_back"][0], "voter_no": data["voter_number"].toUpperCase(),"voter_name": data["voter_name"].toUpperCase(),"address": data["voter_address"].toUpperCase()};
    // const AadharData = {"front_image":data["aadhar_front"][0], "back_image": data["aadhar_back"][0], "aadhar_no": data["aadhar_number"]};

    // const voter_no_check = await axios.get(config.mongo_endpoint+'api/v1/votinglog/all',{params: { "voter_id":data["voter_number"]}},)
    // console.log(voter_no_check.data.length);
    // if (voter_no_check.data.length === 0){
    //       setLoader(true);

    //       const response1 = await axios.post(config.voter_api, VoterData,{ headers: { 'Content-Type': 'multipart/form-data'} });
    //       console.log(response1.data);

    //       // Second API call
    //       const response2 = await axios.post(config.aadhar_api, AadharData,{ headers: { 'Content-Type': 'multipart/form-data'} });
    //       console.log(response2.data.Response);
    //       // Second API call


    // // setLoader(false);
    // if(response1.data.Response.voter_card_valid === true && response2.data.Response.aadhar_card_valid === true){
    //   setLoader(false);
    // let voterFormInformation = {
    //   "voter_name": data["voter_name"],
    //   "voter_no": data["voter_number"],
    //   "voter_address": data["voter_address"],
    //   "aadhar_number": data["aadhar_number"],
    //   "mobile_number": data["mobile_number"],
    //   "constituency": data["constituency"],
    //   "voter_match": true, //response1.data.Response.voter_card_valid,
    //   "aadhar_match": true, //response2.data.Response.aadhar_card_valid,
    //   "voter_file": [data["voter_front"][0], data["voter_back"][0]],
    //   "aadhar_file": [data["aadhar_front"][0], data["aadhar_back"][0]]
    // }
    // setVoterInfo(voterFormInformation);

    // toast.error("Voter & Aadhar Card Information Verfied Successfully.", {
    //   position: toast.POSITION.TOP_CENTER,
    //   theme: "colored",
    // });
    // console.log(VoterInfo);
    // setInterval(handleNext(), 1000);
    // ;


    //     } else if(response1.data.Response.voter_card_valid === false && response2.data.Response.aadhar_card_valid === false){
    //       setLoader(false);
    //       // toast_message(2,"Voter & Aadhar Doesn't Matched. Please try again...");
    //       toast.error("Voter & Aadhar Doesn't Matched. Please try again...", {
    //         position: toast.POSITION.TOP_CENTER,
    //         theme: "colored",
    //       });
    //       voterInfoReset();
    //     } else if(response1.data.Response.voter_card_valid === true && response2.data.Response.aadhar_card_valid === false){
    //       //toast_message(2,);
    //       toast.error("Aadhar No Doesn't match. Please verify and try again..!", {
    //         position: toast.POSITION.TOP_CENTER,
    //         theme: "colored",
    //       });
    //       setLoader(false);
    //       voterInfoReset();
    //     } else if(response1.data.Response.voter_card_valid === false && response2.data.Response.aadhar_card_valid === true){
    //       setLoader(false);
    //       toast.error("EPIC No or Voter Name or Address Doesn't match. Please verify and try again..!", {
    //         position: toast.POSITION.TOP_CENTER,
    //         theme: "colored",
    //       });
    //      // toast_message(2,);
    //       voterInfoReset();
    //     }


    // } else {
    //   setLoader(false);
    //     Swal.fire({
    //       text: 'Hi, Seems you already casted the vote.. Jai Hind.. ',
    //       icon: 'warning',
    //       confirmButtonText: 'Ok'
    //     })
    // }
    // } catch (error) {
    //   console.error(error);
    //   // if (error)
    //   setLoader(false);
    //   if (error) {
    //     alert("Some thing When wrong. Please try again Later....")
    //   }
    //   console.log(error.code);
    //   // setError(error.message);

    //   // }
    // }
    //------------------- Voter Information check ---------------------------
  }

  // =================== Voter Info Submit Handler Ends  ================


  // =================== Constitution API ======================================
  const [constitution, setconstitution] = useState([]);
  const [VotingSelectionList, setVotingSelectionList] = useState([]);
  useEffect(() => {
    axios.get(config.mongo_endpoint + 'api/v1/constitution/published')
      .then(response => {
        // handle the response data
        setconstitution(response.data);
        console.log("mongo", response.data);

      })
      .catch(error => {
        // handle the error
        console.error("mongos error", error);
      });
  }, []);


  const voting_candidates = () => {

    axios.get(config.mongo_endpoint + 'api/v1/participate/getparticipate', {
      params: {
        "constitution_code": VoterInfo.constituency,
      },
    })
      .then(response => {
        console.log(response.data);
        setVotingSelectionList(response.data);
      })
      .catch(error => {
        console.log(error);
        alert(error);
      });

  }

  // console.log("C",constitution)
  // =================== Constitution API ======================================
  const [rows, setRows] = useState(1);

  const handleAddRow = () => {
    setRows(rows + 1);
  }
  const [loader, setLoader] = useState(false)
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
  const [faceMatchStatus, setfaceMatchStatus] = useState(false)
  const [VoterInfoDraftStatus, setVoterInfoDraftStatus] = useState(false)
  const [faceMatchPercentage, setfaceMatchPercentage] = useState(0)
  const [faceLivenessStatus, setLivenessStatus] = useState(false);
  const [captureDateTime, setcaptureDateTime] = useState("");

  const webcamRef = React.useRef(null)

  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot()
    setPicture(pictureSrc);
    dateTimeCalc();
    // if (activeStep === 2) {
    //   handleFaceMatching(pictureSrc);
    // }
  })
  //video code ends

  // ====================== Voting Selection Data ==========================

  const dateTimeCalc = () => {
    const date = new Date(); // Assuming the input date is in UTC
    const options = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZoneName: 'short',
    };
    const formattedDate = date.toLocaleString('en-IN', options); // Using 'en-IN' for timezone 'GMT +05:30' 
    setcaptureDateTime(formattedDate);
  }
  const [VoterInfo, setVoterInfo] = useState({});


  // ====================== Voting Selection Data ==========================

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
    if (activeStep === 1) {
      voterInfoReset();
    }
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
  // console.log(window.location.href);
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

  const [face_match_loader, setface_match_loader] = useState(false);
  const processFaceMatch = async () => {
    console.log("checking processFaceMatch");
    setface_match_loader(true)
    const base64Data = picture;
    const [imageType, imageData] = base64Data.split(";base64,");
    const blob = base64ToBlob(imageData, imageType);
    const temporaryFile = new File([blob], "image.jpg", { type: imageType });
    // Now you can use `temporaryFile` for whatever you need.
    // When you're done with it, you should delete the temporary file:
    // URL.revokeObjectURL(temporaryFile);

    const MatchData = { "matchFile": aadharFrontImage, "file": temporaryFile };
    // alert("faceImage:"+temporaryFile);
    await axios.post(config.face_match_api, MatchData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(result => {
        if (result.data.Status == "Success") {
          setface_match_loader(false)
          const match_result_per = result.data.Response.match_result_per;
          const match_result_percentage = match_result_per.replace(/\[|\]/g, '');

          if (result.data.Response.match_result === "[True]" || match_result_percentage >= "40") {
            const match_result = result.data.Response.match_result;
            const match_result_final = match_result.replace(/\[|\]/g, '');

            setfaceMatchStatus(Boolean(match_result_final));
            setfaceMatchPercentage(match_result_percentage);
            // console.log(Boolean(match_result_final));
            // console.log(result.data.Response.match_result_per);

          } else {
            setface_match_loader(false)
            setfaceMatchStatus(false);
          }

        }


      })
      .catch(error => {
        // handle the error
        console.error(error);
        if (error) {
          alert("Some thing When wrong. Please try again Later....")

        }
        setface_match_loader(false)
      });
  };

  const handleLiveness = (status) => {
    setface_match_loader(true)
    if (status === true) {
      setface_match_loader(false)
      setLivenessStatus(status);
    } else {
      setface_match_loader(false)
    }

    console.log("handleLiveness:", status);
  };

  const [votingSelctionError, setvotingSelctionError] = useState('');
  const handleVoteSelectionCheck = () => {
    if (Array.from(selectedValue).length === VotingSelectionList.length) {
      // alert(Array.from(selectedValue).length+""+)
      // setvotingSelctionError(false);

      handleNext();
    } else {
      // setvotingSelctionError(true);
      toast.error("Select any one candidate from Central, State, Municipality, Panchayat", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    }
  }
  const Initialvalues = {
    "voter_id": "",
    "voter_card_number": "",
    "aadhar_number": "",
    "voter_name": "",
    "constitution_code": "",
    "voter_card_file": "",
    "aadhar_card_file": "",
    "created_date": "",
    "draft_step": "",
    "face_liveness": "",
    "face_match_status": "",
    "geo_address": "",
    "latitude": "",
    "longitude": "",
    "mobile": "",
    "verification_status": "",
  }
  const [draftSave, setdraftSave] = useState(Initialvalues);

  // setSelectedValue(updateSet);

  const SaveDraft = () => {
    alert(activeStep);
    if (activeStep === 3) {
      const draft = {
        "voter_id": btoa(VoterInfo.voter_no),
        "voter_card_number": VoterInfo.voter_no,
        "aadhar_number": VoterInfo.aadhar_number,
        "voter_name": VoterInfo.voter_name,
        "constitution_code": VoterInfo.constituency,
        "voter_card_file": null,
        "aadhar_card_file": null,
        "created_date": new Date(),
        "draft_step": activeStep,
        "geo_address": (locationAddress) ? locationAddress : null,
        "latitude": (location.latitude) ? location.latitude : null,
        "longitude": (location.longitude) ? location.longitude : null,
        "mobile": VoterInfo.mobile_number,
        "face_liveness": faceLivenessStatus,
        "face_match_status": faceMatchStatus,
        "verification_status": "success"
      }

      setdraftSave({ ...draftSave, ...draft });
      VoterDraftSave(draftSave)
    }
  }


  const VoterDraftSave = async (data) => {

    const VoterNo = CryptoJS.AES.encrypt(data.voter_card_number, config.secret_key).toString();
    const draftResponse = await axios.post(config.mongo_endpoint + 'api/v1/voterdraft/add', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    console.log(draftResponse.status);
    if (draftResponse.status === 200) {

      Swal.fire({
        text: 'Draft Saved Successfully.Complete the Voting process within 20 minutes. Link will send through SMS.',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      // navigate("/");
      console.log(window.location.href + "/" + data.voter_id)
    } else {
      toast.error("No Record Found", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    }
  }

  const [faceVerifyError, setfaceVerifyError] = useState('');
  const faceVerificationCheck = () => {
    if (faceMatchStatus === false && faceLivenessStatus === false) {

      // setVoterInfoDraftStatus(true)
      // }
      // alert(Array.from(selectedValue).length+""+)
      // setfaceVerifyError(false);
      voting_candidates();

      handleNext();
    } else {
      // setfaceVerifyError(false);
      toast.error("Face Verification Failed..!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    }
  }
  const navigate = useNavigate();
  const LandingScreen = () => {
    navigate("/");
  }
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });

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
                  <form onSubmit={voterInfoHandlerSubmit(onSubmit)}>
                    <div className="stepper-content">

                      <Typography variant="h6" mb={3} sx={{ color: "#333", textAlign: "left", }}>
                        User Account Details
                      </Typography>

                      <Box mb={3.5}>
                        <Grid container spacing={3}>
                          <Grid item sm={4} xs={12}>
                            <TextField
                              size="small"
                              fullWidth
                              type="text"
                              name="email_Id"
                              label="Email ID *"
                              {...voterInfoHandler("email_Id")}
                              id="outlined-error"
                              error={!!voterInfoErrors['email_Id']}
                              helperText={voterInfoErrors['email_Id'] ? voterInfoErrors['email_Id'].message : ''}
                            />

                          </Grid>
                          <Grid item sm={4} xs={12}>
                            <TextField
                              size="small"
                              fullWidth
                              type="password"
                              name="password"
                              label="Password *"
                              {...voterInfoHandler("password")}
                              id="outlined-error"
                              error={!!voterInfoErrors['password']}
                              helperText={voterInfoErrors['password'] ? voterInfoErrors['password'].message : ''}
                            />

                          </Grid>
                          <Grid item sm={4} xs={12}>
                            <TextField
                              size="small"
                              fullWidth
                              type="password"
                              name="confirm_password"
                              label="Confirm Password *"
                              {...voterInfoHandler("confirm_password")}
                              id="outlined-error"
                              error={!!voterInfoErrors['confirm_password']}
                              helperText={voterInfoErrors['confirm_password'] ? voterInfoErrors['confirm_password'].message : ''}
                            />

                          </Grid>
                        </Grid>
                      </Box>
                      <Typography variant="h6" mb={3} sx={{ color: "#333", textAlign: "left", }}>
                        Personal Information
                      </Typography>
                      <Box mb={3.5}>
                        <Grid container spacing={3}>
                          <Grid item sm={4} xs={12}>
                            <TextField
                              size="small"
                              fullWidth
                              type="text"
                              name="first_name"
                              label="First Name *"
                              {...voterInfoHandler("first_name")}
                              id="outlined-error"
                              error={!!voterInfoErrors['first_name']}
                              helperText={voterInfoErrors['first_name'] ? voterInfoErrors['first_name'].message : ''}
                            />
                          </Grid>
                          <Grid item sm={4} xs={12}>
                            <TextField
                              fullWidth
                              size="small"
                              type="text"
                              name="middle_name"
                              label="Middle Name"
                              {...voterInfoHandler("middle_name")}
                              id="outlined-error"
                              error={!!voterInfoErrors['middle_name']}
                              helperText={voterInfoErrors['middle_name'] ? voterInfoErrors['middle_name'].message : ''}
                              inputProps={{ maxLength: 10 }}
                            />
                          </Grid>
                          <Grid item sm={4} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              size="small"
                              name="last_name"
                              label="Last Name *"
                              {...voterInfoHandler("last_name")}
                              id="outlined-error"
                              error={!!voterInfoErrors['last_name']}
                              helperText={voterInfoErrors['last_name'] ? voterInfoErrors['last_name'].message : ''}
                              inputProps={{ maxLength: 10 }}
                            />
                          </Grid>
                          <Grid item sm={4} xs={12}>
                            {/* <TextField
                              fullWidth
                              type="text"
                              name="age"
                              size="small"
                              label="Date of Birth *"
                              {...voterInfoHandler("age")}
                              id="outlined-error"
                              error={!!voterInfoErrors['age']}
                              helperText={voterInfoErrors['age'] ? voterInfoErrors['age'].message : ''}
                              inputProps={{ maxLength: 10 }}
                            /> */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
                                <DatePicker
                                  label="Date of Birth *"
                                  {...voterInfoHandler("age")}
                                  slotProps={{ textField: { size: 'small' } }}
                                />
                              </DemoContainer>
                            </LocalizationProvider>
                          </Grid>
                          <Grid item sm={4} xs={12}>
                          <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Place of Birth *</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size="small"
                                name="place_of_birth"
                                label="Place of Birth *"
                                {...voterInfoHandler("place_of_birth")}
                                error={!!voterInfoErrors['place_of_birth']}
                                helperText={voterInfoErrors['place_of_birth'] ? voterInfoErrors['place_of_birth'].message : ''}
                              >
                                <MenuItem value="Country">Country</MenuItem>
                                <MenuItem value=""></MenuItem>
                                <MenuItem value="Afghanistan">Afghanistan</MenuItem>
                                <MenuItem value="Albania">Albania</MenuItem>
                                <MenuItem value="Algeria">Algeria</MenuItem>
                                <MenuItem value="Andorra">Andorra</MenuItem>
                                <MenuItem value="Angola">Angola</MenuItem>
                                <MenuItem value="Antigua and Barbuda">Antigua and Barbuda</MenuItem>
                                <MenuItem value="Argentina">Argentina</MenuItem>
                                <MenuItem value="Armenia">Armenia</MenuItem>
                                <MenuItem value="Australia">Australia</MenuItem>
                                <MenuItem value="Austria">Austria</MenuItem>
                                <MenuItem value="Azerbaijan">Azerbaijan</MenuItem>
                                <MenuItem value="Bahamas">Bahamas</MenuItem>
                                <MenuItem value="Bahrain">Bahrain</MenuItem>
                                <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                                <MenuItem value="Barbados">Barbados</MenuItem>
                                <MenuItem value="Belarus">Belarus</MenuItem>
                                <MenuItem value="Belgium">Belgium</MenuItem>
                                <MenuItem value="Belize">Belize</MenuItem>
                                <MenuItem value="Benin">Benin</MenuItem>
                                <MenuItem value="Bhutan">Bhutan</MenuItem>
                                <MenuItem value="Bolivia">Bolivia</MenuItem>
                                <MenuItem value="Bosnia and Herzegovina">Bosnia and Herzegovina</MenuItem>
                                <MenuItem value="Botswana">Botswana</MenuItem>
                                <MenuItem value="Brazil">Brazil</MenuItem>
                                <MenuItem value="Brunei">Brunei</MenuItem>
                                <MenuItem value="Bulgaria">Bulgaria</MenuItem>
                                <MenuItem value="Burkina Faso">Burkina Faso</MenuItem>
                                <MenuItem value="Burundi">Burundi</MenuItem>
                                <MenuItem value="Côte d'Ivoire">Côte d'Ivoire</MenuItem>
                                <MenuItem value="Cabo Verde">Cabo Verde</MenuItem>
                                <MenuItem value="Cambodia">Cambodia</MenuItem>
                                <MenuItem value="Cameroon">Cameroon</MenuItem>
                                <MenuItem value="Canada">Canada</MenuItem>
                                <MenuItem value="Central African Republic">Central African Republic</MenuItem>
                                <MenuItem value="Chad">Chad</MenuItem>
                                <MenuItem value="Chile">Chile</MenuItem>
                                <MenuItem value="China">China</MenuItem>
                                <MenuItem value="Colombia">Colombia</MenuItem>
                                <MenuItem value="Comoros">Comoros</MenuItem>
                                <MenuItem value="Congo (Congo-Brazzaville)">Congo (Congo-Brazzaville)</MenuItem>
                                <MenuItem value="Costa Rica">Costa Rica</MenuItem>
                                <MenuItem value="Croatia">Croatia</MenuItem>
                                <MenuItem value="Cuba">Cuba</MenuItem>
                                <MenuItem value="Cyprus">Cyprus</MenuItem>
                                <MenuItem value="Czechia (Czech Republic)">Czechia (Czech Republic)</MenuItem>
                                <MenuItem value="Democratic Republic of the Congo">Democratic Republic of the Congo</MenuItem>
                                <MenuItem value="Denmark">Denmark</MenuItem>
                                <MenuItem value="Djibouti">Djibouti</MenuItem>
                                <MenuItem value="Dominica">Dominica</MenuItem>
                                <MenuItem value="Dominican Republic">Dominican Republic</MenuItem>
                                <MenuItem value="Ecuador">Ecuador</MenuItem>
                                <MenuItem value="Egypt">Egypt</MenuItem>
                                <MenuItem value="El Salvador">El Salvador</MenuItem>
                                <MenuItem value="Equatorial Guinea">Equatorial Guinea</MenuItem>
                                <MenuItem value="Eritrea">Eritrea</MenuItem>
                                <MenuItem value="Estonia">Estonia</MenuItem>
                                <MenuItem value="Ethiopia">Ethiopia</MenuItem>
                                <MenuItem value="Fiji">Fiji</MenuItem>
                                <MenuItem value="Finland">Finland</MenuItem>
                                <MenuItem value="France">France</MenuItem>
                                <MenuItem value="Gabon">Gabon</MenuItem>
                                <MenuItem value="Gambia">Gambia</MenuItem>
                                <MenuItem value="Georgia">Georgia</MenuItem>
                                <MenuItem value="Germany">Germany</MenuItem>
                                <MenuItem value="Ghana">Ghana</MenuItem>
                                <MenuItem value="Greece">Greece</MenuItem>
                                <MenuItem value="Grenada">Grenada</MenuItem>
                                <MenuItem value="Guatemala">Guatemala</MenuItem>
                                <MenuItem value="Guinea">Guinea</MenuItem>
                                <MenuItem value="Guinea-Bissau">Guinea-Bissau</MenuItem>
                                <MenuItem value="Guyana">Guyana</MenuItem>
                                <MenuItem value="Haiti">Haiti</MenuItem>
                                <MenuItem value="Holy See">Holy See</MenuItem>
                                <MenuItem value="Honduras">Honduras</MenuItem>
                                <MenuItem value="Hungary">Hungary</MenuItem>
                                <MenuItem value="Iceland">Iceland</MenuItem>
                                <MenuItem value="India">India</MenuItem>
                                <MenuItem value="Indonesia">Indonesia</MenuItem>
                                <MenuItem value="Iran">Iran</MenuItem>
                                <MenuItem value="Iraq">Iraq</MenuItem>
                                <MenuItem value="Ireland">Ireland</MenuItem>
                                <MenuItem value="Israel">Israel</MenuItem>
                                <MenuItem value="Italy">Italy</MenuItem>
                                <MenuItem value="Jamaica">Jamaica</MenuItem>
                                <MenuItem value="Japan">Japan</MenuItem>
                                <MenuItem value="Jordan">Jordan</MenuItem>
                                <MenuItem value="Kazakhstan">Kazakhstan</MenuItem>
                                <MenuItem value="Kenya">Kenya</MenuItem>
                                <MenuItem value="Kiribati">Kiribati</MenuItem>
                                <MenuItem value="Kuwait">Kuwait</MenuItem>
                                <MenuItem value="Kyrgyzstan">Kyrgyzstan</MenuItem>
                                <MenuItem value="Laos">Laos</MenuItem>
                                <MenuItem value="Latvia">Latvia</MenuItem>
                                <MenuItem value="Lebanon">Lebanon</MenuItem>
                                <MenuItem value="Lesotho">Lesotho</MenuItem>
                                <MenuItem value="Liberia">Liberia</MenuItem>
                                <MenuItem value="Libya">Libya</MenuItem>
                                <MenuItem value="Liechtenstein">Liechtenstein</MenuItem>
                                <MenuItem value="Lithuania">Lithuania</MenuItem>
                                <MenuItem value="Luxembourg">Luxembourg</MenuItem>
                                <MenuItem value="Madagascar">Madagascar</MenuItem>
                                <MenuItem value="Malawi">Malawi</MenuItem>
                                <MenuItem value="Malaysia">Malaysia</MenuItem>
                                <MenuItem value="Maldives">Maldives</MenuItem>
                                <MenuItem value="Mali">Mali</MenuItem>
                                <MenuItem value="Malta">Malta</MenuItem>
                                <MenuItem value="Marshall Islands">Marshall Islands</MenuItem>
                                <MenuItem value="Mauritania">Mauritania</MenuItem>
                                <MenuItem value="Mauritius">Mauritius</MenuItem>
                                <MenuItem value="Mexico">Mexico</MenuItem>
                                <MenuItem value="Micronesia">Micronesia</MenuItem>
                                <MenuItem value="Moldova">Moldova</MenuItem>
                                <MenuItem value="Monaco">Monaco</MenuItem>
                                <MenuItem value="Mongolia">Mongolia</MenuItem>
                                <MenuItem value="Montenegro">Montenegro</MenuItem>
                                <MenuItem value="Morocco">Morocco</MenuItem>
                                <MenuItem value="Mozambique">Mozambique</MenuItem>
                                <MenuItem value="Myanmar (formerly Burma)">Myanmar (formerly Burma)</MenuItem>
                                <MenuItem value="Namibia">Namibia</MenuItem>
                                <MenuItem value="Nauru">Nauru</MenuItem>
                                <MenuItem value="Nepal">Nepal</MenuItem>
                                <MenuItem value="Netherlands">Netherlands</MenuItem>
                                <MenuItem value="New Zealand">New Zealand</MenuItem>
                                <MenuItem value="Nicaragua">Nicaragua</MenuItem>
                                <MenuItem value="Niger">Niger</MenuItem>
                                <MenuItem value="Nigeria">Nigeria</MenuItem>
                                <MenuItem value="North Korea">North Korea</MenuItem>
                                <MenuItem value="North Macedonia">North Macedonia</MenuItem>
                                <MenuItem value="Norway">Norway</MenuItem>
                                <MenuItem value="Oman">Oman</MenuItem>
                                <MenuItem value="Pakistan">Pakistan</MenuItem>
                                <MenuItem value="Palau">Palau</MenuItem>
                                <MenuItem value="Palestine State">Palestine State</MenuItem>
                                <MenuItem value="Panama">Panama</MenuItem>
                                <MenuItem value="Papua New Guinea">Papua New Guinea</MenuItem>
                                <MenuItem value="Paraguay">Paraguay</MenuItem>
                                <MenuItem value="Peru">Peru</MenuItem>
                                <MenuItem value="Philippines">Philippines</MenuItem>
                                <MenuItem value="Poland">Poland</MenuItem>
                                <MenuItem value="Portugal">Portugal</MenuItem>
                                <MenuItem value="Qatar">Qatar</MenuItem>
                                <MenuItem value="Romania">Romania</MenuItem>
                                <MenuItem value="Russia">Russia</MenuItem>
                                <MenuItem value="Rwanda">Rwanda</MenuItem>
                                <MenuItem value="Saint Kitts and Nevis">Saint Kitts and Nevis</MenuItem>
                                <MenuItem value="Saint Lucia">Saint Lucia</MenuItem>
                                <MenuItem value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</MenuItem>
                                <MenuItem value="Samoa">Samoa</MenuItem>
                                <MenuItem value="San Marino">San Marino</MenuItem>
                                <MenuItem value="Sao Tome and Principe">Sao Tome and Principe</MenuItem>
                                <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                                <MenuItem value="Senegal">Senegal</MenuItem>
                                <MenuItem value="Serbia">Serbia</MenuItem>
                                <MenuItem value="Seychelles">Seychelles</MenuItem>
                                <MenuItem value="Sierra Leone">Sierra Leone</MenuItem>
                                <MenuItem value="Singapore">Singapore</MenuItem>
                                <MenuItem value="Slovakia">Slovakia</MenuItem>
                                <MenuItem value="Slovenia">Slovenia</MenuItem>
                                <MenuItem value="Solomon Islands">Solomon Islands</MenuItem>
                                <MenuItem value="Somalia">Somalia</MenuItem>
                                <MenuItem value="South Africa">South Africa</MenuItem>
                                <MenuItem value="South Korea">South Korea</MenuItem>
                                <MenuItem value="South Sudan">South Sudan</MenuItem>
                                <MenuItem value="Spain">Spain</MenuItem>
                                <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                                <MenuItem value="Sudan">Sudan</MenuItem>
                                <MenuItem value="Suriname">Suriname</MenuItem>
                                <MenuItem value="Sweden">Sweden</MenuItem>
                                <MenuItem value="Switzerland">Switzerland</MenuItem>
                                <MenuItem value="Syria">Syria</MenuItem>
                                <MenuItem value="Tajikistan">Tajikistan</MenuItem>
                                <MenuItem value="Tanzania">Tanzania</MenuItem>
                                <MenuItem value="Thailand">Thailand</MenuItem>
                                <MenuItem value="Timor-Leste">Timor-Leste</MenuItem>
                                <MenuItem value="Togo">Togo</MenuItem>
                                <MenuItem value="Tonga">Tonga</MenuItem>
                                <MenuItem value="Trinidad and Tobago">Trinidad and Tobago</MenuItem>
                                <MenuItem value="Tunisia">Tunisia</MenuItem>
                                <MenuItem value="Turkey">Turkey</MenuItem>
                                <MenuItem value="Turkmenistan">Turkmenistan</MenuItem>
                                <MenuItem value="Tuvalu">Tuvalu</MenuItem>
                                <MenuItem value="Uganda">Uganda</MenuItem>
                                <MenuItem value="Ukraine">Ukraine</MenuItem>
                                <MenuItem value="United Arab Emirates">United Arab Emirates</MenuItem>
                                <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                                <MenuItem value="United States of America">United States of America</MenuItem>
                                <MenuItem value="Uruguay">Uruguay</MenuItem>
                                <MenuItem value="Uzbekistan">Uzbekistan</MenuItem>
                                <MenuItem value="Vanuatu">Vanuatu</MenuItem>
                                <MenuItem value="Venezuela">Venezuela</MenuItem>
                                <MenuItem value="Vietnam">Vietnam</MenuItem>
                                <MenuItem value="Yemen">Yemen</MenuItem>
                                <MenuItem value="Zambia">Zambia</MenuItem>

                              </Select>
                              {voterInfoErrors.country && <FormHelperText error={!!voterInfoErrors['country']}>{voterInfoErrors.country.message}</FormHelperText>}
                            </FormControl>
                            {/* <TextField
                              fullWidth
                              type="text"
                              size="small"
                              name="place_of_birth"
                              label="Country of Birth *"
                              {...voterInfoHandler("place_of_birth")}
                              id="outlined-error"
                              error={!!voterInfoErrors['place_of_birth']}
                              helperText={voterInfoErrors['place_of_birth'] ? voterInfoErrors['place_of_birth'].message : ''}
                              inputProps={{ maxLength: 10 }}
                            /> */}
                          </Grid>
                          <Grid item sm={4} xs={12}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Blood Group *</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size="small"
                                name="blood_group"
                                label="Blood Group *"
                                {...voterInfoHandler("blood_group")}
                                error={!!voterInfoErrors['blood_group']}
                                helperText={voterInfoErrors['blood_group'] ? voterInfoErrors['blood_group'].message : ''}
                              >
                                <MenuItem value="A+">A+</MenuItem>
                                <MenuItem value="O+">O+</MenuItem>
                                <MenuItem value="B+">B+</MenuItem>
                                <MenuItem value="AB+">AB+</MenuItem>
                                <MenuItem value="A-">A-</MenuItem>
                                <MenuItem value="O-">O-</MenuItem>
                                <MenuItem value="B-">B-</MenuItem>
                                <MenuItem value="AB-">AB-</MenuItem>
                              </Select>
                              {voterInfoErrors.blood_group && <FormHelperText error={!!voterInfoErrors['blood_group']}>{voterInfoErrors.blood_group.message}</FormHelperText>}
                            </FormControl>

                          </Grid>
                          <Grid item sm={4} xs={12}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Marital Status*</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size="small"
                                name="marital_status"
                                label="Marital Status *"
                                {...voterInfoHandler("marital_status")}
                                error={!!voterInfoErrors['marital_status']}
                                helperText={voterInfoErrors['marital_status'] ? voterInfoErrors['marital_status'].message : ''}
                              >
                                <MenuItem value="1">Single</MenuItem>
                                <MenuItem value="2">Married</MenuItem>
                                <MenuItem value="3">Widowed </MenuItem>
                                <MenuItem value="3">Divorced </MenuItem>
                              </Select>
                              {voterInfoErrors.marital_status && <FormHelperText error={!!voterInfoErrors['marital_status']}>{voterInfoErrors.marital_status.message}</FormHelperText>}
                            </FormControl>

                          </Grid>
                          <Grid item sm={4} xs={12}>
                            {/* <TextField
                              size="small"
                              fullWidth
                              type="text"
                              name="country"
                              label="Country *"
                              {...voterInfoHandler("country")}
                              id="outlined-error"
                              error={!!voterInfoErrors['country']}
                              helperText={voterInfoErrors['country'] ? voterInfoErrors['country'].message : ''}
                            /> */}
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Country *</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size="small"
                                name="country"
                                label="Country *"
                                {...voterInfoHandler("country")}
                                error={!!voterInfoErrors['country']}
                                helperText={voterInfoErrors['country'] ? voterInfoErrors['country'].message : ''}
                              >
                                <MenuItem value="Country">Country</MenuItem>
                                <MenuItem value=""></MenuItem>
                                <MenuItem value="Afghanistan">Afghanistan</MenuItem>
                                <MenuItem value="Albania">Albania</MenuItem>
                                <MenuItem value="Algeria">Algeria</MenuItem>
                                <MenuItem value="Andorra">Andorra</MenuItem>
                                <MenuItem value="Angola">Angola</MenuItem>
                                <MenuItem value="Antigua and Barbuda">Antigua and Barbuda</MenuItem>
                                <MenuItem value="Argentina">Argentina</MenuItem>
                                <MenuItem value="Armenia">Armenia</MenuItem>
                                <MenuItem value="Australia">Australia</MenuItem>
                                <MenuItem value="Austria">Austria</MenuItem>
                                <MenuItem value="Azerbaijan">Azerbaijan</MenuItem>
                                <MenuItem value="Bahamas">Bahamas</MenuItem>
                                <MenuItem value="Bahrain">Bahrain</MenuItem>
                                <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                                <MenuItem value="Barbados">Barbados</MenuItem>
                                <MenuItem value="Belarus">Belarus</MenuItem>
                                <MenuItem value="Belgium">Belgium</MenuItem>
                                <MenuItem value="Belize">Belize</MenuItem>
                                <MenuItem value="Benin">Benin</MenuItem>
                                <MenuItem value="Bhutan">Bhutan</MenuItem>
                                <MenuItem value="Bolivia">Bolivia</MenuItem>
                                <MenuItem value="Bosnia and Herzegovina">Bosnia and Herzegovina</MenuItem>
                                <MenuItem value="Botswana">Botswana</MenuItem>
                                <MenuItem value="Brazil">Brazil</MenuItem>
                                <MenuItem value="Brunei">Brunei</MenuItem>
                                <MenuItem value="Bulgaria">Bulgaria</MenuItem>
                                <MenuItem value="Burkina Faso">Burkina Faso</MenuItem>
                                <MenuItem value="Burundi">Burundi</MenuItem>
                                <MenuItem value="Côte d'Ivoire">Côte d'Ivoire</MenuItem>
                                <MenuItem value="Cabo Verde">Cabo Verde</MenuItem>
                                <MenuItem value="Cambodia">Cambodia</MenuItem>
                                <MenuItem value="Cameroon">Cameroon</MenuItem>
                                <MenuItem value="Canada">Canada</MenuItem>
                                <MenuItem value="Central African Republic">Central African Republic</MenuItem>
                                <MenuItem value="Chad">Chad</MenuItem>
                                <MenuItem value="Chile">Chile</MenuItem>
                                <MenuItem value="China">China</MenuItem>
                                <MenuItem value="Colombia">Colombia</MenuItem>
                                <MenuItem value="Comoros">Comoros</MenuItem>
                                <MenuItem value="Congo (Congo-Brazzaville)">Congo (Congo-Brazzaville)</MenuItem>
                                <MenuItem value="Costa Rica">Costa Rica</MenuItem>
                                <MenuItem value="Croatia">Croatia</MenuItem>
                                <MenuItem value="Cuba">Cuba</MenuItem>
                                <MenuItem value="Cyprus">Cyprus</MenuItem>
                                <MenuItem value="Czechia (Czech Republic)">Czechia (Czech Republic)</MenuItem>
                                <MenuItem value="Democratic Republic of the Congo">Democratic Republic of the Congo</MenuItem>
                                <MenuItem value="Denmark">Denmark</MenuItem>
                                <MenuItem value="Djibouti">Djibouti</MenuItem>
                                <MenuItem value="Dominica">Dominica</MenuItem>
                                <MenuItem value="Dominican Republic">Dominican Republic</MenuItem>
                                <MenuItem value="Ecuador">Ecuador</MenuItem>
                                <MenuItem value="Egypt">Egypt</MenuItem>
                                <MenuItem value="El Salvador">El Salvador</MenuItem>
                                <MenuItem value="Equatorial Guinea">Equatorial Guinea</MenuItem>
                                <MenuItem value="Eritrea">Eritrea</MenuItem>
                                <MenuItem value="Estonia">Estonia</MenuItem>
                                <MenuItem value="Ethiopia">Ethiopia</MenuItem>
                                <MenuItem value="Fiji">Fiji</MenuItem>
                                <MenuItem value="Finland">Finland</MenuItem>
                                <MenuItem value="France">France</MenuItem>
                                <MenuItem value="Gabon">Gabon</MenuItem>
                                <MenuItem value="Gambia">Gambia</MenuItem>
                                <MenuItem value="Georgia">Georgia</MenuItem>
                                <MenuItem value="Germany">Germany</MenuItem>
                                <MenuItem value="Ghana">Ghana</MenuItem>
                                <MenuItem value="Greece">Greece</MenuItem>
                                <MenuItem value="Grenada">Grenada</MenuItem>
                                <MenuItem value="Guatemala">Guatemala</MenuItem>
                                <MenuItem value="Guinea">Guinea</MenuItem>
                                <MenuItem value="Guinea-Bissau">Guinea-Bissau</MenuItem>
                                <MenuItem value="Guyana">Guyana</MenuItem>
                                <MenuItem value="Haiti">Haiti</MenuItem>
                                <MenuItem value="Holy See">Holy See</MenuItem>
                                <MenuItem value="Honduras">Honduras</MenuItem>
                                <MenuItem value="Hungary">Hungary</MenuItem>
                                <MenuItem value="Iceland">Iceland</MenuItem>
                                <MenuItem value="India">India</MenuItem>
                                <MenuItem value="Indonesia">Indonesia</MenuItem>
                                <MenuItem value="Iran">Iran</MenuItem>
                                <MenuItem value="Iraq">Iraq</MenuItem>
                                <MenuItem value="Ireland">Ireland</MenuItem>
                                <MenuItem value="Israel">Israel</MenuItem>
                                <MenuItem value="Italy">Italy</MenuItem>
                                <MenuItem value="Jamaica">Jamaica</MenuItem>
                                <MenuItem value="Japan">Japan</MenuItem>
                                <MenuItem value="Jordan">Jordan</MenuItem>
                                <MenuItem value="Kazakhstan">Kazakhstan</MenuItem>
                                <MenuItem value="Kenya">Kenya</MenuItem>
                                <MenuItem value="Kiribati">Kiribati</MenuItem>
                                <MenuItem value="Kuwait">Kuwait</MenuItem>
                                <MenuItem value="Kyrgyzstan">Kyrgyzstan</MenuItem>
                                <MenuItem value="Laos">Laos</MenuItem>
                                <MenuItem value="Latvia">Latvia</MenuItem>
                                <MenuItem value="Lebanon">Lebanon</MenuItem>
                                <MenuItem value="Lesotho">Lesotho</MenuItem>
                                <MenuItem value="Liberia">Liberia</MenuItem>
                                <MenuItem value="Libya">Libya</MenuItem>
                                <MenuItem value="Liechtenstein">Liechtenstein</MenuItem>
                                <MenuItem value="Lithuania">Lithuania</MenuItem>
                                <MenuItem value="Luxembourg">Luxembourg</MenuItem>
                                <MenuItem value="Madagascar">Madagascar</MenuItem>
                                <MenuItem value="Malawi">Malawi</MenuItem>
                                <MenuItem value="Malaysia">Malaysia</MenuItem>
                                <MenuItem value="Maldives">Maldives</MenuItem>
                                <MenuItem value="Mali">Mali</MenuItem>
                                <MenuItem value="Malta">Malta</MenuItem>
                                <MenuItem value="Marshall Islands">Marshall Islands</MenuItem>
                                <MenuItem value="Mauritania">Mauritania</MenuItem>
                                <MenuItem value="Mauritius">Mauritius</MenuItem>
                                <MenuItem value="Mexico">Mexico</MenuItem>
                                <MenuItem value="Micronesia">Micronesia</MenuItem>
                                <MenuItem value="Moldova">Moldova</MenuItem>
                                <MenuItem value="Monaco">Monaco</MenuItem>
                                <MenuItem value="Mongolia">Mongolia</MenuItem>
                                <MenuItem value="Montenegro">Montenegro</MenuItem>
                                <MenuItem value="Morocco">Morocco</MenuItem>
                                <MenuItem value="Mozambique">Mozambique</MenuItem>
                                <MenuItem value="Myanmar (formerly Burma)">Myanmar (formerly Burma)</MenuItem>
                                <MenuItem value="Namibia">Namibia</MenuItem>
                                <MenuItem value="Nauru">Nauru</MenuItem>
                                <MenuItem value="Nepal">Nepal</MenuItem>
                                <MenuItem value="Netherlands">Netherlands</MenuItem>
                                <MenuItem value="New Zealand">New Zealand</MenuItem>
                                <MenuItem value="Nicaragua">Nicaragua</MenuItem>
                                <MenuItem value="Niger">Niger</MenuItem>
                                <MenuItem value="Nigeria">Nigeria</MenuItem>
                                <MenuItem value="North Korea">North Korea</MenuItem>
                                <MenuItem value="North Macedonia">North Macedonia</MenuItem>
                                <MenuItem value="Norway">Norway</MenuItem>
                                <MenuItem value="Oman">Oman</MenuItem>
                                <MenuItem value="Pakistan">Pakistan</MenuItem>
                                <MenuItem value="Palau">Palau</MenuItem>
                                <MenuItem value="Palestine State">Palestine State</MenuItem>
                                <MenuItem value="Panama">Panama</MenuItem>
                                <MenuItem value="Papua New Guinea">Papua New Guinea</MenuItem>
                                <MenuItem value="Paraguay">Paraguay</MenuItem>
                                <MenuItem value="Peru">Peru</MenuItem>
                                <MenuItem value="Philippines">Philippines</MenuItem>
                                <MenuItem value="Poland">Poland</MenuItem>
                                <MenuItem value="Portugal">Portugal</MenuItem>
                                <MenuItem value="Qatar">Qatar</MenuItem>
                                <MenuItem value="Romania">Romania</MenuItem>
                                <MenuItem value="Russia">Russia</MenuItem>
                                <MenuItem value="Rwanda">Rwanda</MenuItem>
                                <MenuItem value="Saint Kitts and Nevis">Saint Kitts and Nevis</MenuItem>
                                <MenuItem value="Saint Lucia">Saint Lucia</MenuItem>
                                <MenuItem value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</MenuItem>
                                <MenuItem value="Samoa">Samoa</MenuItem>
                                <MenuItem value="San Marino">San Marino</MenuItem>
                                <MenuItem value="Sao Tome and Principe">Sao Tome and Principe</MenuItem>
                                <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                                <MenuItem value="Senegal">Senegal</MenuItem>
                                <MenuItem value="Serbia">Serbia</MenuItem>
                                <MenuItem value="Seychelles">Seychelles</MenuItem>
                                <MenuItem value="Sierra Leone">Sierra Leone</MenuItem>
                                <MenuItem value="Singapore">Singapore</MenuItem>
                                <MenuItem value="Slovakia">Slovakia</MenuItem>
                                <MenuItem value="Slovenia">Slovenia</MenuItem>
                                <MenuItem value="Solomon Islands">Solomon Islands</MenuItem>
                                <MenuItem value="Somalia">Somalia</MenuItem>
                                <MenuItem value="South Africa">South Africa</MenuItem>
                                <MenuItem value="South Korea">South Korea</MenuItem>
                                <MenuItem value="South Sudan">South Sudan</MenuItem>
                                <MenuItem value="Spain">Spain</MenuItem>
                                <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                                <MenuItem value="Sudan">Sudan</MenuItem>
                                <MenuItem value="Suriname">Suriname</MenuItem>
                                <MenuItem value="Sweden">Sweden</MenuItem>
                                <MenuItem value="Switzerland">Switzerland</MenuItem>
                                <MenuItem value="Syria">Syria</MenuItem>
                                <MenuItem value="Tajikistan">Tajikistan</MenuItem>
                                <MenuItem value="Tanzania">Tanzania</MenuItem>
                                <MenuItem value="Thailand">Thailand</MenuItem>
                                <MenuItem value="Timor-Leste">Timor-Leste</MenuItem>
                                <MenuItem value="Togo">Togo</MenuItem>
                                <MenuItem value="Tonga">Tonga</MenuItem>
                                <MenuItem value="Trinidad and Tobago">Trinidad and Tobago</MenuItem>
                                <MenuItem value="Tunisia">Tunisia</MenuItem>
                                <MenuItem value="Turkey">Turkey</MenuItem>
                                <MenuItem value="Turkmenistan">Turkmenistan</MenuItem>
                                <MenuItem value="Tuvalu">Tuvalu</MenuItem>
                                <MenuItem value="Uganda">Uganda</MenuItem>
                                <MenuItem value="Ukraine">Ukraine</MenuItem>
                                <MenuItem value="United Arab Emirates">United Arab Emirates</MenuItem>
                                <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                                <MenuItem value="United States of America">United States of America</MenuItem>
                                <MenuItem value="Uruguay">Uruguay</MenuItem>
                                <MenuItem value="Uzbekistan">Uzbekistan</MenuItem>
                                <MenuItem value="Vanuatu">Vanuatu</MenuItem>
                                <MenuItem value="Venezuela">Venezuela</MenuItem>
                                <MenuItem value="Vietnam">Vietnam</MenuItem>
                                <MenuItem value="Yemen">Yemen</MenuItem>
                                <MenuItem value="Zambia">Zambia</MenuItem>

                              </Select>
                              {voterInfoErrors.country && <FormHelperText error={!!voterInfoErrors['country']}>{voterInfoErrors.country.message}</FormHelperText>}
                            </FormControl>
                          </Grid>
                          <Grid item sm={4} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              size="small"
                              name="nationality"
                              label="Nationality *"
                              {...voterInfoHandler("nationality")}
                              id="outlined-error"
                              error={!!voterInfoErrors['nationality']}
                              helperText={voterInfoErrors['nationality'] ? voterInfoErrors['nationality'].message : ''}
                              inputProps={{ maxLength: 10 }}
                            />
                          </Grid>
                          <Grid item sm={4} xs={12}>


                            <Controller
                              control={control}
                              name="mobile_number"
                              render={({ field }) => (
                                <PhoneInput
                                  country={'us'}
                                  {...field}
                                  inputProps={{
                                    name: "mobile_number",
                                    required: true,
                                  }}
                                />
                              )}
                            />
                            {voterInfoErrors.mobile_number && <FormHelperText error={voterInfoErrors.mobile_number}>{voterInfoErrors.mobile_number.message}</FormHelperText>}

                            {/* <PhoneInput
                          size="small"
                           
                            
                          /> */}
                            {/* <TextField
                              fullWidth
                              type="text"
                              size="small"
                              name="mobile_no"
                              label="Whatsapp Mobile No *"
                              {...voterInfoHandler("mobile_no")}
                              id="outlined-error"
                              error={!!voterInfoErrors['mobile_no']}
                              helperText={voterInfoErrors['mobile_no'] ? voterInfoErrors['mobile_no'].message : ''}
                              inputProps={{ maxLength: 10 }}
                            /> */}
                          </Grid>

                          <Grid item sm={4} xs={12}>
                            <TextField
                              fullWidth
                              size="small"
                              type="text"
                              name="emergency_person"
                              label="Emergency Contact Person *"
                              {...voterInfoHandler("emergency_person")}
                              id="outlined-error"
                              error={!!voterInfoErrors['emergency_person']}
                              helperText={voterInfoErrors['emergency_person'] ? voterInfoErrors['emergency_person'].message : ''}
                              inputProps={{ maxLength: 10 }}
                            />
                          </Grid>
                          <Grid item sm={4} xs={12}>
                            <TextField
                              fullWidth
                              size="small"
                              type="text"
                              name="emergency_number"
                              label="Emergency Contact Number *"
                              {...voterInfoHandler("emergency_number")}
                              id="outlined-error"
                              error={!!voterInfoErrors['emergency_number']}
                              helperText={voterInfoErrors['emergency_number'] ? voterInfoErrors['emergency_number'].message : ''}
                              inputProps={{ maxLength: 10 }}
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <TextField
                              fullWidth
                              name="address"
                              label="Corresponding Address *"
                              multiline
                              minRows={3}
                              maxRows={10}
                              {...voterInfoHandler("address")}
                              id="outlined-error"
                              error={!!voterInfoErrors['address']}
                              helperText={voterInfoErrors['address'] ? voterInfoErrors['address'].message : ''}
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <TextField
                              fullWidth
                              name="permanent_address"
                              label="Permanent Address*"
                              multiline
                              minRows={3}
                              maxRows={10}
                              {...voterInfoHandler("permanent_address")}
                              id="outlined-error"
                              error={!!voterInfoErrors['permanent_address']}
                              helperText={voterInfoErrors['permanent_address'] ? voterInfoErrors['permanent_address'].message : ''}
                            />
                          </Grid>
                          <Grid item sm={4} xs={12}>
                            <div className="control-div">

                              <Button
                                variant="contained"
                                component="label"
                              >
                                Capture Photo
                                <input
                                  type="file"
                                  name="capture"
                                  hidden
                                  {...voterInfoHandler("capture")}
                                />
                              </Button>
                            </div>
                          </Grid>
                          <Grid item sm={4} xs={12}>
                            <div className="control-div">

                              <Button
                                variant="contained"
                                component="label"
                              >
                                Upload Photo
                                <input
                                  type="file"
                                  name="upload_image"
                                  hidden
                                  {...voterInfoHandler("upload_image")}
                                />
                              </Button>
                            </div>
                          </Grid>

                        </Grid>
                      </Box>
                      <Typography variant="h6" mb={3} sx={{ color: "#333", textAlign: "left", }}>
                        Passport Details
                      </Typography>
                      <Box mb={3.5}>
                        <Grid container spacing={3}>
                          <Grid item sm={3} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="passport_no"
                              size="small"
                              label="Passport No *"
                              {...voterInfoHandler("passport_no")}
                              id="outlined-error"
                              error={!!voterInfoErrors['passport_no']}
                              helperText={voterInfoErrors['passport_no'] ? voterInfoErrors['passport_no'].message : ''}
                            />

                          </Grid>
                          <Grid item sm={3} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="date_of_issued"
                              size="small"
                              label="Place of Issue *"
                              {...voterInfoHandler("place_of_issued")}
                              id="outlined-error"
                              error={!!voterInfoErrors['place_of_issued']}
                              helperText={voterInfoErrors['place_of_issued'] ? voterInfoErrors['place_of_issued'].message : ''}
                            />

                          </Grid>
                          <Grid item sm={3} xs={12}>
                            {/* <TextField
                              fullWidth
                              type="text"
                              name="date_of_issued"
                              size="small"
                              label="Date of Issue *"
                              {...voterInfoHandler("date_of_issued")}
                              id="outlined-error"
                              error={!!voterInfoErrors['date_of_issued']}
                              helperText={voterInfoErrors['date_of_issued'] ? voterInfoErrors['date_of_issued'].message : ''}
                            /> */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
                                <DatePicker
                                  label="Date of Issue *"
                                  {...voterInfoHandler("date_of_issued")}
                                  slotProps={{ textField: { size: 'small' } }}
                                />
                              </DemoContainer>
                            </LocalizationProvider>
                          </Grid>
                          <Grid item sm={3} xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
                                <DatePicker
                                  label="Valid through *"
                                  {...voterInfoHandler("valid_till")}
                                  slotProps={{ textField: { size: 'small' } }}
                                />
                              </DemoContainer>
                            </LocalizationProvider>
                            {/* <TextField
                              fullWidth
                              type="text"
                              name="valid_till"
                              size="small"
                              label="Valid through*"
                              {...voterInfoHandler("valid_till")}
                              id="outlined-error"
                              error={!!voterInfoErrors['valid_till']}
                              helperText={voterInfoErrors['valid_till'] ? voterInfoErrors['valid_till'].message : ''}
                            /> */}

                          </Grid>

                          <Grid item sm={3} xs={12}>
                            <div className="control-div">
                              <Button
                                variant="contained"
                                component="label"
                              >
                                Upload Passport
                                <input
                                  type="file"
                                  name="passport_document"
                                  hidden
                                  {...voterInfoHandler("passport_document")}
                                />
                              </Button>
                              {voterFront.error && <FormHelperText error={voterFront.error}>{voterFront.message}</FormHelperText>}
                            </div>
                          </Grid>
                        </Grid>
                      </Box>
                      <Typography variant="h6" mb={3} sx={{ color: "#333", textAlign: "left", }}>
                        Bank Account Details <img src={bank_verified} style={{ width: '100px' }} />
                      </Typography>

                      <Box mb={3.5}>
                        <Grid container spacing={3}>
                          <Grid item sm={3} xs={12}>
                            <TextField
                              size="small"
                              fullWidth
                              type="text"
                              name="holder_name"
                              label="Account Holder Name *"
                              {...voterInfoHandler("holder_name")}
                              id="outlined-error"
                              error={!!voterInfoErrors['holder_name']}
                              helperText={voterInfoErrors['holder_name'] ? voterInfoErrors['holder_name'].message : ''}
                            />

                          </Grid>
                          <Grid item sm={3} xs={12}>
                            <TextField
                              size="small"
                              fullWidth
                              type="text"
                              name="account_number"
                              label="Account Number *"
                              {...voterInfoHandler("account_number")}
                              id="outlined-error"
                              error={!!voterInfoErrors['account_number']}
                              helperText={voterInfoErrors['account_number'] ? voterInfoErrors['account_number'].message : ''}
                            />

                          </Grid>
                          <Grid item sm={3} xs={12}>
                            <TextField
                              size="small"
                              fullWidth
                              type="text"
                              name="ifsc_code"
                              label="IFSC Code *"
                              {...voterInfoHandler("ifsc_code")}
                              id="outlined-error"
                              error={!!voterInfoErrors['ifsc_code']}
                              helperText={voterInfoErrors['ifsc_code'] ? voterInfoErrors['ifsc_code'].message : ''}
                            />

                          </Grid>
                          <Grid item sm={3} xs={12}>
                            <TextField
                              size="small"
                              fullWidth
                              type="text"
                              name="swift_code"
                              label="SWIFT Code *"
                              {...voterInfoHandler("swift_code")}
                              id="outlined-error"
                              error={!!voterInfoErrors['swift_code']}
                              helperText={voterInfoErrors['swift_code'] ? voterInfoErrors['swift_code'].message : ''}
                            />

                          </Grid>
                          <Grid item sm={4} xs={12}>
                            <TextField
                              fullWidth
                              name="branch_address"
                              label="Branch Address *"
                              multiline
                              minRows={3}
                              maxRows={10}
                              {...voterInfoHandler("branch_address")}
                              id="outlined-error"
                              error={!!voterInfoErrors['branch_address']}
                              helperText={voterInfoErrors['branch_address'] ? voterInfoErrors['branch_address'].message : ''}
                            />

                          </Grid>
                          <Grid item sm={3} xs={12}>
                            <div className="control-div">

                              <Button
                                variant="contained"
                                component="label"
                              >
                                Upload Cancelled Cheque
                                <input
                                  type="file"
                                  name="penny_check_verified"
                                  hidden
                                  {...voterInfoHandler("penny_check_verified")}
                                />
                              </Button>
                            </div>
                          </Grid>

                        </Grid>
                      </Box>

                      <Typography variant="h6" mb={3} sx={{ color: "#333", textAlign: "left", }}>
                        Insurance Details
                      </Typography>
                      <Box mb={3.5}>
                        <Grid container spacing={3}>
                          <Grid item sm={3} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="insurance_no"
                              size="small"
                              label="Insurance No *"
                              {...voterInfoHandler("insurance_no")}
                              id="outlined-error"
                              error={!!voterInfoErrors['insurance_no']}
                              helperText={voterInfoErrors['insurance_no'] ? voterInfoErrors['insurance_no'].message : ''}
                            />

                          </Grid>

                          <Grid item sm={3} xs={12}>
                            <div className="control-div">
                              <Button
                                variant="contained"
                                component="label"
                              >
                                Upload Insurance Document
                                <input
                                  type="file"
                                  name="passport_document"
                                  hidden
                                  {...voterInfoHandler("passport_document")}
                                />
                              </Button>
                              {voterFront.error && <FormHelperText error={voterFront.error}>{voterFront.message}</FormHelperText>}
                            </div>
                          </Grid>
                        </Grid>
                      </Box>
                      <Typography variant="h6" mb={3} sx={{ color: "#333", textAlign: "left", }}>
                        Experience Details
                      </Typography>

                      <Box mb={3.5}>
                        <Grid container spacing={3}>
                          <Grid item sm={4} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              size="small"
                              name="post_held"
                              label="Last Position Held *"
                              {...voterInfoHandler("post_held")}
                              id="outlined-error"
                              error={!!voterInfoErrors['post_held']}
                              helperText={voterInfoErrors['post_held'] ? voterInfoErrors['post_held'].message : ''}
                              inputProps={{ maxLength: 10 }}
                            />
                          </Grid>
                          <Grid item sm={4} xs={12}>
                            <TextField
                              fullWidth
                              type="text"
                              name="last_held"
                              size="small"
                              label="No of Years Experience *"
                              {...voterInfoHandler("last_held")}
                              id="outlined-error"
                              error={!!voterInfoErrors['last_held']}
                              helperText={voterInfoErrors['last_held'] ? voterInfoErrors['last_held'].message : ''}
                              inputProps={{ maxLength: 10 }}
                            />
                          </Grid>
                          <Grid item sm={4} xs={12}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Position Applying For *</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size="small"
                                name="position_apply_for"
                                label="Position Applying For *"
                                {...voterInfoHandler("position_apply_for")}
                                error={!!voterInfoErrors['position_apply_for']}
                                helperText={voterInfoErrors['position_apply_for'] ? voterInfoErrors['position_apply_for'].message : ''}
                              >
                                <MenuItem value="1">Position 1</MenuItem>
                                <MenuItem value="2">Position 2</MenuItem>
                                <MenuItem value="3">Position 3 </MenuItem>
                              </Select>
                              {voterInfoErrors.marital_status && <FormHelperText error={!!voterInfoErrors['marital_status']}>{voterInfoErrors.marital_status.message}</FormHelperText>}
                            </FormControl>

                          </Grid>

                        </Grid>
                      </Box>
                      <Grid item sm={12} xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Typography variant="h6" mb={3} sx={{ color: "#333", textAlign: "left", }}>
                              Document(s)
                            </Typography>
                          </Grid>
                          {/* <Grid item xs={6} sx={{ textAlign: "right", }}>
                          <Button className="btn-grn" size="small" sx={{ textAlign: "right", }} onClick={() => append({ certificate: "", issue_authority: "", course_document: "",valid_date:"" })}>Add Row</Button>
                          </Grid> */}
                        </Grid>
                      </Grid>
                      <Box mb={3.5}>
                        <Grid container spacing={3}>
                          <Grid item sm={12} xs={12}>
                            {fields.map((item, index) => (
                              <Box mb={3.5}>
                                <Grid container spacing={2}>

                                  <Grid item xs={2} key={item.id}>
                                    <FormControl fullWidth>
                                      <InputLabel id="demo-simple-select-label">Certificate Course Name *</InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="certificate *"
                                        size="small"
                                        {...voterInfoHandler(`rows[${index}].certificate`, {
                                          required: 'Select Certificate'
                                        })}
                                        defaultValue={item.name}
                                        error={!!voterInfoErrors?.rows?.[index]?.certificate}
                                        helperText={voterInfoErrors?.rows?.[index]?.certificate ? voterInfoErrors?.rows?.[index]?.certificate : ''}
                                      >
                                        <MenuItem value="TRAINING TECHNOLOGY (SAILORS)">TRAINING TECHNOLOGY (SAILORS)</MenuItem>
                                        <MenuItem value="CPO MANAGEMENT">CPO MANAGEMENT </MenuItem>
                                        <MenuItem value="PETTY OFFICER LEADERSHIP">PETTY OFFICER LEADERSHIP </MenuItem>
                                      </Select>

                                      {voterInfoErrors?.rows?.[index]?.certificate && <FormHelperText error={!!voterInfoErrors?.rows?.[index]?.certificate}>{voterInfoErrors?.rows?.[index]?.certificate.message}</FormHelperText>}
                                    </FormControl>
                                  </Grid>
                                  <Grid item xs={3} key={index}>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      type="text"
                                      name="certificate_number"
                                      label="Certificate Number *"
                                      {...voterInfoHandler(`rows.${index}.certificate_number`, {
                                        required: 'Certificate Number Required'
                                      })}
                                      id="outlined-error"
                                      error={!!voterInfoErrors?.rows?.[index]?.certificate_number}
                                      helperText={voterInfoErrors?.rows?.[index]?.certificate_number ? voterInfoErrors?.rows?.[index]?.certificate_number.message : ''}

                                    />

                                  </Grid>
                                  <Grid item xs={3} key={index}>
                                    <FormControl fullWidth>
                                      <InputLabel id="demo-simple-select-label">Issuing Authority *</InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        size="small"
                                        name="position_apply_for"
                                        label="Position Applying For *"
                                        {...voterInfoHandler(`rows.${index}.issue_authority`, {
                                          required: 'Issue Authority Required'
                                        })}

                                        error={!!voterInfoErrors?.rows?.[index]?.issue_authority}
                                        helperText={voterInfoErrors?.rows?.[index]?.issue_authority ? voterInfoErrors?.rows?.[index]?.issue_authority.message : ''}
                                      >
                                        <MenuItem value="1">Authority 1</MenuItem>
                                        <MenuItem value="2">Authority 2</MenuItem>
                                        <MenuItem value="3">Authority 3 </MenuItem>
                                      </Select>
                                      {voterInfoErrors?.rows?.[index]?.issue_authority && <FormHelperText error={!!voterInfoErrors?.rows?.[index]?.issue_authority}>{voterInfoErrors?.rows?.[index]?.issue_authority.message}</FormHelperText>}
                                    </FormControl>

                                  </Grid>
                                  
                                  <Grid item xs={3} sx={{ pt: 0 }}  key={index}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
                                        <DatePicker
                                          label="Valid Till *"
                                          slotProps={{ textField: { size: 'small' } }}
                                        />
                                      </DemoContainer>
                                    </LocalizationProvider>

                                  </Grid>
                                  <Grid item xs={3} key={index}>

                                    <div className="control-div" xs={3}>
                                      <Button
                                        variant="contained"
                                        component="label"
                                      >
                                        Upload Document
                                        <input
                                          type="file"
                                          name="course_document"
                                          hidden
                                          {...voterInfoHandler(`rows.${index}.course_document`)}
                                        />
                                      </Button>
                                      {voterFront.error && <FormHelperText error={voterFront.error}>{voterFront.message}</FormHelperText>}
                                    </div>
                                  </Grid>

                                  <Grid item xs={1} key={index}>
                                    <button type="button" className="btn-grn" size="small" style={{ "background-color": 'red' }} onClick={() => remove(index)}>
                                      Remove
                                    </button>
                                  </Grid>

                                </Grid>
                              </Box>
                            ))}
                          </Grid>
                          <Grid item sm={2} xs={12}>
                            <Button className="btn-grn" size="small" sx={{ textAlign: "right", }} onClick={() => append({ certificate: "", issue_authority: "", course_document: "", valid_date: "" })}>Add Row</Button>
                          </Grid>
                        </Grid>
                      </Box>
                      {/* <Box mb={3.5}>
                      <Grid item sm={12} xs={12}>
                      
                        {fields.map((item, index) => (
                        
                            <Grid container spacing={3}>

                              <Grid item xs={3} key={item.id}>
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">Certificate Course Name *</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="certificate *"
                                    size="small"
                                    {...voterInfoHandler(`rows[${index}].certificate`, {
                                      required: 'Select Certificate' 
                                    })}
                                    defaultValue={item.name}
                                    error={!!voterInfoErrors?.rows?.[index]?.certificate}
                                    helperText={voterInfoErrors?.rows?.[index]?.certificate ? voterInfoErrors?.rows?.[index]?.certificate : ''}
                                  >
                                    <MenuItem value="TRAINING TECHNOLOGY (SAILORS)">TRAINING TECHNOLOGY (SAILORS)</MenuItem>
                                    <MenuItem value="CPO MANAGEMENT">CPO MANAGEMENT </MenuItem>
                                    <MenuItem value="PETTY OFFICER LEADERSHIP">PETTY OFFICER LEADERSHIP </MenuItem>
                                  </Select>
                                  
                                  {voterInfoErrors?.rows?.[index]?.certificate && <FormHelperText error={!!voterInfoErrors?.rows?.[index]?.certificate}>{voterInfoErrors?.rows?.[index]?.certificate.message}</FormHelperText>}
                                </FormControl>
                              </Grid>
                              <Grid item xs={2} key={index}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  type="text"
                                  name="certificate_number"
                                  label="Certificate Number *"
                                  {...voterInfoHandler(`rows.${index}.certificate_number`,{
                                    required: 'Certificate Number Required' 
                                  })}
                                  id="outlined-error"
                                  error={!!voterInfoErrors?.rows?.[index]?.certificate_number}
                                  helperText={voterInfoErrors?.rows?.[index]?.certificate_number ? voterInfoErrors?.rows?.[index]?.certificate_number.message : ''}
                                  
                                />

                              </Grid>
                              <Grid item xs={2} key={index}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  type="text"
                                  name="last_name"
                                  label="Issuing Authority *"
                                  {...voterInfoHandler(`rows.${index}.issue_authority`,{
                                    required: 'Issue Authority Required' 
                                  })}
                                  id="outlined-error"
                                  error={!!voterInfoErrors?.rows?.[index]?.issue_authority}
                                  helperText={voterInfoErrors?.rows?.[index]?.issue_authority ? voterInfoErrors?.rows?.[index]?.issue_authority.message : ''}
                                  
                                />

                              </Grid>
                              <Grid item xs={3} key={index}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
                                <DatePicker
                                  label="Small picker"
                                  slotProps={{ textField: { size: 'small' } }}
                                />
                                </DemoContainer>
                                </LocalizationProvider>

                              </Grid>
                              <Grid item xs={2} key={index}>


                                <Button
                                  variant="contained"
                                  component="label"
                                >
                                  Upload File
                                  <input
                                    type="file"
                                    name="course_document"
                                    hidden
                                    {...voterInfoHandler(`rows.${index}.course_document`)}
                                  />
                                </Button>
                                {voterFront.error && <FormHelperText error={voterFront.error}>{voterFront.message}</FormHelperText>}
                              </Grid>
                              <Grid item xs={1} key={index}>
                                <button type="button" className="btn-grn" size="small" style={{ "background-color": 'red' }} onClick={() => remove(index)}>
                                  X
                                </button>
                              </Grid>
                            </Grid>
                        
                        ))}
                        {voterInfoErrors.rows && <FormHelperText error={voterInfoErrors.rows.error}>{voterInfoErrors.rows.message}</FormHelperText>}
                        </Grid>
                      </Box> */}


                      {/* 
                      <Box mb={3.5} pt={1} className="upload-div">
                        <Grid container spacing={3}>
                          <Grid item sm={6} xs={12}>
                            <div className="control-div">
                              <p>Upload Voter Id Front : </p>
                              <Button
                                variant="contained"
                                component="label"
                              >
                                Upload File
                                <input
                                   type="file"
                                   name="voter_front"
                                   hidden
                                   {...voterInfoHandler("voter_front")}  
                                />
                              </Button>
                              {voterFront.error && <FormHelperText error={voterFront.error}>{voterFront.message}</FormHelperText>}
                            </div>

                            <div className="control-div">
                              <p>Upload Voter Id Back :</p>
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
                              <p>Upload Aadhaar Front :</p>
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
                              <p>Upload Aadhaar Back :</p>
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
                      </Box> */}
                      {
                        loader === true && (<Box sx={{ width: '100%' }}>
                          <div className="loading-div">
                            <div className="loading-inn">
                              <img src={ELogo} />
                              <LinearProgress />
                              <p>Processing Please Wait...</p>
                            </div>
                          </div>
                        </Box>)
                      }
                      {/* <Box>
                        <Button color="primary" variant="contained" type="submit">
                          Save
                        </Button>
                      </Box> */}

                      <ToastContainer />
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
                          {activeStep === steps.length - 1 ? 'Finish' : 'Verify'}
                        </Button>
                      </Box>
                    </React.Fragment>
                  </form>
                </>
              ) : ""}



              {/* ====== step 7 starts  ====== */}
              {activeStep === 1 ? (
                <>
                  <div className="stepper-content">
                    <Box mb={3.5}>
                      <Grid container spacing={3}>
                        <Grid item sm={6} xs={12}>
                          <TableContainer component={Paper}>
                            <Table sx={{ maxWidth: 800 }} aria-label="customized table" size="small">
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>Personal Information</StyledTableCell>
                                  <StyledTableCell align="right"></StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>

                                <StyledTableRow sx={{ height: '50%' }}>
                                  <StyledTableCell component="th" scope="row">
                                    First Name
                                  </StyledTableCell>
                                  <StyledTableCell align="right">{sailor_info.first_name ? sailor_info.first_name : ""}</StyledTableCell>

                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    Middle Name
                                  </StyledTableCell>
                                  <StyledTableCell align="right">{sailor_info.middle_name ? sailor_info.middle_name : ""}</StyledTableCell>

                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    Last Name
                                  </StyledTableCell>
                                  <StyledTableCell align="right">{sailor_info.last_name ? sailor_info.last_name : ""}</StyledTableCell>

                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    Age
                                  </StyledTableCell>
                                  <StyledTableCell align="right">{sailor_info.age ? sailor_info.age : ""}</StyledTableCell>

                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    Place of Birth
                                  </StyledTableCell>
                                  <StyledTableCell align="right">{sailor_info.place_of_birth ? sailor_info.place_of_birth : ""}</StyledTableCell>

                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    Marital Status
                                  </StyledTableCell>
                                  <StyledTableCell align="right">{sailor_info.marital_status ? sailor_info.marital_status : ""}</StyledTableCell>

                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    Country
                                  </StyledTableCell>
                                  <StyledTableCell align="right">{sailor_info.country ? sailor_info.country : ""}</StyledTableCell>

                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    Nationality
                                  </StyledTableCell>
                                  <StyledTableCell align="right">{sailor_info.nationality ? sailor_info.nationality : ""}</StyledTableCell>

                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    Mobile No
                                  </StyledTableCell>
                                  <StyledTableCell align="right">{sailor_info.mobile_number ? sailor_info.mobile_number : ""}</StyledTableCell>

                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    Address of Communication
                                  </StyledTableCell>
                                  <StyledTableCell align="right">{sailor_info.address ? sailor_info.address : ""}</StyledTableCell>

                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    Permanent Address
                                  </StyledTableCell>
                                  <StyledTableCell align="right">{sailor_info.permanent_address ? sailor_info.permanent_address : ""}</StyledTableCell>

                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    Emergency Contact Person
                                  </StyledTableCell>
                                  <StyledTableCell align="right">{sailor_info.emergency_person ? sailor_info.emergency_person : ""}</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    Emergency Contact Number
                                  </StyledTableCell>
                                  <StyledTableCell align="right">{sailor_info.emergency_number ? sailor_info.emergency_number : ""}</StyledTableCell>

                                </StyledTableRow>

                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TableContainer component={Paper}>
                            <Table sx={{ maxWidth: 800 }} aria-label="customized table" size="small">
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>Passport Info</StyledTableCell>
                                  <StyledTableCell align="right"></StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>

                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    Passport No
                                  </StyledTableCell>
                                  <StyledTableCell align="right">{sailor_info.passport_no ? sailor_info.passport_no : ""} <img src={tick} style={{ width: '27px' }} /></StyledTableCell>

                                </StyledTableRow>
                                {/* <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    Document
                                  </StyledTableCell>
                                  <StyledTableCell align="right">download</StyledTableCell>

                                </StyledTableRow> */}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          <TableContainer component={Paper}>
                            <Table sx={{ maxWidth: 800 }} aria-label="customized table" size="small">
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>Experience Details</StyledTableCell>
                                  <StyledTableCell align="right"></StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>

                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    Last Post Held
                                  </StyledTableCell>
                                  <StyledTableCell align="right">{sailor_info.post_held ? sailor_info.post_held : ""}</StyledTableCell>

                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    Year of Experience at last held
                                  </StyledTableCell>
                                  <StyledTableCell align="right">{sailor_info.last_held ? sailor_info.last_held : ""}</StyledTableCell>

                                </StyledTableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                          <TableContainer component={Paper}>
                            <Table sx={{ maxWidth: 800 }} aria-label="customized table" size="small">
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>Documents</StyledTableCell>
                                  <StyledTableCell align="right"></StyledTableCell>
                                  <StyledTableCell align="right"></StyledTableCell>
                                </TableRow>

                              </TableHead>
                              <TableBody>

                                {sailor_info.rows.map((resp, index) => (


                                  <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                      {resp.certificate}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{resp.issue_authority}</StyledTableCell>
                                    <StyledTableCell align="right"><a href="#">View</a></StyledTableCell>

                                  </StyledTableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          <TableContainer component={Paper}>
                            <Table sx={{ maxWidth: 800 }} aria-label="customized table" size="small">
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>Passport Verification</StyledTableCell>
                                  <StyledTableCell align="right"></StyledTableCell>
                                  <StyledTableCell align="right"></StyledTableCell>
                                </TableRow>

                              </TableHead>
                              <TableBody>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    <img src={passport_img} style={{ width: '100px' }} />
                                  </StyledTableCell>
                                  <StyledTableCell align="center"><Alert severity="success" className="alert-message" sx={{ fontSize: "18px", width: "130px", color: "#2e7d32", border: "red" }}>Face Match Verified</Alert></StyledTableCell>
                                  <StyledTableCell align="right"><img src={passport_img} style={{ width: '100px' }} /></StyledTableCell>

                                </StyledTableRow>

                              </TableBody>
                            </Table>
                          </TableContainer>

                          {/* <FormControlLabel control={<Checkbox onChange={(event) => Agreeterms(event)}  />}  label={<Typography sx={{ fontSize: 16 }}>
                                            By checking this box, I verify the accuracy of the information provided.
                                </Typography>
                                      } />
                          {Agree === false && <FormHelperText error style={{"color":"red"}}>* Please agree to terms and conditions for OnBoarding</FormHelperText>} */}


                        </Grid>
                        <Grid item sm={12} xs={12}>
                          <p className="agree"><FormControlLabel control={<Checkbox onChange={(event) => Agreeterms(event)} />} label="By checking this box, I verify the accuracy of the information provided" /></p>
                          {Agree === false && <FormHelperText error style={{ "color": "red" }}>* By checking this box, I verify the accuracy of the information provided</FormHelperText>}
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
                        ""
                      )}

                      <Button type="button" className="btn-org" onClick={AgreeNow}>
                        {activeStep === steps.length - 1 ? 'Onboard' : 'Next'}
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

                      <Alert severity="success" className="alert-message" sx={{
                        fontSize: "20px", padding: "35px 30px", fontWeight: "600",
                        color: "#2e7d32",
                      }}>All steps completed - you're finished</Alert>

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