const router = require("express").Router();
const User = require("../models/User");
const { registerValidation ,loginValidation } = require("../routes/validation");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken')

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
    password: hashpassword,
    role:'user'
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
    res.header('auth-token',token).json({status:true,token:token,userId :user._id,role:user.role});


});

//get by userid
router.get('/:userId',verify,async(req,res)=>{

  const user = await User.findOne({_id:req.params.userId});
  try{
    res.json({id:user._id,name:user.name,email:user.email,date:user.date,topicscount:user.followedTopics.length});
  }catch(err){
    res.json({message:"Something error Occured"})
  }

});


//update by userid

router.put("updateprofile/:userId",verify,async(req,res)=>{
 const user  =await User.update({_id:req.params.userId},{$set: {name:req.body.name}});
  if(user){
    res.json({updated:true})
  }else{
    res.json({updated:false});

  }
})

//Change Password
router.put("changepassword/:userId",verify,async(req,res)=>{
  const user = await User.findOne({ _id: req.params.userId});
  if(!user){
    return res.json({status:false,message:"User Not found"});

  }

  const validpass = await bcrypt.compare(req.body.oldpassword,user.password);
 
  if(req.body.newpassword.length<6){
    return res.json({status:false,message:"New Password Length Must be 6"});
  }

  if(!validpass){
    return res.json({status:false,message:"Old Password Doesn't Match"});
  }


  const salt = await bcrypt.genSalt(10);
  const newpassword = await bcrypt.hash(req.body.newpassword, salt);

  const data = User.updateOne({_id:req.params.userId},{$set:{password:newpassword}})
   if(data){
     res.json({updated:true,message:'password Updated'})
   }else{
     res.json({updated:false,message:"Password Update Failure"});
 
   }
 })



module.exports = router;
