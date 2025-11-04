const jwt = require('jsonwebtoken')
// const redis = require('redis');
// const client = redis.createClient();

const accessValidation = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(403).json({ error: "Forbidden" })
    }

    const parts = authorization.split(' ');
    if (parts[0] !== 'Bearer' || parts.length !== 2) {
        return res.status(401).json({
            message: 'Forbidden'
        });
    }
    // const blacklisted = await client.get(token);
    // if (blacklisted) {
    //     return res.status(403).json({ error: "Token expired" });
    // }

    const token = parts[1];

    try {
        const check = jwt.verify(token, process.env.SECRET_KEY);
        req.data = check;
        next()
    } catch (error) {
        return res.status(403).json({ error: "Internal server error " + error })
    }
}

module.exports = accessValidation;