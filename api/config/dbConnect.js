const mongoose = require('mongoose');

function dbConnect(){
    console.log(process.env.DATABASE_URI)
    mongoose.connect(process.env.DATABASE_URI)
    .then(()=>console.log('database connected'))
    .catch((error)=>console.log('failed to connect database',error))
}

module.exports = dbConnect