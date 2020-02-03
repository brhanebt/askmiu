const monngoose = require('mongoose');

const userSchema = new monngoose.Schema({
    name:{
        type:String,
        required: true,
        min:3
    },
    email:{
        type:String,
        required: true,
        min:6,
        max:255
    },
    password:{
        type:String,
        required: true,
        min:6,
        max:1024
    },

    date:{
        type:Date,
        default :Date.now
    },
    role:{
        type:String,
        required: true,
    },
    followedTopics:[{}],
    questions:[{}],
    replies:[{}]
})

module.exports = monngoose.model('User',userSchema);