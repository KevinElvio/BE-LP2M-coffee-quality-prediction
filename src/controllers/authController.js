const { allReadUser } = require("../models/userModel")
const crypto = require('crypto-js/sha256.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()


const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const foundUser = await allReadUser();
        if (!foundUser){
            return res.status(404).json({error: "Gagal Login"})
        }
        for(i = 0; i <  foundUser.length; i++){
            if (email == foundUser[i].email && crypto(password).toString() == foundUser[i].password ){
                return res.status(200).json({
                    message: "login Berhasil",
                    data: foundUser[i],
                    token: jwt.sign(foundUser[i],process.env.SECRET_KEY, { expiresIn: '1h' } )
                })
            }
        }
    } catch (error) {
        return res.status(500).json({error: "Internal Server Error " + error.message})
    }
}

module.exports = {
    login
}
