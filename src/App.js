import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom"; // import react router dom


import HomePage from "./views/homePage/homepage";
import ContactPage from "./views/contactPage";
import VotingPage from "./views/votingPage";
import LandingPage from "./views/votingLanding";


function App() {


  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<VotingPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="onboarding" element={<VotingPage/>} />  
        <Route path="voting" element={<LandingPage/>} />       
        <Route path="evoting/:id" element={<VotingPage/>} />        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
