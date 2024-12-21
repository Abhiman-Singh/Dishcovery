import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import AboutUs from '../components/AboutUs'
import Features from '../components/Features'
import ContactUs from '../components/ContactUs'
import Footer from '../components/Footer'

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div id="home">
        <HeroSection />
      </div>
      <div id="about-us">
        <AboutUs />
      </div>
      <div id="features">
        <Features />
      </div>
      <div id="contact-us">
        <ContactUs />
      </div>
      <Footer />
    </>
  )
}

export default LandingPage