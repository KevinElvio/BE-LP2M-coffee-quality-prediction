const {readUserById} = require("../models/userModel")
const {readHistoryModel} = require("../models/historyModel")

const readHistoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const userFound = await readUserById(id)
        if (!userFound) {
            return res.status(404).json({error: "User not found"})
        }
        const data = await readHistoryModel(id);
        return res.status(200).json({
            message : "Success",
            data: data
        })

    } catch (error) {
        return res.status(500).json({error: "Internal server error " + error})
    }
}

module.exports = {
    readHistoryController
}