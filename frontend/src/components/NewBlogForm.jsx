import {useState} from "react";

const titlePlaceholder = 'insert the title';
const authorPlaceholder = 'insert the author';
const urlPlaceholder = 'add the url';

function NewBlogForm({storeBlog}) {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleChange = (setValue) => (event) => {
        setValue(event.target.value)
    }
    const clearInputFields = () => {
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        document.getElementById(titlePlaceholder).value = ''
        document.getElementById(authorPlaceholder).value = ''
        document.getElementById(urlPlaceholder).value = ''
    }

    const addBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        }
        storeBlog(newBlog)
        clearInputFields()
    }

    return (
        <div>
            <h2>create a new blog entry</h2>
            <form onSubmit={addBlog}>
                Title <input defaultValue={newTitle}
                             id={titlePlaceholder}
                             placeholder={titlePlaceholder}
                             onChange={handleChange(setNewTitle)}/><br/>
                Author <input defaultValue={newAuthor}
                              id={authorPlaceholder}
                              placeholder={authorPlaceholder}
                              onChange={handleChange(setNewAuthor)}/><br/>
                URL <input defaultValue={newUrl}
                           id={urlPlaceholder}
                           placeholder={urlPlaceholder}
                           onChange={handleChange(setNewUrl)}/><br/>
                <button type="submit">save</button>
            </form>
        </div>
    )
}

module.exports = {
    NewBlogForm,
    titlePlaceholder,
    authorPlaceholder,
    urlPlaceholder
}