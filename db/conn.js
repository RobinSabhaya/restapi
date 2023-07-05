const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL
mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true,useUnifiedTopology : true}).then(() => {
    console.log('Connection Successfull');
}).catch((err) => {
    console.log(err);
})