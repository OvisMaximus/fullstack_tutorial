const Blog = require('../models/blog')
const initialBlogs = require('./blogs_test_data')
const userHelper = require('./user_test_helper')

const populateDatabaseWithInitialBlogs = async () => {
    const users = await userHelper.usersInDb()
    const user = users[0]
    const promises = []
    initialBlogs.forEach((blog) => {
        blog.user = user.id
        promises.push(Blog.create(blog))
    })
    return Promise.all(promises)
}

const initDatabase = async () => {
    await Blog.deleteMany({})
    await populateDatabaseWithInitialBlogs()
}

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willRemoveThisSoon', author: 'sbdy', url: 'http://sbdy.com' })
    await blog.save()
    await blog.deleteOne()

    return blog.id.toString()
}

const blogsInDb = async () => {
    // noinspection JSCheckFunctionSignatures
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    // noinspection JSUnresolvedReference
    return blogs.map(note => note.toJSON())
}

module.exports = {
    initialBlogs,
    initDatabase,
    nonExistingId,
    blogsInDb
}