const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;
    if (!jwtkey) throw new Error("JWT_SECRET_KEY is not defined in the environment variables.");
    return jwt.sign({_id}, jwtkey, {expiresIn: "3d"});
};

const registerUser = async(req, res) => {
    try{
        const {name, email, password} = req.body;

        let user = await userModel.findOne({email});

        if(user) return res.status(400).json("User with the given email already exists...");

        if(!name || !email || !password) return res.status(400).json("All fields are required..");

        if(!validator.isEmail(email)) return res.status(400).json("Email is invalid..");

        if(!validator.isStrongPassword(password)) return res.status(400).json("Password must be strong..");
    
        user = new userModel({name, email, password});

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const token = createToken(user._id);    

        res.status(200).json({_id: user._id, name, email, token});
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const loginUser = async(req, res) => {
    const {email, password} = req.body;

    try{
        if (!email || !password) return res.status(400).json({ message: "Email and password are required." });

        let user = await userModel.findOne({email}); console.log(2);

        if(!user) return res.status(400).json("Invalid email or password...");

        console.log("Password from request:", password);
        console.log("Hashed password from database:", user?.password);

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) return res.status(400).json("Invalid email or password...");

        const token = createToken(user._id);    

        res.status(200).json({_id: user._id, name: user.name, email, token,});

    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const findUser = async(req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    try{
        const user = await userModel.findById(userId);
        res.status(200).json(user);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}   

const getUser = async(req, res) => {
    
    try{
        const users = await userModel.find();
        res.status(200).json(users);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { registerUser , loginUser , findUser , getUser }