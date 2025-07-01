const bcrypt = require('bcrypt')
const User = require('../models/user')

const createUserInDb = async (username, name, password) => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        username,
        name,
        passwordHash
    })
    return newUser.save()
}

const getAnyUserFromDb = async () => {
    // noinspection JSCheckFunctionSignatures
    return User.findOne()
}

module.exports = {
    createUserInDb,
    getAnyUserFromDb
}