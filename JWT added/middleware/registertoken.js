const jwt= require("jsonwebtoken")


exports.auth=  (req, res, next)=>{
        const token= req.cookies.jwtoken;
                if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
          }
        
        const ver= jwt.verify(token, process.env.JWT_SECRET);
        req.id=ver.data;
        next();
        
    
};
