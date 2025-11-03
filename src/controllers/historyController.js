const {readUserById} = require("../models/userModel")
const {readHistoryModel} = require("../models/historyModel")

const readHistoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const userFound = readUserById(id)
        if (!userFound) {
            return res.status(404).json({error: "User not found"})
        }
    } catch (error) {
        
    }
}