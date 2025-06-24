const Blog = require('../models/blog')
const initialBlogs = require('./blogs_test_data')


const nonExistingId = async () => {
    const blog = new Blog({ title: 'willRemoveThisSoon', author: 'sbdy', url: 'http://sbdy.com' })
    await blog.save()
    await blog.deleteOne()

    return blog.id.toString()
}

const blogsInDb = async () => {
    // noinspection JSCheckFunctionSignatures
    const notes = await Blog.find({})
    // noinspection JSUnresolvedReference
    return notes.map(note => note.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}