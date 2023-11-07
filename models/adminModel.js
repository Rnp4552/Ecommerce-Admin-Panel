const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require: true,
        unique : true
    },
    password : {
        type : String,
        require : true,
        unique : true
    },
    contact : {
        type : String,
        require : true
    }
});

userSchema.pre("save", async function(next){
    try{
        if(this.isModified("password")){
            this.password  = await bcrypt.hash(this.password, 10);
        }
        next();
    }
    catch(e){
        console.log(e);
    }
});

const userModel = new mongoose.model("AdminModel", userSchema);

module.exports = userModel;