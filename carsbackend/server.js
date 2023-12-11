
//importing the Express module
const express = require("express");
//importing the body-parser module
const bodyParser = require("body-parser");
//importing the Mongoose module
const mongoose = require('mongoose');
//creating an instance of the Express application
const app = express();
const cors = require('cors');
//setting the port number for the server
const PORT = 8020;

const connection = 'mongodb+srv://gadzisorameckjunior7:freedom2003@cluster0.kan2xkd.mongodb.net/carInventory?retryWrites=true&w=majority'

//connecting to the MongoDB database
mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    w: 'majority',
}).then(() => {
    console.log('Connected to MongoDB.');
}).catch((error) => {
    console.error(`MongoDB connection error: ${error}`)
});

app.use(cors({
    origin: 'https://car-database-ui.onrender.com', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

//using the body-parser middleware to parse JSON data
app.use(bodyParser.json());

//importing the carController module
const carRoutes = require('./controllers/carController');

//using the carRoutes middleware for handling car-related routes
app.use('/cars', carRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
