const express = require('express');
const fs = require('fs');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const Port = process.env.PORT || 8000;
//ExpressApp Specific Stuffs
const app = express();
app.use(express.json());

//Mongoose And Mongodb specific Stuffs
mongoose.connect("mongodb://localhost:27017/CovidApi",{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('Connection Successfull');
}).catch((err)=>{
    console.log("No connection")
})

//Mongoose Schema
const CovidApiSchema = new mongoose.Schema({
    dailyconfirmed : Number,
    dailydeceased : Number,
    dailyrecovered : Number
});

//Mongoose Model
const CovidApiModel = new mongoose.model('CovidApi',CovidApiSchema);
//Get And Post Request Specific Stuffs
app.route('/covidapi').get(async(req,res,next)=>{
    try {
        const ApiData = await CovidApiModel.find();
    res.status(200).send(ApiData)
    } catch (error) {
        // res.status(400).send(error);
        res.status(404).json({
            "message" : "Not found in Database"
        })
    }
}).post((req,res,next)=>{
    const CovidData = new CovidApiModel(req.body);
    CovidData.save().then(()=>{
        res.status(200).send(CovidData);
    }).catch((err)=>{
        res.status(404).send(err)
    })
})
app.listen(Port,()=>{
    console.log(`Express App Is Now Running On http://127.0.0.1:${Port}/covidapi `)
});