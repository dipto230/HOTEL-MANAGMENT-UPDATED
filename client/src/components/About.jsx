import React from "react"
import Title from "./Title"

const About = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-white py-20">
      <Title 
        title="About Us" 
        subTitle="Learn more about who we are and what drives us" 
      />

      <div className="max-w-3xl text-center mt-10 text-gray-600 leading-relaxed">
        <p>
          At Hotel Booking, we believe travel should be seamless, enjoyable, 
          and memorable. Our platform connects you with top-rated hotels 
          around the world, offering you comfort, luxury, and convenience. 
        </p>
        <p className="mt-4">
          From budget-friendly stays to premium resorts, we are committed 
          to helping you find the perfect place for your next trip.
        </p>
      </div>
    </div>
  )
}

export default About
