// noinspection JSCheckFunctionSignatures,JSUnresolvedReference

const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./blog_test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe.only('blog api', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    test('blog posts are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blog posts are returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('"id" is used as unique id by the database', async () => {
        const blogs = await helper.blogsInDb()
        const id = blogs[0].id
        assert(id !== undefined)
        assert(id !== null)
        assert(typeof id === 'string')
        assert(id.length > 0)
    })

    /*
    test('a specific note is within the returned notes', async () => {
        const response = await api.get('/api/notes')
        const contents = response.body.map(e => e.content)
        assert(contents.includes('HTML is easy'))
    })
*/
    test('a valid blog post can be added ', async () => {
        const newBlog = {
            title: 'Greatest blog post of all time',
            author: 'Ovis Maximus',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            likes: 1001,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        const contents = blogsAtEnd.map(n => n.title)
        assert(contents.includes('Greatest blog post of all time'))
    })

    test('when a new blog post without likes is added, these should default to 0', async () => {
        const newBlog = {
            title: 'Greatest blog post of all time',
            author: 'Ovis Maximus',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(response.body.likes, 0)
    })

    test('a post without title is not added', async () => {
        const newBlog = {
            author: 'Ovis Maximus',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })


    test('a post without url is not added', async () => {
        const newBlog = {
            title: 'Greatest blog post of all time',
            author: 'Ovis Maximus',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
    /*
    test('a specific note can be viewed', async () => {
        const notesAtStart = await helper.notesInDb()
        const noteToView = notesAtStart[0]

        const resultNote = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.deepStrictEqual(resultNote.body, noteToView)
    })

    test('a note can be deleted', async () => {
        const notesAtStart = await helper.notesInDb()
        const noteToDelete = notesAtStart[0]

        await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204)

        const notesAtEnd = await helper.notesInDb()

        const contents = notesAtEnd.map(n => n.content)
        assert(!contents.includes(noteToDelete.content))

        assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
    })

    */


    after(async () => {
        await mongoose.connection.close()
    })
})