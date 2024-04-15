import test, { expect } from "@playwright/test";

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
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = String(today.getFullYear()).slice(-2);
  const otp = `${day}${month}${year}`;
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
  await page.waitForTimeout(5000);

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
  await context.close();
  await browser.close();
});
