import { test, expect, type Page } from '@playwright/test';

const pages = [
  [
    '/',
    'The technology partner for businesses that have outgrown manual operations',
  ],
  ['/services', 'Everything you need, from a first website to a full platform'],
  ['/industries', ''],
  ['/how-we-work', ''],
  ['/pricing', ''],
  ['/contact', "Tell us what's slowing you down"],
] as const;

for (const [path, heading] of pages) {
  test(`renders ${path} without hydration errors or horizontal overflow`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('main h1')).toBeVisible();
    if (heading) await expect(page.locator('main h1')).toHaveText(heading);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /.+/,
    );
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await page.waitForTimeout(200);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('showcase and persona tabs support keyboard activation', async ({
  page,
}) => {
  await page.goto('/');
  const showcase = page.getByRole('tab', { name: 'Websites', exact: true });
  await showcase.focus();
  await page.keyboard.press('ArrowRight');
  await expect(
    page.getByRole('tab', { name: 'Web apps and portals' }),
  ).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('.v-portal')).toHaveClass(/on/);
  await page.getByRole('tab', { name: 'Finance teams' }).click();
  await expect(
    page.getByText('Close the month faster, with numbers that match'),
  ).toBeVisible();
});

test('service deep links and shared brief survive navigation and reload', async ({
  page,
}) => {
  await page.goto('/services#ai');
  await expect(page.locator('#svc-detail h3')).toHaveText('AI solutions');
  await page.locator('#svc-detail .btn-add').click();
  await expect(page.locator('#pill-count')).toHaveText('1');
  await page.locator('#brief-pill').click();
  await expect(page.locator('#ck-ai')).toBeChecked();
  await page.reload();
  await expect(page.locator('#ck-ai')).toBeChecked();
  await expect(page.locator('#brief-services')).toContainText('AI solutions');
});

test('industry brief selects recommended services and industry', async ({
  page,
}) => {
  await page.goto('/industries');
  await page.locator('#retail .ibtn').click();
  await expect(page).toHaveURL(/\/contact#start$/);
  await expect(page.locator('#f-industry')).toHaveValue('retail');
  for (const id of ['erp', 'mobile', 'ecom'])
    await expect(page.locator(`#ck-${id}`)).toBeChecked();
});

test('process steps support next and previous controls', async ({ page }) => {
  await page.goto('/how-we-work');
  await page.getByRole('button', { name: 'Next: Scope and estimate' }).click();
  await expect(page.locator('#sp-1')).toBeVisible();
  await expect(page.locator('#st-1')).toHaveAttribute('aria-selected', 'true');
  await page
    .locator('#sp-1')
    .getByRole('button', { name: 'Back', exact: true })
    .click();
  await expect(page.locator('#sp-0')).toBeVisible();
});

async function fillLead(page: Page) {
  await page.locator('#ck-website').check();
  await page.locator('#f-name').fill('Jane Doe');
  await page.locator('#f-company').fill('Example Ltd');
  await page.locator('#f-email').fill('jane@example.com');
}

test('form validates required fields and accepts a server receipt', async ({
  page,
}) => {
  await page.goto('/contact');
  await page.locator('#f-submit').click();
  await expect(page.locator('#svc-error')).toContainText(
    'Choose at least one service',
  );
  await expect(page.locator('#f-email')).toHaveAttribute(
    'aria-invalid',
    'true',
  );
  await fillLead(page);
  await page.route('**/api/leads', (route) =>
    route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ reference: 'ART-TEST' }),
    }),
  );
  await page.locator('#f-submit').click();
  await expect(page.locator('#done-title')).toHaveText(
    'Thanks, Jane. Your brief is in.',
  );
  await expect(page.locator('#done-ref')).toHaveText('ART-TEST');
  await page.locator('#new-brief').click();
  await expect(page.locator('#f-name')).toHaveValue('');
  await expect(page.locator('#ck-website')).not.toBeChecked();
});

test('delivery errors retain the form and entered details', async ({
  page,
}) => {
  await page.goto('/contact');
  await fillLead(page);
  await page.route('**/api/leads', (route) =>
    route.fulfill({
      status: 503,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Online enquiries are temporarily unavailable.',
      }),
    }),
  );
  await page.locator('#f-submit').click();
  await expect(page.locator('#brief-form [role="alert"]')).toContainText(
    'temporarily unavailable',
  );
  await expect(page.locator('#f-name')).toHaveValue('Jane Doe');
  await expect(page.locator('#f-submit')).toBeEnabled();
});

test('legacy HTML links redirect to the new routes', async ({ page }) => {
  await page.goto('/services.html#mobile');
  await expect(page).toHaveURL(/\/services#mobile$/);
  await expect(page.locator('#svc-detail h3')).toHaveText(
    'Mobile app (Android and iOS)',
  );
});

test('mobile menu traps focus and closes with Escape', async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, 'Mobile-specific drawer');
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.locator('#drawer')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#drawer')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
});
