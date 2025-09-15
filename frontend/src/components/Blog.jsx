import CollapseDetails from './CollapseDetails.jsx'
import { Button } from './Button.jsx'

const Blog = ({ blog, loggedUser, updateBlog, deleteBlog }) => {
    const summary = `${blog.title}  ${blog.author}`

    const addLike = (blog) => {
        return () => {
            console.log('add like', blog)
            const newBlog = { ...blog, likes: blog.likes + 1 }
            updateBlog(newBlog)
        }
    }

    const handleDeleteBlog = (blog) => {
        return () => {
            console.log('delete blog', blog)
            if (!window.confirm(`delete ${blog.title} by ${blog.author}?`))
                return
            deleteBlog(blog)
        }
    }

    return (
        <div className={'blog'}>
            <CollapseDetails summary={summary}>
                <div className={'blog_details'}>
                    <a href={blog.url}>{blog.url}</a>
                    <br />
                    likes: {blog.likes} &nbsp;{' '}
                    <Button text="like" onClick={addLike(blog)} />
                    <br />
                    owner: {blog.user ? blog.user.name : 'user not initialized'}
                    <br />
                    {blog.user &&
                    loggedUser &&
                    blog.user.username === loggedUser.username ? (
                        <Button
                            text="delete entry"
                            onClick={handleDeleteBlog(blog)}
                        />
                    ) : (
                        ''
                    )}
                </div>
            </CollapseDetails>
        </div>
    )
}

export default Blog
