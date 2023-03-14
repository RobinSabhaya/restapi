const express = require('express');
const fs = require('fs');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const Port = process.env.PORT || 8000;
const Api = require('./App.json');

//Express App Specific Stuffs
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname,'/public')))
app.set('view engine','hbs')
app.set('views','./views')

//Mongoose And Mongodb Specific Stuffs
mongoose.connect('mongodb://localhost:27017/RestApi', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connection Successfull');
}).catch((err) => {
    console.log(err);
})

const ApiSchema = new mongoose.Schema({
   id : String,
   name : String,
   company : String,
   price : Number,
   colors : Array,
   image : String,
   description : String,
   category : String,
   featured : Boolean,
   shipping : Boolean,
})
const RestApi = new mongoose.model('RestApi', ApiSchema);


//Get And Post Request Specific Stuffs
app.route('/Api').get(async (req, res) => {
    //One or More element are filteration
    // const { name, age, sort } = req.query;
    const Obj = {};
    if (req.query.name) {
        Obj.name = req.query.name;
    }
    if (req.query.company) {
        Obj.company = req.query.company;
    }
    if(req.query.price){
        Obj.price = req.query.price;
    }
    if (req.query.sort) {
      try {
        let Sort = req.query.sort.replace(',', ' ');
        const data = await RestApi.find(Obj).sort(Sort);
        res.status(200).json({Data : data,bits:data.length})
      } catch (err) {
        res.status(400).json({msg : "can't found Data!!"})
      }
    }
  try {
    const Data = await  RestApi.find(Obj);
    res.status(200).json({StudentData : Data,bits : Data.length});
  } catch (err) {
    res.status(400).json({msg : "can't found Data!!"})
  }
}).post(async (req, res) => {
    const ApiData = new RestApi(req.body);
    ApiData.save().then(()=>{
        res.status(200).send(ApiData);
    }).catch((err)=>{
        res.status(400).send(err);
    })

    //Insert All Data In The Form Of Document
    // const Data = await RestApi.create(Api)
    // res.status(200).send(Data)
});

//Get And Patch Request Specific Stuffs For Id
app.route('/Api/:id').patch(async(req,res)=>{
  try {
    const Upatch = await RestApi.findByIdAndUpdate({"_id":`${req.params.id}`},req.body);
  res.status(200).json({UpdatedData : Upatch,bits:Upatch.length})
  } catch (err) {
    res.status(400).json({msg : "can't found Data!!"});
  }
}).get(async(req,res)=>{
 try {
  const Upget = await RestApi.findById(`${req.params.id}`);
  res.status(200).json({StudentData : Upget,bits : Upget.length})
 } catch (err) {
  res.status(400).json({msg : "can't found Data!!"})
 }
}).delete(async(req,res)=>{
  try {
    const Deldata = await RestApi.findByIdAndDelete({"_id" : `${req.params.id}`});
    res.status(200).json({DeletedData : Deldata,bits:Deldata.length});
  } catch (err) {
    res.status(400).json({msg : "can't found Data!!"});
  }
})

//Listen Specific Stuffs
app.listen(Port, () => {
    console.log(`Express App Is Now Running on http://127.0.0.1:${Port}/Api`)
})