const mongoose = require('mongoose');

function dbConnect(){
    console.log(process.env.DATABASE_URI)
    mongoose.connect(process.env.DATABASE_URI)
    .then(()=>console.log('database connected'))
    .catch(()=>console.log('failed to connect database'))
}

module.exports = dbConnect