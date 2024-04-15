import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=snoonu&oq=snoonu&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDM1MDhqMGoyqAIAsAIB&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'Snoonu Qatar: Fastest Food' }).click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('+974 0000').fill('+974 2134 3286');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.locator('input[name="pin"]').fill('150424•');
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('link', { name: 'Food Food' }).click();
  await page.getByRole('link', { name: 'icon Free delivery Test Cafe' }).click();
  await page.locator('div').filter({ hasText: /^1 QRSimple productAdd2 QRComplex Product1Add1 QRNew Complex Product1Add$/ }).getByRole('button').first().click();
  await page.getByRole('button', { name: 'icon 1 QR' }).click();
  await page.getByText('QRCheckout').click();
  await page.locator('div').filter({ hasText: /^Choose method$/ }).click();
  await page.getByText('Cash').click();
  await page.getByRole('button', { name: 'Done' }).click();
  await page.getByRole('button', { name: 'Place order' }).click();
  await page.goto('https://snoonu.com/checkout/status?order=25027579');
  await expect(page.getByRole('heading', { name: 'Your order has been placed' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cancel Order' })).toBeVisible();
  await page.getByRole('button', { name: 'Cancel Order' }).click();
  await expect(page.locator('#modalContent')).toContainText('Are you sure you want to cancel your order?');
  await expect(page.getByRole('heading', { name: 'Are you sure you want to' })).toBeVisible();
  await page.locator('#modalContent').getByRole('button', { name: 'Cancel Order' }).click();
  await expect(page.getByRole('button', { name: 'Done' })).toBeVisible();
  await page.getByRole('button', { name: 'Done' }).click();
  await expect(page.getByRole('heading', { name: 'Thank you for your feedback!' })).toBeVisible();
  await page.locator('#modal-root').getByRole('button', { name: 'OK' }).click();
});