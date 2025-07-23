const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const { info } = require('../utils/logger')

router.post('/reset', async (request, response) => {
    info('resetting database')
    await Note.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
})

module.exports = router