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

const updateBlogPost = async (request, response) => {
    const body = request.body
    const id = request.params.id

    const savedBlog = await Blog.findByIdAndUpdate(id, body, {
        runValidators: true,
        strict: true,
        new: true
    })

    if (!savedBlog) {
        response.status(404).end()
        return
    }
    logger.info('blog post updated: ', savedBlog)
    response.json(savedBlog).status(200).end()
}

blogsRouter.delete('/:id', deleteBlogPost)
blogsRouter.put('/:id', updateBlogPost)
blogsRouter.get('/', getAllBlogPosts)
blogsRouter.post('/', addBlogPost)

module.exports = blogsRouter