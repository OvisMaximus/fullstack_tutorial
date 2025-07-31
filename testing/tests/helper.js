const testUser =     {
    username: 'test',
    name: 'Test User',
    password: 'PumpaNiggel'
}

const loginWith = async (page, user) => {
    await page.getByRole('button', {name: 'login'}).click()
    await page.getByTestId('username').fill(user.username)
    await page.getByTestId('password').fill(user.password)
    await page.getByRole('button', {name: 'login'}).click()
    await page.getByText(`Welcome ${user.name}`).waitFor()
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