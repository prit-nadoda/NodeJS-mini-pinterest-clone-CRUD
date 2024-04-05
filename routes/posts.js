var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pinterest");

var postShema = mongoose.Schema({
    image :{
        type : String,
        required : true
    },
    postText : {
        type : String,
        default : null
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    createdAt:{
        type : Date,
        default : Date.now
    },
    likes : {
        type : Array,
        default : []
    }

})

module.exports = mongoose.model("post",postShema);