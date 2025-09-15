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
        blogs.forEach((blog) => {
            assert(blog.user !== undefined)
            assert(blog.user.username !== undefined)
        })
    })

    async function testStoredBlogsDelta(delta) {
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(
            blogsAtEnd.length,
            helper.initialBlogs.length + delta,
        )
        return blogsAtEnd
    }

    async function getAuthenticatedUserToken() {
        const initialUser = userTestHelper.initialUsers[1]
        return await userTestHelper.authenticatedUserToken(initialUser, api)
    }

    describe('addition of a new blog post', () => {
        test('a valid blog post can be added ', async () => {
            const initialUser = userTestHelper.initialUsers[1]
            const token = await userTestHelper.authenticatedUserToken(
                initialUser,
                api,
            )
            const newBlog = {
                title: 'Greatest blog post of all time',
                author: 'Ovis Maximus',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                likes: 1001,
            }

            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await testStoredBlogsDelta(1)

            const storedBlog = blogsAtEnd.filter((blog) =>
                blog.title.startsWith('Greatest blog post of all time'),
            )[0]
            assert(storedBlog !== undefined && storedBlog !== null)

            const storedBlogUserId = storedBlog.user.id
            const authorizedUser =
                await userTestHelper.getUserFromDb(storedBlogUserId)
            assert.strictEqual(authorizedUser.name, initialUser.name)
            assert.strictEqual(storedBlog.likes, 1001)
            const blogAlsoStoredInUser = authorizedUser.blogs.find(
                (blog) => blog.id === storedBlog.id,
            )
            assert(
                blogAlsoStoredInUser !== undefined,
                'blog id shall be stored in user blogs',
            )
        })

        test('a valid blog post can not be stored when the user is not logged in', async () => {
            const newBlog = {
                title: 'Greatest blog post of all time',
                author: 'Ovis Maximus',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                likes: 1001,
            }

            await api.post('/api/blogs').send(newBlog).expect(401)
            await testStoredBlogsDelta(0)
        })

        test('when a new blog post without likes is added, these should default to 0', async () => {
            const token = await getAuthenticatedUserToken()
            const newBlog = {
                title: 'Greatest blog post of all time',
                author: 'Ovis Maximus',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            }
            const response = await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            assert.strictEqual(response.body.likes, 0)
        })

        test('a post without title is not added', async () => {
            const token = await getAuthenticatedUserToken()
            const newBlog = {
                author: 'Ovis Maximus',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            }

            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(newBlog)
                .expect(400)

            await testStoredBlogsDelta(0)
        })

        test('a post without url is not added', async () => {
            const token = await getAuthenticatedUserToken()
            const newBlog = {
                title: 'Greatest blog post of all time',
                author: 'Ovis Maximus',
            }

            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(newBlog)
                .expect(400)

            await testStoredBlogsDelta(0)
        })
    })

    describe('updating a specific blog post', () => {
        async function checkPresenceOfMandatoryAttribute(attributeName) {
            const token = await getAuthenticatedUserToken()
            const blogsInDb = await helper.blogsInDb()
            const originalPost = blogsInDb[0]
            const modifiedPost = { ...originalPost }
            modifiedPost[attributeName] = null
            await api
                .put(`/api/blogs/${modifiedPost.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(modifiedPost)
                .expect(400)
            const blogsAtEnd = await testStoredBlogsDelta(0)
            const blogsById = _.keyBy(blogsAtEnd, 'id')
            const resultPost = blogsById[originalPost.id]
            assert.deepStrictEqual(resultPost, originalPost)
        }

        test('with a non existing id fails with 404', async () => {
            const token = await getAuthenticatedUserToken()
            const validNonexistingId = await helper.nonExistingId()
            const changedBlog = {
                title: 'Greatest blog post of all time',
                author: 'Ovis Maximus',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            }
            changedBlog.id = validNonexistingId
            await api
                .put(`/api/blogs/${validNonexistingId}`)
                .set('Authorization', `Bearer ${token}`)
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
            const token = await getAuthenticatedUserToken()
            const blogsInDb = await helper.blogsInDb()
            const originalPost = blogsInDb[0]
            const modifiedPost = {
                ...originalPost,
                likes: originalPost.likes + 1,
            }
            await api
                .put(`/api/blogs/${modifiedPost.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(modifiedPost)
                .expect(200)

            const blogsAtEnd = await testStoredBlogsDelta(0)
            const blogsById = _.keyBy(blogsAtEnd, 'id')
            const resultPost = blogsById[modifiedPost.id]
            assert.deepStrictEqual(resultPost, modifiedPost)
        })
    })

    describe('deletion of a post', () => {
        test('fails with status code 401 if the user is not authenticated', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401)
            await testStoredBlogsDelta(0)
        })
        test('succeeds with status code 204 if the user is valid and authenticated', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]
            const username = blogToDelete.user.username
            const password = userTestHelper.initialUsers.find(
                (user) => user.username === username,
            ).password
            const token = await userTestHelper.authenticatedUserToken(
                { username, password },
                api,
            )
            const allUsers = await userTestHelper.usersInDb()
            const userBefore = allUsers.find(
                (user) => user.username === username,
            )

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(204)

            const blogsAtEnd = await testStoredBlogsDelta(-1)
            const contents = blogsAtEnd.map((n) => n.title)
            assert(!contents.includes(blogToDelete.title))
            assert(
                userBefore.blogs.filter((blogId) =>
                    blogId.equals(blogToDelete.id),
                ).length === 1,
            )
            const userAfter = await userTestHelper.getUserFromDb(userBefore.id)
            assert(
                userAfter.blogs.filter((blog) => {
                    blog._id.equals(blogToDelete.id)
                }).length === 0,
            )
        })
        test('fails with status code 403 if the user is authenticated but not the creator', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]
            const token = await userTestHelper.tokenOfDifferentUser(
                blogToDelete.user,
                api,
            )

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(403)
            await testStoredBlogsDelta(0)
        })
    })
})

after(async () => {
    await mongodb.disconnect()
})
