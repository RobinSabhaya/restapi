const mongoose = require('mongoose');
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
 const RestApi = mongoose.model('RestApi', ApiSchema);

 module.exports = RestApi;