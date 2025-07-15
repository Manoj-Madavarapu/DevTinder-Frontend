import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 bottom-0">
      <aside className="text-center">
        <p className='font-bold mt-2'>
          Copyright © {new Date().getFullYear()} - All rights reserved by Manoj Naidu Madavarapu
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-1 text-sm">
          <Link to="/about-and-ContactUs" className="hover:underline">About Us</Link>
          <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link to="/terms" className="hover:underline">Terms & Conditions</Link>
          <Link to="/pricing-policy" className="hover:underline">Pricing Policy</Link>
          <Link to="/shipping-policy" className="hover:underline">Shipping Policy</Link>
          <Link to="/refund-policy" className="hover:underline">Refund Policy</Link>
        </div>
      </aside>
    </footer>
  );
};

export default Footer;

