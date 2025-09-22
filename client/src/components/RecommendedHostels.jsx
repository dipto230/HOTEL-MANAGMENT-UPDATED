import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useAppContext } from '../context/AppContext'

const RecommendedHotels = () => {
  const { rooms, searchedCities } = useAppContext()
  const [recommended, setRecommended] = useState([])

  useEffect(() => {
    if (!rooms || !Array.isArray(rooms)) return

    let filteredHotels

    if (!searchedCities || searchedCities.length === 0) {
      // show all if no search filter
      filteredHotels = rooms
    } else {
      // filter by searchedCities (case-insensitive)
      filteredHotels = rooms.filter(room => {
        const city = room?.hotel?.city || room?.city || ""
        return searchedCities.some(
          c => c.toLowerCase() === city.toLowerCase()
        )
      })
    }

    setRecommended(filteredHotels)
  }, [rooms, searchedCities])

  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
      <Title 
        title='Recommended Hotels'
        subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences'
      />

      {recommended.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20'>
          {recommended.slice(0, 4).map((room, index) => (
            <HotelCard key={room._id || index} room={room} index={index} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-12 text-center">
          No recommended hotels found
        </p>
      )}
    </div>
  )
}

export default RecommendedHotels
