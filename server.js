/*********************************************************************************
* BTI425 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Samarth Modi Student ID: 133357202 Date: 21-01-2023
* Cyclic Link: https://concerned-fly-pantyhose.cyclic.app/
*
********************************************************************************/ 

var express = require("express");
var cors = require("cors")
var dotenv = require('dotenv').config();
var MoviesDB = require("./modules/moviesDB.js")
var db = new MoviesDB()
var app = express();

var HTTP_PORT = process.env.PORT || 8080;


/* function onHttpStart() {
  console.log("API Listening " + HTTP_PORT);
} */

app.get("/", function(req,res){
    var JSON = 'API listing';
    res.json({message:JSON});
});

app.use(express.json())

app.use(cors());

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
    });
   }).catch((err)=>{
    console.log(err);
   });

app.post("/api/movies", (req,res)=>
{
 db.addNewMovie(req.body)
 .then((objt) =>   // objt is a object I created to request as a json formatted variable to add a new document in the collection
 {
  /* console.log(objt); */
  
  res.json(objt);
  
 }).catch((err)=>{
  res.status(500).send({message:"error"})
 });

})



app.get('/api/movies', async (req,res)=>
{
  /* console.log(req.query) */
 let {page, perPage, title} = req.query; //extract each parameter in each individual variables from url
  db.getAllMovies(page, perPage, title)
  .then((objt1) => //IF NOT WORK TRY CHANGING OBJT
  {
    res.json(objt1);
  }).catch((err) = function()
  {
      res.status(500).send({message: 'error'});
  })
})

app.get('/api/movies/:id', async(req,res)=>
{
  db.getMovieById(req.params.id)
  .then((objt) => 
  {
    res.json(objt);
  }).catch((err) = function()
  {
      res.status(500).send({message: 'error'});
  })
})

app.put('/api/movies/:id', async (req,res)=>
{
  db.updateMovieById(req.body,req.params.id)
  .then((objt) => 
  {
    /* res.json(objt); */
    res.status(200).send("Movie updated !")
  }).catch((err) = function()
  {
      res.status(500).send({message: 'error'});
  })
})

app.delete('/api/movies/:id', async(req,res) =>{
  db.deleteMovieById(req.params.id)
  .then((objt) => 
  {
    res.json(objt);
  }).catch((err) = function()
  {
      res.status(500).send({message: 'error'});
  })
})

