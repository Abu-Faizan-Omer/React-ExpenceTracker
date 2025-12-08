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

 function generateAccessToken(id,name){
    return jwt.sign({userId:id,name:name},'secretkey')
 }
// Export generateAccessToken
 exports.generateAccessToken = generateAccessToken;

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //console.log("email--", email, password);

    if (isStringValid(email) || isStringValid(password)) {
      return res.status(400).json({ message: "Email or password is missing" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Password not match" });
    }
    return res.status(200).json({ message: "User login successful",token: generateAccessToken(
        user.id, user.name), userId: user.id, name: user.name
    })
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const { name, photoURL } = req.body;
        const userId = req.user.id; 

        // Update user
        const updatedUser = await User.update(
            { name, photoURL },
            { where: { id: userId } }
        );

        if (updatedUser[0] === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ 
            message: "Profile updated successfully",
            user: { name, photoURL }
        });

    } catch (err) {
        console.error("Update profile error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
