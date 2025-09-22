import React from "react"
import Title from "./Title"

const Contact = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      <Title 
        title="Contact Us" 
        subTitle="We'd love to hear from you! Get in touch with us anytime." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 w-full max-w-4xl">
        {/* Contact Info */}
        <div className="space-y-4 text-gray-700">
          <p><strong>Email:</strong> support@hotelbooking.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Address:</strong> 123 Luxury Street, Ahmedabad, India</p>
        </div>

        {/* Contact Form */}
        <form className="flex flex-col space-y-4">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="p-3 border border-gray-300 rounded"
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            className="p-3 border border-gray-300 rounded"
          />
          <textarea 
            placeholder="Your Message" 
            rows="4" 
            className="p-3 border border-gray-300 rounded"
          />
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
