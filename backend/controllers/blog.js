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

    const savedNote = await blogPost.save()
    logger.info('blog post saved!', savedNote)
    response.status(201).json(savedNote)
}

const deleteBlogPost = async (request, response) => {
    const id = request.params.id
    // noinspection JSCheckFunctionSignatures
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
}

blogsRouter.delete('/:id', deleteBlogPost)
blogsRouter.get('/', getAllBlogPosts)
blogsRouter.post('/', addBlogPost)

module.exports = blogsRouter