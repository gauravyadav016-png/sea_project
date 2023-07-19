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

function TopnavVoting(props) {

    const location = useLocation();
  
    return (
        <>

    <div className={location.pathname === '/' ? "header-area":"header-area position-relative"} >
        <div className="header-top-bar-info">
            <div className="container header-row">
                <div className="row">
                    <div className="col-md-12">                        
                        <div className="top-bar-wrap top-bar-vote">       
                          <div className="header__logo">                               
                               <Link to="/"><img src={ELogo} className="img-fluid light-logo" alt="" width="70" height="93"/>
                               <img src={ELogo1} className="img-fluid logo-txt" alt="" width="100" height="93"/>
                               </Link>                                      
                           </div>            
                            {/* <h1><span className="org-txt">One</span> <span className="grn-txt">Nation</span> <span className="org-txt">One</span> <span className="grn-txt">Election</span></h1>          */}
                            <div className="top-bar-right">                                
                                <ul className="top-bar-info">    
                                    {/* <li className="enquiry-btn"><Link to="/">Home</Link></li>  */}
                                </ul>
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
  
  export default TopnavVoting;