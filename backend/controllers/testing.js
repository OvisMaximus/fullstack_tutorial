const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const Blog = require('../models/blog')

const { info } = require('../utils/logger')

const resetDatabase = async (request, response) => {
    info('resetting database')
    await Note.deleteMany({})
    await User.deleteMany({})
    await Blog.deleteMany({})

    response.status(204).end()
}

router.post('/reset', resetDatabase)

module.exports = router