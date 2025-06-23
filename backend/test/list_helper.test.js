const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const blogs = require('./blogs_test_data')

const emptyBlogs = []
const blogsSingle = [{
    title: 'blog1',
    author: 'author1',
    url: 'url1',
    likes: 5
}]

describe('total likes', () => {
    test('of an empty list shall be zero', () => {
        const result = listHelper.totalLikes(emptyBlogs)
        assert.strictEqual(result, 0)
    })

    test('of a list with one blog shall be the likes of that blog', () => {
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
        const result = listHelper.favoriteBlog(blogsSingle)
        assert.deepStrictEqual(result, blogsSingle[0])
    })

    test('of a list with many blogs is one of those with most likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        assert.strictEqual(result.likes, 12)
    })
})

describe('most Blogs', () => {
    test('of an empty list returns null', () => {
        const result = listHelper.mostBlogs(emptyBlogs)
        assert.strictEqual(result, null)
    })

    test('of a list with one blog returns the author of that entry and 1 as number of articles', () => {
        const result = listHelper.mostBlogs(blogsSingle)
        assert.deepStrictEqual(result, { author: 'author1', blogs: 1 })
    })

    test('of a list with multiple blogs returns the author of the most entries and their number of articles', () => {
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
    })

})

describe('most likes', () => {
    test('of an empty list returns null', () => {
        const result = listHelper.mostLikes(emptyBlogs)
        assert.strictEqual(result, null)
    })

    test('of a list with one blog returns the author of that entry and its number of likes', () => {
        const result = listHelper.mostLikes(blogsSingle)
        assert.deepStrictEqual(result, { author: 'author1', likes: 5 })
    })

    test('of a list with multiple blogs returns the author with the most likes in sum ant this sum', () => {
        const result = listHelper.mostLikes(blogs)
        assert.deepStrictEqual(result, {  author: 'Edsger W. Dijkstra', likes: 17 })
    })
})