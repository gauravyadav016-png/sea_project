import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

function Mainmenu() {
  

    return (
      <>
           <div className="header-right">
                                {/* <!-- navigation menu --> */}
                                <div className="header__navigation">
                                    <nav className="navigation-menu">

                                        <ul>
                                            <li className="has-children has-children--multilevel-submenu"> 
                                            {/* <!--active-->  */}
                                            <Link to="/evoting"><span>E-Voting</span></Link>
                                                {/* <!-- mega menu --> */}
                                                <div className="megamenu megamenu--mega">
                                                    <div className="container">
                                                        <div className="fullwidth col-lg-12 float-start">
                                                            <ul>
                                                                <li>
                                                                    <h2 className="page-list-title"><i className="ion-ios-play-outline"></i> Application Development & Maintenance</h2>
                                                                    <ul>
                                                                        <li><a href=" #"><span>Custom App Development</span></a></li>
                                                                        <li><a href=" #"><span>Mobile App Development</span></a></li>
                                                                        <li><a href=" #"><span>Cross Platform App Development</span></a></li>
                                                                        <li><a href=" #"><span>Testing Services</span></a></li>
                                                                        <li><a href=" #"><span>ERM</span></a></li>
                                                                        <li><a href=" #"><span>CRM</span></a></li>
                                                                    </ul>
                                                                </li> 
                                                                
                                                                <li>
                                                                    <h2 className="page-list-title"><i className="ion-ios-play-outline"></i> Application Managed Services</h2>
                                                                    <ul>
                                                                        <li><a href=" #"><span>Property Management</span></a></li>
                                                                        <li><a href=" #"><span>Manufacturing</span></a></li>
                                                                        <li><a href=" #"><span>Healthcare</span></a></li>
                                                                        <li><a href=" #"><span>Education</span></a></li>
                                                                        <li><a href=" #"><span>Real Estate</span></a></li>
                                                                    </ul>
                                                                </li> 

                                                                <li>
                                                                    <h2 className="page-list-title"><i className="ion-ios-play-outline"></i> Infrastructure Management Services</h2>
                                                                    <ul>
                                                                        <li><a href=" #"><span>Cloud Hosting - AWS, Azure, GCP</span></a></li>
                                                                        <li><a href=" #"><span>Automation and Process Monitoring</span></a></li>
                                                                    </ul>
                                                                </li> 

                                                                <li>
                                                                    <h2 className="page-list-title"><i className="ion-ios-play-outline"></i> Solution Integration</h2>
                                                                    <ul>
                                                                        <li><a href=" #"><span>Enterprise Website Development</span></a></li>
                                                                        <li><a href=" #"><span>Enterprise CMS - Wordpress</span></a></li>
                                                                        <li><a href=" #"><span>Salesforce</span></a></li>
                                                                        <li><a href=" #"><span>Yardi</span></a></li>
                                                                        <li><a href=" #"><span>Microsoft Dynamics</span></a></li>
                                                                        <li><a href=" #"><span>Dell Boomi</span></a></li>
                                                                        <li><a href=" #"><span>UiPath</span></a></li>
                                                                    </ul>
                                                                </li> 

                                                                <li>
                                                                    <h2 className="page-list-title"><i className="ion-ios-play-outline"></i> Website Development</h2>
                                                                    <ul>
                                                                        <li><a href=" #"><span>ECommerce</span></a></li>
                                                                        <li><a href=" #"><span>Magento</span></a></li>
                                                                        <li><a href=" #"><span>Opencart</span></a></li>
                                                                        <li><a href=" #"><span>Ultra (Slatwall) Commerce</span></a></li>
                                                                        <li><a href=" #"><span>Shopify</span></a></li>
                                                                    </ul>
                                                                </li> 

                                                                <li>
                                                                    <h2 className="page-list-title"><i className="ion-ios-play-outline"></i> Digital Marketing</h2>
                                                                    <ul>
                                                                        <li><a href=" #"><span>Search Engine Optimization</span></a></li>
                                                                        <li><a href=" #"><span>Social Media Optimization</span></a></li>
                                                                    </ul>
                                                                </li>   

                                                                <li>
                                                                    <h2 className="page-list-title"><i className="ion-ios-play-outline"></i> Digital / Cloud Transformation</h2>
                                                                    <ul>
                                                                        <li><a href=" #"><span>IaaS / PaaS / SaaS</span></a></li>
                                                                        <li><a href=" #"><span>Cloud Security</span></a></li>
                                                                        <li><a href=" #"><span>Artificial Intelligence</span></a></li>
                                                                        <li><a href=" #"><span>Deep Learning</span></a></li>
                                                                        <li><a href=" #"><span>Robotics Process Automation</span></a></li>
                                                                        <li><a href=" #"><span>Data & Analytics</span></a></li>
                                                                        <li><a href=" #"><span>Big Data</span></a></li>
                                                                        <li><a href=" #"><span>Business Intelligence</span></a></li>
                                                                        <li><a href=" #"><span>DevOps</span></a></li>
                                                                    </ul>
                                                                </li>   

                                                                <li>
                                                                    <h2 className="page-list-title"><i className="ion-ios-play-outline"></i> 3D Product Configurator</h2>
                                                                    <ul>
                                                                        <li><a href=" #"><span>3D Visualization</span></a></li>
                                                                        <li><a href=" #"><span>3D for eCommerce</span></a></li>
                                                                        <li><a href=" #"><span>3D & AR Viewer</span></a></li>
                                                                    </ul>
                                                                </li>   

                                                              
                                                            </ul>                                                        
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </li>                                        
                                            <li className="has-children">
                                                <a href="#"><span>Products</span></a>
                                                {/* <!-- mega menu --> */}
                                                <div className="megamenu megamenu--mega">
                                                    <div className="container">
                                                        <div className="menu-lft col-lg-8 float-start">
                                                            <ul>
                                                                <li>
                                                                    <h2 className="page-list-title"><i className="ion-ios-play-outline"></i> I.C.E Apple</h2>
                                                                    <ul>
                                                                        <li><a href=" #"><span>Hospital Management Software</span></a></li>
                                                                    </ul>
                                                                </li>   
                                                                <li>
                                                                    <h2 className="page-list-title"><i className="ion-ios-play-outline"></i> Flamingo</h2>
                                                                    <ul>
                                                                        <li><a href=" #"><span>Human Resource Management System</span></a></li>
                                                                    </ul>
                                                                </li>   
                                                                <li>
                                                                    <h2 className="page-list-title"><i className="ion-ios-play-outline"></i> TexSavvy</h2>
                                                                    <ul>
                                                                        <li><a href=" #"><span>A Complete Textile ERP Solution</span></a></li>
                                                                    </ul>
                                                                </li>   
                                                                <li>
                                                                    <h2 className="page-list-title"><i className="ion-ios-play-outline"></i> AdvanCRM</h2>
                                                                    <ul>
                                                                        <li><a href=" #"><span>Hospital Management Software</span></a></li>
                                                                    </ul>
                                                                </li>   
                                                                <li>
                                                                    <h2 className="page-list-title"><i className="ion-ios-play-outline"></i> Brainstem</h2>
                                                                    <ul>
                                                                        <li><a href=" #"><span>Education ERP</span></a></li>
                                                                    </ul>
                                                                </li>   
                                                                <li>
                                                                    <h2 className="page-list-title"><i className="ion-ios-play-outline"></i> blubery</h2>
                                                                    <ul>
                                                                        <li><a href=" #"><span>Secondary Sales Management System</span></a></li>
                                                                    </ul>
                                                                </li>   
                                                            </ul>                                                        
                                                        </div>
                                                        <div className="menu-rht col-lg-3 float-end">
                                                            <img src="../src/assets/images/menu-img.jpg"/>
                                                            <p className="grow-txt mt-20 mb-20">Grow your <span>Business</span></p>
                                                            <div className="contact-btn"><a href=" #">Contact Us <i className="icon ion-arrow-right-c"></i></a></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="has-children">
                                                <a href="#"><span>Insights</span></a>
                                                {/* <!-- mega menu --> */}
                                                <ul className="megamenu megamenu--mega">
                                                    <div className="container">
                                                        <div className="menu-lft col-lg-8 float-start">
                                                            <ul>
                                                                <li>
                                                                    <h2 className="page-list-title"><i className="ion-ios-play-outline"></i> About Us</h2>
                                                                    <ul>
                                                                        <li><a href=" #"><span>Our Values</span></a></li>
                                                                        <li><a href=" #"><span>AES Team</span></a></li>
                                                                        <li><a href=" #"><span>Awards & Recognitions</span></a></li>
                                                                        <li><a href=" #"><span>Engagement Model</span></a></li>
                                                                        <li><a href=" #"><span>Privacy Policy</span></a></li>
                                                                    </ul>
                                                                </li>   
                                                                <li>
                                                                    <h2 className="page-list-title"><i className="ion-ios-play-outline"></i> Careers</h2>
                                                                    <ul>
                                                                        <li><a href=" #"><span>Why Join Us?</span></a></li>
                                                                        <li><a href=" #"><span>Current Openings</span></a></li>
                                                                        <li><a href=" #"><span>Interview Process</span></a></li>
                                                                        <li><a href=" #"><span>Engagement Model</span></a></li>
                                                                        <li><a href=" #"><span>Life @ AES</span></a></li>
                                                                    </ul>
                                                                </li>   
                                                                <li>
                                                                    <h2 className="page-list-title"><i className="ion-ios-play-outline"></i> Engagements</h2>
                                                                    <ul>
                                                                        <li><a href=" #"><span>Partner & Alliances</span></a></li>
                                                                        <li><a href=" #"><span>Testimonials</span></a></li>
                                                                        <li><a href=" #"><span>Industries</span></a></li>
                                                                    </ul>
                                                                </li>   
                                                                <li className="menu-width">
                                                                    <h2 className="page-list-title"><i className="ion-ios-play-outline"></i> Resources</h2>
                                                                    <ul>
                                                                        <li><a href=" #"><span>Brochures</span></a></li>
                                                                        <li><a href=" #"><span>Case Studies</span></a></li>
                                                                        <li><a href=" #"><span>Client Testimonials</span></a></li>
                                                                        <li><a href=" #"><span>Newsletters</span></a></li>
                                                                        <li><a href=" #"><span>Whitepapers</span></a></li>
                                                                        <li><a href=" #"><span>News</span></a></li>
                                                                        <li><a href=" #"><span>Events</span></a></li>
                                                                        <li><a href=" #"><span>Blogs</span></a></li>
                                                                    </ul>
                                                                </li>   
                                                              
                                                            </ul>                                                        
                                                        </div>
                                                        <div className="menu-rht col-lg-3 float-end">
                                                            <img src="../src/assets/images/menu-img.jpg"/>
                                                            <p className="grow-txt mt-20 mb-20">Grow your <span>Business</span></p>
                                                            <div className="contact-btn"><a href=" #">Contact Us <i className="icon ion-arrow-right-c"></i></a></div>
                                                        </div>
                                                    </div>
                                                </ul>
                                            </li>
                                            <li className="has-children has-children--multilevel-submenu">
                                                <Link to="/"><span>About</span></Link>
                                                 {/* <!-- mega menu --> */}
                                                 <ul className="megamenu megamenu--mega">
                                                    <div className="container">45
                                                        <div className="menu-lft col-lg-8 float-start">
                                                            <ul>                                                                
                                                                <li className="menu-width">
                                                                    <h2 className="page-list-title"><i className="ion-ios-play-outline"></i> Who We Are</h2>
                                                                    <ul>
                                                                        <li><a href=" #"><span>Why AES</span></a></li>
                                                                        <li><a href=" #"><span>Management team</span></a></li>
                                                                        <li><a href=" #"><span>Our Values</span></a></li>
                                                                        <li><a href=" #"><span>Technical Expertise</span></a></li>
                                                                        <li><a href=" #"><span>Infrastructure</span></a></li>
                                                                        <li><a href=" #"><span>Engagement Model</span></a></li>
                                                                        <li><a href=" #"><span>Communication Model</span></a></li>
                                                                        <li><a href=" #"><span>Become a Partner</span></a></li>
                                                                        <li><a href=" #"><span>Clients</span></a></li>                                                                        
                                                                    </ul>
                                                                </li>   
                                                              
                                                            </ul>                                                        
                                                        </div>
                                                        <div className="menu-rht col-lg-3 float-end">
                                                            <img src="../src/assets/images/menu-img.jpg"/>
                                                            <p className="grow-txt mt-20 mb-20">Grow your <span>Business</span></p>
                                                            <div className="contact-btn"><a href=" #">Contact Us <i className="icon ion-arrow-right-c"></i></a></div>
                                                        </div>
                                                    </div>
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>

                                <div className="header-search">
                                    {/* <form action="#" className=""> */}
                                        <div className="search-icon">
                                            <a href="">
                                                <i className="ion-ios-search-strong"></i>
                                            </a>
                                        </div>

                                        <div className="search-wrap">
                                            <div className="search-inner">
                                                <i id="search-close" className="icon ion-android-close"></i>
                                                <div className="search-cell">
                                                    {/* <form action="#">
                                                        <div className="search-field-holder">
                                                           
                                                            <input className="main-search-input" type="search" placeholder="Search Your Keyword..."/>
                                                        </div>
                                                    </form> */}
                                                </div>
                                            </div>
                                        </div>

                                    {/* </form> */}
                                </div>

                                
                                <div className="mobile-navigation-icon white-md-icon d-block d-xl-none" id="mobile-menu-trigger">
                                    <i></i>
                                </div>
                            </div>

      </>
    );
  }
  
  export default Mainmenu;