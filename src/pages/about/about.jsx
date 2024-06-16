import React from "react";
import Navbar from "../../components/Navbar";
import "../../css/about.css";
import Footer from "../../components/Footer";
import meImage from "../../images/me.png"

const About = () => {
  return (
    <div className="container">
      <Navbar />

      <section className="about">
        <div className="about_contents">
          {/* <!-- image Section start --> */}
          <div className="imageSection">
            <img src={meImage} alt="" />
          </div>
          <div className="infoSection">
            <h1>About Me</h1>
            <h2>
              Hello and welcome to my portfolio website. I am a Full Stack Web
              Designer & UI/UX Designer.
            </h2>
            <p>
              My name is Lokesh Burade & Currently I am pursuing B.Tech 4th year
              in Computer Science & Engineering Branch. I am a Web Developer
              with 2 years of Learning experiences in Frontend Developement and
              3+ year of experience in Programming.
            </p>
            <br />
            <p>
              Throughout my career, I have worked on numerous projects ranging
              from Relatime Website For NGO to Realtime Internship at multiple
              Startups. I have a strong ability to Teach 12th class as a Coding
              Teacher.I am constantly looking for ways to improve and learn. I
              enjoy play chess and Gyming. On this website, you will find my
              portfolio which showcases my previous work, my resume which
              highlights my experience and education, and a way to contact me
              for any inquiries or collaborations.
            </p>
            <br />
            <p>
              Thank you for visiting my website and I look forward to connecting
              with you.
            </p>

            <div className="personalInfo">
              <div>
                <span className="colorText">Name:</span>
                <span>Lokesh Burade</span>
              </div>
              <div>
                <span className="colorText">Age:</span>
                <span>20</span>
              </div>
              <div>
                <span className="colorText">Email:</span>
                <span>
                  lokeshburade494
                  <br />
                  @gmail.com
                </span>
              </div>
              <div>
                <span className="colorText">Address:</span>
                <span>Nagpur-Maharashtra</span>
              </div>
            </div>
            {/* <div className="btn-box">
              <a href="src/Lokesh's_resume.pdf" download="Lokesh's_resume">
                Download Resume
              </a>
            </div> */}
          </div>

          <div className="skillSection">
            <div className="skill">
              <div className="subject">Smart Work</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value ="95%"
                  style={{ maxWidth: "95%" }}
                ></div>
              </div>
            </div>

            <div className="skill">
              <div className="subject">Communication Skill</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="75%"
                  style={{maxWidth: "75%"}}
                ></div>
              </div>
            </div>

            <div className="skill">
              <div className="subject">Web Designing</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="80%"
                  style={{maxWidth: "80%"}}
                ></div>
              </div>
            </div>

            <div className="skill">
              <div className="subject">Figma</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="80%"
                  style={{maxWidth: "80%"}}
                ></div>
              </div>
            </div>

            <div className="skill">
              <div className="subject">Flutter</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="70%"
                  style={{maxWidth: "70%"}}
                ></div>
              </div>
            </div>

            <div className="skill">
              <div className="subject">React Js</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="85%"
                  style={{maxWidth: "70%"}}
                ></div>
              </div>
            </div>
            <div className="skill">
              <div className="subject">Next Js</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="70%"
                  style={{maxWidth: "70%"}}
                ></div>
              </div>
            </div>
            <div className="skill">
              <div className="subject">SalesForce Developement</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="80%"
                  style={{maxWidth: "70%"}}
                ></div>
              </div>
            </div>
            <div className="skill">
              <div className="subject">Logic Building</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="85%"
                  style={{maxWidth: "70%"}}
                ></div>
              </div>
            </div>
            <div className="skill">
              <div className="subject">C/C++</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="90%"
                  style={{maxWidth: "90%"}}
                ></div>
              </div>
            </div>
            <div className="skill">
              <div className="subject">Boostrap</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="85%"
                  style={{maxWidth: "85%"}}
                ></div>
              </div>
            </div>
            <div className="skill">
              <div className="subject">Tailwind CSS</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="85%"
                  style={{maxWidth: "65%"}}
                ></div>
              </div>
            </div>

            <div className="skill">
              <div className="subject">PHP</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="60%"
                  style={{maxWidth: "70%"}}
                ></div>
              </div>
            </div>
            <div className="skill">
              <div className="subject">MYSQL</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="90%"
                  style={{maxWidth: "90%"}}
                ></div>
              </div>
            </div>
            <div className="skill">
              <div className="subject">Node Js</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="75%"
                  style={{maxWidth: "55%"}}
                ></div>
              </div>
            </div>
            <div className="skill">
              <div className="subject">Mongo DB</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="70%"
                  style={{maxWidth: "70%"}}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
