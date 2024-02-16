const mongoose = require('mongoose');
mongoose.connect(process.env.mongo_url)

const connection = mongoose.connection;

connection.on('connected',()=>{
    console.log('mongodb connection successful')
})

connection.on('error',(err)=>{
    console.log('mongodb connection error',err)
})


// const connect = async()=>{
//     try{
//         await mongoose.connect("mongodb://127.0.0.1:27017/bloodbank");
//     }
//     catch(error){
//         console.log('mongodb connection error');
//     }

// }