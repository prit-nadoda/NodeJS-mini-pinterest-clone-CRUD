var mongoose = require("mongoose");
var plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pinterest");

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    uniqe : true
  },
  password: {
    type: String
  },
  dp: {
    type: String,
  },
  post: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "post"
  }],
  doj: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true,
    uniqe : true
  },
  fullname: {
    type: String,
    required: true
  }

});

userSchema.plugin(plm);

module.exports = mongoose.model("user",userSchema);
