import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

//Calling bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//Calling WOWjs
import WOW from 'wowjs';

import htmlParse from 'html-react-parser';
import image1 from "../../../assets/images/application-development-maintenance.jpg";
import image2 from "../../../assets/images/textile-erp-solution.jpg";
import image3 from "../../../assets/images/sales-service-crm.jpg";
import image4 from "../../../assets/images/hrms-system.jpg";
import image5 from "../../../assets/images/education-erp-solution.jpg";
import image6 from "../../../assets/images/secondary-sales.jpg";

function OurProductSection() {

    const [productList, setproductList] = useState([]);
    const [pageData, setpageData] = useState([]);

    const wow = new WOW.WOW(
      { 
          live: false
      }
      );
    
    
    const data = [
        {
          id: 1,
          productTitle: "Hospital Management<br/>Software",
          productName:"I.C.E Apple",
          productDescription: "",
          productImage: image1,
          productLink: "/",
      
        },
        {
            id: 2,
            productTitle: "A Complete Textile <br/> ERP Solution",
            productName:"TexSavvy",
            productDescription: "",
            productImage: image2,
            productLink: "/",
        
        },
        {
            id: 3,
            productTitle: "Sales & Services CRM",
            productName:"advanCRM",
            productDescription: "",
            productImage: image3,
            productLink: "/",
        
        },
        {
            id: 4,
            productTitle: "Human Resource <br/> Management System",
            productName:"Flamingo",
            productDescription: "",
            productImage: image4,
            productLink: "/",
        
        },

        {
            id: 5,
            productTitle: "Education <br/> ERP Solution",
            productName:"Brainstem",
            productDescription: "",
            productImage: image5,
            productLink: "/",
        
        },

        {
          id: 6,
          productTitle: "Secondary Sales <br/> Management System",
          productName:"blubery",
          productDescription: "",
          productImage: image6,
          productLink: "/",
      
      },
        
      ];
      
    useEffect(() => {
        setproductList(data);
        setpageData({
            title:"Our Digital Products",
            description:"Aes offers a wide range of product and solutions designed <br/>enterprises and small business across varios industries"
        });

        console.log(pageData);
        wow.init();
        
    },[]);
    
    return (
        <>
             {/* Our digital Products sec starts */}
             
    <section className="digital-products-sec">
        <div className="container">
            <div className="row">
            <div className="section-title wow fadeFromUp" data-wow-delay="300ms" data-wow-duration="800ms">
                <h1>{pageData.title}</h1>
                <p>{pageData.description}</p>
            </div>  
            <div className="products-div wow fadeFromUp" data-wow-delay="400ms" data-wow-duration="800ms">
               <ul className="home-prod-lst">
               {productList.map((res,index) => (  
                   <li key={`ps`+index}>
                    <div className="prod-div">
                    <Link to={res.productLink}>                          
                          <div className="portfolio-plus-wrapper"><span></span></div>
                          <div className="prod-img">
                            <img src={res.productImage} alt={res.productName} />
                          </div>
                          <div className="prod-cont">
                              <div>
                              <h2>{res.productTitle}</h2>
                                <span className="prod-name">{res.productName}</span>
                            </div>
                          </div>
                          </Link>
                      </div>
                   </li>

                   ))};
               </ul> 

                <ul class="home-prod-lst">
                <li>
                    <div class="prod-div">
                        <a href="javascript:void(0);">
                        <div class="portfolio-plus-wrapper"><span></span></div>
                          <div class="prod-img">
                          <img src={image1} alt={image1} />
                          </div>
                          <div class="prod-cont">
                              <div>
                              <h2>Human Resource<br/>
                                Management System</h2>
                                <span class="prod-name">Flamingo</span>
                            </div>
                          </div>
                          </a>
                      </div>
                   </li>

                <li>
                    <div class="prod-div">
                        <a href="javascript:void(0);">
                            <div class="portfolio-plus-wrapper"><span></span></div>
                          <div class="prod-img">
                          <img src={image1} alt={image1} />
                          </div>
                          <div class="prod-cont">
                              <div>
                              <h2>Education <br/>
                                ERP Solution </h2>
                                <span class="prod-name">Brainstem</span>
                            </div>
                          </div>
                          </a>
                      </div>
                   </li> 
                   <li>
                    <div class="prod-div">
                        <a href="javascript:void(0);">
                            <div class="portfolio-plus-wrapper"><span></span></div>
                          <div class="prod-img">
                            <img src={image1} alt={image1} />
                          </div>
                          <div class="prod-cont">
                              <div>
                              <h2> Secondary Sales <br/>
                                Management System</h2>
                                <span class="prod-name">blubery</span>
                            </div>
                          </div>
                          </a>
                      </div>
                   </li>                     
            </ul>  
               
               
            </div>
         
          </div>
        </div>
    </section>
    {/* Our digital Products sec ends */}


        </>
    );
}

export default OurProductSection;
