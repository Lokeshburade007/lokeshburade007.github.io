import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import "../../css/services.css"

const Services = () => {
  return (
    <div className='container'>
        <Navbar/>
        <section className="services-experience">
        <div className="Services-container">
            <div className="services" id="services">
                <div className="service active">
                    <i className="fas fa-paintbrush"></i>
                    <h3>UI/UX Designer</h3>
                    <p>I'm Professional at UI/UX Designing. I have Experiences of Realtime Projects</p>
                    <a href="#projects" className="btn">Know More</a>
                </div>
                <div className="service">
                    <i className="fas fa-paintbrush"></i>
                    <h3>Web Developer</h3>
                    <p>I am a MERN Stack Developer and I would like to do UIUX Designing also.</p>
                    <a href="#projects" className="btn">Know More</a>
                </div>
                <div className="service">
                    <i className="fas fa-ruler"></i>
                    <h3>Problem Solving</h3>
                    <p>I would like to solve the Problems, which is based of real world.</p>
                    <a href="#projects" className="btn">Know More</a>
                </div>
            </div>
            <div className="experiences" id="experiences">
                <div className="experience">
                    <h3>03</h3>
                    <p>Year Experiences</p>
                </div>
                <div className="portfolios">
                    <div className="portfolio">
                        <h4>7+</h4>
                        <p>Programming Languages</p>
                    </div>
                    <div className="portfolio">
                        <h4>3+</h4>
                        <p>Year Coding Experiences</p>
                    </div>
                    <div className="portfolio">
                        <h4>20+</h4>
                        <p>Completed Projects</p>
                    </div>
                    <div className="portfolio">
                        <h4>10+</h4>
                        <p>Achievements</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
        <Footer/>
    </div>
  )
}

export default Services