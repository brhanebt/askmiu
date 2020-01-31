const monngoose = require('mongoose');

const userSchema = new monngoose.Schema({
    title:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    followers:[{}]
})

module.exports = monngoose.model('Topic',userSchema);