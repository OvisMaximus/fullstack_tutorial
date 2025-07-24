const {test, describe, expect, beforeEach} = require('@playwright/test')
const testUser = {
    name: 'Test User',
    username: 'testuser',
    password: 'WulleeBullee'
}

describe('Note app', () => {
    beforeEach(async ({page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: testUser
        })
        await page.goto('http://localhost:5173')
        await page.getByRole('button', {name: 'show Notes'}).click()
    })

    test('front page can be opened', async ({page}) => {
        const NotesHeadline = await page.getByText('Notes', {exact: true})

        await expect(NotesHeadline).toBeVisible()
        await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByTestId('username').fill('testuser.username')
        await page.getByTestId('password').fill('wrong')
        await page.getByRole('button', { name: 'login' }).click()

        const errorDiv = page.locator('.error')
        await expect(errorDiv).toContainText('Wrong credentials')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
        await expect(page.getByText(`${testUser.name} logged in`)).not.toBeVisible()
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'login' }).click()
            await page.getByTestId('username').fill(testUser.username)
            await page.getByTestId('password').fill(testUser.password)
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText(`${testUser.name} logged in`)).toBeVisible()
        })

        test('a new note can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'add note' }).click()
            await page.getByRole('textbox').fill('a note created by playwright')
            await page.getByRole('button', { name: 'save' }).click()
            await expect(page.getByRole('listitem').getByText('a note created by playwright')).toBeVisible()
        })
        describe('and a note exists', () => {
            beforeEach(async ({page}) => {
                await page.getByRole('button', {name: 'add note'}).click()
                await page.getByRole('textbox').fill('another note by playwright')
                await page.getByRole('button', {name: 'save'}).click()
            })

            test('importance can be changed', async ({page}) => {
                await page.getByRole('button', {name: 'make not important'}).click()
                await expect(page.getByText('make important')).toBeVisible()
            })
        })
    })
})