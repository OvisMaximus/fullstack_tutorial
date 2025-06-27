const User = require('../models/user')

const initialUsers = [
    {
        username: 'root',
        name: 'Super User',
        password: 'PratziFatzi'
    },
    {
        username: 'test',
        name: 'Test User',
        password: 'PumpaNiggel'
    }
]

const initDatabase = async () => {
    await User.deleteMany({})
    // noinspection JSUnresolvedReference
    await User.insertMany(initialUsers)
}

const usersInDb = async () => {
    // noinspection JSCheckFunctionSignatures
    const users = await User.find({})
    // noinspection JSUnresolvedReference
    return users.map(u => u.toJSON())
}

const validUserId = async () => {
    const users = await usersInDb()
    return users[0].id.toString()
}

module.exports = {
    initDatabase,
    usersInDb,
    validUserId
}