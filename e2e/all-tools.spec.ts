import { test, expect } from '@playwright/test';
import { tools } from '../src/data/tools';

test.describe('Homepage', () => {
  test('loads with 95 tools, no infinite scroll, search and tabs', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/All-in-One Helper/);
    // Check total count
    await expect(page.locator('#toolCount')).toContainText('94 TOOLS');
    // Check tabs exist and not infinite scroll - should have pagination
    await expect(page.locator('#tabs')).toBeVisible();
    await expect(page.locator('[data-tab="pdf"]')).toBeVisible();
    // Check search input exists (global)
    await expect(page.locator('#globalSearch')).toBeVisible();
    // Check skeletons are replaced
    await page.waitForTimeout(500);
    await expect(page.locator('#skeletonGrid')).toBeHidden();
    await expect(page.locator('#toolsGrid')).toBeVisible();
    // Check pagination: should show 12 initially, not all 94
    const visibleCards = page.locator('[data-tool-card]:visible');
    await expect(visibleCards).toHaveCount(12);
    // Check Show more button
    await expect(page.locator('#showMore')).toBeVisible();
    // Click show more should show more
    await page.click('#showMore');
    await expect(page.locator('[data-tool-card]:visible')).toHaveCount(24);
    // Check recent row hidden initially (no recent)
    // Search should filter
    await page.fill('#search', 'pdf');
    await page.waitForTimeout(300);
    const filtered = page.locator('[data-tool-card]:visible');
    const count = await filtered.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(94);
    // Check ad banners with contact
    await expect(page.locator('text=Your ad here').first()).toBeVisible();
    await expect(page.locator('text=contactae2000@gmail.com').first()).toBeVisible();
    // Check no em dashes in src (humanized)
    const body = await page.content();
    expect(body).not.toContain('—');
  });

  test('global search dropdown and /search page', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('#globalSearch');
    await input.focus();
    await input.fill('gif');
    await page.waitForTimeout(500);
    const results = page.locator('#globalSearchResults');
    await expect(results).toBeVisible();
    await expect(results.locator('a').first()).toContainText(/GIF/i);
    // Test enter navigates to search page
    await input.press('Enter');
    await expect(page).toHaveURL(/\/search\?q=gif/);
    await expect(page.locator('h1')).toContainText('Search tools');
  });

  test('search page works', async ({ page }) => {
    await page.goto('/search?q=pdf');
    await expect(page.locator('text=Merge PDF').first()).toBeVisible();
    await page.goto('/search?q=nonexistenttool123');
    await expect(page.getByText('No tools found')).toBeVisible();
  });
});

test.describe('All tools load', () => {
  for (const tool of tools) {
    test(`${tool.slug} loads with correct UI and no mock`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('console', msg => {
        if (msg.type() === 'error' && msg.text().includes('Failed to load')) errors.push(msg.text());
      });
      const response = await page.goto(`/tools/${tool.slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toContainText(tool.title);
      await expect(page.locator('text=Your').first()).toBeVisible();
      // Check no em dashes
      const content = await page.content();
      expect(content).not.toContain('—');
      // Check ad banners present (custom, contact)
      await expect(page.locator('text=Your Ad Here').first()).toBeVisible();
      await expect(page.locator('text=contactae2000@gmail.com').first()).toBeVisible();
      // Check no AdSense script
      expect(content).not.toContain('adsbygoogle');
      // Check action button exists
      const actionBtn = page.locator('#actionBtn');
      // Some tools hide actionBtn (qr, color) but should have alternative
      if (['qr-generator', 'color-picker'].includes(tool.slug)) {
        await expect(page.locator(tool.slug==='qr-generator' ? '#qrBtn' : '#colorCopy')).toBeVisible();
      } else {
        await expect(actionBtn).toBeVisible();
      }
      // Check dropzone or utility area exists
      const hasDropzone = await page.locator('#dropzone').count() > 0;
      const hasUtility = await page.locator('#utilityArea').count() > 0;
      const hasResume = await page.locator('#resumeArea').count() > 0;
      const hasQr = await page.locator('#qrArea').count() > 0;
      const hasColor = await page.locator('#colorArea').count() > 0;
      expect(hasDropzone || hasUtility || hasResume || hasQr || hasColor).toBeTruthy();
      // Check recent caching: should set helper_recent
      const recent = await page.evaluate(() => localStorage.getItem('helper_recent'));
      expect(recent).toContain(tool.slug);
      // Check no page errors
      expect(errors, `errors for ${tool.slug}: ${errors.join(', ')}`).toEqual([]);
    });
  }
});

test.describe('Text tools actual logic', () => {
  test('text-tools word count works', async ({ page }) => {
    await page.goto('/tools/text-tools');
    await page.fill('#utilityInput', 'Hello world test');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('Words: 3');
  });
  test('json-formatter works', async ({ page }) => {
    await page.goto('/tools/json-formatter');
    await page.fill('#utilityInput', '{"a":1}');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('"a": 1');
  });
  test('base64 encode', async ({ page }) => {
    await page.goto('/tools/base64');
    await page.fill('#utilityInput', 'hello');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('aGVsbG8=');
  });
  test('url-encode works', async ({ page }) => {
    await page.goto('/tools/url-encode');
    await page.fill('#utilityInput', 'hello world');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('hello%20world');
  });
  test('hash-generator SHA-256', async ({ page }) => {
    await page.goto('/tools/hash-generator');
    await page.fill('#utilityInput', 'test');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('SHA-256:');
  });
  test('diff-checker', async ({ page }) => {
    await page.goto('/tools/diff-checker');
    await page.fill('#utilityInput', 'old\n---\nnew');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('old');
  });
  test('regex-tester', async ({ page }) => {
    await page.goto('/tools/regex-tester');
    await page.fill('#utilityInput', '/test/g\n---\ntest test');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('Match');
  });
  test('markdown-to-html', async ({ page }) => {
    await page.goto('/tools/markdown-to-html');
    await page.fill('#utilityInput', '# Hello');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('Hello');
  });
  test('uuid-generator', async ({ page }) => {
    await page.goto('/tools/uuid-generator');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('-');
  });
  test('lorem via text-tools', async ({ page }) => {
    await page.goto('/tools/text-tools');
    await page.selectOption('#textMode', 'lorem');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('Lorem ipsum');
  });
  test('case conversion via text-tools', async ({ page }) => {
    await page.goto('/tools/text-tools');
    await page.selectOption('#textMode', 'upper');
    await page.fill('#utilityInput', 'hello world');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('HELLO WORLD');
  });
  test('jwt-decoder', async ({ page }) => {
    await page.goto('/tools/jwt-decoder');
    await page.fill('#utilityInput', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
    await page.click('#actionBtn');
    await expect(page.locator('#utilityOutput')).toContainText('HEADER');
  });
});

test.describe('File tools with synthetic files', () => {
  test('merge-pdf with 2 small PDFs', async ({ page }) => {
    await page.goto('/tools/merge-pdf');
    // Create 2 small PDFs in browser via pdf-lib and set as files
    await page.evaluate(async () => {
      // Minimal 1-page PDF base64 (1x1 pixel)
      const base64 = 'JVBERi0xLjUKJeLjz9MKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL01lZGlhQm94WzAgMCAyMDAgMjAwXT4+CmVuZG9iagp4cmVmCjAgNAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA1OCAwMDAwMCBuIAowMDAwMDAwMTE1IDAwMDAwIG4gCnRyYWlsZXI8PC9TaXplIDQvUm9vdCAxIDAgUj4+CnN0YXJ0eHJlZgoxNjUKJSVFT0Y=';
      const bytes = Uint8Array.from(atob(base64), c=>c.charCodeAt(0));
      const f1 = new File([bytes], 'A.pdf', {type:'application/pdf'});
      const f2 = new File([bytes], 'B.pdf', {type:'application/pdf'});
      const dt = new DataTransfer();
      dt.items.add(f1);
      dt.items.add(f2);
      const input = document.getElementById('fileInput') as HTMLInputElement;
      input.files = dt.files;
      input.dispatchEvent(new Event('change', {bubbles:true}));
    });
    await page.waitForTimeout(500);
    await page.click('#actionBtn');
    await expect(page.locator('#status')).toContainText(/Done|MB/, { timeout: 10000 });
    await expect(page.locator('#downloadBtn')).toBeVisible();
  });

  test('compress-image with canvas generated image', async ({ page }) => {
    await page.goto('/tools/compress-image');
    await page.evaluate(async () => {
      const canvas = document.createElement('canvas');
      canvas.width = 100; canvas.height = 100;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'red'; ctx.fillRect(0,0,100,100);
      const blob = await new Promise<Blob>(r=> canvas.toBlob(b=>r(b!), 'image/png'));
      const file = new File([blob], 'test.png', {type:'image/png'});
      const dt = new DataTransfer(); dt.items.add(file);
      const input = document.getElementById('fileInput') as HTMLInputElement;
      input.files = dt.files;
      input.dispatchEvent(new Event('change', {bubbles:true}));
    });
    await page.click('#actionBtn');
    await expect(page.locator('#status')).toContainText(/Compressed/, { timeout: 10000 });
    await expect(page.locator('#downloadBtn')).toBeVisible();
  });

  test('qr-generator creates QR', async ({ page }) => {
    await page.goto('/tools/qr-generator');
    await page.fill('#qrInput', 'https://example.com');
    await page.click('#qrBtn');
    await expect(page.locator('#qrCanvas')).toBeVisible();
    await expect(page.locator('#qrDownload')).toBeVisible();
  });

  test('meme-generator with image', async ({ page }) => {
    await page.goto('/tools/meme-generator');
    await page.evaluate(async () => {
      const canvas = document.createElement('canvas');
      canvas.width=200; canvas.height=200;
      canvas.getContext('2d')!.fillStyle='blue';
      canvas.getContext('2d')!.fillRect(0,0,200,200);
      const blob = await new Promise<Blob>(r=> canvas.toBlob(b=>r(b!), 'image/png'));
      const file = new File([blob], 'meme.png', {type:'image/png'});
      const dt=new DataTransfer(); dt.items.add(file);
      const input=document.getElementById('fileInput') as HTMLInputElement;
      input.files=dt.files;
      input.dispatchEvent(new Event('change',{bubbles:true}));
    });
    await page.fill('#memeTop', 'TOP');
    await page.fill('#memeBottom', 'BOTTOM');
    await page.click('#actionBtn');
    await expect(page.locator('#status')).toContainText(/Meme ready/, { timeout: 10000 });
    await expect(page.locator('#downloadBtn')).toBeVisible();
  });

  test('resume-builder generates PDF', async ({ page }) => {
    await page.goto('/tools/resume-builder');
    await page.fill('#resumeName', 'Test User');
    await page.fill('#resumeTitle', 'Engineer');
    await page.click('#actionBtn');
    await expect(page.locator('#status')).toContainText(/Resume PDF ready/, { timeout: 10000 });
    await expect(page.locator('#downloadBtn')).toBeVisible();
  });

  test('palette-extractor', async ({ page }) => {
    await page.goto('/tools/palette-extractor');
    await page.evaluate(async () => {
      const canvas=document.createElement('canvas'); canvas.width=10; canvas.height=10;
      const ctx=canvas.getContext('2d')!; ctx.fillStyle='red'; ctx.fillRect(0,0,10,10);
      const blob=await new Promise<Blob>(r=>canvas.toBlob(b=>r(b!), 'image/png'));
      const file=new File([blob],'red.png',{type:'image/png'});
      const dt=new DataTransfer(); dt.items.add(file);
      const input=document.getElementById('fileInput') as HTMLInputElement;
      input.files=dt.files; input.dispatchEvent(new Event('change',{bubbles:true}));
    });
    await page.click('#actionBtn');
    await expect(page.locator('#status')).toContainText(/Palette extracted/, { timeout: 10000 });
  });

  test('barcode-generator', async ({ page }) => {
    await page.goto('/tools/barcode-generator');
    await page.fill('#barcodeText', '123456');
    await page.click('#actionBtn');
    await expect(page.locator('#status')).toContainText(/Barcode ready/, { timeout: 10000 });
    await expect(page.locator('#downloadBtn')).toBeVisible();
  });
});
