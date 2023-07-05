const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://RobinSabhaya:Robin_11117@cluster0.jiwrx8s.mongodb.net/restApi?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true,useUnifiedTopology : true}).then(() => {
    console.log('Connection Successfull');
}).catch((err) => {
    console.log(err);
})