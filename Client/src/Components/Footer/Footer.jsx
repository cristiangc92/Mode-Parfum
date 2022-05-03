import React from "react";
import "./Footer.css";
import { Link } from 'react-router-dom';
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";


function Footer() {
    return (
        <div className="main-footer">
        <div className="container">
            <div className="row">
            {/* Column1 */}
            <div className="col">
                <h3 className="title_column">About Us</h3>
                <Link className="history_footer" to={'/history'}>History</Link>
                <Link className="mission_footer" to={'/mission'}>Our Mission</Link>
            </div>
            {/* Column2 */}
            <div className="col">
            <h3 className="title_column">Services</h3>
                <h5 className="content_column">Shopping</h5>
                <h5 className="content_column">Products</h5>
            </div>
            {/* Column3 */}
            <div className="col">
            <h3 className="title_column">Contact Us</h3>
                <h5 className="content_column">mode-parfum@gmail.com</h5>
                <h5 className="content_column">+54 555 555 555</h5>
            </div>
            {/* Column4 */}
            <div className="col">
            <h3 className="title_column">Social Media</h3>
            <div className="social_media">
                <div className="item_1">
                    <div className="logo1">
                        <FaFacebookSquare className='facebook'/>
                    </div>
                    <a href="https://www.facebook.com" target='_blank' className='a_1' rel="noreferrer"> Facebook</a>
                </div>
                <div className="item_2">
                    <div className="logo2">
                        <FaInstagram className='instagram'/>
                    </div>
                    <a href="https://www.instagram.com" target='_blank' className='a_2' rel="noreferrer"> Instagram</a>
                </div>
                </div>
            </div>
            </div>
            <hr />
            <div className="">
            <p className="col-sm">
                &copy;{new Date().getFullYear()} MODE PARFUM | All rights reserved |
                Terms Of Service | Privacy | Made with ❤️ by Group 6 Henry Bootcamp
            </p>
            </div>
        </div>
        </div>
    );
}

export default Footer;
