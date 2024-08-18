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
              Hello and welcome to my portfolio website. I am a MERN Stack Web Developer and UI/UX Designer.
            </h2>
            <p>
              My name is Lokesh Burade, and I recently graduated with a B.Tech degree in Computer Science & Engineering. I have over 2 years of learning experience in Frontend Development, more than 3 years of experience in Programming, and 6 months of professional experience as a Software Engineer Intern at TWJ IT Solution.
            </p>
            <br />
            <p>
              During my academic journey, I have worked on various projects, including developing real-time websites for NGOs and engaging in internships at multiple startups. I am passionate about teaching and have experience as a coding instructor for 12th-grade students. My strong foundation in both web development and programming drives me to continuously learn and improve my skills.
            </p>
            <br />
            <p>
              In my free time, I enjoy playing chess and going to the gym. This website showcases my portfolio, highlighting my previous work, as well as my resume, which details my educational background, skills, and internship experience. I welcome any inquiries or opportunities for collaboration.
            </p>
            <br />
            <p>
              Thank you for visiting my website. I look forward to connecting with you.
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
                  value="95%"
                  style={{ maxWidth: "95%" }}
                ></div>
              </div>
            </div>

            <div className="skill">
              <div className="subject">TeamWork</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="90%"
                  style={{ maxWidth: "90%" }}
                ></div>
              </div>
            </div>
            <div className="skill">
              <div className="subject">Communication Skill</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="75%"
                  style={{ maxWidth: "75%" }}
                ></div>
              </div>
            </div>

            <div className="skill">
              <div className="subject">Web Designing</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="80%"
                  style={{ maxWidth: "80%" }}
                ></div>
              </div>
            </div>

            <div className="skill">
              <div className="subject">Figma</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="80%"
                  style={{ maxWidth: "80%" }}
                ></div>
              </div>
            </div>

            <div className="skill">
              <div className="subject">Flutter</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="60%"
                  style={{ maxWidth: "60%" }}
                ></div>
              </div>
            </div>

            <div className="skill">
              <div className="subject">React Js</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="85%"
                  style={{ maxWidth: "85%" }}
                ></div>
              </div>
            </div>
            <div className="skill">
              <div className="subject">Next Js</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="80%"
                  style={{ maxWidth: "80%" }}
                ></div>
              </div>
            </div>
            <div className="skill">
              <div className="subject">SalesForce Developement</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="65%"
                  style={{ maxWidth: "65%" }}
                ></div>
              </div>
            </div>
            <div className="skill">
              <div className="subject">Logic Building</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="80%"
                  style={{ maxWidth: "80%" }}
                ></div>
              </div>
            </div>
            <div className="skill">
              <div className="subject">C/C++</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="90%"
                  style={{ maxWidth: "90%" }}
                ></div>
              </div>
            </div>
            <div className="skill">
              <div className="subject">Core Java</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="80%"
                  style={{ maxWidth: "80%" }}
                ></div>
              </div>
            </div>
            <div className="skill">
              <div className="subject">Boostrap</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="85%"
                  style={{ maxWidth: "85%" }}
                ></div>
              </div>
            </div>
            <div className="skill">
              <div className="subject">Tailwind CSS</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="85%"
                  style={{ maxWidth: "85%" }}
                ></div>
              </div>
            </div>

            <div className="skill">
              <div className="subject">PHP</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="60%"
                  style={{ maxWidth: "70%" }}
                ></div>
              </div>
            </div>
            <div className="skill">
              <div className="subject">MYSQL</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="90%"
                  style={{ maxWidth: "90%" }}
                ></div>
              </div>
            </div>
            <div className="skill">
              <div className="subject">Node Js</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="75%"
                  style={{ maxWidth: "75%" }}
                ></div>
              </div>
            </div>
            <div className="skill">
              <div className="subject">Mongo DB</div>
              <div className="progress_bar">
                <div
                  className="progress_line"
                  value="70%"
                  style={{ maxWidth: "70%" }}
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
