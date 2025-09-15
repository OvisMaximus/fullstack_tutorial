const router = require('express').Router()
const userTestHelper = require('../test/user_test_helper')
const blogTestHelper = require('../test/blog_test_helper')
const noteTestHelper = require('../test/notes_test_helper')

const { info } = require('../utils/logger')

const resetDatabase = async (request, response) => {
    info('resetting database')
    await userTestHelper.initDatabase()
    await noteTestHelper.initDatabase()
    await blogTestHelper.initDatabase()
    response.status(204).end()
}

router.post('/reset', resetDatabase)

module.exports = router
