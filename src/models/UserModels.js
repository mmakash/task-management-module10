const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    email:{type:String,unique:true},
    firstName:{type:String},
    lastName:{type:String},
    mobile:{type:String},
    password:{type:String},
},{timestamps: true,versionKey:false});
const UsersModel=mongoose.model('user',DataSchema);
module.exports=UsersModel

