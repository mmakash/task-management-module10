const StudentsModel = require('../models/StudentsModel');

// create students
exports.createStudents = async (req, res) => {
    let Body = req.body;
    try {
        let result = await StudentsModel.create(Body);
        res.status(200).json({status:"success",data:result});
    }
    catch (err) {
        res.status(200).json({status:"fail",data:err});
    }
}
// Read all students
exports.readAllStudents = async (req, res) => {
    try {
        let result = await StudentsModel.find();
        res.status(200).json({status:"success",data:result});
    }
    catch (err) {
        res.status(200).json({status:"fail",data:err});
    }
}
// update student
exports.updateStudents = async (req, res) => {
    try{
        let email = req.headers['email'];
        let Body = req.body;
        let result = await StudentsModel.updateOne({email:email},Body);
        res.status(200).json({status:"success",data:result});
    }
    catch(err){
        res.status(200).json({status:"fail",data:err});
    }
}