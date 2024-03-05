const express=require("express");
const mysql=require("mysql");
const dotenv=require("dotenv");

dotenv.config({ path: "./.env"});

const app=express();
const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:process.env.DATABASE
});

db.connect((error)=>{
    if(error) 
    {
        console.log(error);
    }
    else console.log("MySQL connected");
})

app.get("/",(req,res)=>{
    res.send("<h1>E-Accessibility</h1>");
}); 

app.listen(5000,()=>{
    console.log("server started on port 5000");
});