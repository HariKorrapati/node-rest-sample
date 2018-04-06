const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const decodedToken = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY);
    }catch(error){
        console.log('Authorizatin failed' + error);
        return res.status(401).json({
            message: 'Authorization failed.'
        });
    }
    
    next();    
}