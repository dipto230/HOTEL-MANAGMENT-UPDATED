import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomCommonData } from '../assets/assets'
import StarRating from '../components/StarRating'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const RoomDetails = () => {
    const { id } = useParams()
    
    const {rooms,getToken, axios, navigate} = useAppContext()
    const [room, setRoom] = useState(null)

    const [mainImage, setMainImage] = useState(null)
    const [checkInDate, setCheckInDate] = useState(null)
    const [checkOutDate, setCheckOutDate] = useState(null)
    const [guests, setGuests] = useState(1)
    const [isAvailable, setIsAvailable] = useState(false) 

    // Check if the Room is Available
const checkAvailability = async () => {
  try {
    if (checkInDate >= checkOutDate) {
      toast.error("Check-In Date should be less than Check-Out Date");
      return;
    }

    const token = await getToken(); // ✅ get token
    const { data } = await axios.post(
      "/api/bookings/check-availability",
      {
        room: id,
        checkInDate,
        checkOutDate,
      },
      {
        headers: { Authorization: `Bearer ${token}` }, // ✅ send token
      }
    );

    if (data.success) {
      if (data.isAvailable) {
        setIsAvailable(true);
        toast.success("Room is available");
      } else {
        setIsAvailable(false);
        toast.error("Room is not available");
      }
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

    // onSubmitHandler function to check availability & book the room
const onSubmitHandler = async (e) => {
  try {
    e.preventDefault();
    if (!isAvailable) {
      return checkAvailability();
    } else {
      const { data } = await axios.post(
        '/api/bookings/book',
        {
          room: id,
          checkInDate,
          checkOutDate,
          guests,
          paymentMethod: "Pay At Hotel",
        },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate('/my-bookings');
        scrollTo(0, 0);
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {
    toast.error(error.message);
  }
};



    useEffect(() => {
        const room = rooms.find(room => room._id === id)
        room && setRoom(room)
        room && setMainImage(room.images[0])
    },[rooms])
  return room && (
      <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
          {/*Room Details*/}
          <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
              <h1 className='text-3xl md:text-4xl font-playfair'>{room.hotel.name}<span className='font-inter text-sm'>({room.roomType})</span></h1>
              <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
          </div>
          {/*Room Raiting*/}
          <div className='flex items-center gap-1 mt-2'>
              <StarRating />
              <p className='ml-2'>200+ reviews</p>
          </div>
          {/*Room Address*/}
          <div className='flex items-center gap-1 text-gray-500 mt-2'>
              <img src={assets.locationIcon} alt='location-icon' />
              <span>{room.hotel.address }</span>
          </div>
          {/*Room Images*/}
          <div className='flex flex-col lg:flex-row mt-6 gap-6'>
              <div className='lg:w-1/2 w-full'>
                  <img src={mainImage}  alt='Room-image' className='w-full rounded-xl shadow-lg object-cover' />
              </div>
              <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                  {room?.images.length > 1 && room.images.map((image, index) => (
                      
                      <img onClick={()=>setMainImage(image)}
                          key={index} src={image} alt='Room Image'
                      
                          className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image && 'outline-3 outline-orange-500'}`}
                      />
                  ))}
             </div>
                  
          </div>
          {/*Room Highlights*/}
          <div className='flex flex-col md:flex-row md:justify-between mt-10'>
              <div className='flex flex-col'>
                  <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before</h1>
                  <div className='flex flex-wrap items-center mt-3  mb-6 gap-4'>
                      {room.amenities.map((item, index) => (
                          <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100' key={index}>
                              <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                              <p className='text-xs'>{item }</p>
                              
                              </div>
                      ))}
                  </div>
              </div>
               {/*Room Price*/}
              <p className='text-2xl font-medium'>${room.pricePerNight }/night</p>
              
          </div>

          {/*CheckIn CheckOut Form*/}
          <form onSubmit={onSubmitHandler} className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl
          mx-auto mt-16 max-w-6xl mb-20
          '>
              <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
                  <div className='flex flex-col'>
                      <label htmlFor='CheckInDate' className='font-medium'>Check-In</label>
                      <input 
  onChange={(e)=>setCheckInDate(e.target.value)} 
  min={new Date().toISOString().split('T')[0]}  
  type='date' 
  id='CheckInDate' 
  placeholder='Check-In' 
  className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' 
  required
/>

                  </div>
                     <div className='w-px h-15  bg-gray-300/70 max-md:hidden'>
                      
                  </div>

                   <div className='flex flex-col'>
                      <label htmlFor='CheckOutDate' className='font-medium'>Check-Out</label>
                     <input 
  onChange={(e)=>setCheckOutDate(e.target.value)} 
  min={checkInDate} 
  disabled={!checkInDate} 
  type='date' 
  id='CheckOutDate' 
  placeholder='Check-Out' 
  className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' 
  required
/>
                  </div>
                  <div className='w-px h-15  bg-gray-500/70 max-md:hidden'></div>

                       <div className='flex flex-col'>
                      <label htmlFor='number' className='font-medium'>Guests</label>
                     <input 
  onChange={(e)=>setGuests(e.target.value)} 
  value={guests} 
  type='number' 
  id='guests' 
  min='1' 
  placeholder='1' 
  className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' 
  required
/>
                  </div>
                  
              </div>
             <button
  type='submit'
  className='bg-blue-600 hover:bg-blue-600-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-8 py-3 md:py-4 text-base cursor-pointer'
>
  {isAvailable? "Book Now" : "Check Availability"}
</button>

          </form>
          {/*common specification*/}
          <div className='mt-50 space-y-10 mb-10'>
              {roomCommonData.map((spec,index) => (
                  <div key={index} className='flex items-start gap-2'>
                      <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5' />
                      <div>
                          <p className='text-base'>{spec.title}</p>
                          <p className='text-gray-500'>{spec.description }</p>
                          </div>
                      
                      </div>
              ))}
          </div>
          <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
              <p>Step into comfort and elegance with our spacious Luxury Deluxe Room, designed for both leisure and business travelers. The room features a plush king-size bed with premium linens, modern furnishings, and large windows offering breathtaking city views.

Enjoy high-speed WiFi, a smart flat-screen TV, a work desk, and a cozy sitting area for ultimate relaxation. The en-suite bathroom comes with a rainfall shower, complimentary toiletries, and soft cotton towels.

Guests can also take advantage of 24/7 room service, daily housekeeping, and complimentary breakfast. Whether you’re here for a weekend getaway or a long stay, this room combines luxury and convenience for an unforgettable experience.</p>
          </div>
          {/*Hosted By*/}
          <div className='flex flex-col items-start gap-4 mt-10'>
              <div className='flex gap-4'
              >
                  <img src={room.hotel.owner.image} alt='Host' className='h-14 w-14 md:h-18 md:w-18 rounded-full object-cover' />
                  <div>
                     <p className='text-lg md:text-xl'>Hosted by {room.hotel.name}</p>

                      <div className='flex items-center mt-1'>
                          <StarRating />
                          <p className='ml-2'>200+ reviews</p>
                      </div>
                  </div>
              </div>
              <button className='px-6 py-2.5 mt-4 rounded text-white  bg-blue-500 hover:bg-blue-500-dull transition-all cursor-pointer'>Contact Now</button>
              
          </div>

          
    </div>
  )
}

export default RoomDetails