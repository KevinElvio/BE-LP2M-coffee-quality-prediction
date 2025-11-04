const jwt = require('jsonwebtoken')

const accessValidation = (req, res, next) => {
    const { authorization } = req.headers;

     if(!authorization) {
        return res.status(403).json({error: "Forbidden"})
    }
        
    try {
        const check = jwt.verify(authorization, process.env.SECRET_KEY);
        req.data = check;
        next()
    } catch (error) {
        return res.status(403).json({error: "Internal server error " + error})
    }
}

module.exports = accessValidation;