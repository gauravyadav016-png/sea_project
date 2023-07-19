import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Topnav from "../../common/topNav";
import Footer from "../../common/footer";
import Banner from "../../components/banner";
//Calling WOWjs
import WOW from 'wowjs';

import ExpertiseSection from "./expertiseSection"
import OurProductSection from "./ourProductsSection";
import PartnerSection from "./PartnerSection";
import Parallaxbanner from "../../components/parallaxBanner";
import Letstalksection from "../../components/letsTalkSection";
import TestimonialSection from "./testimonialSection";

import AboutSection from "./aboutSection";


function HomePage() {

  const [bannerConfig, setbannerConfig] = useState({bannerType:1});

  const wow = new WOW.WOW(
    {
        live: false
    }
  );
  //api 



  return (
    <>
      <Topnav></Topnav>
      <Banner config={bannerConfig}></Banner>
      <AboutSection></AboutSection>

      {/* <ExpertiseSection></ExpertiseSection>
      <OurProductSection></OurProductSection>
      <PartnerSection></PartnerSection>
      <Parallaxbanner></Parallaxbanner>
      <Letstalksection></Letstalksection>
      <TestimonialSection></TestimonialSection> */}
      <Footer></Footer>
    </>
  );
}

export default HomePage;