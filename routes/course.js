
const { Router } = require('express') //need express.router from express library

const courseRouter = Router() // router to route ulr to desired response

const { purchaseModel, courseModel } = require("../Database")

courseRouter.post("/purchase", userMiddleware, async function(req, res) {
    const userId = req.id;
    const courseId = req.body.courseId;

    // should check that the user has actually paid the price
    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message: "You have successfully bought the course"
    })
})

courseRouter.get("/preview", async function(req, res) {
    
    const courses = await courseModel.find({});

    res.json({
        courses
    })
})  

module.exports ={
    courseRouter :courseRouter
}
