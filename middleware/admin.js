
const jwt = require('jsonwebtoken');
const JWT_SECRET =process.env.JWT_SECRET;


function adminmiddleware(req,res ,next){

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
    adminmiddleware : adminmiddleware
}