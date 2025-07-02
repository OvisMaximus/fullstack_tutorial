// noinspection JSCheckFunctionSignatures,JSUnresolvedReference

const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./blog_test_helper')
const userTestHelper = require('./user_test_helper')
const mongodb = require('../utils/mongodb')
const _ = require('lodash')

const api = supertest(app)

describe('blog api', () => {

    beforeEach(async () => {
        await userTestHelper.initDatabase()
        await helper.initDatabase()
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

    test('blog posts contain the user who created them', async () => {
        const blogs = await helper.blogsInDb()
        blogs.forEach(blog => {
            assert(blog.user !== undefined)
            assert(blog.user.username !== undefined)
        })
    })

    describe('addition of a new blog post', () => {
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
    })



    describe('updating a specific blog post', () => {
        async function checkPresenceOfMandatoryAttribute(attributeName) {
            const blogsInDb = await helper.blogsInDb()
            const originalPost = blogsInDb[0]
            const modifiedPost = { ...originalPost }
            modifiedPost[attributeName] = null
            await api
                .put(`/api/blogs/${modifiedPost.id}`)
                .send(modifiedPost)
                .expect(400)
            const blogsAtEnd = await helper.blogsInDb()
            const blogsById = _.keyBy(blogsAtEnd, 'id')
            const resultPost = blogsById[originalPost.id]
            assert.deepStrictEqual(resultPost, originalPost)
        }

        test('with a non existing id fails with 404', async () => {
            const validNonexistingId = await helper.nonExistingId()
            const changedBlog = {
                title: 'Greatest blog post of all time',
                author: 'Ovis Maximus',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            }
            changedBlog.id = validNonexistingId
            await api
                .put(`/api/blogs/${validNonexistingId}`)
                .send(changedBlog)
                .expect(404)
        })
        test('with a missing link fails with 400', async () => {
            await checkPresenceOfMandatoryAttribute('url')
        })
        test('with a missing title fails with 400', async () => {
            await checkPresenceOfMandatoryAttribute('title')
        })
        test('with valid data succeeds', async () => {
            const blogsInDb = await helper.blogsInDb()
            const originalPost = blogsInDb[0]
            const modifiedPost = { ... originalPost, likes: originalPost.likes + 1 }
            await api
                .put(`/api/blogs/${modifiedPost.id}`)
                .send(modifiedPost)
                .expect(200)

            const blogsAtEnd = await helper.blogsInDb()
            const blogsById = _.keyBy(blogsAtEnd, 'id')
            const resultPost = blogsById[modifiedPost.id]
            assert.deepStrictEqual(resultPost, modifiedPost)
        })

    })

    describe('deletion of a post', () => {
        test('succeeds with status code 204 if the id is valid', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()
            const contents = blogsAtEnd.map(n => n.title)

            assert(!contents.includes(blogToDelete.title))
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
        })
    })
})

after(async () => {
    await mongodb.disconnect()
})