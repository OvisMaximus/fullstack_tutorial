import {useEffect, useState} from "react";
import Blog from "./Blog.jsx";
import blogService from "../services/blogs.js"
import blog from "./Blog.jsx";
import Togglable from "./Togglable.jsx";
import RenderOnlyWhen from "./RenderOnlyWhen.jsx";

const Blogs = ({successMessage}) => {
    const [blogs, setBlogs] = useState([])
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))
    const addBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        }

        const newBlogObject = await blogService.create(newBlog, user.token)
        console.log('newBlogObject: ', newBlogObject)
        await fetchBlogs()
        successMessage(`${newBlogObject.title} by ${newBlogObject.author} added`)
    }

    console.log('render blogs', blogs)

    const fetchBlogs = async () => {
        console.log('fetch blogs')
        const blogs = await blogService.getAll()
        console.log('blogs fetched, total ', blog.length)
        setBlogs(blogs)
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    const handleChange = (setValue) => (event) => {
        setValue(event.target.value)
    }

    return (
        <div>
            <h1>Blogs</h1>
            <RenderOnlyWhen condition={user}>
            <Togglable showButtonLabel="create a new blog entry" hideButtonLabel="cancel">
                <h2>create a new blog entry</h2>
                <form onSubmit={addBlog}>
                    Title <input id="newTitleInputField" defaultValue={newTitle}
                                 onChange={handleChange(setNewTitle)}/><br/>
                    Author <input id="newAuthorInputField" defaultValue={newAuthor}
                                  onChange={handleChange(setNewAuthor)}/><br/>
                    URL <input id="newUrlInputField" defaultValue={newUrl} onChange={handleChange(setNewUrl)}/><br/>
                    <button type="submit">save</button>
                </form>
            </Togglable>
            </RenderOnlyWhen>

            <h2>suggested blog reads</h2>
            {blogs.map(blog =>
                <div key={blog.id}>
                    <Blog blog={blog}/>
                </div>
            )}

        </div>
    )
}

export default Blogs

