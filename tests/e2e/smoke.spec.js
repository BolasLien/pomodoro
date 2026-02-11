const { test, expect } = require('@playwright/test')

async function gotoHash (page, hashPath) {
  await page.goto(`/#${hashPath}`)
}

test.describe('pomodoro smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => window.localStorage.clear())
    await page.reload()
  })

  test('main routes render', async ({ page }) => {
    await gotoHash(page, '/')
    await expect(page.getByText('Pomodoro Local App')).toBeVisible()
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

    await page.getByTestId('todo-input').fill('第一個任務')
    await page.getByRole('spinbutton').nth(0).fill('0')
    await page.getByRole('spinbutton').nth(1).fill('5')
    await expect(page.getByTestId('todo-input')).toHaveValue('第一個任務')
    await page.getByRole('button', { name: '新增' }).click()

    await expect.poll(async () => {
      return page.evaluate(() => {
        const raw = window.localStorage.getItem('pomodoro:pomodoro')
        const state = raw ? JSON.parse(raw) : {}
        return state.todos?.[0]?.name || ''
      })
    }).toBe('第一個任務')
  })

  test('break settings apply to timer flow', async ({ page }) => {
    await gotoHash(page, '/settings')
    await page.getByTestId('short-break-input').fill('0')
    await page.getByTestId('long-break-input').fill('0')
    await page.getByTestId('long-break-interval-input').fill('1')

    await gotoHash(page, '/list')
    await page.getByTestId('todo-input').fill('第一個任務')
    await page.getByRole('spinbutton').nth(0).fill('0')
    await page.getByRole('spinbutton').nth(1).fill('5')
    await page.getByRole('button', { name: '新增' }).click()

    await page.getByTestId('todo-input').fill('第二個任務')
    await page.getByRole('spinbutton').nth(0).fill('0')
    await page.getByRole('spinbutton').nth(1).fill('5')
    await page.getByRole('button', { name: '新增' }).click()

    await gotoHash(page, '/')
    await page.getByTestId('start-btn').click()
    await page.getByTestId('skip-btn').click()

    await expect(page.getByTestId('start-btn')).toBeVisible()
    await page.getByTestId('start-btn').click()
    await expect(page.getByText('長休息')).toBeVisible()
  })

  test('auto start next segment works when enabled', async ({ page }) => {
    await gotoHash(page, '/settings')
    await page.getByTestId('short-break-input').fill('0')
    await page.getByTestId('long-break-input').fill('0')
    await page.getByTestId('long-break-interval-input').fill('1')
    await page.getByTestId('auto-start-toggle').check()

    await gotoHash(page, '/list')
    await page.getByTestId('todo-input').fill('第一個任務')
    await page.getByRole('spinbutton').nth(0).fill('0')
    await page.getByRole('spinbutton').nth(1).fill('5')
    await page.getByRole('button', { name: '新增' }).click()

    await page.getByTestId('todo-input').fill('第二個任務')
    await page.getByRole('spinbutton').nth(0).fill('0')
    await page.getByRole('spinbutton').nth(1).fill('5')
    await page.getByRole('button', { name: '新增' }).click()

    await gotoHash(page, '/')
    await page.getByTestId('start-btn').click()
    await page.getByTestId('skip-btn').click()

    await expect(page.getByText('長休息')).toBeVisible()
    await expect(page.getByTestId('pause-btn')).toBeVisible()
    await expect(page.getByTestId('start-btn')).toHaveCount(0)

    await page.getByTestId('skip-btn').click()
    await expect(page.getByText('第二個任務')).toBeVisible()
    await expect(page.getByTestId('pause-btn')).toBeVisible()
  })

  test('edit mode can drag and reorder todos', async ({ page }) => {
    await gotoHash(page, '/list')

    await page.getByTestId('todo-input').fill('第一個任務')
    await page.getByRole('spinbutton').nth(0).fill('0')
    await page.getByRole('spinbutton').nth(1).fill('5')
    await page.getByRole('button', { name: '新增' }).click()

    await page.getByTestId('todo-input').fill('第二個任務')
    await page.getByRole('spinbutton').nth(0).fill('0')
    await page.getByRole('spinbutton').nth(1).fill('5')
    await page.getByRole('button', { name: '新增' }).click()

    await page.getByRole('button', { name: '編輯模式' }).click()
    await page.locator('[data-testid="list-page"] .drag-handle').nth(0)
      .dragTo(page.locator('[data-testid="list-page"] .drag-handle').nth(1))

    await expect(page.locator('[data-testid="list-page"] p.text-base.font-semibold').nth(0))
      .toHaveText('第二個任務')
  })

  test('unknown route shows 404', async ({ page }) => {
    await gotoHash(page, '/this-route-should-not-exist')
    await expect(page.getByRole('heading', { name: '找不到頁面' })).toBeVisible()
  })
})
