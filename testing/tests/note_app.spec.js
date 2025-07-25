const {test, describe, expect, beforeEach} = require('@playwright/test')
const {testUser, loginWith, createNewNote} = require('./helper')

describe('Note app', () => {
    beforeEach(async ({page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: testUser
        })
        await page.goto('/')
        await page.getByRole('button', {name: 'show Notes'}).click()
    })

    test('front page can be opened', async ({page}) => {
        const NotesHeadline = await page.getByText('Notes', {exact: true})

        await expect(NotesHeadline).toBeVisible()
        await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {
        await loginWith(page, testUser.username, 'wrong password' );

        const errorDiv = page.locator('.error')
        await expect(errorDiv).toContainText('Wrong credentials')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
        await expect(page.getByText(`${testUser.name} logged in`)).not.toBeVisible()
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, testUser.username, testUser.password)
            await expect(page.getByText(`${testUser.name} logged in`)).toBeVisible()
        })

        test('a new note can be created', async ({ page }) => {
            await createNewNote(page, 'a note created by playwright')
            await expect(page.getByRole('listitem').getByText('a note created by playwright')).toBeVisible()
        })

        describe('and several notes exist', () => {
            beforeEach(async ({page}) => {
                await createNewNote(page, 'first note');
                await createNewNote(page, 'second note');
                await createNewNote(page, 'third note');
            })

            test('importance can be changed', async ({page}) => {
                const noteElement = await page.getByText('second note').locator('..')
                await noteElement.getByRole('button', {name: 'make not important'}).click()
                await expect(noteElement.getByText('make important')).toBeVisible()
            })
        })
    })
})