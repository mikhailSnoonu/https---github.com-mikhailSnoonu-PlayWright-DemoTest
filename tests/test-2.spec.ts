import { test, expect } from '@playwright/test';

test('test', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  await page.goto('https://snoonu.com/');
  await expect(page.getByRole('button', { name: 'icon Select Address' })).toBeVisible();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('+974 0000').fill('+974 2134 3286');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.locator('input[name="pin"]').click();

  const today = new Date();
  const otp = today.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replaceAll('/', '');
  const pinInput = await page.locator('input[name="pin"]');
  for (const char of otp) {
    await pinInput.press(char);
    await page.waitForTimeout(100);
  }

  await page.waitForTimeout(3000);

  if (await page.locator('[data-test-id="wrong-code"]').isVisible()) {
    await page.locator('#modal-root > div > div > div > div > span.Icon_icon__DoDXU.Modal_back__rc_xF > span > img').click();
    await page.getByRole('button', { name: 'Continue' }).click();
    for (const char of otp) {
      await pinInput.press(char);
      await page.waitForTimeout(100);
    }
  }

  await expect(page.getByText('w', { exact: true })).toBeVisible();
  await expect(page.getByText('Order to this address?')).toBeVisible();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('link', { name: 'Food Food' }).click();
  await page.getByRole('link', { name: 'icon Free delivery Test Cafe' }).click();
  await page.waitForTimeout(1000);
  await expect(page.locator('h1')).toContainText('Test Cafe Brand (Shouldn\'t CHANGE / CLOSE / DELETE)');
  await page.locator('div').filter({ hasText: /^1 QRSimple productAdd2 QRComplex Product1Add1 QRNew Complex Product1Add$/ }).getByRole('button').first().click();
  await page.getByRole('button', { name: 'icon 1 QR' }).click();
  await page.getByText('QRCheckout').click();
  await page.waitForTimeout(5000);
  await page.click('div[data-analytic-label="selectPaymentMethod"]');
  await page.locator('label:has-text("Cash")').click();
  await page.getByRole('button', { name: 'Done' }).click();
  await page.getByRole('button', { name: 'Place order' }).click();
  await page.waitForTimeout(2000);
  await page.waitForSelector('button', { name: 'Cancel Order' });
  const cancelButton = await page.waitForSelector('button', { name: 'Cancel Order' });
  await cancelButton.click();

  await page.waitForSelector('#modalContent button:has-text("Cancel Order")');
  await page.locator('#modalContent button:has-text("Cancel Order")').click();
  await page.waitForSelector('#modal-root button:has-text("OK")');
  await page.locator('#modal-root button:has-text("OK")').click();
  await context.close();
});

test.afterEach(async ({ browser }) => {
  await browser.close();
});