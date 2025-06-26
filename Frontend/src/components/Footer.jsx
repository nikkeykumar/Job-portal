import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-200 py-2">
      <div className="max-w-6xl mx-auto px-2 flex justify-between items-center ">
        <div className="my-2">
          <h2 className="text-2xl font-bold mb-2">JobHunt</h2>
          <div>
            © {new Date().getFullYear()} YourBrand. All rights reserved.
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
