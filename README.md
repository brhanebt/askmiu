# askmiu

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
