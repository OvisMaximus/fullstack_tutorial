const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user')
const mw = require('../utils/middleware')

const getAllBlogPosts = async (request, response) => {
    // noinspection JSCheckFunctionSignatures
    const blogs = await Blog.find({})
    response.json(blogs)
}

const addBlogPost = async (request, response) => {
    const body = request.body

    if (!body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const user = await User.findById(request.user.id)
    body.user = user.id
    const blogPost = new Blog(body)

    // noinspection JSUnresolvedReference
    const savedPost = await Blog(await blogPost.save())
        .populate('user', { username: 1, name: 1 })
    user.blogs.push(savedPost.id)
    await user.save()

    logger.info('blog post saved!', savedPost)
    response.status(201).json(savedPost)
}

const deleteBlogPost = async (request, response) => {
    const id = request.params.id
    // Todo is logged in user creator?
    //  Todo remove blog from user.blogs
    // noinspection JSCheckFunctionSignatures
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
}

const updateBlogPost = async (request, response) => {
    const body = request.body
    const id = request.params.id

    if (body.user && body.user.name) {
        body.user = body.user.id
    }

    const savedBlog = await Blog.findByIdAndUpdate(id, body, {
        runValidators: true,
        strict: true,
        new: true
    })

    if (!savedBlog) {
        response.status(404).end()
        return
    }

    const populatedBlog = await Blog(savedBlog).populate('user', { username: 1, name: 1 })
    logger.info('blog post updated: ', populatedBlog)
    response.json(populatedBlog).status(200).end()
}

blogsRouter.delete('/:id', mw.userExtractor, deleteBlogPost)
blogsRouter.put('/:id', mw.userExtractor, updateBlogPost)
blogsRouter.get('/', getAllBlogPosts)
blogsRouter.post('/', mw.userExtractor, addBlogPost)

module.exports = blogsRouter