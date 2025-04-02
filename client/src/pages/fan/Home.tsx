import React from "react";
import { Container, Navbar, Nav, Col, Row, Offcanvas, } from "react-bootstrap";
import hero from '../../assets/images/hero.jpeg'
import Footer from "../../components/Footer";
import logo from '../../assets/images/logoImage.png'
import celeb from '../../assets/images/women.jpg'

import Typewriter from 'typewriter-effect';
import Steps from "../../components/Steps";
import CubeCarousel from "../../components/CubeCarousel";
import SlidingTextCarousel from "../../components/SlidingTextCarousel";
import TestimonialList from "../../components/TestimonialList";
import SubscriptionForm from "../../components/Subscription";
import CelebrityRequestForm from "../../components/CelebrityRequestForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { COMPANY_NAME } from "../../data/data";


const Home = () => {

  return (
    <div style={{
      //  backgroundColor: "black", color: "white",
        minHeight: "100vh" }}>
   <Navbar expand="lg" bg="white" className="shadow-sm px-3 py-1" sticky="top">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="#">
          <img src={logo} alt="Logo" height="50" />
        </Navbar.Brand>
        
        {/* Mobile Toggle with Offcanvas */}
        <Navbar.Toggle 
          aria-controls="offcanvas-navbar" 
          className="border-0" 
        />
        
        <Navbar.Offcanvas
          id="offcanvas-navbar"
          aria-labelledby="offcanvas-navbar-label"
          placement="end"
          className="w-100" // Full width on mobile
          style={{ top: '70px' }} // Adjust based on navbar height
        >
          <Offcanvas.Body className="px-4 py-3">
            <Nav className="ms-auto">
              <Nav.Link href="/" className="fw-bold text-orange">Home</Nav.Link>
              <Nav.Link href="#about" className="fw-bold text-dark">About Us</Nav.Link>
              <Nav.Link href="#contact" className="fw-bold text-dark">Contact</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>

      <div className="py-1">
        <header className="">
          <h4 className="display-inline mb-4" style={{paddingLeft:'2rem'}}>
            <Typewriter
            options={{
              loop:true
            }}
           
  onInit={(typewriter) => {
    typewriter.changeDelay(10)
    .changeDeleteSpeed(10)
    .typeString('<span className="">Book <span style="color:grey;">A Celebrity!</span></span>')
    .pauseFor(2000)
    .deleteAll()
    .typeString('<span className="">Join <span style="color:grey;">A Fan Club!</span></span>')
      .pauseFor(2000)
      .deleteAll()
      .typeString('<span className="">Claim <span style="color:grey;">Souvenirs!</span></span>')
      .pauseFor(2000)
      .deleteAll()
      .typeString('<span className="">Book <span style="color:grey;">Tours!</span></span>')
      .pauseFor(2000)
      .deleteAll()
      .typeString('<span className="">Donate <span style="color:grey;">To Charity!</span></span>')
      .pauseFor(2000)
      .start();
      
  }}
/>
            </h4>
         
         
          
    
        </header>
<div className="position-relative " style={{width:'100vw'}}>
  <img
    src={hero}
    alt="Hero Background"
    className="img-fluid w-100"
    style={{ height: "20rem", objectFit: "cover" }}
  />
  <div
    className="position-absolute top-0 start-0 w-100 h-100"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark opacity overlay
      zIndex: 1, // Ensure overlay is above the image
    }}
  />
  <div className="position-absolute" style={{position:'absolute',top:'50%',left:'3rem' , zIndex: 2 }}>
    <h4 className=" fw-bold text-white">Welcome to {COMPANY_NAME}</h4>
  </div>
  <div className="d-flex gap-4" style={{ position:'absolute',top:'80%',left:'3rem' ,zIndex: 2 }}>
    <FontAwesomeIcon icon ={faInstagram} color="white" size="2x"/>
    <FontAwesomeIcon icon ={faFacebook} color="white" size="2x"/>
    <FontAwesomeIcon icon ={faTwitter}  color="white" size="2x"/>
  </div>
</div>

      <div className="mt-3 py-4 " style={{paddingLeft:'3rem'}}>
        <Row >
<Col className="mb-5" xs={12} lg={6}>
<div style={{width:'4rem',height:'0.5rem',backgroundColor:'Black',marginBottom:'1rem'}}></div>
        <h1 className=" fw-bold dark">{COMPANY_NAME}</h1>
          <h3 className="">Connecting Fans and Celebrities for Unforgettable Experiences
          </h3>
          <h5 className="my-4" style={{color:'indigo'}}>Welcome to {COMPANY_NAME}, your premier destination for exclusive celebrity experiences and unforgettable meet and greets!</h5>
          <p>Booking a celebrity with {COMPANY_NAME} is simple and easy.</p>
          <p>You can also claim souvenirs,</p>
          <p>Book tours,</p>
          <p>And support charity.</p>
          <button className="p-2" style={{backgroundColor:'indigo', color:'white', border:'none'}}>Connect With A Celebrity</button>
       
</Col>
<Col lg={4} >
<img src={celeb} alt="Celebrity" className="img-fluid w-100" />
</Col>

        </Row>
        </div>
      <Steps/>
      
  
       
      


       <Row style={{paddingLeft:'3rem'}}>
        <Col >
        <h2 className="my-3 fw-bold"> SomeOur Featured Celebrities for the Month</h2>
        <p>Premium service standards and timely delivery are our commitments at CelebLinks.</p>
        </Col>
        
        
          
            
                <Col xs={12} lg={4}>

<CubeCarousel/>
                </Col>

        </Row>
        <section>
        <Row>
       <Col>
        <h3>Meet & Greet With Your Favorite Celebrities in Just A Few Steps</h3>
        <p>
        At EliteTalentz, we understand the power of a personal connection. We believe that every fan deserves a
         chance to meet the celebrities who have touched their lives in profound ways.
         That’s
         why we have curated a diverse roster of the hottest celebrities from the world of entertainment, sports, music, and more, 
         offering you the opportunity to make your dreams a reality.</p>
         <button>Book now</button>
       </Col>
       <Col>
       <SlidingTextCarousel/>
       </Col>
       </Row>

        </section>
        <TestimonialList/>
        <CelebrityRequestForm/>
        <SubscriptionForm/>
        <Footer/>
      </div>

      <Footer />
    </div>
  );
};

export default Home;