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

module.exports = {
    totalLikes,
    favoriteBlog
}