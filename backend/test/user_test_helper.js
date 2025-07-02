const User = require('../models/user')
const userTools = require('../utils/userTools')

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
    const promises = []
    initialUsers.forEach((user) => {
        promises.push(userTools.createUserInDb(user.username, user.name, user.password))
    })
    // noinspection JSUnresolvedReference
    await Promise.all(promises)
}

const usersInDb = async () => {
    // noinspection JSCheckFunctionSignatures
    const users = await User.find({})
    // noinspection JSUnresolvedReference
    return users.map(u => u.toJSON())
}

const getUserFromDb = async (userId) => {
    const matchingUsers = await User.find({ '_id': userId })
    const user = await User(matchingUsers[0])
    await user .populate('notes', { content: 1, important: 1 })
    return await user.populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
}

const validUserId = async () => {
    const users = await usersInDb()
    return users[0].id.toString()
}

const authenticatedUserToken = async (user, api) => {
    const loginUser = { username: user.username, password: user.password }

    let response = undefined
    await api
        .post('/api/login')
        .send(loginUser)
        .expect(200)
        .expect((result) => {
            response = result.body
            return true
        })

    return response.token
}

module.exports = {
    initialUsers,
    initDatabase,
    usersInDb,
    getUserFromDb,
    validUserId,
    authenticatedUserToken
}