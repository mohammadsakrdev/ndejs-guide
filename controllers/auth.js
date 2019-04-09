const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("5cab60e34483af06a4f9a85f")
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        res.redirect("/");
      });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/");
  });
};
