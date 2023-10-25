import React from "react";
import { Link } from "react-router-dom";
import '../css/footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  // Define the URLs for your social media pages
  const facebookUrl = "https://www.facebook.com/your-facebook-page";
  const twitterUrl = "https://twitter.com/your-twitter-page";
  const instagramUrl = "https://www.instagram.com/your-instagram-page";
  const linkedinUrl = "https://www.linkedin.com/company/your-linkedin-page";

  return (
    <footer className="bg-gradient-to-r from-custom-white to-custom-pink custom-gradient-bg">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mt-4">
            <h4><Link to="/about-us" className="text-dark">About Us</Link></h4>
            <p>Your about us content goes here.</p>
            <div className="social-media-buttons">
              {/* Add anchor tags for social media icons */}
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                <button className="btn btn-light" style={{ width: "50px", height: "50px", marginRight: "10px" }}>
                  <FontAwesomeIcon icon={faFacebookF} style={{ color: "black" }} />
                </button>
              </a>
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                <button className="btn btn-light" style={{ width: "50px", height: "50px", marginRight: "10px" }}>
                  <FontAwesomeIcon icon={faTwitter} style={{ color: "black" }} />
                </button>
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                <button className="btn btn-light" style={{ width: "50px", height: "50px", marginRight: "10px" }}>
                  <FontAwesomeIcon icon={faInstagram} style={{ color: "black" }} />
                </button>
              </a>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                <button className="btn btn-light" style={{ width: "50px", height: "50px", marginRight: "10px" }}>
                  <FontAwesomeIcon icon={faLinkedinIn} style={{ color: "black" }} />
                </button>
              </a>
            </div>
          </div>
          <div className="col-md-3 mt-4">
            <h4><Link to="/contactUs" className="text-dark">Contact Us</Link></h4>
            <p>Your contact information goes here.</p>
          </div>
          <div className="col-md-3 mt-4">
            <h4>Information</h4>
            <p className="address">
              123 abc Main Street Los Angeles, CA 90001, United States
              <br />
              +91 12345 12345
              <br />
              <a href="mailto:yourcompany@gmail.com" className="text-dark">yourcompany@gmail.com</a>
            </p>
          </div>
          <div className="col-md-3  mt-4">
            <form>
              <div className="input-group mb-3">
                <input type="email" className="form-control" id="subscribeEmail" placeholder="Your Email" />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-primary">Subscribe</button>
                </div>
              </div>
            </form>
            <p>Stay up-to-date on the latest news and events by subscribing to our newsletter.</p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row">
          <div className="col-md-12">
            <p className="text-center mt-4">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
