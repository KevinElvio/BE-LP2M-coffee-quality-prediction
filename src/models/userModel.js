const {PrismaClient } = require ("@prisma/client");
const { PrismaLibSQL } = require ("@prisma/adapter-libsql");

const adapter = new PrismaLibSQL({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})
const prisma = new PrismaClient({ adapter })

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

const readUserById = async (id) => {
    const data = await prisma.user.findFirst({
        where: {id: parseInt(id)}
    });
    return data;
}

const updateUser = async (id, body) => {
    const data = await prisma.user.update({
        where: { id: parseInt(id) },
        data: body
    });
    return data;
};

const deleteUser = async(id) => {
    const data = await prisma.user.delete({
        where: {id: parseInt(id)}
    })
    return data;
}

module.exports = {
    createUser,
    updateUser,
    allReadUser,
    readUserById,
    deleteUser
};
