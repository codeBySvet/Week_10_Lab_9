const express = require('express')  //Need express to run the server
const app = express()
const port = 4000   //Designate which port for the server to listen on
const cors = require('cors');   //Needed for cors functionality below
const bodyParser = require('body-parser');//bodyparser will go parse through HTTP messages 

//This is to handle cors error
app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//importing mongoose library
const mongoose = require('mongoose');

//  Connecting to MongoDB database
//const strConnection = 'mongodb+srv://admin:admin@cluster0.8taek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' 
const strConnection = "mongodb+srv://anshlom4321:anshlom4321@cluster0.mfk7y.mongodb.net/movies?retryWrites=true&w=majority";


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(strConnection);
}

//Generating schema to control what the documents will look like/be structured
const movieSchema = new mongoose.Schema({
    Title:String,
    Year:String,
    Poster:String
});

const movieModel = mongoose.model('movie', movieSchema);

//Json get requst/response for /
app.get('/', (req, res) => {
    res.send('Hello World!')
})
//Json post requst/response for /api/movies
app.post('/api/movies', (req,res)=>{
    console.log(req.body);
    console.log(req.body.Title);
    console.log(req.body.Year);
    console.log(req.body.Poster);

    //Creates documents in the mongo db database
    movieModel.create({
        Title:req.body.Title,
        Year:req.body.Year,
        Poster:req.body.Poster
    });
    //This sends a messaage back to ensure items added to the database are not added
    //multiple times by mistake
    res.send('Data Sent to Server!')
})

//Json requst/response for /api.movies/:id finding by ID
app.get('/api/movies/:id',(req, res)=>{
    console.log(req.params.id);

    movieModel.findById(req.params.id,(error,data)=>{
        res.json(data);
    })
})

//Json PUT method for specific movie to replace movie data
app.put('/api/movies/:id',(req, res)=>{
    console.log('update');
    console.log(req.body);
    console.log("Updating: " + req.params.id);

    movieModel.findByIdAndUpdate(req.params.id, req.body, {new:true},
        (err,data)=>{
            res.send(data);
        })

})

//Json requst/response for /api.movies.
app.get('/api/movies', (req, res) => {
    //Find all records in the database and return
    movieModel.find((err, data)=>{
        res.json(data);
    })      
})

//Listening for a delete request, if heard it will delete a movie based on the movie ID
app.delete('/api/movies/:id', (req,res)=>{
    console.log("Delete Movie: "+ req.params.id)

    movieModel.findByIdAndDelete(req.params.id,(err, data)=>{
        res.send(data);
    })
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})