
require('dotenv').config();
const mongoose = require('mongoose');

// Correct capitalization
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// MongoDB connection
mongoose.connect(process.env.MONGO_url);

// User schema
const userSchema = new Schema({
    email: { type: String, unique: true },
    password : String
});

// Admin schema
const adminSchema = new Schema({
    email: { type: String, unique: true },
   password : String
});

// Course schema
const courseSchema = new Schema({
    title: String,
    Discription: String,
    Price: Number,  // fixed typo: number → Number
    imageurl: String,
    Creatorid: ObjectId
});

// Purchase schema
const purchasesSchema = new Schema({
    courseid: ObjectId,
    userid: ObjectId
});

// Mongoose models
const userModel = mongoose.model('user', userSchema);
const adminModel = mongoose.model('admin', adminSchema);
const courseModel = mongoose.model('course', courseSchema);
const purchasesModel = mongoose.model('purchase', purchasesSchema);

// Exporting models
module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchasesModel
};
