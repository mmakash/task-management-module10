const jwt = require('jsonwebtoken');
module.exports=(req,res,next)=>{
    let Token=req.headers['token'];
    console.log(Token)
    jwt.verify(Token,"secret",function (err,decoded) {
        if(err){
            console.log(Token)
            res.status(401).json({status:"unauthorized"})
        }
        else {
            let email=decoded['data'];
            console.log(email)
            req.headers.email=email
            next();
        }
    })
}
