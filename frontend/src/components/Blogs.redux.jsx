import { useEffect, useRef } from 'react'
import Blog from './Blog.jsx'
import Togglable from './Togglable.jsx'
import RenderOnlyWhen from './RenderOnlyWhen.jsx'
import NewBlogForm from './NewBlogForm.jsx'
import { useDispatch, useSelector, useStore } from 'react-redux'
import {
    initializeBlogs,
    deleteBlog as deleteBlogReducer,
    likeBlog as likeBlogReducer,
    createBlog as createBlogReducer,
    setToken,
} from '../reducers/blogReducer.js'

const Blogs = ({ successMessage }) => {
    const blogFormRef = useRef(null)
    const dispatch = useDispatch()
    const blogs = [...useSelector((state) => state.blog)]
    const store = useStore()
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))
    setToken(user ? user.token : null)

    const createBlog = async (newBlogObject) => {
        await createBlogReducer(newBlogObject)(dispatch)
        successMessage(
            `${newBlogObject.title} by ${newBlogObject.author} added`,
        )(dispatch)
        blogFormRef.current.toggleVisibility()
    }

    const likeBlog = async (blog) => {
        await likeBlogReducer(blog)(dispatch)
        const updatedBlog = store.getState().blog.find((b) => b.id === blog.id)
        console.log('updatedBlog: ', updatedBlog)
        successMessage(`${updatedBlog.title} by ${updatedBlog.author} updated`)(
            dispatch,
        )
    }

    const deleteBlog = async (blog) => {
        await deleteBlogReducer(blog.id)(dispatch)
        successMessage(`${blog.title} by ${blog.author} removed`)(dispatch)
    }

    const fetchBlogs = () => {
        console.log('fetch blogs')
        const fetchBlogsAsync = async () => {
            console.log('fetch blogs async')
            await initializeBlogs()(dispatch)
        }
        fetchBlogsAsync().then(() => console.log('blogs fetched'))
        return () => {}
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div>
            <h1>Blogs</h1>
            <RenderOnlyWhen condition={user}>
                <Togglable
                    showButtonLabel="create a new blog entry"
                    hideButtonLabel="cancel"
                    ref={blogFormRef}
                >
                    <NewBlogForm storeBlog={createBlog} />
                </Togglable>
            </RenderOnlyWhen>

            <h2>suggested blog reads</h2>
            {blogs
                ? blogs
                      .sort((lBlog, rBlog) => rBlog.likes - lBlog.likes)
                      .map((blog) => (
                          <div key={blog.id}>
                              <Blog
                                  blog={blog}
                                  loggedUser={user}
                                  deleteBlog={deleteBlog}
                                  likeBlog={likeBlog}
                              />
                          </div>
                      ))
                : 'loading...'}
        </div>
    )
}

export default Blogs
