# askmiu

# Get User By Id
## /api/v1/user/:userId


# Login(Post)
## /api/v1/user/login


{
	"email":"j@a.com",
	"password":"123456"
}
# Signup(Post)
## /api/v1/user/register

{
	"name":"Jeevan Acharya",
	"email":"j@a.com",
	"password":"123456"
}

# Follow(Patch)  topics
## /api/v1/topics/follow/:userid/:topicid

# Unfollow(Patch) topics
## /api/v1/topics/unfollow/:userid/:topicid

## Get Feed posts
## /api/v1/posts/feed/:userid

## Get Timeline posts
## /api/v1/posts/timeline/:userid

## Get Details of a post
## /api/v1/posts/:postid


## Search for posts
## /api/v1/posts/filter?topics=topicid&topics=topicid&searchstring=searchquery

## Filter posts by topic
## /api/v1/posts/filter?topics=topicid&topics=topicid

# createTopic(Post, Patch)
## /api/v1/topics/add
{
    "title": "angular",
    "category": "MWA"
}
## /api/v1/topics/update

{
	"_id": "ObjectId("1234567")"
	"newTitle": "Angular"
}

## Add Question  (POST)
## /api/v1/posts/addquestion

{
 	"user_id":"5e34adc847f4c32a0475bdb4",
 	  "title":"mangodb2",
      "body":"how does mangoose work"
       
 }

 ## Delete Question (DELETE)
 ## /api/v1/posts/deletequestion

 {  
  	"_id": "5e34a5896224af7f1082e0d6"  //Question_id
        
 }

 ## Post Reply (POST)

## /api/v1/posts/:questionId/reply

{
	"userid":"5e34adc847f4c32a0475bdb2",
    "body" : "Wow nice"
}

## Like Post (POST)

## /api/v1/posts/like/:questionId
{
	"userid":"5e34adc847f4c32a0475bdb4"
}