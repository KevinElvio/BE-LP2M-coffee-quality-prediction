const { allReadUser } = require("../models/userModel")
const crypto = require('crypto-js/sha256.js');
const jwt = require('jsonwebtoken');
// const redis = require('redis');
// const client = redis.createClient;



const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and Password are required" })
        }
        const users = await allReadUser();
        const hashedPassword = crypto(password).toString();

        const foundUser = users.find(user =>
            user.email === email && user.password === hashedPassword
        );

        if (!foundUser) {
            return res.status(404).json({ error: "Login Failed" })
        }
        
        const { password: _, ...userWithoutPassword } = foundUser;

        return res.status(200).json({
            message: "Login success",
            data: userWithoutPassword,
            token: jwt.sign(
                { id: foundUser.id, email: foundUser.email },
                process.env.SECRET_KEY,
                { expiresIn: '1h' }
            )
        });
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
