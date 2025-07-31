import {useEffect, useRef, useState} from "react";
import Blog from "./Blog.jsx";
import blog from "./Blog.jsx";
import blogService from "../services/blogs.js"
import Togglable from "./Togglable.jsx";
import RenderOnlyWhen from "./RenderOnlyWhen.jsx";
import NewBlogForm from "./NewBlogForm.jsx";

const Blogs = ({successMessage}) => {
    const [blogs, setBlogs] = useState([])
    const blogFormRef = useRef()
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))

    const createBlog = async (newBlog) => {
        const newBlogObject = await blogService.create(newBlog, user.token)
        console.log('newBlogObject: ', newBlogObject)
        await fetchBlogs()
        successMessage(`${newBlogObject.title} by ${newBlogObject.author} added`)
        blogFormRef.current.toggleVisibility()
    }

    const updateBlog = async (blog) => {
        const updatedBlog = await blogService.update(blog)
        console.log('updatedBlog: ', updatedBlog)
        await fetchBlogs()
        successMessage(`${updatedBlog.title} by ${updatedBlog.author} updated`)
    }

    const deleteBlog = async (blog) => {
        await blogService.remove(blog.id, user.token)
        await fetchBlogs()
        successMessage(`${blog.title} by ${blog.author} removed`)
    }

    const fetchBlogs = async () => {
        console.log('fetch blogs')
        const blogs = await blogService.getAll()
        console.log('blogs fetched, total ', blog.length)
        setBlogs(blogs)
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div>
            <h1>Blogs</h1>
            <RenderOnlyWhen condition={user}>
                <Togglable showButtonLabel="create a new blog entry"
                           hideButtonLabel="cancel"
                           ref={blogFormRef}>
                    <NewBlogForm storeBlog={createBlog}/>
                </Togglable>
            </RenderOnlyWhen>

            <h2>suggested blog reads</h2>
            {blogs
                .sort((lBlog, rBlog) => rBlog.likes - lBlog.likes)
                .map(blog => (
                    <div key={blog.id}>
                        <Blog
                            blog={blog}
                            loggedUser={user}
                            deleteBlog={deleteBlog}
                            updateBlog={updateBlog}/>
                    </div>
                ))
            }

        </div>
    )
}

export default Blogs

