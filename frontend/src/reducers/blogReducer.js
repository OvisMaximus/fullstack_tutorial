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
let token = ''
export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        console.log('loaded blogs: ', blogs.length)
        dispatch(setBlogs(blogs))
    }
}
export const createBlog = (blog) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blog, token)
        dispatch(addBlog(newBlog))
    }
}
export const deleteBlog = (id) => {
    return async (dispatch) => {
        await blogService.remove(id, token)
        dispatch(removeBlog(id))
    }
}
export const likeBlog = (blog) => {
    return async (dispatch) => {
        console.log('likeBlog (unmodified): ', blog)
        const likedBlog = { ...blog, likes: blog.likes + 1 }
        const updatedBlog = await blogService.update(likedBlog, token)
        dispatch(updateBlog(updatedBlog))
    }
}
export const setToken = (newToken) => {
    token = newToken
}

export default blogSlice.reducer
