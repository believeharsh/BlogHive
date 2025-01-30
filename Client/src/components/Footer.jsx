import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 px-8 flex flex-col md:flex-row justify-between items-center">
      {/* Left Section */}
      <div className="text-sm opacity-80">
        © 2025 <span className="font-semibold">BlogHive</span>. All rights reserved.
      </div>

      {/* Center Section - Links */}
      <div className="flex gap-4 text-sm mt-4 md:mt-0">
        <a href="https://github.com/believeharsh/BlogHive" target="_blank" rel="noopener noreferrer" className="hover:underline">
          BlogHive GitHub
        </a>
        <a href="https://github.com/believeharsh" target="_blank" rel="noopener noreferrer" className="hover:underline">
          My GitHub
        </a>
      </div>

      {/* Right Section - Social Icons */}
      <div className="flex gap-4 mt-4 md:mt-0">
        <a href="https://www.linkedin.com/in/believeharsh11/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-xl hover:text-gray-400 transition" />
        </a>
        <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-xl hover:text-gray-400 transition" />
        </a>
        <a href="https://www.instagram.com/bontinue_/#" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-xl hover:text-gray-400 transition" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
