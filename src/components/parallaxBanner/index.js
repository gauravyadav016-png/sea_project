import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Parallax } from 'react-parallax';
import WOW from 'wowjs';
import image1 from "../../assets/images/product-bg.jpg";
import image2 from "../../assets/images/qualiy-bg.jpg";


function Parallaxbanner() {
  
  const wow = new WOW.WOW({live: false });

  return (
    <>
      
      {/* <div className="parallax-container parallax-cnt-left clearfix colorchange" data-color="color" data-parallax="scroll" data-position="top" data-bleed="10" data-image-src={image1} data-natural-width="2000" data-natural-height="1152"> */}
      <Parallax  bgImage={image1} bgImageAlt="the cat" strength={200}>
        <div className="container">
          <div className="col-lg-7 float-start parallax-cnt wow fadeFromUp" data-wow-delay="300ms" data-wow-duration="800ms">
            <h1>Taking Care of Your Digital Products.</h1>
            <p>As an application development company, we help enterprise overcome the challenge of developing cutting-edge custom enterprise and customer facing business application.</p>
            <Link to="/"> Read more <i className="icon ion-arrow-right-c"></i></Link>
          </div>
        </div>
        </Parallax>
  
      <Parallax  bgImage={image2} bgImageAlt="the cat" strength={200}>
        <div className="container">
            <div className="float-end parallax-cnt parallax-cnt-rht wow fadeFromUp" data-wow-delay="300ms" data-wow-duration="800ms">
                <h1>Experience.<br/>  Quality.<br/>  Delivery.</h1>
                <p>Committed to delivering excellence</p>
                <Link to="/">Get started <i className="icon ion-arrow-right-c"></i></Link>
            </div>

            <div className="parallax-btm">
                <p>Web.<br/>  mobile.<br/> Cloud.<br/> SEO</p>
                <div className="triangle">
                </div>
            </div>
        </div>
      </Parallax>


  

    </>
  );
}

export default Parallaxbanner;
