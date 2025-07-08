import {useState} from "react";

export function NewBlogForm({storeBlog}) {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleChange = (setValue) => (event) => {
        setValue(event.target.value)
    }

    const addBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        }
        storeBlog(newBlog)
    }

    return (
        <div>
            <h2>create a new blog entry</h2>
            <form onSubmit={addBlog}>
                Title <input id="newTitleInputField" defaultValue={newTitle}
                             onChange={handleChange(setNewTitle)}/><br/>
                Author <input id="newAuthorInputField" defaultValue={newAuthor}
                              onChange={handleChange(setNewAuthor)}/><br/>
                URL <input id="newUrlInputField" defaultValue={newUrl}
                           onChange={handleChange(setNewUrl)}/><br/>
                <button type="submit">save</button>
            </form>
        </div>
    )
}