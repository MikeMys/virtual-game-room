const jwt = require('jsonwebtoken'); 

//can be used to make private routes by using a middleware 
module.exports = function(req, res, next) { 
    const token = req.header('auth-token'); //since it was sent to the header in auth.js, it is checking the header for the token
    if(!token) { //no token in the header
        console.log('Access Denied!'); 
        return res.status(401).send('Access Denied.'); 
    } 
    try{ 
        const verified = jwt.verify(token, process.env.TOKEN_PASSWORD); //the verify method will give back the ID
        req.user = verified; 
        next(); 
    } catch(err) { //if check gives an error, token is invalid
        console.log('Invalid Token');
        res.status(400).send('Invalid Token'); 
    }
}