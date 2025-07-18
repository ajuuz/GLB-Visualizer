const express = require('express');
const app = express();
const cors = require('cors')
const router = require('./routers/router');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config()

const PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
})); 

mongoose.connect(process.env.DATABASE_URI)
.then(()=>console.log('database connected'))
.catch(()=>console.log('failed to connect database'))

app.use('/',router);

app.listen(PORT,()=>console.log("server running"));
