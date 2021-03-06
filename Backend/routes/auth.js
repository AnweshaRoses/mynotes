const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); // imported bcrypt js
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Anwesha*roses";

//ROUTE 1:create a user using: POST "/api/auth/createuser". Doesnt require Auth

router.post('/createuser', [
    body('name', 'Enter a valid mail').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be min 5 characters').isLength({ min: 5 })

], async (req, res) => {
    //if there are errors return bad requests and the erros
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with the same email exsists already
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exsists" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPacc = await bcrypt.hash(req.body.password, salt);
        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPacc,
        })
        const data = {
            user: {

                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })
        // res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal sever error")
    }
})
// ROUTE 2: Authentic a user using: POST "/api/auth/login". Doesnt require Auth
// Asking user to enter email and password
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),

], async (req, res) => {
    //if there are errors return bad requests and the erros
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // checking if the emailid and password is correct
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        // if user does not exsists then show error
        if (!user) {
            return res.status(400).json({ error: "Please login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        // if password does not exsists then show error
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please login with correct credentials" });
        }
        //using the id generate the auth token
        const data = {
            user: {

                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })
    } catch (error) {
        //if auth token cannot be generated after correct id and password then throw this error
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

});
// ROUTE 3: Getting logged in user detail: POST "/api/auth/getuser". Login Required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    }
    catch (error) {
        //if auth token cannot be generated after correct id and password then throw this error
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhOWFiNDVhY2FkNjE0YjRhOTQwMDY2In0sImlhdCI6MTYzODc2ODY1Mn0.AwdIN7XHRhNr-w-2Ib-EHMrBBwji-m5PCLQ8sZ_aIe4