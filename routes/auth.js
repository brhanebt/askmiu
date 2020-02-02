const router = require("express").Router();
const User = require("../models/User");
const { registerValidation ,loginValidation } = require("../routes/validation");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


//new user register
router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.json({status:false,message: error.details[0].message});

  //check if the user is already in database
  const emailExist = await User.findOne({ email: req.body.email.toLowerCase()});
  if (emailExist) return res.json({status:false,message :"Email already exists"});

  //Hash the passwords
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(req.body.password, salt);

  //create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    password: hashpassword
  });

  try {
    const savedUser = await user.save();
    res.json({status:true, user: savedUser._id });
  } catch (err) {
    res.json({status:false,message:'Error Occured'});
  }
});

//LOGIN USER
router.post("/login", async(req, res) => {

    const { error } = loginValidation(req.body);
    if (error) return res.json({status:false,message:error.details[0].message});

    //Check if the email exists
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (!user) return res.json({status:false,message:"Email not found"});

    //Password is correct
    const validpass = await bcrypt.compare(req.body.password,user.password);
    if(!validpass) return res.json({status:false,message:'Invalid Password'});

    //Create and assign a token
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).json({status:true,token:token,userId :user._id});


});
module.exports = router;
