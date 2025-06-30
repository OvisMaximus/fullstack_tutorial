const User = require('../models/user')
const bcrypt = require('bcrypt')

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
        const createDbUser = async (user) => {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(user.password, saltRounds)

            const newUser = new User({
                username: user.username,
                name: user.name,
                passwordHash,
            })
            return newUser.save()
        }
        promises.push(createDbUser(user))
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
    validUserId,
    authenticatedUserToken
}