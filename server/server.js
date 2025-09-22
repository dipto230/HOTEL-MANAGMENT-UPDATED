import express from "express"
import "dotenv/config";
import cors from "cors"
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRouters.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";


connectDB()
connectCloudinary()

const app = express()
app.use(cors())
app.post('/api/stripe', express.raw({ type: "application/json" }), stripeWebhooks);

//middleware 
app.use(clerkMiddleware())
app.use(express.json())





app.get('/', (req, res) => res.send("API IS WORKING FINE"))
app.use('/api/user', userRouter)
app.use('/api/hotels', hotelRouter)
app.use("/api/clerk", clerkWebhooks)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))