import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import image1 from "../../assets/images/digital-banner1.jpg";
import image2 from "../../assets/images/app-development-maintenance.jpg";
import image3 from "../../assets/images/application-managed-services.jpg";
import image4 from "../../assets/images/cloud-transfer.jpg";
import image5 from "../../assets/images/solution-integration.jpg";
import image6 from "../../assets/images/digital-marketing-banner.jpg";
import image7 from "../../assets/images/e-commer-2.jpg";
import image8 from "../../assets/images/about-banner.jpg";

import image9 from "../../assets/images/election-banner1.jpg";
import image10 from "../../assets/images/election-banner2.jpg";
import image13 from "../../assets/images/election-banner3.jpg";
import image11 from "../../assets/images/about.jpg";
import image12 from "../../assets/images/contact-banner1.jpg";

import image15 from "../../assets/images/election-banner7.jpg";
import image14 from "../../assets/images/election-banner6.jpg";
import image19 from "../../assets/images/election-banner5.jpg";

import image17 from "../../assets/images/about-ban1.jpg";
import image18 from "../../assets/images/banner-new.jpg";

import ban1 from "../../assets/images/banner-1.png";
import ban2 from "../../assets/images/banner-2.png";
import ban3 from "../../assets/images/banner-3.png";


import AOS from 'aos';
import $ from 'jquery';
import WOW from 'wowjs';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCreative, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const wow = new WOW.WOW(
  {
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: true,
    live: false
  }
);

function Banner(props) {
  const [bannerType, setbannerType] = useState(0);
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
    });
    wow.init();
    //console.log(wow);
    // console.log("banner-->", props.config.bannerType);
    setbannerType(props.config.bannerType);
  }, props);




  return (
    <>

      {/* start of hero */}
      {bannerType == 1 ? (
        <section className="wpo-hero-slider">
          <div className="swiper-container">


            <Swiper className="swiper-wrapper"
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCreative, Virtual]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
              }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
            >
              <SwiperSlide className="swiper-slide">
                <div
                  className="slide-inner slide-bg-image"
                  data-background={image1}
                  style={{ backgroundImage: `url(${ban1})` }}
                >
                  {/* <div className="container-fluid">
                    <div className="slide-content">
                      <div data-swiper-parallax="300" className="slide-title">
                        <h2>
                          <span>Digital</span> Transformation Solution
                        </h2>
                      </div>
                      <div data-swiper-parallax="400" className="slide-text">
                        <p>
                          Integrating AI/ML to your system made easy with our
                          Digital Transformation solutions.{" "}
                        </p>
                      </div>
                      <div className="clearfix"></div>
                      <div data-swiper-parallax="500" className="slide-btns">
                        <a href="about.html" className="theme-btn">
                          <i className="ion-android-arrow-forward"></i>
                        </a>
                      </div>
                    </div>
                  </div> */}
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div
                  className="slide-inner slide-bg-image"
                  style={{ backgroundImage: `url(${ban2})` }}
                >
                  {/* <div className="container-fluid">
                    <div className="slide-content">
                      <div data-swiper-parallax="300" className="slide-title">
                        <h2>
                          <span>Application</span> Development Maintenance
                        </h2>
                      </div>
                      <div data-swiper-parallax="400" className="slide-text">
                        <p>
                          We help develop and deliver a cutting-edge custom
                          application development for all your business needs.{" "}
                        </p>
                      </div>
                      <div className="clearfix"></div>
                      <div data-swiper-parallax="500" className="slide-btns">
                        <a href="about.html" className="theme-btn">
                          <i className="ion-android-arrow-forward"></i>
                        </a>
                      </div>
                    </div>
                  </div> */}
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div
                  className="slide-inner slide-bg-image"
                  style={{ backgroundImage: `url(${ban3})` }}
                >
                  {/* <div className="container-fluid">
                    <div className="slide-content">
                      <div data-swiper-parallax="300" className="slide-title">
                        <h2>
                          <span>Application</span> Development Maintenance
                        </h2>
                      </div>
                      <div data-swiper-parallax="400" className="slide-text">
                        <p>
                          We help develop and deliver a cutting-edge custom
                          application development for all your business needs.{" "}
                        </p>
                      </div>
                      <div className="clearfix"></div>
                      <div data-swiper-parallax="500" className="slide-btns">
                        <a href="about.html" className="theme-btn">
                          <i className="ion-android-arrow-forward"></i>
                        </a>
                      </div>
                    </div>
                  </div> */}
                </div>
              </SwiperSlide>
              {/* <SwiperSlide className="swiper-slide">
                <div
                  className="slide-inner slide-bg-image"
                  style={{ backgroundImage: `url(${image3})` }}
                >
                  <div className="container-fluid">
                    <div className="slide-content">
                      <div data-swiper-parallax="300" className="slide-title">
                        <h2>
                          <span>Application</span> Managed Services
                        </h2>
                      </div>
                      <div data-swiper-parallax="400" className="slide-text">
                        <p>
                          We fine tune your business applications, manage
                          performance and achieve better business results.{" "}
                        </p>
                      </div>
                      <div className="clearfix"></div>
                      <div data-swiper-parallax="500" className="slide-btns">
                        <a href="about.html" className="theme-btn">
                          <i className="ion-android-arrow-forward"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div
                  className="slide-inner slide-bg-image"
                  style={{ backgroundImage: `url(${image4})` }}
                >
                  <div className="container-fluid">
                    <div className="slide-content">
                      <div data-swiper-parallax="300" className="slide-title">
                        <h2>
                          <span>Infrastructure</span> Management Services
                        </h2>
                      </div>
                      <div data-swiper-parallax="400" className="slide-text">
                        <p>
                          We minimize your downtime with our reliable technical
                          experts and IT Infrastructure management.
                        </p>
                      </div>
                      <div className="clearfix"></div>
                      <div data-swiper-parallax="500" className="slide-btns">
                        <a href="about.html" className="theme-btn">
                          <i className="ion-android-arrow-forward"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div
                  className="slide-inner slide-bg-image"
                  style={{ backgroundImage: `url(${image5})` }}
                >
                  <div className="container-fluid">
                    <div className="slide-content">
                      <div data-swiper-parallax="300" className="slide-title">
                        <h2>
                          <span>Solution</span> Integration
                        </h2>
                      </div>
                      <div data-swiper-parallax="400" className="slide-text">
                        <p>
                          We partner with the best-in-className solution providers
                          and implementation made easy with our experienced
                          experts.{" "}
                        </p>
                      </div>
                      <div className="clearfix"></div>
                      <div data-swiper-parallax="500" className="slide-btns">
                        <a href="about.html" className="theme-btn">
                          <i className="ion-android-arrow-forward"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div
                  className="slide-inner slide-bg-image"
                  style={{ backgroundImage: `url(${image6})` }}
                >
                  <div className="container-fluid">
                    <div className="slide-content">
                      <div data-swiper-parallax="300" className="slide-title">
                        <h2>
                          <span>Digital</span> Marketing
                        </h2>
                      </div>
                      <div data-swiper-parallax="400" className="slide-text">
                        <p>
                          Magnify your online presence with our strategic SEO &
                          digital marketing.
                        </p>
                      </div>
                      <div className="clearfix"></div>
                      <div data-swiper-parallax="500" className="slide-btns">
                        <a href="about.html" className="theme-btn">
                          <i className="ion-android-arrow-forward"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div
                  className="slide-inner slide-bg-image"
                  style={{ backgroundImage: `url(${image7})` }}
                >
                  <div className="container-fluid">
                    <div className="slide-content">
                      <div data-swiper-parallax="300" className="slide-title">
                        <h2>
                          <span>Ecommerce </span> Web Development
                        </h2>
                      </div>
                      <div data-swiper-parallax="400" className="slide-text">
                        <p>
                          We maximize your business efficiency with our devise
                          solutions that ensures meaningful results
                        </p>
                      </div>
                      <div className="clearfix"></div>
                      <div data-swiper-parallax="500" className="slide-btns">
                        <a href="about.html" className="theme-btn">
                          <i className="ion-android-arrow-forward"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide> */}
            </Swiper>


            {/* end swiper-wrapper */}

            {/* swipper controls  */}
            {/* <div className="swiper-pagination"></div> */}
            {/* <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div> */}
          </div>
        </section>
      ) : bannerType == 2 ? (


        <section className="inner-banner">
          <img src={image18} alt="Image" />
          {/* <div className="inner-ban-caption">
            <div className="container">
              <div className="row">
                <div className="inner-caption">
                  <h1>About AES</h1>
                  <p>AES Technologies Pvt. Ltd is an ISO 9001:2015
                    QMS certified full-service web development and
                    software development company headquartered
                    in Coimbatore, South india</p>
                </div>
              </div>
            </div>
          </div> */}
        </section>
      ) : bannerType == 3 ? (


<section className="inner-banner">
  <img src={image12} alt="Image" />
  {/* <div className="inner-ban-caption">
    <div className="container">
      <div className="row">
        <div className="inner-caption">
          <h1>About AES</h1>
          <p>AES Technologies Pvt. Ltd is an ISO 9001:2015
            QMS certified full-service web development and
            software development company headquartered
            in Coimbatore, South india</p>
        </div>
      </div>
    </div>
  </div> */}
</section>
) : ("")}


    </>
  );
}

export default Banner;
