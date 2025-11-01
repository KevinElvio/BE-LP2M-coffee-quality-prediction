const { createUser } = require ('../models/userModel.js');
const crypto = require('crypto-js/sha256.js');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }
        const user = {
            name,
            email,
            password: crypto(password).toString()
        };

        const data = await createUser({user});
        return res.status(201).json(data);
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    registerUser
}