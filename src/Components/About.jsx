// src/pages/AboutUs.jsx

import React from 'react';

const AboutUs = () => {
  return (
    <div className='body_bg'>
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-2">
        DevTinder is a platform that helps developers connect, collaborate, and grow together. 
        Built with the MERN stack, our mission is to enable software engineers to find like-minded professionals 
        to share ideas, projects, and opportunities.
      </p>
      <p>
        Whether you’re building a startup or looking to improve your skills, DevTinder offers a unique space 
        to match and engage with peers in the tech community.
      </p>
    </div>
        <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-6">
        Have questions or need assistance? We’re here to help! Reach out to us using the form below or through our contact information.
      </p>

      <form className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input type="text" placeholder="Your full name" className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" placeholder="you@example.com" className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea rows="4" placeholder="Your message..." className="!textarea !textarea-bordered w-full !bg-transparent" />
        </div>

        <button type="submit" className="btn btn-primary">Send Message</button>
      </form>

      <div className="mt-8 text-sm text-gray-600">
        <p><strong>Email:</strong> manojmadavarapu7@gmail.com</p>
        <p><strong>Phone:</strong> +91 98489 98489</p>
        <p><strong>Location:</strong> Hyderabad, Telangana, India</p>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
