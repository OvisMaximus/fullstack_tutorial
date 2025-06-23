const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

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

    const blogPost = new Blog(body)

    const savedNote = blogPost.save()
    logger.info('blog post saved!', savedNote)
    response.status(201).json(savedNote)
}

blogsRouter.get('/', getAllBlogPosts)
blogsRouter.post('/', addBlogPost)

module.exports = blogsRouter