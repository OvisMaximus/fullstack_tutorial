const _ = require('lodash')

const totalLikes = (blogs) => {
    return !blogs || blogs.length === 0 ? 0
        : blogs
            .map(blog => blog.likes)
            .reduce((sum, item) => sum + item, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs && blogs.length > 0) {
        return blogs.reduce((a, b) => a.likes > b.likes ? a : b)
    }
    return null
}

const mostBlogs = (blogs) => {
    if( !blogs || blogs.length === 0 ) return null
    const articlesByAuthor = _.groupBy(blogs, blog => blog.author)
    const authors = Object.keys(articlesByAuthor)
    const mostBlogsAuthor = _.maxBy(authors, (author) => articlesByAuthor[author].length)
    return {
        author: mostBlogsAuthor,
        blogs: articlesByAuthor[mostBlogsAuthor].length
    }
}

const mostLikes = (blogs) => {
    if (!blogs || blogs.length === 0 ) return null
    const articlesByAuthor = _.groupBy(blogs, blog => blog.author)
    const likesOfAuthor = (author) => articlesByAuthor[author].reduce((a, b) => a + b.likes, 0)
    const authors = Object.keys(articlesByAuthor)
    const mostLikesAuthor = _.maxBy(authors, likesOfAuthor)
    return {
        author: mostLikesAuthor,
        likes: likesOfAuthor(mostLikesAuthor)
    }
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}