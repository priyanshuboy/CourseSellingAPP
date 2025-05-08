const { Router } = require('express');
const bcrypt = require('bcrypt');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const { adminModel , courseModel } = require("../Database");
const {adminmiddleware} = require('../middleware/admin')
const JWT_SECRET = process.env.JWT_SECRET
const adminRouter = Router();

adminRouter.post('/signup', async function (req, res) {
    const userDetail = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(100)
    });

    const parsedata = userDetail.safeParse(req.body);

    if (!parsedata.success) {
        res.json({ message: "invalid format" });
        return;
    }

    const { email, password } = req.body;

    const checkuser = await adminModel.findOne({ email });

    if (checkuser) {
        res.json({ message: "user already exists" });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await adminModel.create({
        email,
        password: hashedPassword
    });

    res.json({ message: "admin created successfully" });
});

adminRouter.post('/signin', async function (req, res) {
    const userDetail = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(100)
    });

    const parsedata = userDetail.safeParse(req.body);

    if (!parsedata.success) {
        res.json({ message: "invalid format" });
        return;
    }

    const { email, password } = req.body;

    const checkuser = await adminModel.findOne({ email });

    if (!checkuser) {
        res.json({ message: "user does not exist" });
        return;
    }

    const userPass = await bcrypt.compare(password, checkuser.password);

    if (!userPass) {
        res.json({ message: "invalid password" });
        return;
    }

    const token = jwt.sign({ id: checkuser._id.toString() }, JWT_SECRET);

    res.status(201).json({
        message: "you are signed in",
        token: token
    });
});

adminRouter.post('/course', adminmiddleware , async function (req, res) {
       
    const adminid = req.id

    const { title, description, price, imageurl } = req.body

 const course = await courseModel.create({
    title: title, 
    description: description, 
    imageUrl: imageurl, 
    price: price,
    creatorid : adminid

 })        

     res.json({
      message : "course created" ,
       courseid : course._id 

     })

      

})

adminRouter.put('/course/update', adminmiddleware , async function (req, res) {
       
    const adminid = req.id
    const {title , description , imageurl ,price ,courseid } = req.body

 const course = await courseModel.updateOne({
         
       _id : courseid ,
       creatorid : adminid
        
     
 } ,
 
 {
    title: title, 
    description: description, 
    imageUrl: imageurl, 
    price: price
 })        

     res.json({
      message : "course updated" ,
       courseid : course._id 

     })

      

})

adminRouter.get('/courses', adminmiddleware , async function (req, res) {
       
    const adminid = req.id
   

 const course = await courseModel.findOne({
         
    creatorid :adminid
        
     
 })       

     res.json({
      message : "course updated" ,
      course

     })

      

})
module.exports = { adminRouter };
