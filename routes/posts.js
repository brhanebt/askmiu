const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/User");
const Question=require('../models/Question');
const mongoose=require('mongoose');

router.get("/feed/:userid", verify, async (req, res) => {
  try {
    let followedTopics = await User.findOne(
      { _id: req.params.userid },
      { _id: 0, followedTopics: 1 }
    );
    let query;
    if (!followedTopics) {
      query = {
        $or: [
          { likes: req.params.userid },
          { replies: req.params.userid },
          { postedby: req.params.userid }
        ]
      };
    } else {
      query = {
        $or: [
          { topics: { $in: followedTopics.followedTopics } },
          { likes: req.params.userid },
          { replies: req.params.userid },
          { postedby: req.params.userid }
        ]
      };
    }
    console.log(query);
    const questions = await Question.find(query);
    res.json(questions);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/timeline/:userid", verify, async (req, res) => {
  try {
    let query = {
      $or: [
        { likes: req.params.userid },
        { replies: req.params.userid },
        { postedby: req.params.userid }
      ]
    };
    const questions = await Question.find(query);
    res.json(questions);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/:questionid", verify, async (req, res) => {
  try {
    const question = await Question.find({ _id: req.params.questionid });
    res.json(question);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//need to replace by get in future
router.post("/search", verify, async (req, res) => {
  try {
    const questions = await Question.find({
      $and: [
        { topics: { $in: req.query.topics } },
        { title: { $regex: req.query.searchstring, $options: "ix" } }
      ]
    });
    res.json(questions);
  } catch (err) {
    res.json({ message: err.message });
  }
});


//Filter 
//need to change in future
router.post("/filter", verify, async (req, res) => {
  try {
    const questions = await Question.find({
      topics: { $in: req.query.topics }
    });
    res.json(questions);
  } catch (err) {
    res.json({ message: err.message });
  }
})

router.post("/addquestion",verify, async (req, res) => {
    const question = new Question({
      postedby: req.body.userid,
      title: req.body.title,
      date:new Date(),
      body:req.body.body,
      topics : req.body.topics
    });
  
    try {
      const savedQuestion = await question.save();
      res.json({ question: savedQuestion });
    } catch (err) {
     console.log(err);
        res.status({message:'Error Occured'});
    }
  });

//Add Question
router.post("/addquestion", verify, async (req, res) => {
  const question = new Question({
    postedby: req.body.userid,
    title: req.body.title,
    date: new Date(),
    body: req.body.body,
    topics: req.body.topics
  });

  try {
    const savedQuestion = await question.save();
    res.json({ question: savedQuestion });
  } catch (err) {
    res.status({ message: "Error Occured" });
  }
});

//Like
router.post("/like/:questionid", verify, async (req, res) => {
  try {
    console.log(req.params.questionid);
    console.log(req.body.userid);
    const findRes = await Question.findOne({
      _id: req.params.questionid,
      likes: req.body.userid
    });
    if (findRes) {
      const resUnlike = await Question.updateOne(
        { _id: req.params.questionid },
        { $pull: { likes: req.body.userid } },
        { new: true }
      );
      res.json(resUnlike);
    } else {
      const resLike = await Question.updateOne(
        { _id: req.params.questionid },
        { $addToSet: { likes: req.body.userid } },
        { new: true }
      );
      res.json(resLike);
    }
  } catch (err) {
    res.json({ message: "Unable to perform like/unlike" });
  }
});

//Reply
router.post("/:questionid/reply", verify, async (req, res) => {
  try {
    const reply = {
      text: req.body.body,
      replydate: new Date()
    };
    const resReply = await Question.updateOne(
      { _id: req.params.questionid },
      { $push: { replies: reply } },
      { new: true }
    );
    res.json(resReply);
  } catch (err) {
    res.json({ message: "Unable to perform reply" });
  }
});

// Delete
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
