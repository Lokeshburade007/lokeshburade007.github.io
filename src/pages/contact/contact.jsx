import React, { useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../css/contact.css";

const Contact = () => {
  const formRef = useRef(null);
  const scriptURL = "https://script.google.com/macros/s/AKfycbzfIt4VjnPJ1AYvwpijQiNIV_sLAhWYoJAHEFVib8Y6sKGT2MTe6DpHDD6yV6Q6hT3u/exec";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => alert("Thank you! Your form has been submitted successfully."))
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => console.error("Error!", error.message));
  };

  return (
    <div className="container">
      <Navbar />
      <section className="contact">
        <div className="contentContact">
          <h2>
            Contact <span>Us</span>
          </h2>
          <p>
            Welcome to the Contact Us page of my portfolio website. If you have
            any questions, comments, or business inquiries, please don't
            hesitate to reach out to me. I am always happy to hear from visitors
            and potential collaborators.
          </p>
          <br />
          <p>
            To contact me, simply fill out the form below with your name, email
            address, and message. I will do my best to respond to you as soon as
            possible.
          </p>
        </div>
        <div className="contactContainer">
          <div className="contactInfo">
            <div className="boxContact">
              <div className="icon">
                <a href="#">
                  <i className="fa-solid fa-address-book"></i>
                </a>
              </div>
              <div className="text">
                <h3>Address</h3>
                <p>
                  House no. 897, <br />
                  Juni Mangalwari,
                  <br />
                  C.A Road,
                  <br /> Nagpur - 440008{" "}
                </p>
              </div>
            </div>
            <div className="boxContact">
              <div className="icon">
                <a href="#">
                  <i className="fa-regular fa-phone"></i>
                </a>
              </div>
              <div className="text">
                <h3>Phone</h3>
                <p>+91 777-4857-567</p>
              </div>
            </div>
            <div className="boxContact">
              <div className="icon">
                <a href="#">
                  <i className="fa-solid fa-envelope"></i>
                </a>
              </div>
              <div className="text">
                <h3>Email</h3>
                <p>
                  lokeshburade494
                  <br />
                  @gmail.com
                </p>
              </div>
            </div>
          </div>
          <div className="contactForm">
            <form
              method="post"
              action={scriptURL}
              name="contact-form"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <h2>Send Message</h2>
              <div className="inputBox">
                <input type="text" name="name" required="required" />
                <span>Full Name</span>
              </div>
              <div className="inputBox">
                <input type="email" name="email" required="required" />
                <span>Email</span>
              </div>
              <div className="inputBox">
                <textarea required="required" name="message"></textarea>
                <span>Type your Message...</span>
              </div>
              <div className="inputBox">
                <div className="btn-box">
                  <input
                    type="submit"
                    className="submit-btn"
                    value="Send"
                    id="submit"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
