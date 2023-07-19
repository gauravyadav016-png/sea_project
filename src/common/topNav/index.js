import React, { useState, useEffect } from "react";
import { Outlet, Link,useLocation } from "react-router-dom";
import Logo from "../../assets/images/aes-logo.png";
import indiaFlag from "../../assets/images/india-flag.png";
import arabFlag from "../../assets/images/arab.png";
import germanyFlag from "../../assets/images/germany.png";
import portugalFlag from "../../assets/images/portugal.png";
import ELogo from "../../assets/images/sailor/logo.svg";
import ELogo1 from "../../assets/images/sailor/sailoronboard.svg";

import Mainmenu from "../mainMenu";
import Mobilemenu from "../mobileMenu";

function Topnav(props) {

    const location = useLocation();
  
    return (
        <>

    <div className={location.pathname === '/' ? "header-area":"header-area position-relative"} >
        <div className="header-top-bar-info">
            <div className="container header-row">
                <div className="row">
                    <div className="col-md-12">                        
                        <div className="top-bar-wrap">       
                        <div className="header__logo">                               
                               <Link to="/"><img src={ELogo} className="img-fluid light-logo" alt="" width="70" />
                                <img src={ELogo1} className="img-fluid logo-txt" alt="" width="100" height="93"/>                               
                               </Link>
                           </div>                     
                            <div className="top-bar-right">                                
                                <ul className="top-bar-info">
                                    {/* <li><Link to="/evoting">E-Voting</Link></li> */}
                                    <li><a href="#">Complaints</a></li>
                                    <li><Link to="/contact">Contact Us</Link></li>
                                    {/* <li className="enquiry-btn"><a href="#">Login</a></li> */}
                                    {/* <li className="register-btn"><Link to="/registration">Register</Link></li> */}
                                    <li className="enquiry-btn"><Link to="/voting">E-Voting</Link></li>
                                </ul>


                                {/* <div className="language">
                                    <ul className="language-area">
                                        <li className="language-item-top">
                                            <a href="#" className="language-bar">
                                                <i className="ion-ios-world-outline mr-10"></i><span>Language</span>		
                                            </a>
    
                                            <ul className="language-item-bottom">
                                                <li className="language-item">
                                                    <a href="#" className="language-link">
                                                        <img src={indiaFlag} alt="Image"/>English
                                                    </a>
                                                </li>
                                                <li className="language-item">
                                                    <a href="#" className="language-link">
                                                        <img src={arabFlag} alt="Image"/>العربيّة
                                                    </a>
                                                </li>
                                                <li className="language-item">
                                                    <a href="#" className="language-link">
                                                        <img src={germanyFlag} alt="Image"/>Deutsch
                                                    </a>
                                                </li>
                                                <li className="language-item">
                                                    <a href="#" className="language-link">
                                                        <img src={portugalFlag} alt="Image"/> 󠁥󠁮󠁧󠁿Português
                                                    </a>
                                                </li>                                                
                                            </ul>
                                        </li>
                                    </ul>
                                </div> */}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="header-bottom-wrap header-sticky">
            <div className="container header-row">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="header">                           
                            <a className="toggle-menu" href="#"><i></i> <i></i> <i></i></a>  
                           
                            {/* <div className="header__logo">
                               
                                <Link to="/"><img src={Logo} className="img-fluid light-logo" alt="" width="160" height="48"/></Link>

                            </div> */}

                            {/* <Mainmenu></Mainmenu>   */}
                             
                            <Mobilemenu></Mobilemenu> 
                         
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    
       
  
        <Outlet />
      </>
    );
  }
  
  export default Topnav;