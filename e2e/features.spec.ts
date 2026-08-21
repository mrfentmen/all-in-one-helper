import { test, expect } from '@playwright/test';

test.describe('Light/Dark mode', () => {
  test('toggle works and persists', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    // Toggle to dark
    await page.click('#themeToggle');
    await expect(html).toHaveClass(/dark/);
    expect(await page.evaluate(() => localStorage.getItem('helper_theme'))).toBe('dark');
    // Reload persists
    await page.reload();
    await expect(html).toHaveClass(/dark/);
    // Toggle back to light
    await page.click('#themeToggle');
    await expect(html).not.toHaveClass(/dark/);
    expect(await page.evaluate(() => localStorage.getItem('helper_theme'))).toBe('light');
  });
  test('mobile toggle exists', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('#themeToggleMobile')).toBeVisible();
  });
});

test.describe('Favorites', () => {
  test('star a tool, shows in favorites row, persists', async ({ page }) => {
    await page.goto('/');
    const star = page.locator('[data-fav="merge-pdf"]').first();
    await star.click();
    await expect(star).toHaveText('⭐');
    await expect(page.locator('#favRow')).toBeVisible();
    await expect(page.locator('#favGrid')).toContainText('merge pdf');
    // Reload persists
    await page.reload();
    await expect(page.locator('#favRow')).toBeVisible();
    // Unstar
    await page.locator('[data-fav="merge-pdf"]').first().click();
    await expect(page.locator('[data-fav="merge-pdf"]').first()).toHaveText('☆');
  });
});

test.describe('Command palette', () => {
  test('Cmd+K opens, fuzzy filters, Enter navigates', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Meta+k');
    await expect(page.locator('#cmdPalette')).toBeVisible();
    await page.fill('#paletteInput', 'gif');
    await page.waitForTimeout(200);
    await expect(page.locator('#paletteResults')).toContainText('GIF Maker');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/tools\/gif-maker/);
  });
  test('Escape closes', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Meta+k');
    await expect(page.locator('#cmdPalette')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#cmdPalette')).toBeHidden();
  });
});

test.describe('History + Bulk queue', () => {
  test('download pushes history', async ({ page }) => {
    await page.goto('/tools/word-counter');
    await page.fill('#utilityInput', 'hello world test');
    await page.click('#actionBtn');
    await page.waitForTimeout(300);
    // word-counter doesn't download by default; use json-formatter which does
    await page.goto('/tools/json-formatter');
    await page.fill('#utilityInput', '{"a":1}');
    await page.click('#actionBtn');
    await page.waitForTimeout(500);
    const h = await page.evaluate(() => localStorage.getItem('helper_history'));
    expect(h).toBeTruthy();
    if (h) expect(h).toContain('json-formatter');
  });
});
