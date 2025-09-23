import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs.js'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        updateBlog(state, action) {
            const updatedBlog = action.payload
            console.log('blog to update: ', updatedBlog)
            return state.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
        },
        setBlogs(state, action) {
            state = action.payload
            return state
        },
        addBlog(state, action) {
            state.push(action.payload)
        },
        removeBlog(state, action) {
            const id = action.payload
            return state.filter((b) => {
                return b.id !== id
            })
        },
    },
})

export const { addBlog, updateBlog, setBlogs, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        console.log('loaded blogs: ', blogs.length)
        dispatch(setBlogs(blogs))
    }
}
export const createBlog = (blog, login) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blog, login.token)
        dispatch(addBlog(newBlog))
    }
}
export const deleteBlog = (id, login) => {
    return async (dispatch) => {
        await blogService.deleteId(id, login.token)
        dispatch(removeBlog(id))
    }
}
export const likeBlog = (blog, login) => {
    return async (dispatch) => {
        console.log('likeBlog (unmodified): ', blog)
        const likedBlog = { ...blog, likes: blog.likes + 1 }
        const updatedBlog = await blogService.update(likedBlog, login.token)
        dispatch(updateBlog(updatedBlog))
    }
}

export default blogSlice.reducer
