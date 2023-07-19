import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import htmlParse from 'html-react-parser';
import image1 from "../../../assets/images/about-image1.jpg";
import image2 from "../../../assets/images/about-image2.jpg";

function AboutSection() {

    return (
        <>

        <section className="about-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="about-image">
                        <img src={image1} alt="" />

                            <div className="shape">
                            <img src={image2} alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 pt-50">
                        <div className="about-content">
                            <span>PM on One Nation, One Election</span>
                            <h2>One nation, one election not a subject of debate but a <strong>necessity for India</strong></h2>
                            <p>Recently, the Prime Minister of India has addressed the concluding session of the 80 All
                            India Presiding Officers Conference via videoconference, at Kevadiya (Gujarat) on
                            the occasion of Constitution Day (26 November).</p>

                            <div className="about-text">
                                <div className="icon">
                                    <i className="ion-ios-lightbulb"></i>
                                </div>
                                <h3>Key Points</h3>
                                <p>The idea is about structuring the Indian election cycle in a manner so that
elections to the Lok Sabha and the State Assemblies are
synchronised together so that the election to both can be held within a
given span of time.</p>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="advantage-section">
            <div className="container">
                <div className="row">                   
                    <div className="col-lg-12">
                        <div className="advantage-content">  
                        <h2>Advantanges</h2>                    
                           <ul>
                            <li>Help keep a check on the poll expenses, party expenses, etc. and also
                            save public money.</li>
                            <li>Reduce the burden on administrative setup and security forces.</li>
                            <li>Ensure timely implementation of the government policies and also
                            ensure that the administrative machinery is engaged in developmental
                            activities rather than electioneering.</li>
                            <li>Solve the problem of governance on the part of the politicians who
                            are ruling. It is generally seen that for short term political gains from a
                            particular assembly election, ruling politicians avoid taking a harsh long
                            term decision which can ultimately help the country in the long run.</li>
                            <li>Provide more time to all the stakeholders i.e. political parties,
                            Election Commission of India (ECI), paramilitary forces, civilians for
                            the preparation of elections once in five years.</li>
                           </ul>                        
                        </div>
                    </div>
                </div>
            </div>
        </section>      

        </>
    );
}

export default AboutSection;
