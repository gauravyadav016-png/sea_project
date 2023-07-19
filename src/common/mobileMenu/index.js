import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

function Mobilemenu() {
  

    return (
      <>
           {/* <!-- ========== mobile menu starts ========== --> */}
    <div className="menu-drawer">
        <ul className="accordion">
            <li>
                <a id="top" className="toggle" href="#">Services</a>
                <ul className="inner">
                    <li>
                        <a href="#" className="toggle"> Application Development & Maintenance</a>
                        <ul className="inner"> 
                            <li><a href="#">ERM</a></li>
                            <li><a href="#">CRM</a></li>                            
                          
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="toggle"> Digital/ Cloud Transformation</a>
                        <ul className="inner">
                            <li><a href="#">IaaS</a></li>
                            <li><a href="#">PaaS</a></li>
                            <li><a href="#">SaaS</a></li>
                            <li><a href="#">Public & Private Cloud</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="toggle"> DevOps / Cloud Hosting</a>
                        <ul className="inner">
                            <li><a href="#">Automation</a></li>
                            <li><a href="#">Implementation</a></li>
                        </ul>
                    </li>

                    <li>
                        <a href="#" className="toggle"> Custom App Development </a>
                        <ul className="inner">
                            <li><a href="#">Application Development</a></li>
                            <li><a href="#">Maintenance</a></li>
                            <li><a href="#">Support</a></li>
                            <li><a href="#">Testing Services</a></li>
                        </ul>
                    </li>

                    <li>
                        <a href="#" className="toggle"> Mobile Application Development </a>
                        <ul className="inner">
                            <li><a href="#">Android App Development</a></li>
                            <li><a href="#">iOS App Development</a></li>
                            <li><a href="#">Cross Platform App Development</a></li>
                            <li><a href="#">Testing Services</a></li>  
                        </ul>
                    </li>

                    <li>
                        <a href="#" className="toggle">  Website Development </a>
                        <ul className="inner">
                            <li><a href="#">ECommerce</a></li>
                            <li><a href="#">News & Magazines</a></li>
                            <li><a href="#">Corporate</a></li>
                            <li><a href="#">Directory and Contacts</a></li>
                        </ul>
                    </li>

                    <li>
                        <a href="#" className="toggle">Data & Analytics </a>
                        <ul className="inner">
                            <li><a href="#">Big Data</a></li>
                            <li><a href="#">Business Intelligence</a></li>
                        </ul>
                    </li>

                    <li>
                        <a href="#" className="toggle"> Artificial Intelligence </a>
                        <ul className="inner">
                            <li><a href="#">Machine Learning</a></li>
                            <li><a href="#">Deep Learning</a></li>
                        </ul>
                    </li>

                    <li>
                        <a href="#" className="toggle">  Digital Marketing</a>
                        <ul className="inner">
                            <li><a href="#">SEO</a></li>
                            <li><a href="#">SMO</a></li>
                        </ul>
                    </li>

                    <li>
                        <a href="#" className="toggle"> 3D Product Configurator </a>
                        <ul className="inner">
                            <li><a href="#">3D Visualization</a></li>
                            <li><a href="#">3D for eCommerce</a></li>
                            <li><a href="#">3D & AR Viewer</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>
                <a className="toggle" href="#">Products</a>
                <ul className="inner">
                    <li><a href="#"> I.C.E Apple</a></li>
                    <li><a href="#"> Flamingo</a></li>
                    <li><a href="#"> TexSavvy</a></li>
                    <li><a href="#"> AdvanCRM</a></li>
                    <li><a href="#"> Brainstem</a></li>
                    <li><a href="#"> blubery</a></li>
                </ul>
            </li>
            <li>
                <a className="toggle" href="#">Insights</a>
                <ul className="inner">
                    <li>
                        <a href="#" className="toggle"> About Us</a>
                        <ul className="inner"> 
                            <li><a href="#">Our Values</a></li>
                            <li><a href="#">AES Team</a></li>
                            <li><a href="#">Awards & Recognitions</a></li>
                            <li><a href="#">Engagement Model</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="toggle"> Careers</a>
                        <ul className="inner">
                            <li><a href="#">Why Join Us?</a></li>
                            <li><a href="#">Current Openings</a></li>
                            <li><a href="#">Interview Process</a></li>
                            <li><a href="#">Engagement Model</a></li>
                            <li><a href="#">Life @ AES</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="toggle"> Engagements</a>
                        <ul className="inner">
                            <li><a href="#">Partner & Alliances</a></li>
                            <li><a href="#">Testimonials</a></li>
                            <li><a href="#">Industries</a></li>
                        </ul>
                    </li>

                    <li>
                        <a href="#" className="toggle"> Resources </a>
                        <ul className="inner">
                            <li><a href="#">Brochures</a></li>
                            <li><a href="#">Case Studies</a></li>
                            <li><a href="#">Client Testimonials</a></li>
                            <li><a href="#">Newsletters</a></li>
                            <li><a href="#">Whitepapers</a></li>
                            <li><a href="#">News</a></li>
                            <li><a href="#">Events</a></li>
                            <li><a href="#">Blogs</a></li>
                        </ul>
                    </li>                    
                </ul>
            </li>
            <li>
                <a className="toggle" href="#">About</a>  
                <ul className="inner">
                    <li><a href="#"><span>Why AES</span></a></li>
                    <li><a href="#"><span>Management team</span></a></li>
                    <li><a href="#"><span>Our Values</span></a></li>
                    <li><a href="#"><span>Technical Expertise</span></a></li>
                    <li><a href="#"><span>Infrastructure</span></a></li>
                    <li><a href="#"><span>Engagement Model</span></a></li>
                    <li><a href="#"><span>Communication Model</span></a></li>
                    <li><a href="#"><span>Become a Partner</span></a></li>
                    <li><a href="#"><span>Clients</span></a></li>        
                </ul>              
            </li>
        </ul>
        <div className="clearfix"></div>

        <div className="mb-mail">
            <div className="addr-title">
                <div className="addr-icon mail"><i className="icon ion-ios-email-outline"></i></div>
                <a href="#">contact@advanceecomsolutions.com</a>
            </div>
        </div>
        <div className="clearfix"></div>
        <div className="ftr-social-links mob-social-link">
            <h3>Follow Us on</h3>
            <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
            <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
            <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
            <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
            <a href="#"><i className="fa fa-youtube-play" aria-hidden="true"></i></a>
        </div>

    </div>
    {/* <!-- ========== mobile menu ends ========== --> */}

      </>
    );
  }
  
  export default Mobilemenu;