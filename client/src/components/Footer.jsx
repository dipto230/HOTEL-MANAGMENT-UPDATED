import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="w-full mt-15 pt-8">
      <div className="bg-[#F6F9FC] flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        {/* Left - Logo + About */}
        <div className="md:max-w-96">
          <img
            src={assets.logo}
            alt="footer-logo"
            className="mb-4 h-8 md:h-9 invert opacity-80"
          />
          <p className="mt-6 text-sm">
            Discover the world's most extraordinary places to stay, from boutique hotels to luxury villas and private islands
          </p>
        </div>

        {/* Center - Company */}
        <div className="flex flex-col items-center text-center md:flex-1">
          <h2 className="font-playfair mb-5 text-gray-800">Company</h2>
          <ul className="text-sm space-y-2">
            <li><a href="#">Home</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Privacy policy</a></li>
          </ul>
        </div>

        {/* Right - Newsletter */}
        <div className="flex-1 flex items-start md:justify-end">
          <div>
            <h2 className="font-playfair text-gray-800 mb-5">
              Subscribe to our newsletter
            </h2>
            <div className="text-sm space-y-2">
              <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
              <div className="flex items-center gap-2 pt-4">
                <input
                  className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="bg-blue-600 w-24 h-9 text-white rounded">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom - Copyright */}
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright 2024 ©{" "}
        <a href="https://prebuiltui.com" className="underline">
          PrebuiltUI
        </a>. All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer
