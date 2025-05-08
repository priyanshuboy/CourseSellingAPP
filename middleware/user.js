
const jwt = require('jsonwebtoken');
const JWT_SECRET1 = process.env.JWT_SECRET1


function usermiddleware(req,res ,next){

    const token = req.headers.token;
    const decoded = jwt.verify(token ,JWT_SECRET)

    if(decoded){
        req.id = decoded.id
        next()
    }
    else{
          
        res.status(403).json({
         message : "you are not logged-in"

        })

    }


   
     

}


module.exports = {
    usermiddleware : usermiddleware
}