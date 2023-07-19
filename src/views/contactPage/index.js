import React, { useState, useEffect } from "react";
import Topnav from "../../common/topNav";
import Footer from "../../common/footer";
import Banner from "../../components/banner";

function ContactPage() {
  const [bannerConfig, setbannerConfig] = useState({bannerType:3});
    return (
        <>
         <Topnav></Topnav> 
         <Banner config={bannerConfig}></Banner>
         <section className="about-section contact-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 contact-left">                        
                           <h2>Head Office (Coimbatore):</h2>
                           <p>AES Technologies (India) Pvt. Ltd. <br></br>
                            #5030, Second Floor, Sreevatsa Center,<br></br>
                            G.N. Mills Post, Mettupalayam Road,<br></br>
                            Coimbatore-641 029,<br></br>
                            Tamilnadu, India.</p>

                            <div class="enquiry-l">
                              <ul>
                                  <li><div class="enq-ico"><i class="icon ion-email"></i></div><div class="enq-txt"> <span>Inquiry </span> <a href="mailto:contact@advanceecomsolutions.com">contact@advanceecomsolutions.com</a></div></li>
                                  <li><div class="enq-ico"><i class="ion-android-call"></i></div><div class="enq-txt"> <span>Phone number </span><p>0422 3509222, +91 6384 474 817</p></div></li>
                                  <li><div class="enq-ico"><i class="ion-printer"></i></div><div class="enq-txt"> <span>Fax number </span><p>+91 422 2643942</p></div></li>
                              </ul>
                              </div>                        
                    </div>

                    <div className="col-lg-6 contact-right">
                        <div className="about-content">                           
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.6848588285457!2d76.94146131415194!3d11.062237256879499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f621847e2969%3A0x403cee32b269206b!2sAES+Technologies+India+Private+Limited!5e0!3m2!1sen!2sin!4v1491370217217" 
                        style={{ border: 0 }} 
                        allowfullscreen="" 
                        width="100%" 
                        height="450" 
                        frameborder="0">
                          </iframe>                           
                        </div>
                    </div>
                </div>
            </div>
        </section>
      

      <Footer></Footer>
      </>
    );
  }
  
  export default ContactPage;