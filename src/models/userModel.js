const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient();

const createUser = async (body) => {
    const data = await prisma.user.create({
        data: body
    });
    return data;
};

const allReadUser = async () => {
    const data = await prisma.user.findMany();
    return data;
}

const updateUser = async (id, body) => {
    const data = await prisma.user.update({
        where: { id: parseInt(id) },
        data: body
    });
    return data;
};

module.exports = {
    createUser,
    updateUser,
    allReadUser
};
