const router = require("express").Router();
const User = require("../models/User");
const verify = require('./verifyToken');


//follow user
router.patch('/follow/:userid/:topicid',async(req,res,next)=>{
    const userID = req.params.userid;
    const topicID = req.params.topicid;

    
    const found=  await User.findOne({_id:userID,followedTopics:topicID});
    if(found) return res.json({message:"Topic Already Subscribed"})
    
     User.findOneAndUpdate({"_id": userID},{$push: {"followedTopics": topicID}},(err,result)=>{
        if(err) return res.send(err);
        return res.json({message :"Topic Subscribed"});
    })

})

router.patch('/unfollow/:userid/:topicid',async(req,res,next)=>{
    const userID = req.params.userid;
    const topicID = req.params.topicid;

    
    const found=  await User.findOne({_id:userID,followedTopics:topicID});
    if(!found) return res.json({message:"Topic Not Subscribed"})
    
     User.findOneAndUpdate({"_id": userID},{$pull: {"followedTopics": topicID}},(err,result)=>{
        if(err) return res.send(err);
        return res.json({message :"Topic Unsubsribed"});
    })

})


// router.param

module.exports = router;
