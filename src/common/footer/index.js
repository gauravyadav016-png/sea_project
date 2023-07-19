import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import ScrollDownImage from "../../assets/images/scroll-down.svg";

import FooterBGImage from "../../assets/images/footer-bg.jpg";

 
// const styles = createUseStyles({
//     footer : {
//       background: url(../../src/assets/images/footer-bg.jpg) no-repeat 0 0,
//       backgroundAttachment: fixed,
//       backgroundSize: cover,
//       backgroundPosition: center,
//     }
//   });


function Footer() {
    
      //const classes = styles()

    return (
      <>
        {/* <!-- footer start --> */}
    <footer className="footer pt-20 pb-20 colorchange"
      >
      <div className="container">
          <div className="row justify-content-center">
              {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 border-end">
                  <div className="footer-widget">
                      <h4 className="widget-title">SERVICES <span></span></h4>
                      <ul>
                          <li><a href="/">Application Development & Maintenance</a></li>
                          <li><a href="/">Application Managed Services</a></li>
                          <li><a href="/">Infrastructure Management Services</a></li>
                          <li><a href="/">Solution Integration</a></li>
                          <li><a href="/">ECommerce</a></li>
                          <li><a href="/">Digital Marketing</a></li>
                          <li><a href="/">Digital / Cloud Transformation</a></li>
                          <li><a href="/">3D Product Configurator</a></li>
                      </ul>
                  </div>
              </div>
              <div className="col-xl-4 col-lg-3 col-md-6 col-sm-12 border-end footer-col-2">
                  <div className="footer-widget">
                      <h4 className="widget-title">INDUSTRIES WE SERVE <span></span></h4>
                      <ul>
                          <li><a href="/">Banking and Financial Services</a></li>
                          <li><a href="/">Manufacturing</a></li>
                          <li><a href="/">Healthcare</a></li>
                          <li><a href="/">Logistics</a></li>
                          <li><a href="/">Real Estate and Property Management</a></li>
                          <li><a href="/">Travel and Hospitality</a></li>
                          <li><a href="/">Insurance</a></li>
                          <li><a href="/">Education</a></li>
                          <li><a href="/">Retail & Wholesale</a></li>
                      </ul>
                  </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 border-end footer-col-3">
                  <div className="footer-widget">
                      <h4 className="widget-title">INSIGHTS <span></span></h4>
                      <ul>
                          <li><a href="/">Resources</a></li>
                          <li><a href="/">Brochures</a></li>
                          <li><a href="/">Case Studies</a></li>
                          <li><a href="/">Client Testimonials</a></li>
                          <li><a href="/">Newsletters</a></li>
                          <li><a href="/">Whitepapers</a></li>
                          <li><a href="/">News</a></li>
                          <li><a href="/">Events</a></li>
                          <li><a href="/">Blogs</a></li>
                      </ul>
                  </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 footer-col-4">
                  <div className="footer-widget">
                      <h4 className="widget-title">CAREERS <span></span></h4>
                      <ul>
                          <li><a href="/">Careers</a></li>
                          <li><a href="/">Why Join Us?</a></li>
                          <li><a href="/">Current Job Openings</a></li>
                          <li><a href="/">Interview Process</a></li>
                          <li><a href="/">Life @ AES</a></li>
                      </ul>
                  </div>
              </div> */}
              <div className="nav col-xl-12 col-lg-12 ftr-btm">
                  {/* <div className="nav col-xl-7 col-lg-7 col-md-6 col-sm-12 my-auto ftr-pad">
                      <div className="nav col-xl-6 col-lg-6 ftr-addr">
                          <div className="addr-icon phone"><i className="icon ion-ios-telephone-outline"></i></div>
                          <div className="addr-title">
                              <p>Phone</p>
                              <a href="/">(+91) 422 4229100-98</a>
                          </div>
                      </div>
                      <div className="nav col-xl-6 col-lg-6 ftr-mail">
                          <div className="addr-icon mail"><i className="icon ion-ios-email-outline"></i></div>
                          <div className="addr-title">
                              <p>Email Id</p>
                              <a href="/">contact@advanceecomsolutions.com</a>
                          </div>
                      </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12 ftr-social">
                      <div className="ftr-social-links mb-15">
                          <a href="/"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                          <a href="/"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                          <a href="/"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                          <a href="/"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                          <a href="/"><i className="fa fa-youtube-play" aria-hidden="true"></i></a>
                      </div>
                      <p className="copy-rights float-end">Copyright &copy; 2022 AES Technologies (India) Pvt. Ltd</p>
                  </div> */}

                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ftr-social">                     
                      <p className="copy-rights text-center mb-0">Copyright &copy; 2023 Sailor Onboarding</p>
                  </div>
              </div>
          </div>
      </div>
    </footer>
    {/* <!-- footer end -->

    <!-- ========== Scroll To Top starts ========== --> */}
     {/* <div className="scroll-to-top">
        <img src={ScrollDownImage} id="reload" alt="scroll"/>
        <div id="scrollPercentLabel"><span>0</span>%</div>
    </div> */}
    {/* <!-- Scroll To Top ends--> */}

   

      </>
    );
  }
  
  export default Footer;