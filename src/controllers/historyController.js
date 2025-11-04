const { readUserById } = require("../models/userModel")
const { readHistoryModel, generateModel, lastHistory } = require("../models/historyModel")
const axios = require('axios')

const readHistoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const userFound = await readUserById(id)
        if (!userFound) {
            return res.status(404).json({ error: "User not found" })
        }
        const data = await readHistoryModel(id);
        return res.status(200).json({
            message: "Success",
            data: data
        })

    } catch (error) {
        return res.status(500).json({ error: "Internal server error " + error })
    }
}

const generateController = async (req, res) => {
    try {
        const { id } = req.params;
        const { Aroma, Flavor, Aftertaste, Acidity, Sweetness } = req.body;

        if (!Aroma || !Flavor || !Aftertaste || !Acidity || !Sweetness) {
            return res.status(400).json({ error: "Missing parameters" });
        }

        const parsedValues = [Aroma, Flavor, Aftertaste, Acidity, Sweetness].map(Number);
        if (parsedValues.some(isNaN)) {
            return res.status(400).json({ error: "All fields must be numbers" });
        }

        const [aroma, flavor, aftertaste, acidity, sweetness] = parsedValues;

        const predict = await axios.post(`${process.env.MODEL_URL}/predict`, {
            Aroma: aroma,
            Flavor: flavor,
            Aftertaste: aftertaste,
            Acidity: acidity,
            Sweetness: sweetness
        });

        if (!predict) {
            return res.status(400).json({ error: "Model error" });
        }

        const last = await lastHistory(id);
        const nextNumber = (last?.number_prediction || 0) + 1;

        const savePrediction = {
            prediction_result: predict.data.prediction,
            number_prediction: nextNumber,
            userId: parseInt(id),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const data = await generateModel(savePrediction);

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error", message: error.message });
    }
};


module.exports = {
    readHistoryController,
    generateController
}