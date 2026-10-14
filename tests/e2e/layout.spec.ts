import { test, expect } from '@playwright/test';
import { SERVICE_DETAILS } from '../../src/data/service-details';
import { SOLUTION_EXAMPLES } from '../../src/data/solution-examples';
import { GUIDES } from '../../src/data/guides';

const routes = [
  '/',
  '/services',
  '/industries',
  '/how-we-work',
  '/pricing',
  '/contact',
  '/about',
  '/solutions',
  '/guides',
  '/privacy',
  ...SERVICE_DETAILS.map(({ id }) => `/services/${id}`),
  ...SOLUTION_EXAMPLES.map(({ slug }) => `/solutions/${slug}`),
  ...GUIDES.map(({ slug }) => `/guides/${slug}`),
];

for (const width of [320, 390, 768, 1024, 1180, 1280, 1440, 1920]) {
  test(`all pages align and keep controls visible at ${width}px`, async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== 'desktop',
      'This test explicitly covers phone, tablet and desktop widths.',
    );
    test.setTimeout(120000);
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const issues = await page.evaluate(() => {
        const failures: string[] = [];
        const viewport = innerWidth;
        const label = (element: Element) =>
          element.id || `${element.tagName.toLowerCase()}.${element.className}`;
        for (const element of document.querySelectorAll<HTMLElement>(
          'header a, header button, main a, main button, main input, main select, main textarea, footer a',
        )) {
          if (
            !element.getClientRects().length ||
            element.closest(
              '[hidden], [aria-hidden="true"], .car, .steps, .svc-list',
            )
          )
            continue;
          const bounds = element.getBoundingClientRect();
          if (
            bounds.width > 0 &&
            (bounds.left < -1 || bounds.right > viewport + 1)
          )
            failures.push(`${label(element)} extends outside the viewport`);
        }
        for (const grid of document.querySelectorAll<HTMLElement>(
          '.reading-layout, .enquiry-grid, .start-grid',
        )) {
          const children = Array.from(grid.children).map((child) =>
            child.getBoundingClientRect(),
          );
          const first = children[0],
            second = children[1];
          if (
            first &&
            second &&
            second.left > first.left + 10 &&
            Math.abs(first.top - second.top) > 1
          )
            failures.push(`${label(grid)} columns do not align at the top`);
        }
        const header = document
          .querySelector('.h-inner')
          ?.getBoundingClientRect();
        const navigation = document.querySelector<HTMLElement>('.nav');
        if (header && navigation && navigation.getClientRects().length) {
          const bounds = navigation.getBoundingClientRect();
          if (
            Math.abs(
              (bounds.left + bounds.right) / 2 -
                (header.left + header.right) / 2,
            ) > 1
          )
            failures.push('Desktop navigation is not centred');
        }
        if (document.documentElement.scrollWidth > viewport + 1)
          failures.push('The page scrolls horizontally');
        return failures;
      });
      expect(issues, `${route} at ${width}px`).toEqual([]);
    }
  });
}

test('tablet menu remains visible and sits below the header', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1100, height: 900 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.locator('#drawer')).toBeVisible();
  const bounds = await page.evaluate(() => ({
    header: document.querySelector('#site-header')!.getBoundingClientRect()
      .bottom,
    drawer: document.querySelector('#drawer')!.getBoundingClientRect().top,
  }));
  expect(bounds.drawer).toBeCloseTo(bounds.header, 0);
});
