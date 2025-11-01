const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient();

const createUser = async (body) => {
    const data = await prisma.user.create({
        data: {
            name: body.user.name,
            email: body.user.email,
            password: body.user.password
        }
    });
    return data;
};

module.exports = {
    createUser
};
