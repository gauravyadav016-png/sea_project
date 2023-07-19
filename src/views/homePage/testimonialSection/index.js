import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import htmlParse from 'html-react-parser';
import image1 from "../../../assets/images/karthik-raju.jpg";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';



function TestimonialSection() {

    const [testimonialSection, settestimonialSection] = useState([]);

    const testimonialData = [
        {
            id: 1,
            testimonialName: "Dr. Karthikeyan Raju",
            testimonialDescription: `“They are market leaders in Hospital Information Systems, i have worked with couple of different HIS systems but AES system and
            their team is the only company having the best after sale service and the customization of the product till it fits your company is simply not / cannot be done by anyone in the Market.”`,
            testimonialImage: image1,
            testimonialLink: "/",
            testimonialAddress:"Medical Director – Kongunad Hospital, Coimbatore, India",

        },
        {
            id: 2,
            testimonialName: "Dr. Karthikeyan Raju",
            testimonialDescription: `“They are market leaders in Hospital Information Systems, i have worked with couple of different HIS systems but AES system and
            their team is the only company having the best after sale service and the customization of the product till it fits your company is simply not / cannot be done by anyone in the Market.”`,
            testimonialImage: image1,
            testimonialLink: "/",
            testimonialAddress:"Medical Director – Kongunad Hospital, Coimbatore, India",
        },
        {
            id: 3,
            testimonialName: "Dr. Karthikeyan Raju",
            testimonialDescription: `“They are market leaders in Hospital Information Systems, i have worked with couple of different HIS systems but AES system and
            their team is the only company having the best after sale service and the customization of the product till it fits your company is simply not / cannot be done by anyone in the Market.”`,
            testimonialImage: image1,
            testimonialLink: "/",
            testimonialAddress:"Medical Director – Kongunad Hospital, Coimbatore, India",
        },
    ];


    useEffect(() => {

        settestimonialSection(testimonialData);


    }, [])

    return (
        <>
            {/* Testimonial section start */}
            <div className="testimonial-sec">
                <div className="container">
                    <div className="row">
                        <div className="section-title text-center mb-40 wow fadeFromUp" data-wow-delay="300ms" data-wow-duration="800ms">
                            <h1><i className="icon ion-quote"></i> What our clients say</h1>
                        </div>

                        <div className="col-xl-12 col-lg-12 wow fadeFromUp" data-wow-delay="400ms" data-wow-duration="800ms">
                        {testimonialSection.length &&(
                            <OwlCarousel items={1} className="test-carousel owl-carousel" loop nav >
                                {testimonialSection.map((res, index) => (
                                    <div className="test_carousel__item" key={`ps` + index}>
                                        <div className="col-lg-2 col-xl-2  col-sm-2 test-img">
                                            <img src={res.testimonialImage} alt={res.testimonialName} />
                                        </div>
                                        <div className="col-lg-10 col-xl-10 col-md-10 test-txt pl-50">
                                            <p>{res.testimonialDescription}</p>
                                            <h3>{res.testimonialName}</h3>
                                            <span>{res.testimonialAddress}</span>
                                        </div>
                                    </div>
                               ))}
                                
                            </OwlCarousel>
                        )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Testimonial section end  */}



        </>
    );
}

export default TestimonialSection;
