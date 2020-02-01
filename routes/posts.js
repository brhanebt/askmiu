const router = require("express").Router();
const verify = require("./verifyToken");
const Question = require("../models/Question");
const ObjectId = require("mongodb").ObjectID;

router.get("/", verify, (req, res) => {
  res.json({ message: "This is message" });
});

router.post("/addquestion", verify, async (req, res) => {
  //create new
  const question = new Question({
    postedby: new ObjectId(),
    title: req.body.title,
    date: new Date(),
    body: req.body.body,
    likes: 0
  });

  // Question.post()
  try {
    const savedQuestion = await question.save();
    res.json({ question: savedQuestion });
  } catch (err) {
    console.log(err);
    res.json({ message: "Error Occured" });
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
