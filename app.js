
const express = require("express");
const bodyParser =require("body-parser");
const request = require("request");
const https =require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


app.get("/",function(req,res){

    res.sendFile(__dirname+"/signup.html");

});


app.post("/",function(req,res){

    const fName=req.body.fName;
    const lName=req.body.lName;
    const email=req.body.email;
   
    const data={
        members:[
           {
            email_address:email,
            status : "subscribe",
            merge_fields:{
                FNAME:  fName,
                LNAME:  lName
            }
           }
        ]

    };

    const jsonData= JSON.stringify(data);

    const url="https://";
    const options={

    method : "post",
    auth:"Karan1:"

    }
    const req1 =https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else {
            res.sendFile(__dirname+"/failure.html");

        }

        response.on("data",function(data){
            console.log(JSON.parse(data));  
        })
    
    })
    req1.write(jsonData);
    req1.end();


});

app.post("/failure",function(req,res){
    res.redirect("/");
})



app.listen(4000,function(){
    console.log("Server is running on 4000");
});


