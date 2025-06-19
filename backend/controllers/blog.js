const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const getAllBlogPosts = (request, response) => {
    // noinspection JSCheckFunctionSignatures
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
}

const addBlogPost = (request, response, next) => {
    const body = request.body

    if (!body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const blogPost = new Blog(body)

    blogPost.save()
        .then(savedNote => {
            logger.info('blog post saved!', savedNote)
            response.status(201).json(savedNote)
        })
        .catch(error => next(error))
}

blogsRouter.get('/', getAllBlogPosts)
blogsRouter.post('/', addBlogPost)

module.exports = blogsRouter