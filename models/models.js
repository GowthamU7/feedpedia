const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    authorialName:{
        type:String,
        required:true,
        unique:true
    },
    tokens:{
        type:[new Object({tkn:{type:String}})]
    }
})

const feedSchema = new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true
    },
    tagline:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    author:{
        type:String
    }
})


const userModel = mongoose.model('user',userSchema)
const feedModel = mongoose.model('feed',feedSchema)

module.exports = {userModel,feedModel}

