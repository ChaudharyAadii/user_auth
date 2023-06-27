const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');       // for password hashing
const jwt = require('jsonwebtoken');
const { response } = require('express');
const SECRET_KEY = "abcdefghijklmnop";

const userSchema = new mongoose.Schema({
    fname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not valid email")
            }
        }
    },
    password: { type: String, required: true, minLength: 6},

    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})


// hash password 

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,12);
    }

    next();
})

// token generation

userSchema.methods.generateAuthToken = async function(){
    try {
        let newtoken = jwt.sign({_id:this.is}, SECRET_KEY, {
            expiresIn: "1d"
        });

        this.tokens = this.tokens.concat({token: newtoken});
        await this.save();
        return newtoken; 
    } catch (error) {
        res.status(400).json(error)
    }
}

// creating model

const users = new mongoose.model("users", userSchema);

module.exports = users;