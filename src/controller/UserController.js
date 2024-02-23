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
exports.profileUpdate = async (req, res) => {
  try {
    let email = req.headers["email"];
    let Body = req.body;
    let result = await UsersModel.updateOne({ email: email }, Body);
    res.status(200).json({ status: "success", data: result });
  }
  catch (err) {
    res.status(200).json({ status: "fail", data: err });
  }
};
exports.recoverVerifyEmail = async (req, res) => {
  try{
    let email = req.params['email'];
    let otpCode = Math.floor(100000 + Math.random() * 900000);
    let emailText = `Your OTP code is ${otpCode}`;
    let emailSubject = "OTP Code";
    let result = await UsersModel.find({email:email}).count();
    if(result===1){
      sendMailUtility(email, emailText, emailSubject);
      await OTPModel.create({email:email,otp:otpCode});
      res.status(200).json({status:"success",data:"OTP sent successfully"});
    }
    else{
      res.status(200).json({status:"fail",data:"Invalid Email"});
    }
  }
  catch(err){
    res.status(200).json({ status: "fail", data: err });
  }
};
exports.recoverVerifyOTP = async (req, res) => {
  try{
    let email = req.params.email;
    let otp = req.params.otp;
    let status = 0;
    let statusUpdate = 1;
    let result = await OTPModel.find({email:email,otp:otp}).count();
    if(result===1){
      await OTPModel.updateOne({email:email,otp:otp,status:status},{status:statusUpdate});
      res.status(200).json({status:"success",data:"OTP verified successfully"});
    }
    else{
      res.status(200).json({status:"fail",data:"Invalid OTP"});
    }
    
  }
  catch(err){
    res.status(200).json({ status: "fail", data: err });
  }
};
exports.recoverPassword = async (req, res) => {
  try{
    let email = req.body.email;
    let otp = req.body.otp;
    let password = req.body.password;
    let status = 1;
    let result = await OTPModel.find({email:email,otp:otp,status:status}).count();
    if(result===1){
      await UsersModel.updateOne({email:email},{password:password});
    }
    else{
      res.status(200).json({status:"fail",data:"Invalid OTP"});
    }
    
  }
  catch(err){
    res.status(200).json({ status: "fail", data: err });
  }
}