import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate  } from "react-router-dom";
import Topnav from "../../common/topNav";
import Footer from "../../common/footer";
import Banner from "../../components/banner";
//Calling WOWjs
import WOW from 'wowjs';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormHelperText } from "@mui/material";
import { red } from "@mui/material/colors";


function LandingPage() {

  const [bannerConfig, setbannerConfig] = useState({bannerType:2});

  const wow = new WOW.WOW(
    {
        live: false
    }
  );
  //api 
  const navigate = useNavigate();
  const [Agree, setAgree] = useState('')
  const [links,setLinks] = useState(null)
  const Agreeterms = (event) =>{
    
    if (event.target.checked === true){
        setAgree(true)
        setLinks("/evoting")
    } else {
        setAgree(false)
        setLinks(null)
    }
  }
  
  const VoteNow = () => {
    if(Agree === true){
        setLinks("/evoting")
    } else {
        setAgree(false)
        setLinks(null)
    }
  }

  return (
    <>
      <Topnav></Topnav>
      <Banner config={bannerConfig}></Banner>
      <section className="about-section">
            <div className="container">
                <div className="row">
                   <div className="col-lg-12">
                        <div className="advantage-content voting-disclaimer"> 
                           <h2>Terms and Conditions for Participating in e-Voting Process</h2> 
                           <p>By participating in the e-voting process, you acknowledge and agree to the following terms and conditions:</p>
                           <ul>                               
                               <li><span>Aadhar and Voter ID:</span> To participate in the e-voting process, you are required to provide either your Aadhar number or Voter ID number as a means of identification. 
                               Your personal information will be securely used for the purpose of verifying your eligibility to vote.</li> 
                              <li><span>Browser Location:</span> You will be prompted to enable browser location services in order to ensure that you are voting from within the designated voting area. This information will not be used for any other purpose. </li>
                              <li><span>Webcam Access:</span> You will be required to enable access to your webcam in order to verify your identity through facial recognition technology. This is necessary to prevent any fraudulent activity during the voting process. Your image will not be stored or used for any other purpose.</li>                          
                              <li>By agreeing to these terms and conditions, you understand and acknowledge that the e-voting process requires the use of your personal information and technology to ensure the integrity of the voting process. If you do not agree with these terms, you will not be able to participate in the e-voting process.</li>                                  
                           </ul>
                           <p className="agree"><FormControlLabel control={<Checkbox onChange={(event) => Agreeterms(event)}  />} label="Agree to Terms and Conditions for e-Voting Process" /></p>
                           {Agree === false && <FormHelperText error style={{"color":"red"}}>* Please agree to terms and conditions for e-Voting Process</FormHelperText>}
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="voting-landing"> 
                            <Link to={links} className="vote-btn" onClick={VoteNow}>Vote Now</Link>
                        </div>
                    </div>

                    {/* <div className="col-lg-6 pt-50">
                        <div className="about-content">
                            <span>PM on One Nation, One Election</span>
                            <h2>One nation, one election not a subject of debate but a <strong>necessity for India</strong></h2>
                            <p>Recently, the Prime Minister of India has addressed the concluding session of the 80 All
                            India Presiding Officers Conference via videoconference, at Kevadiya (Gujarat) on
                            the occasion of Constitution Day (26 November).</p>

                            <div className="about-text">
                                <div className="icon">
                                    <i className="ion-ios-lightbulb"></i>
                                </div>
                                <h3>Key Points</h3>
                                <p>The idea is about structuring the Indian election cycle in a manner so that
elections to the Lok Sabha and the State Assemblies are
synchronised together so that the election to both can be held within a
given span of time.</p>
                            </div>                            
                        </div>
                    </div> */}

                </div>
            </div>
        </section>
     
      <Footer></Footer>
    </>
  );
}

export default LandingPage;