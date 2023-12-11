import express, { response } from 'express'
import { PORT, mongodbUrl } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors'
import Routesapi from './routes/Routesapi.js'
import UserRoutes from './userRoute/UserRoute.js'

const app = express();
app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'));


app.get('/', async(request, response)=>{
    return response.status(203).send("Welcome to Zomato Server!")
})
app.use('/fooditems', Routesapi)

app.use('/usercredentials',UserRoutes)


mongoose
.connect(mongodbUrl)
.then(()=>{
    console.log("MongoDB connected")
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((error)=>{
    console.log(error)
    return response.status(501).send({message:error.message})
})

    