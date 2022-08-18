
const express=require("express");
const mongoose=require('mongoose');
const server = express();
const jwt=require("jsonwebtoken");
require('dotenv').config();
const bcrypt = require("bcryptjs")
const cors = require("cors");

const contactRoute = require('./Router/user-router')
const signupModal=require("./modals/signup-model");



//server listen
const PORT=process.env.PORT ||3032;

server.listen(PORT,(err)=>{
    if(!err) {
        console.log(`app started at port ${PORT}`)
    }else{
        console.log(err)
    }
    
})

//body parser

server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cors())
//database connection

mongoose.connect("mongodb+srv://sougata:project%40123@contactmanager.utz7mbi.mongodb.net/test",(err)=>{
    if(!err) {
        console.log(`server connected at db`)
    }else{
        console.log(err)
    }
});

//get route


server.post("/signup",(req,res)=> {
    let {email, password, cpassword}=req.body

    if (!email || !password || !cpassword) {
        return res.status(400).send('Please Fill the Field')
    }

    signupModal.findOne({email:email}).then((exist)=> {
        if(exist) {
            return res.status(400).send("User Already Exist")
        }
        else {
            if (password==cpassword) {
                bcrypt.hash(password,10).then((hashpassword)=> {
                    signupModal.create({
                        email:email,
                        password:hashpassword
                    }).then((data)=> {
                        res.status(200).send("User Successfully Created")
                    })
                })
            }
            else {
                return res.status(400).send("Password Mismatch")
            }
        }
    })
})

server.post("/login", (req, res)=> {
    let { email, password}=req.body

    if (!email || !password) {
        return res.status(400).send("Please Fill Your Login Details")
    }

    signupModal.findOne({email:email}).then((exist)=>{
    
        if (exist) {
            bcrypt.compare(password,exist.password).then((check)=> {
                if (check){
                    const token = jwt.sign(exist.email , process.env.SECRET_KEY)
                    res.status(200).send(token)
                }else {
                    return res.status(400).send("Invalid User Credentials")
                }
            })
        }else {
            return res.status(400).send("User Does Not Exist")
        }
    })
});

server.use('/user',contactRoute)