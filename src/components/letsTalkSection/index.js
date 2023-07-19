import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import WOW from 'wowjs';
import image1 from "../../assets/images/product-bg.jpg";
import image2 from "../../assets/images/qualiy-bg.jpg";


function Letstalksection() {
  
  const wow = new WOW.WOW({live: false });

  return (
    <>
      
      {/* <!-- Let's talk start */}
     <section className="lets-talk pt-90 pb-80">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="text-center mb-80 talk-title wow fadeFromUp" data-wow-delay="300ms" data-wow-duration="800ms">
                        <div className="company-icon"><span></span></div>
                        
                        <div className="section-title">
                            <h4>Let's talk about how digital can work for your business.</h4>
                            <h2>Let's talk About your project</h2>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="contact-page-form wow fadeFromUp" data-wow-delay="400ms" data-wow-duration="800ms">
                        <form action="" className="contact-form-validated">
                            <div className="row">
                                <div className="col-xl-3 col-lg-3 col-md-6">
                                    <div className="form-item">
                                        <p className="formLabel">First Name <sup>*</sup></p>
                                        <input type="text" name="" id="" className="form-style" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6">
                                    <div className="form-item">
                                        <p className="formLabel">Last Name <sup>*</sup></p>
                                        <input type="text" name="" id="" className="form-style" />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-12">                                   
                                    <div className="form-item">
                                        <p className="formLabel">Organization</p>
                                        <input type="text" name="" id="" className="form-style" />
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6  col-md-12">
                                            <div className="col-xl-12 col-lg-12  col-md-12">
                                                <div className="form-item">
                                                    <p className="formLabel">Email Address <sup>*</sup></p>
                                                    <input type="text" name="" id="" className="form-style" />
                                                </div>                                                
                                            </div>
                                            <div className="col-xl-12 col-lg-12 col-md-12">
                                                <div className="form-item">
                                                    <p className="formLabel">Phone</p>
                                                    <input type="text" name="" id="" className="form-style" />
                                                </div>                                                  
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6">
                                            <div className="form-item">
                                                <p className="formLabel">Message or Project Description</p>
                                                <textarea className="form-style" ></textarea>
                                            </div>     

                                           
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12">
                                    <div className="btn-box text-center justify-content-center mt-20">
                                        <button type="submit" className="send-btn comment-btn">Send a message <i className="icon ion-arrow-right-c"></i></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>    
        </div>
    </section>
    {/* <!-- Let's talk end  */}


  

    </>
  );
}

export default Letstalksection;
