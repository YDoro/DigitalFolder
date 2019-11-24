const jwt = require('jsonwebtoken');
const authConfig =  require('../../config/auth');
module.exports= (req, res, next)=>{
    var authHeader = req.headers.authorization;
    if(!authHeader){
        var cookies = req.headers.cookie.split('=');
        for (let index = 0; index < cookies.length; index++) 
           if(cookies[index].includes('Bearer')) authHeader = decodeURI(cookies[index])
    }
  
    if(!authHeader)
        return res.status(401).send({ error: 'no token provided'});
    const parts = authHeader.split(' ');
    if(!parts.length ===2)
        return res.status(401).send({ error: 'Token Error'});
    const [ scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatted'});
    
    
        jwt.verify(token, authConfig.secret, (err, decoded)=>{
        if(err)   
            return res.status(401).send({ error: 'Invalid Token '});
        req.userId = decoded.id;
        return next();
    })
};