const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient();

const readHistoryModel = async (id) => {
    const data = prisma.history.findMany({
        where: id
    })
    return data;
}

module.exports = {
    readHistoryModel
}