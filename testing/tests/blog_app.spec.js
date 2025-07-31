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
    test('a blog can be liked', async ({ page }) => {
        const blogEntry = {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
        }
        const selector = page.getByText(blogEntry.title, {exact: false}).locator('xpath=..')
        await selector.getByRole('button', {name:'show', exact: true}).click()
        await page.getByRole('button', {name:'like'}).click()
        await expect(page.getByText('likes: 8')).toBeVisible()
    })
    test('the order of blogs equals the descending order of likes', async ({ page }) => {
        const selector = await page.locator('css=.blog')
        await selector.nth(0).getByText('Canonical string reduction').isVisible() // 12
        await selector.nth(1).getByText('First class tests').isVisible() // 10
        await selector.nth(2).getByText('React patterns').isVisible() // 7
        await selector.nth(3).getByText('Go To Statement Considered Harmful').isVisible() // 5
    })
    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, testUser)
        })
        test('a new blog can be created', async ({ page }) => {
            await createNewBlog(page, 'a blog created by playwright', 'Playwright', 'https://playwright.dev')
            await expect(page.getByText('a blog created by playwright Playwright')).toBeVisible()
        })

        test('a blog can be deleted', async ({ page }) => {
            const blogEntry = {
                title: 'a redundant blog entry created by test',
                author: 'Playwright',
                url: 'https://playwright.dev',
            }
            await createNewBlog(page, blogEntry.title , blogEntry.author , blogEntry.url )
            const selector = page.getByText(`${blogEntry.title} ${blogEntry.author}`)
                .locator('xpath=..')
            await selector.getByRole('button', {name:'show', exact: true}).click()
            await page.on('dialog', dialog => dialog.accept());
            await page.getByRole('button', {name:'delete entry'}).click()
            await expect(page.getByText(`${blogEntry.title} ${blogEntry.author}`)).not.toBeVisible()
        })
        test('deleting a blog is only offered if it is owned by logged in user', async ({ page, request }) => {
            const blogEntry = {
                title: 'a blog created by another user',
                author: 'Playwright',
                url: 'https://playwright.dev',
            }
            await createNewBlog(page, blogEntry.title , blogEntry.author , blogEntry.url)
            await page.getByRole('button', {name:'log off', exact: true}).click()
            const otherUser = {username: 'otheruser', password: 'passother', name: 'Other User'}
            await request.post('/api/users', {data: otherUser})
            await loginWith(page, otherUser)
            const selector = page.getByText(`${blogEntry.title} ${blogEntry.author}`)
                .locator('xpath=..')
            await selector.getByRole('button', {name:'show', exact: true}).click()
            await expect(page.getByRole('button', {name:'delete entry'})).not.toBeVisible()
        })
    })
})