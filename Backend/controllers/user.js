const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function isStringValid(string) {
    if (string == undefined || string.length === 0) {
        return true;
    } else {
        return false;
    }
}

exports.signup = async (req, res, next) => {
    try {
        const { email, password, confirmPassword } = req.body;

       
        if (isStringValid(email) || isStringValid(password) || isStringValid(confirmPassword)) {
            return res.status(400).json({ err: "Something is missing" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ err: "Password and Confirm Password do not match" });
        }

      
        const saltround = 10;
        const hash = await bcrypt.hash(password, saltround);  
        
        const UserDetails = await User.create({ email, password: hash });
        return res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ err: "Internal server error" });
    }
};

