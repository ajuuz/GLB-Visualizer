const express = require('express');
const app = express();
const cors = require('cors')
const router = require('./routers/router');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect');
dotenv.config()

const PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
})); 

dbConnect()

app.use('/',router);

app.listen(PORT,()=>console.log("server running"));
