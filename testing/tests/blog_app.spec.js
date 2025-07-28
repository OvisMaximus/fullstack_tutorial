const {test, describe, expect, beforeEach} = require('@playwright/test')
const {testUser, loginWith, createNewBlog} = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: testUser
        })
        await page.goto('/')
        await page.getByRole('button', {name: 'show Blog List'}).click()
    })
    test('front page can be opened', async ({page}) => {
        const BlogsHeadline = await page.getByText('Blogs', {exact: true})
        await expect(BlogsHeadline).toBeVisible()
    })
    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, testUser.username, testUser.password)
        })
        test('a new blog can be created', async ({ page }) => {
            await createNewBlog(page, 'a blog created by playwright', 'Playwright', 'https://playwright.dev')
            await expect(page.getByText('a blog created by playwright Playwright')).toBeVisible()
        })
    })
})