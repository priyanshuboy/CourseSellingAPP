require('dotenv').config()
const express = require('express')
const { userRouter }= require('./routes/user')
const { courseRouter }=require('./routes/course')
const { adminRouter }=require('./routes/admin')
const app = express();  // Instance of http server 
const cors =require('cors')
app.use(express.json());



app.use('/user',userRouter)    
app.use('/course',courseRouter)
app.use('/admin',adminRouter)  





 
app.listen(5500);





  