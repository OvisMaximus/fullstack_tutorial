import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const testTitle = 'Component testing is done with react-testing-library'
const testAuthor = 'Barnarne'
const testUrl = 'https://fresh.fruits.com'
const testLikes = 10
const blog = {
    title: testTitle,
    author: testAuthor,
    url: testUrl,
    likes: testLikes,
}

describe('Blog', () => {
    let updateBlogMockHandler
    let container

    beforeEach(() => {
        updateBlogMockHandler = vi.fn()
        container = render(<Blog blog={blog} updateBlog={updateBlogMockHandler}/>).container
    })

    test('renders summary by default', () => {
        let element = screen.getByText(testTitle, { exact: false })
        expect(element).toBeDefined()
        // screen.debug(element)
        element = screen.getByText(testAuthor, { exact: false })
        expect(element).toBeDefined()
        element = container.querySelector('.blog_details')
        assert.isNull(element)
    })

    test('renders blog details when button was clicked', async () => {
        await act(async () => {
            const user = userEvent.setup()
            const showButton = screen.getByText('show')
            await user.click(showButton)
        })
        let element = container.querySelector('.blog_details')
        expect(element).toBeDefined()
        element = screen.getByText(testUrl, { exact: false })
        expect(element).toBeDefined()
        element = screen.getByText(testLikes, { exact: false })
        expect(element).toBeDefined()
    })

    test('clicking the like button twice calls the event handler twice', async () => {
        await act(async () => {
            const user = userEvent.setup()
            const showButton = screen.getByText('show')
            await user.click(showButton)
        })


        const user = userEvent.setup()
        const button = screen.getByText('like')
        await user.click(button)
        await user.click(button)

        expect(updateBlogMockHandler.mock.calls).toHaveLength(2)
    })

})
