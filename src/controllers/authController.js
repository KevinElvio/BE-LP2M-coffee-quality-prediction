const { allReadUser } = require("../models/userModel")
const crypto = require('crypto-js/sha256.js');
const jwt = require('jsonwebtoken');
// const redis = require('redis');
// const client = redis.createClient;



const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await allReadUser();
        if (!foundUser) {
            return res.status(404).json({ error: "Login Failed" })
        }

        for (i = 0; i < foundUser.length; i++) {
            if (email == foundUser[i].email && crypto(password).toString() == foundUser[i].password) {
                return res.status(200).json({
                    message: "Login Success",
                    data: foundUser[i],
                    token: jwt.sign(foundUser[i], process.env.SECRET_KEY, { expiresIn: '1h' })
                })
            }
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error " + error.message })
    }
}

// const logout = async () => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1];
//         if (!token) {
//             return res.status(400).json({ message: "Token not found" });
//         }

//         const decoded = jwt.decode(token);
//         const exp = decoded.exp - Math.floor(Date.now() / 1000);

//         await client.set(token, "blacklisted", { EX: exp });
//         return res.status(200).json({ message: "Logout success" });
//     } catch (error) {
//         return res.status(500).json({ message: "Internal Server Error " + error });
//     }
// }

module.exports = {
    login,
    // logout
}
