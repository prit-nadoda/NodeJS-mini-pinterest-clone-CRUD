var express = require('express');
var router = express.Router();
var userModel = require("./users");
var postModel = require("./posts");
const passport = require('passport');
const localStrayegy = require('passport-local');
const upload = require("./multer");

passport.use(new localStrayegy(userModel.authenticate()))

router.get('/', function (req, res) {
  res.render("index");
});

router.get('/profile', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({
    username: req.session.passport.user
  })
  .populate("post");
  res.render("profile", { user });

});

router.post("/createpost", isLoggedIn, upload.single("image"), async function (req, res) {
  if (!req.file) {
    return res.status(404).send("No File Were Given!")
  }
  var user = await userModel.findOne({ 
    username: req.session.passport.user 
  })
  var post= await postModel.create({
    image: req.file.filename,
    postText: req.body.posttext,
    user: user._id
  });

  user.post.push(post._id)
  await user.save()
  res.redirect("/profile")

});

router.route("/feeds")
  .get(function (req, res) {
    res.render("feeds");
  })

router.get("/login", function (req, res) {
  res.render("login", { error: req.flash("error") });
});

router.route("/register")
  .post(function (req, res) {
    var userData = new userModel({
      username: req.body.username,
      email: req.body.email,
      fullname: req.body.fullname
    });

    userModel.register(userData, req.body.password)
      .then(function () {
        passport.authenticate("local")(req, res, function () {
          res.redirect("login");
        })
      });
  })
  .get(function (req, res) {
    res.render("register");
  });

router.route("/login")
  .post(passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true
  }))



router.get("/logout", function (req, res, next) {
  req.logOut(function (err) {
    if (err) return next(err);
    res.redirect("/");

  })
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect("/");
}
module.exports = router;

