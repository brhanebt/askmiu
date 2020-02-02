const monngoose = require('mongoose');
const questionSchema = new monngoose.Schema({
    postedby:monngoose.ObjectId,
    title:{
        type:String,
        required: true,
        min:6,
        max:1024
    },

    date:{
        type:Date,
        default :Date.now
    },
    body:{
        type:String,
        required: true,
        min:6,
        max:1024
    },
    likes:[{}], 
    replies:[{}],
    topics:[]

})

module.exports = monngoose.model('Question',questionSchema);