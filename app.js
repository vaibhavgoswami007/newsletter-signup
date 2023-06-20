//jshint esversion: 6

const express=require("express");
const bodyParser=require("body-parser");
const request = require("request");
const https= require ("https");
// const { request } = require("http");

//to add static files of ur local to the server we need to use express.satic===like local images and local css
const app=express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(__dirname + '/signup.html');
});

app.post("/",function(req,res){
    const fN=req.body.firstName;
    const lN=req.body.lastName;
    const Em=req.body.Email;
    
    const data={
        members: [
            {
                email_address:Em,
                status: "subscribed",
                merge_fields : {
                    FNAME :fN,
                    LNAME : lN  
                }
            }
        ]
    }
    //we have to pass this data in json format
     
    const jsonData=JSON.stringify(data);

    const url="https://us21.api.mailchimp.com/3.0/lists/0099d5343b";

    const options  ={
        method:"POST",
        auth:"vaibhav1:fa7b549001c3b497131f1f2f1a16ac95-us21"
    }
    const request=https.request(url,options, function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname + '/success.html');
        }
        else{
            res.sendFile(__dirname + '/failure.html');
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();      
})

app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(3000,function(){ 
    console.log('server is running on port 6002');
});





// fa7b549001c3b497131f1f2f1a16ac95-us21

// 0099d5343b
