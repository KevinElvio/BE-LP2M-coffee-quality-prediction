const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient();

const readHistoryModel = async (id) => {
    const data = prisma.history.findMany({
        where: {
            userId: parseInt(id)
        }
    })
    return data;
}

const generateModel = async (body, id) => {
    const data = prisma.history.create(
        {
            data: body
        }
    )
    return data;
}

const lastHistory = async(id) => {
   const data = await prisma.history.findFirst({
        where : {userId: parseInt(id)},
        orderBy : {
            number_prediction: "desc"
        }
    })
    return data;
}


module.exports = {
    readHistoryModel,
    generateModel,
    lastHistory
}