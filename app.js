const express = require('express');

const body_parser = require('body-parser');

const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const multer = require('multer');

const productRoutes = require('./routes/productRoute');

//Creates the express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(body_parser.urlencoded({extended: true}));

// parse requests of content-type - application/json
app.use(body_parser.json());

//Connects to the database
mongoose
  .connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp',{

        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(err => {
      console.log('Not connected', err);
    })

// created a function to store the file destination and filename
const fileStorage = multer.diskStorage({

    //defines where the file should be stored
    destination: function(req, file, cb){
        cb(null, './uploads');
    },

    //defines the file name
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true) //Stores the file if true
    }else{
        cb(null, false) //Rejects the file if false ie if the file is a Zip file or any other file
    }
}

app.use(multer({ 
    storage: fileStorage, 

    limits: { fileSize: 1024 * 1024 * 5 },

    fileFilter: fileFilter

}).single('Image'))
    
app.use('/uploads', express.static('uploads'))

app.use('/product', productRoutes);

  
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`)
});