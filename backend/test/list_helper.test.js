const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const blogs = require('./test_data')
const emptyBlogs = []

describe('total likes', () => {
    test('of an empty list shall be zero', () => {
        const result = listHelper.totalLikes(emptyBlogs)
        assert.strictEqual(result, 0)
    })

    test('of a list with one blog shall be the likes of that blog', () => {
        const blogsSingle = [{
            likes: 5
        }]
        const result = listHelper.totalLikes(blogsSingle)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 36)
    })
})

describe('favorite blog', () => {
    test('of an empty list is null', () => {
        const result = listHelper.favoriteBlog(emptyBlogs)
        assert.strictEqual(result, null)
    })

    test('of a list with one blog is that blog', () => {
        const blogsSingle = [{
            title: 'blog1',
            author: 'author1',
            url: 'url1',
            likes: 5
        }]
        const result = listHelper.favoriteBlog(blogsSingle)
        assert.deepStrictEqual(result, blogsSingle[0])
    })

    test('of a list with many blogs is one of those with most likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        assert.strictEqual(result.likes, 12)
    })
})