const express = require("express");
const { check, body } = require("express-validator/check");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post("/login", authController.postLogin);

router.post("/logout", authController.postLogout);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Enter a valid mail")
      .custom((value, { req }) => {
        // if (value === "test@test.com") {
        //   throw new Error("This email is forbidden");
        // }
        // return true;
        returnUser.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("Email used already");
          }
        });
      }),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Enter password with at least 5 numbers")
      .isAlphanumeric(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("passwords have to match");
      }
      return true;
    })
  ],
  authController.postSignup
);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
