import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const route of [
  '/',
  '/contact',
  '/services/website',
  '/about',
  '/privacy',
]) {
  test(`accessible visible content on ${route}`, async ({ page }) => {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      result.violations.map((violation) => ({
        id: violation.id,
        nodes: violation.nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  });
}
