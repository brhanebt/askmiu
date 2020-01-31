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
    likes:{
        type:Number,
        required: false,
    }, 
    replies:{
        type:String,
        required: false,
        min:6,
        max:1024
    } 

})

module.exports = monngoose.model('Question',questionSchema);

