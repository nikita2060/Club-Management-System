import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

const registerUser = async (req,res)=>
{
    
    try {
        const {name,email,usn,password,role,description} = req.body;
        if(!(email && password && name && role)) 
            {
                return res.status(400).json({message:"All input is required"});
            } // if any value is not present it gives false which converts to true and throws error
        
        
        const existingUser = await User.findOne({email});
        
        if(existingUser)
        {
            return res.status(400).json({message:"User already exists"});
        }
        
        const hashedpassword = await bcrypt.hash(password,10);
    
        const newUser = new User({
            name,
            email,
            usn : role === "user" ? usn:undefined, //if role is user then assign value inside usn to usn field else assign undefined
            password : hashedpassword,
            role,
            description : role !== "user" ? description:undefined
    
        })
    
        await newUser.save();
    
        res.status(201).json({message:"User registered successfully"});
    
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Server error", error });
        
    }



};

export {registerUser};
