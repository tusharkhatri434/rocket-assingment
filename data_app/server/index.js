const express = require('express');
const app  = express();
const cors = require('cors');
const mongoose = require('mongoose');
const user = require('./model/User');
const DataModel = require('./model/Data');
const dataRoutes = require('./router/dataRoutes');
const userRoutes = require('./router/userRoutes');


// mongoose.connect()
const mongo_uri = "mongodb+srv://tusharkhatri1001:KKOCMiJbj2uLLOi4@cluster0.5hvqw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/demoapp"
mongoose.connect(mongo_uri);

app.use(express.json());
app.use(cors())
app.use("/data",dataRoutes);
app.use("/user",userRoutes);


app.listen(8000,()=>{
    console.log("server is running",8000);
})