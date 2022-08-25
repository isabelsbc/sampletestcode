import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Runs before each test and signs in each page.
  await page.goto('https://github.com/login');
  await page.locator('input[name="login"]').fill('EMAIL');
  await page.locator('input[name="password"]').fill('PASSWORD');
  await page.locator('input:has-text("Sign in")').click();
});

test('Test exists results', async ({ page }) => {
  // Click [placeholder="Search or jump to…"]
  await page.locator('[placeholder="Search or jump to…"]').click();
  await page.locator('[placeholder="Search or jump to…"]').fill('testqa');
  await page.locator('[placeholder="Search or jump to…"]').press('Enter');
  await expect(page).toHaveURL('https://github.com/search?q=testqa&type=');

  await expect(page.locator('div.flex-column:nth-child(1) > h3:nth-child(1)')).toContainText("repository results");

});

test('Test visibility auto suggestion dropdown', async ({ page }) => {
  // Click [placeholder="Search or jump to…"]
  await page.locator('[placeholder="Search or jump to…"]').click();
  await page.locator('[placeholder="Search or jump to…"]').fill('123');

  await expect(page.locator('div.Box:nth-child(5)')).not.toHaveClass('d-none');
  //await expect(page.locator('div.Box:nth-child(5)')).toBeVisible();
});

test('Test empty results', async ({ page }) => {
  // Click [placeholder="Search or jump to…"]
  await page.locator('[placeholder="Search or jump to…"]').click();
  await page.locator('[placeholder="Search or jump to…"]').fill('testqatestqatestqa');
  await page.locator('[placeholder="Search or jump to…"]').press('Enter');
  await expect(page).toHaveURL('https://github.com/search?q=testqatestqatestqa&type=');

  await expect(page.locator('.blankslate > h3:nth-child(2)')).toContainText("We couldn’t find any repositories");
});
