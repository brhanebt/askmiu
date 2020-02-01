const router = require("express").Router();
const verify = require('./verifyToken');
const Question=require('../models/Question');
const ObjectId=require('mongodb').ObjectID;


router.get('/',verify,(req,res)=>{
  
    res.json({message:"This is message"});
})

router.post("/addquestion",verify, async (req, res) => {
    
    //create new 
    const question = new Question({
      postedby: req.body.userid,
      title: req.body.title,
      date:new Date(),
      body:req.body.body
    });
  
    try {
      const savedQuestion = await question.save();
      res.json({ question: savedQuestion });
    } catch (err) {
     console.log(err);
        res.status({message:'Error Occured'});
    }
  });

  router.post("/like/:questionid",verify,async (req,res)=>{
    try{
        console.log(req.params.questionid);
        console.log(req.body.userid);
        const findRes = await Question.findOne({"_id":req.params.questionid,"likes":req.body.userid});
        if(findRes){
            const resUnlike = await Question.updateOne({"_id":req.params.questionid},{$pull:{"likes":req.body.userid}},{new: true});
            res.json(resUnlike);
        }
        else{
            const resLike = await Question.updateOne({"_id":req.params.questionid},{$addToSet:{"likes":req.body.userid}},{new: true});
            res.json(resLike);
        }
    }catch(err){
        res.json({message:"Unable to perform like/unlike"});
    }
  });

  router.post("/:questionid/reply",verify,async (req,res)=>{
    try{
        const reply = {
            text : req.body.body,
            replydate: new Date()
        };
        const resReply = await Question.updateOne({"_id":req.params.questionid},{$push:{"replies":reply}},{new: true});
        res.json(resReply);
    }catch(err){
        res.json({message:"Unable to perform reply"});
    }
  });
  
  router.delete("/delete/:id", function(req, res) {
  console.log(req.params.id);
  let id = req.params.id;
  Question.remove(
    {
      _id: id
    },
    function(err) {
      if (err) res.json({ message: "Something error Occured" });
      else res.json({ message: "Successfully! Question has been Deleted" });
    }
  );
});


module.exports = router;