const express = require("express");
const adminModel = require("../models/adminModel");
const bcrypt = require("bcryptjs");


// admin registration
const adminregister = async(req,res) => {
    const admindata = new adminModel({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        contact : req.body.contact
    });

    const alrdyexist = await adminModel.findOne({email : admindata});
    console.log(alrdyexist);

    if(alrdyexist){
        res.status(400).json({
            msg : "Please enter valid email"
        })
    }
   
    await admindata.save();
    res.render("login")
    
};

// admin login
const adminlogin = async(req,res) => {
    const adminemail = req.body.email;
    const adminpass = req.body.password;
    const checkemail = await adminModel.findOne({email : adminemail});
    console.log(checkemail);
    if(checkemail){
        const checkpass = await bcrypt.compare(adminpass, checkemail.password);

        if(checkpass){
            res.render("index");
        }
        else{
            res.status(400).json({
                msg : "Please enter valid password!!"
            })
        }
    }
    else {
        res.status(400).json({
            msg : "Please enter valid email_id"
        })
    }
};


module.exports = [adminregister,adminlogin];