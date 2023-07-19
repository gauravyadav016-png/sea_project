import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

//Calling bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//Calling WOWjs
import WOW from 'wowjs';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


import htmlParse from 'html-react-parser';
import image1 from "../../../assets/images/partner-logo1.png";
import image2 from "../../../assets/images/partner-logo2.png";
import image3 from "../../../assets/images/partner-logo3.png";
import image4 from "../../../assets/images/partner-logo4.png";


function PartnerSection() {

    const [partnerList, setpartnerList] = useState([]);
    const [pageData, setpageData] = useState([]);

    const wow = new WOW.WOW(
        {
            live: false
        }
    );


    const data = [
        {
            id: 1,
            partnerTitle: "test1",
            partnerImage: image1,
            partnerLink: "/",

        },
        {
            id: 2,
            partnerTitle: "test2",
            partnerImage: image2,
            partnerLink: "/",

        },
        {
            id: 3,
            partnerTitle: "test3",
            partnerImage: image3,
            partnerLink: "/",

        },
        {
            id: 4,
            partnerTitle: "test4",
            partnerImage: image4,
            partnerLink: "/",

        }
    ];

    useEffect(() => {
        setpartnerList(data);
        setpageData({
            title: "Partners",
            description: "A Business Partnership is one key factor <br/> that has given AES roaring success"
        });

        console.log(data);
        wow.init();

    }, []);

    return (
        <>
            {/* Start Partner Area */}
            <section className="partner-area">
                <div className="container">
                    <div className="row">
                        <div className="section-title wow fadeFromUp" data-wow-delay="300ms" data-wow-duration="800ms">
                            <h1>{pageData.title}</h1>
                            <p>{pageData.description}</p>
                        </div>

                        <div className="partner-div wow fadeFromUp">
                            <div className="partner-car">
                                {partnerList.length &&(

                                <OwlCarousel items={4} className="slider-items owl-carousel" loop nav >
                                    {partnerList.map((res, index) => (
                                        <div className="partner-item" key={`ps` + index}>
                                            <Link to={res.partnerLink}>
                                                <img src={res.partnerImage} alt={res.partnerTitle} />
                                            </Link>
                                        </div>
                                    ))};
                                </OwlCarousel>

                                )}
                                

                            </div>
                        </div>




                    </div>
                </div>
            </section>
            {/* End Partner Area  */}



        </>
    );
}

export default PartnerSection;
