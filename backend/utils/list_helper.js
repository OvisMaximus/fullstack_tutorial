const _ = require('lodash')

const totalLikes = (blogs) => !blogs || blogs.length === 0
    ? 0
    : _.sumBy(blogs, 'likes')

const favoriteBlog = (blogs) => blogs && blogs.length > 0
    ? _.maxBy(blogs, 'likes')
    : null

const mostBlogs = (blogs) => {
    if( !blogs || blogs.length === 0 ) return null
    const articlesByAuthor = _.groupBy(blogs, 'author')
    const authors = _.keys(articlesByAuthor)
    const mostBlogsAuthor = _.maxBy(authors, (author) => articlesByAuthor[author].length)
    return {
        author: mostBlogsAuthor,
        blogs: articlesByAuthor[mostBlogsAuthor].length
    }
}

const mostLikes = (blogs) => {
    if (!blogs || blogs.length === 0 ) return null
    const articlesByAuthor = _.groupBy(blogs, 'author')
    const likesOfAuthor = (author) => _.sumBy(articlesByAuthor[author], 'likes')
    const authors = _.keys(articlesByAuthor)
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