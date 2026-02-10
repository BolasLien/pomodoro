const { test, expect } = require('@playwright/test')

async function gotoHash(page, hashPath) {
  await page.goto(`/#${hashPath}`)
}

test.describe('pomodoro smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => window.localStorage.clear())
  })

  test('main routes render', async ({ page }) => {
    await gotoHash(page, '/')
    await expect(page.getByText('番茄鐘')).toBeVisible()
    await expect(page.getByTestId('timer-card')).toBeVisible()

    await gotoHash(page, '/list')
    await expect(page.getByTestId('list-page')).toBeVisible()

    await gotoHash(page, '/finish')
    await expect(page.getByTestId('finish-page')).toBeVisible()

    await gotoHash(page, '/settings')
    await expect(page.getByTestId('settings-page')).toBeVisible()
  })

  test('create todo and see it in list', async ({ page }) => {
    await gotoHash(page, '/list')

    await page.getByTestId('todo-input').fill('E2E 任務')
    await page.getByRole('spinbutton').nth(0).fill('0')
    await page.getByRole('spinbutton').nth(1).fill('5')
    await page.getByRole('button').nth(0).click()

    await expect(page.getByText('待辦事項：E2E 任務，00:05')).toBeVisible()
  })

  test('unknown route shows 404', async ({ page }) => {
    await gotoHash(page, '/this-route-should-not-exist')
    await expect(page.getByRole('heading', { name: '404 Page Not Found' })).toBeVisible()
  })
})
