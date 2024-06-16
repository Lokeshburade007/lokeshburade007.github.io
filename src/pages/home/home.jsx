// Home.jsx
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../css/home.css";
import meresponsive from "../../images/me-responsive.png";
import resume from "../../images/resume.pdf";
// Remove the import for designation.js

const Home = () => {
  useEffect(() => {
    const typed = new window.Typed(".auto-input", {
      strings: [
        "UI/UX Developer",
        "Best in ReactJs",
        "Programmer",
        "Full Stack Web-Developer"
      ],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true
    });
  }, []);

  return (
    <>
      <div className="container">
        <Navbar />
        <div className="mobile-img">
          <img src={meresponsive} alt="Me" />
        </div>
        <section className="home">
          <div className="home-content">
            <h1>Hi, I'm Lokesh</h1>
            <h3>
              I'm <span className="auto-input"></span>
            </h3>
            <p>
              Currently I am pursuing B.Tech 4th year in Computer Science &
              Engineering Branch. I am a Full Stack Web Developer with 2 years
              of learning experience in Frontend and 6 month learning experience
              in Backend Development, and 3+ year of experience in Programming.
              <br />
              <br />
              Throughout my career, I have worked on numerous projects ranging
              from Realtime Website For NGO to Realtime Internship at multiple
              Startups.
            </p>
            <div className="btn-box">
              <a href={resume} download="Lokesh's_resume">
                Hire Me
              </a>
              <a href="mailto:lokeshburade494@gmail.com">Let's Talk</a>
            </div>
          </div>

          <div className="home-sci">
            <a href="https://www.facebook.com/lokesh.burade.73/">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.linkedin.com/in/lokesh-burade-385083202/">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="https://instagram.com/burade_lokesh007?igshid=ZDdkNTZiNTM=">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
          <span className="home-imgHover"></span>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Home;
