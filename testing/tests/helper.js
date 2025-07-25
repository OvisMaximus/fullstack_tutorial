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

module.exports = {
    testUser,
    loginWith,
    createNewNote
}