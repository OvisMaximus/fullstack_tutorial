const testUser = {
    name: 'Test User',
    username: 'testuser',
    password: 'WulleeBullee'
}

const loginWith = async (page, username, password) => {
    await page.getByRole('button', {name: 'login'}).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', {name: 'login'}).click()
}

const createNewNote = async (page, noteContent) => {
    await page.getByRole('button', {name: 'add note'}).click()
    await page.getByRole('textbox').fill(noteContent)
    await page.getByRole('button', {name: 'save'}).click()
    await page.getByText(noteContent, {exact: true}).waitFor()
}

const createNewBlog = async (page, blogTitle, blogAuthor, blogUrl) => {
    await page.getByRole('button', { name: 'create a new blog entry' }).click();
    await page.getByRole('textbox', { name: 'insert the title' }).fill(blogTitle);
    await page.getByRole('textbox', { name: 'insert the author' }).fill(blogAuthor);
    await page.getByRole('textbox', { name: 'add the url' }).fill(blogUrl);
    await page.getByRole('button', { name: 'save' }).click();
    await page.getByText(`${blogTitle} by ${blogAuthor}`).waitFor();
}

module.exports = {
    testUser,
    loginWith,
    createNewNote,
    createNewBlog
}