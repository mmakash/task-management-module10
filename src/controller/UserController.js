const UsersModel = require('../models/UserModels');
const jwt = require('jsonwebtoken');
const OTPModel = require('../models/OTPModels');
const sendMailUtility = require('../utility/SendMailUtility');

// Registration
exports.registration = async (req, res) => {
    let Body = req.body;
    try {
        let result = await UsersModel.create(Body);
        res.status(200).json({status:"success",data:result});
    }
    catch (err) {
        res.status(200).json({status:"fail",data:err});
    }
}
// login
exports.login = async (req, res) => {
    try{
        let Body = req.body;
        let reslt = await UsersModel.findOne(Body).count();
        if(reslt === 1){
            // create token
            let payload = {
                exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                data: Body.email
            }
            let token = jwt.sign(payload, "secret");
            res.status(200).json({status:"success",data:token});
        }
        else{
            res.status(200).json({status:"fail",data:"User Not Found"});
        }
    }
    catch(err){
        res.status(200).json({status:"fail",data:err});
    }
}
exports.profileDetails = async (req, res) => {
    try{
        let email = req.headers['email'];
        let reslt = await UsersModel.find({email:email});
        res.status(200).json({status:"success",data:reslt});
    }
    catch(err){
        res.status(200).json({status:"fail",data:err});
    }
}
exports.profileUpdate = async (req, res) => {
    try{
        let email = req.headers['email'];
        let Body = req.body;
        let reslt = await UsersModel.updateOne({email:email},Body);
        res.status(200).json({status:"success",data:reslt});
    }
    catch(err){
        res.status(200).json({status:"fail",data:err});
    }
}
exports.recoverVerifyEmail = async (req, res) => {
    try{
        let email = req.params.email;
        let OTPCode = Math.floor(100000 + Math.random() * 900000);
        let EmailText = `Your OTP is ${OTPCode}`;
        let EmailSubject = "task manager varification code";
        let reslt = await UsersModel.find({email:email}).count();
        if(reslt === 1){
            // varification email
            await sendMailUtility(email, EmailText, EmailSubject);

            await OTPModel.create({email:email,otp:OTPCode});
            res.status(200).json({status:"success",data:"OTP Send Successfully"});
        }
        else{
            res.status(200).json({status:"fail",data:"User Not Found"});
        }
    }
    catch(err){
        res.status(200).json({status:"fail",data:err});
    }
}
exports.recoverVerifyOTP = async (req, res) => {
    try{
        let email = req.params.email;
        let OTPCode = req.params.otp;
        let status = 0;
        let statusUpdate = 1;
        let reslt = await UsersModel.find({email:email,otp:OTPCode,status:status}).count();
        if(reslt === 1){
            await OTPModel.updateOne({email:email,otp:OTPCode,status:status},{status:statusUpdate});
            res.status(200).json({status:"success",data:"OTP Verified Successfully"});
        }
    }
    catch(err){
        res.status(200).json({status:"fail",data:err});
    }
}