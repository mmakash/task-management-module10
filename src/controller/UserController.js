const UsersModel = require("../models/UserModels");
const jwt = require("jsonwebtoken");
const OTPModel = require("../models/OTPModels");
const sendMailUtility = require("../utility/SendMailUtility");

// Registration
exports.registration = async (req, res) => {
  let reqBody = req.body;
  try {
    let result = await UsersModel.create(reqBody);
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    res.status(200).json({ status: "fail", data: err });
  }
};
// login
exports.login = async (req, res) => {
  try {
    let reqBody = req.body;
    let result = await UsersModel.find(reqBody).count();
    if (result === 1) {
      // login success
      let PayLoad = {
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        data: reqBody["email"],
      };
      let token = jwt.sign(PayLoad, "SecretKey123456789");
      res.status(200).json({ status: "success", data: token });
    } else {
      //   login fail
      res
        .status(200)
        .json({ status: "fail", data: "Invalid Email or Password" });
    }
  } catch (err) {
    res.status(200).json({ status: "fail", data: err });
  }
};
exports.profileDetails = async (req, res) => {
  try {
    let email = req.headers["email"];
    let result = await UsersModel.find({ email: email });
    res.status(200).json({ status: "success", data: result });
  }
  catch (err) {
    res.status(200).json({ status: "fail", data: err });
  }
};
exports.profileUpdate = async (req, res) => {};
exports.recoverVerifyEmail = async (req, res) => {};
exports.recoverVerifyOTP = async (req, res) => {};
