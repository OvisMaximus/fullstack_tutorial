import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Note from "./Note.jsx";

const testTitle = 'Component testing is done with react-testing-library'
const testAuthor = 'Barnarne'
const testUrl = 'https://lorenz.com'
const testLikes = 10
describe('Blog', () => {
    test('renders summary by default', () => {
        const blog = {
            title: testTitle,
            author: testAuthor,
            url: testUrl,
            likes: testLikes,
        }
        render(<Blog blog={blog}/>)

        let element = screen.getByText(testTitle, { exact: false })
        expect(element).toBeDefined()
        // screen.debug(element)
        element = screen.getByText(testAuthor, { exact: false })
        expect(element).toBeDefined()
        element = screen.queryByRole('blog_details')
        assert.isNull(element)
    })
})
