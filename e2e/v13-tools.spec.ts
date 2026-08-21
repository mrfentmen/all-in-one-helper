import { test, expect } from '@playwright/test';

test.describe('Hubs', () => {
  test('gif-studio loads with controls', async ({ page }) => {
    await page.goto('/tools/gif-studio');
    await expect(page.locator('h1')).toContainText('GIF Studio');
    await expect(page.locator('#gifControls')).toBeVisible();
  });
  test('calculators hub parses commands', async ({ page }) => {
    await page.goto('/tools/calculators');
    await page.fill('#utilityInput', 'pct 20 of 150');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('30');
  });
  test('calculators loan mode', async ({ page }) => {
    await page.goto('/tools/calculators');
    await page.fill('#utilityInput', 'loan 100000 5% 30y');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('Monthly: $');
  });
});

test.describe('9 new tools', () => {
  test('timestamp-converter converts epoch', async ({ page }) => {
    await page.goto('/tools/timestamp-converter');
    await page.fill('#utilityInput', '1700000000');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('Epoch (seconds): 1700000000');
    await expect(page.locator('#utilityOutput')).toContainText('ISO 8601:');
  });

  test('fancy-font-generator produces styles', async ({ page }) => {
    await page.goto('/tools/fancy-font-generator');
    await page.fill('#utilityInput', 'Hello');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('Bold:');
    await expect(page.locator('#utilityOutput')).toContainText('Bubble:');
  });

  test('json-to-typescript generates interface', async ({ page }) => {
    await page.goto('/tools/json-to-typescript');
    await page.fill('#utilityInput', '{"name":"test","age":5,"tags":["a"],"meta":{"deep":true}}');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('export interface Root {');
    await expect(page.locator('#status')).toContainText('interface');
  });

  test('tdee-calculator computes BMR/TDEE', async ({ page }) => {
    await page.goto('/tools/tdee-calculator');
    await page.fill('#utilityInput', 'M 30 70 175 1.55');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('BMR:');
    await expect(page.locator('#utilityOutput')).toContainText('TDEE');
  });

  test('meta-tag-generator outputs OG tags', async ({ page }) => {
    await page.goto('/tools/meta-tag-generator');
    await page.fill('#utilityInput', 'My Title\nMy desc\nhttps://x.com\nhttps://x.com/i.png');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('og:title');
    await expect(page.locator('#utilityOutput')).toContainText('twitter:card');
  });

  test('morse-code-translator encodes and plays', async ({ page }) => {
    await page.goto('/tools/morse-code-translator');
    await page.fill('#utilityInput', 'SOS');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('... --- ...');
  });

  test('url-slug-generator slugifies', async ({ page }) => {
    await page.goto('/tools/url-slug-generator');
    await page.fill('#utilityInput', 'My Great Article! Title');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('my-great-article-title');
  });

  test('password-strength-checker analyzes locally', async ({ page }) => {
    await page.goto('/tools/password-strength-checker');
    await page.fill('#utilityInput', 'Tr0ub4dor&3longp@ss');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('Entropy:');
    await expect(page.locator('#utilityOutput')).toContainText('crack estimate');
  });

  test('image-watermark adds watermark', async ({ page }) => {
    await page.goto('/tools/image-watermark');
    await page.evaluate(async () => {
      const canvas = document.createElement('canvas');
      canvas.width = 300; canvas.height = 200;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'green'; ctx.fillRect(0,0,300,200);
      const blob = await new Promise<Blob>(r => canvas.toBlob(b => r(b)!, 'image/png'));
      const file = new File([blob], 'photo.png', { type: 'image/png' });
      const dt = new DataTransfer(); dt.items.add(file);
      const input = document.getElementById('fileInput') as HTMLInputElement;
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.fill('#memeTop', '© My Brand');
    await page.click('#actionBtn');
    await expect(page.locator('#status')).toContainText('Watermarked', { timeout: 10000 });
    await expect(page.locator('#downloadBtn')).toBeVisible();
  });

  test('gif-studio makes GIF from images', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/tools/gif-studio');
    await page.evaluate(async () => {
      const files: File[] = [];
      for (const color of ['red','blue','green']) {
        const canvas = document.createElement('canvas');
        canvas.width = 100; canvas.height = 100;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = color; ctx.fillRect(0,0,100,100);
        const blob = await new Promise<Blob>(r => canvas.toBlob(b => r(b)!, 'image/jpeg'));
        files.push(new File([blob], color+'.jpg', { type: 'image/jpeg' }));
      }
      const dt = new DataTransfer();
      files.forEach(f => dt.items.add(f));
      const input = document.getElementById('fileInput') as HTMLInputElement;
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.click('#actionBtn');
    await expect(page.locator('#status')).toContainText('GIF ready', { timeout: 45000 });
  });
});
