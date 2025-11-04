import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-16">
      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Menova</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your one-stop destination for the latest trends and styles. Shop
            smart, shop easy — wherever you are!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-400 transition">
              <a href="/">Home</a>
            </li>
            <li className="hover:text-blue-400 transition">
              <a href="/collection">Shop</a>
            </li>
            <li className="hover:text-blue-400 transition">
              <a href="/about">About</a>
            </li>
            <li className="hover:text-blue-400 transition">
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} /> +94 77 123 4567
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@menova.lk
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Badulla, Sri Lanka
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-400 transition">
              <Facebook size={22} />
            </a>
            <a href="#" className="hover:text-pink-400 transition">
              <Instagram size={22} />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <Twitter size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-white font-semibold">Menova</span>. 
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
