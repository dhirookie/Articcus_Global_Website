import { test, expect, type Page } from '@playwright/test';

const pages = [
  [
    '/',
    'Replace spreadsheets and manual work with systems built around your business',
  ],
  ['/services', 'Everything you need, from a first website to a full platform'],
  ['/industries', ''],
  ['/how-we-work', ''],
  ['/pricing', ''],
  ['/contact', "Tell us what's slowing you down"],
  ['/about', 'Technology that fits the work your business actually does'],
  ['/solutions', 'See how a practical first project could work'],
  ['/solutions/order-to-invoice', 'From a dealer order to an invoice'],
  [
    '/services/website',
    'Business websites built to turn interest into enquiries',
  ],
  ['/services/webapp', 'Custom business software for the way your team works'],
  ['/services/automation', 'Business automation that reduces repeated work'],
  ['/services/ai', 'AI assistants with a defined job and clear boundaries'],
  ['/guides', 'Make the next technology decision with a clearer picture'],
  [
    '/guides/what-affects-project-cost',
    'What affects a website or software project quote?',
  ],
  ['/privacy', 'How information is used on this website'],
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
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('button', { name: 'Close menu' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(
    page.locator('#drawer a[href="tel:+94775701404"]'),
  ).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Close menu' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('#drawer')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
});

test('short enquiry needs no service selection and sends only its own form data', async ({
  page,
}) => {
  await page.goto('/contact#enquiry');
  await page.locator('#quick-enquiry-form button[type="submit"]').click();
  await expect(page.locator('#q-email')).toHaveAttribute(
    'aria-invalid',
    'true',
  );
  await page.locator('#q-name').fill('Jane Doe');
  await page.locator('#q-email').fill('jane@example.com');
  await page
    .locator('#q-problem')
    .fill('We want to stop entering orders twice.');
  let captured: Record<string, unknown> = {};
  await page.route('**/api/leads', async (route) => {
    captured = route.request().postDataJSON();
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ reference: 'ART-QUICK' }),
    });
  });
  await page.locator('#quick-enquiry-form button[type="submit"]').click();
  await expect(
    page.getByRole('heading', { name: 'Your enquiry has been received' }),
  ).toBeVisible();
  expect(captured).toMatchObject({
    mode: 'enquiry',
    services: [],
    company: '',
    email: 'jane@example.com',
  });
  expect(
    await page.evaluate(() => sessionStorage.getItem('articcus.brief')),
  ).not.toContain('jane@example.com');
});

test('short enquiry retains details and reuses the key after a delivery failure', async ({
  page,
}) => {
  await page.goto('/contact#enquiry');
  await page.locator('#q-name').fill('Jane');
  await page.locator('#q-email').fill('jane@example.com');
  await page
    .locator('#q-problem')
    .fill('Our invoice process needs improvement.');
  const keys: string[] = [];
  await page.route('**/api/leads', async (route) => {
    keys.push(route.request().headers()['x-idempotency-key'] || '');
    await route.fulfill({
      status: keys.length === 1 ? 502 : 201,
      contentType: 'application/json',
      body: JSON.stringify(
        keys.length === 1
          ? { message: 'Please try again.' }
          : { reference: 'ART-RETRY' },
      ),
    });
  });
  await page.locator('#quick-enquiry-form button[type="submit"]').click();
  await expect(
    page.locator('#quick-enquiry-form [role="alert"]'),
  ).toContainText('Please try again');
  await expect(page.locator('#q-name')).toHaveValue('Jane');
  await page.locator('#quick-enquiry-form button[type="submit"]').click();
  await expect(
    page.getByRole('heading', { name: 'Your enquiry has been received' }),
  ).toBeVisible();
  expect(keys).toHaveLength(2);
  expect(keys[0]).toBeTruthy();
  expect(keys[0]).toBe(keys[1]);
});

test('examples are labelled and unknown detail pages return 404', async ({
  page,
}) => {
  await page.goto('/solutions');
  await expect(page.locator('main')).toContainText('not client case studies');
  const response = await page.goto('/services/not-a-service');
  expect(response?.status()).toBe(404);
});
