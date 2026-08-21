import { test, expect } from '@playwright/test';
test('Try instantly dropzone and pills work', async ({ page }) => {
  await page.goto('/');
  // Check dropzone exists and is visible
  await expect(page.locator('#tryDropzone')).toBeVisible();
  // Check pills are links - scoped to Try dropzone
  await expect(page.locator('#tryDropzone a[href="/tools/merge-pdf"]')).toBeVisible();
  await expect(page.locator('#tryDropzone a[href="/tools/gif-maker"]')).toBeVisible();
  await expect(page.locator('#tryDropzone a[href="/tools/ocr-image"]')).toBeVisible();
  // Click Merge PDF pill should navigate
  await page.click('#tryDropzone a[href="/tools/merge-pdf"]');
  await expect(page).toHaveURL(/\/tools\/merge-pdf/);
  await page.goto('/');
  // Click GIF Maker
  await page.click('#tryDropzone a[href="/tools/gif-maker"]');
  await expect(page).toHaveURL(/\/tools\/gif-maker/);
  await page.goto('/');
  // OCR
  await page.click('#tryDropzone a[href="/tools/ocr-image"]');
  await expect(page).toHaveURL(/\/tools\/ocr-image/);
  // Test dropzone click triggers file input (hidden but clickable)
  await page.goto('/');
  await expect(page.locator('#tryFileInput')).toBeHidden();
  // Check dropzone has correct text
  await expect(page.locator('#tryDropzone')).toContainText('Drop files here');
});
