const User = require('../models/user')

const usersInDb = async () => {
    // noinspection JSCheckFunctionSignatures
    const users = await User.find({})
    // noinspection JSUnresolvedReference
    return users.map(u => u.toJSON())
}

module.exports = {
    usersInDb,
}