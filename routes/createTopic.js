const router = require("express").Router();
const Topic = require("../models/Topic");
const { topicValidation } = require("../routes/validation");
const verify = require('./verifyToken');


router.post("/add", verify, async (req, res) => {
    const { error } = topicValidation(req.body);
    if (error) return res.status(400).json({message: error.details[0].message});
  
    //check if topic already exists
    const topicExist = await Topic.findOne({ title: req.body.title.toLowerCase() });
    if (topicExist) return res.status(400).json({message :"topic already exists"});
  
  
    //create new topic
    const topic = new Topic({
      title: req.body.title.toLowerCase(),
      category: req.body.category
    });
  
    try {
      const newTopic = await topic.save();
      res.json({ title: newTopic._id });
    } catch (err) {
      res.json({message:'Error Occured'});
    }
  });

  router.patch('/update', verify, async (req, res) => {
      // const topic = await Topic.findOne({_id: req.body._id});
      const newTitle = req.body.newTitle;


      try{
          await Topic.updateOne({'_id': req.body._id}, {$set: {'title': newTitle}});
          res.json({title: newTitle});
      }catch (err) {
        res.json({message:'Error Occured'});
      }
  })

  module.exports = router;