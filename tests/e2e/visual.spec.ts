import { test, expect } from '@playwright/test';

for (const [route, filename] of [
  ['/', 'home.png'],
  ['/about', 'about.png'],
  ['/services/website', 'website-service.png'],
] as const) {
  test(`visual baseline for ${route}`, async ({ page }) => {
    test.skip(
      process.platform !== 'win32',
      'Windows baselines are checked in the Windows visual CI job; Linux runs functional, layout and accessibility checks.',
    );
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(filename, {
      animations: 'disabled',
      maxDiffPixelRatio: 0.02,
    });
  });
}
