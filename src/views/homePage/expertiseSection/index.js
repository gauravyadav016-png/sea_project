import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import htmlParse from 'html-react-parser';
import image1 from "../../../assets/images/application-development-maintenance.jpg";
import image2 from "../../../assets/images/cloud-transformation-1.jpg";
import image3 from "../../../assets/images/web-devlopment-img.jpg";
import image4 from "../../../assets/images/3d-visual.jpg";
import image5 from "../../../assets/images/3d-visual.jpg";

import image6 from "../../../assets/images/property-img.jpg";
import image7 from "../../../assets/images/cloud-transformation.jpg";
import image8 from "../../../assets/images/digital-marketing.jpg";
import image9 from "../../../assets/images/e-commerce.jpg";
import image10 from "../../../assets/images/3d-product.jpg";





function ExpertiseSection() {

    const [portfolioLeftSection, setportfolioLeftSection] = useState();
    const [portfolioRightSection, setportfolioRightSection] = useState();

    const leftSectionData = [
        {
          id: 1,
          portfolioTitle: "Application Development <br></br>& Maintenance",
          portfolioDescription: "",
          portfolioImage: image1,
          portfolioLink: "/",
      
        },
        {
            id: 2,
            portfolioTitle: "Digital / Cloud <br></br>Transformation",
            portfolioDescription: "",
            portfolioImage: image2,
            portfolioLink: "/",
        },
        {
            id: 3,
            portfolioTitle: "Solution Integration",
            portfolioDescription: "",
            portfolioImage: image3,
            portfolioLink: "/",
        },

        {
            id: 4,
            portfolioTitle: "3D Product <br></br>Configurator",
            portfolioDescription: "",
            portfolioImage: image4,
            portfolioLink: "/",
        }
      ];

      const rightSectionData = [
        {
          id: 1,
          portfolioTitle: "Application Managed Services",
          portfolioDescription: "",
          portfolioImage: image5,
          portfolioLink: "/",
      
        },
        {
            id: 2,
            portfolioTitle: "Infrastructure Management Services",
            portfolioDescription: "",
            portfolioImage: image6,
            portfolioLink: "/",
        },
        {
            id: 3,
            portfolioTitle: "Digital Marketing",
            portfolioDescription: "",
            portfolioImage: image7,
            portfolioLink: "/",
        },

        {
            id: 4,
            portfolioTitle: " E - Commerce ",
            portfolioDescription: "",
            portfolioImage: image8,
            portfolioLink: "/",
        }
      ];
  
      
    useEffect(() => {
      
        setportfolioLeftSection(leftSectionData);
        setportfolioRightSection(rightSectionData);
        
    }, [])
    
    return (
        <>
            {/* Expertise sec starts*/}
            <section className="expertise-sec">
                <div className="container">
                    <div className="row">
                        <div className="section-title wow fadeFromUp" data-wow-delay="300ms" data-wow-duration="800ms">
                            <h1>Our Expertise & Services</h1>
                            <p>AES is India's most trusted mobileapp and <br></br> software development company</p>
                        </div>

                        {/* portfolio_section - start */}

                        <div className="portfolio_section wow fadeFromUp" data-wow-delay="400ms" data-wow-duration="800ms">
                            <div className="">
                                <div className="">
                                    <div className="metro_portfolio_grid grid">
                                        <div className="grid-sizer"></div>
                                        {/* <div className="grid-item w_45">
                                            <div className="grid-carousel owl-carousel">
                                            {leftSectionData.map((leftSection,index) => (
                                                <div className="test_carousel__item" key={`ls`+index}>
                                                    <div className="portfolio_fullimage first-img">
                                                    <Link to={leftSection.portfolioLink}>
                                                            <div className="portfolio-plus-wrapper"><span></span></div>

                                                            <div className="exp-img">
                                                                <img src={leftSection.portfolioImage} alt="" />
                                                            </div>

                                                            <div className="exp-title">

                                                                <h2>{leftSection.portfolioTitle}</h2>
                                                                <span className="arrow"><i className="ion-ios-play-outline"></i></span>
                                                            </div>

                                                            </Link>
                                                    </div>
                                                </div>
                                            ))}  
                                            </div>
                                        </div> */}

                                        {rightSectionData.map((rightSection,index) => (        
                                        <div className="grid-item" key={`rs`+index}>
                                            <div className="portfolio_fullimage">
                                            <Link to={rightSection.portfolioLink}>
                                                    <div className="portfolio-plus-wrapper"><span></span></div>
                                                    <div className="exp-img">
                                                        <img src={rightSection.portfolioImage} alt="" />
                                                    </div>

                                                    <div className="exp-title">
                                                        <h2>{htmlParse(rightSection.portfolioTitle)}</h2>
                                                        <span className="arrow"><i className="ion-ios-play-outline"></i></span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>

                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* portfolio_section - end */}

                    </div>
                </div>
            </section>

            {/* Expertise sec ends */}

        </>
    );
}

export default ExpertiseSection;
