const { Router } = require('express');
const bcrypt = require('bcrypt');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const { userModel } = require("../Database");
JWT_SECRET1 = process.env.JWT_SECRET1
const {usermiddleware} = require('./middleware/user')

const userRouter = Router();

userRouter.post('/signup', async function (req, res) {
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

    const checkuser = await userModel.findOne({ email });

    if (checkuser) {
        res.json({ message: "user already exists" });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
        email,
        password: hashedPassword
    });

    res.json({ message: "user created successfully" });
});

userRouter.post('/signin', async function (req, res) {
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

    const checkuser = await userModel.findOne({ email });

    if (!checkuser) {
        res.json({ message: "user does not exist" });
        return;
    }

    const userPass = await bcrypt.compare(password, checkuser.password);

    if (!userPass) {
        res.json({ message: "invalid password" });
        return;
    }

    const token = jwt.sign({ id: checkuser._id.toString() }, JWT_SECRET1);

    res.status(201).json({
        message: "you are signed in",
        token: token
    });
});

userRouter.get('/purchases' ,usermiddleware , async function(req,res){
   


})



module.exports = { userRouter };
