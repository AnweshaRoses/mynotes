const express=require('express');
const router=express.Router();
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); // imported bcrypt js
var jwt = require('jsonwebtoken');

const JWT_SECRET="Anwesha*roses";

//create a user using: POST "/api/auth/createuser". Doesnt require Auth

router.post('/createuser',[
    body('name','Enter a valid mail').isLength({min:3}), 
    body('email','Enter a valid Email').isEmail(),
    body('password','Password must be min 5 characters').isLength({min:5})

],async(req,res)=>{
    //if there are errors return bad requests and the erros
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with the same email exsists already
    try{

        let user= await User.findOne({email:req.body.email});
        if (user){
            return res.status(400).json({ error:"Sorry a user with this email already exsists"});
        }
        const salt= await bcrypt.genSalt(10);
        const secPacc=  await bcrypt.hash(req.body.password,salt);
        //create a new user
        user=await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPacc,
        })
        const data={
            id:user.id
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        res.json({authtoken})
        // res.json(user)
    } catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

module.exports=router