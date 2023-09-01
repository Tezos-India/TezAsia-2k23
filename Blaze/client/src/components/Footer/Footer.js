import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logoo.png";

function Footer() {
  return (
    <>
      <section className="appie-footer-area appie-footer-about-area appie-footer-8-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="footer-about-widget">
                <div className="logo">
                  <a href="#">
                    <img src={logo} alt="" />
                  </a>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dicta ab quae voluptate molestias architecto eos, possimus,
                  maiores animi illo odit neque temporibus debitis.
                </p>

                <div className="social mt-30">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-pinterest-p"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
