import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const testTitle = 'Component testing is done with react-testing-library'
const testAuthor = 'Barnarne'
const testUrl = 'https://lorenz.com'
const testLikes = 10
const blog = {
    title: testTitle,
    author: testAuthor,
    url: testUrl,
    likes: testLikes,
}

describe('Blog', () => {
    let container
    beforeEach(() => {
        container = render(<Blog blog={blog}/>).container
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
            userEvent.setup()
            const showButton = screen.getByText('show')
            await userEvent.click(showButton)
        })
        let element = container.querySelector('.blog_details')
        expect(element).toBeDefined()
        element = screen.getByText(testUrl, { exact: false })
        expect(element).toBeDefined()
        element = screen.getByText(testLikes, { exact: false })
        expect(element).toBeDefined()

    })

})
