import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../css/home.css";
import meresponsive from "../../images/me-responsive.png";
import resume from "../../images/resume.pdf";

const Home = () => {
  useEffect(() => {
    const typed = new window.Typed(".auto-input", {
      strings: [
        "UI/UX Developer",
        "Best in ReactJs/NextJS",
        "Programmer",
        "MERN Stack Developer",
        "JAM Stack Enthusiast"
      ],
      
      typeSpeed: 75,
      backSpeed: 50,
      startDelay: 500,
      backDelay: 1500,
      loop: true
    });

    return () => {
      typed.destroy();  // Cleanup to prevent memory leaks
    };
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
              I recently graduated with a B.Tech degree in Computer Science & Engineering. I am a MERN Stack Web Developer with over 2 years of learning experience in Frontend Development and 6 months in Backend Development. Additionally, I have more than 3 years of learning experience in Programming.
              <br /><br />
              My learning experiences include working on various projects, such as developing real-time websites for NGOs and engaging in internships at multiple startups. I also have 6 months of professional experience as a Software Engineer Intern at TWJ IT Solution, where I applied my skills in practical scenarios, deepening my understanding of web development and preparing me for real-world challenges.
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
