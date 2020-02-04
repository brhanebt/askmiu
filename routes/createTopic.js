const router = require("express").Router();
const Topic = require("../models/Topic");
const User = require("../models/User");
const verify = require('./verifyToken');

router.get("/findall",verify, async (req, res) => {

  const re = await Topic.find({}).sort({title:1}).collation({ locale: 'en' });
  res.json(re);

});
router.get("/findfollowedtopics/:userid",verify, async (req, res) => {
console.log(req.params.userid);
try{
  const re = await User.find({_id:req.params.userid},{_id:0,followedTopics:1});
  console.log(re);
  res.json(re);
}
  catch(err){
    console.log(err);
  }

});

router.post("/findone", verify, async (req, res) => {

  const searchTopic = await Topic.find({title: req.body.title});
  if (!searchTopic) return res.status(400).json({message :"topic not found"});
  res.json(searchTopic);
});

router.post("/add", verify, async (req, res) => {
    // const { error } = topicValidation(req.body);
    // if (error) return res.status(400).json({message: error.details[0].message});
  
    //check if topic already exists
    const topicExist = await Topic.findOne({ title: req.body.title.toLowerCase });
  // if(topicExist) {retu}
  
    //create new topic
    const topic = new Topic({
      title: req.body.title,
      category: req.body.category
    });
  
    try {
      const newTopic = await topic.save();
      res.json({newTopic});
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