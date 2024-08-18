import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container-f" id="abc">
        <a href="index.html">
          <span className="logo-footer">Lokesh Burade</span>
        </a>
        <div className="links">
          <a href="https://www.facebook.com/lokesh.burade.73/">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://instagram.com/burade_lokesh007?igshid=ZDdkNTZiNTM=">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/in/lokesh-burade-385083202/">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
        <p className="copyright">
          <span><i className="fas fa-heart"></i>
          Created By</span>
          <a href="index.html"> Lokesh Burade</a>-05/2023
        </p>
      </div>
    </footer>
  );
};

export default Footer;
