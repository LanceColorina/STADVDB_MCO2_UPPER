const { test, expect } = require('@playwright/test');

test.describe.parallel('Search/edit - Simulating Two Users', () => {
  // First user test
  test('User 1: should successfully edit game details', async ({ page }) => {
      // Navigate to the Edit Game page
      await page.goto('https://stadvdb-mco-2-group-4.vercel.app/edit');

      // Fill out the form with game details
      await page.fill('#id', '50');
      await page.fill('#name', 'Half-Life: Opposing Force');
      await page.fill('#date', '1999-10-31');
      await page.fill('#price', '4.99');
      await page.fill('#image', 'https://example.com/halflife.jpg');
      await page.fill('#positive', '14333');
      await page.fill('#negative', '718');

      // Submit the form
      await page.click('button[type="submit"]');

      // Wait for the success or error message
      const successMessage = await page.waitForSelector('text=Data edited successfully');
      expect(await successMessage.textContent()).toBe('Data edited successfully');
  });


  // Second user test
  test('User 2: should successfully edit game details', async ({ page }) => {
    // Navigate to the Edit Game page
    await page.goto('https://stadvdb-mco-2-group-4.vercel.app/edit');

    // Fill out the form with game details
    await page.fill('#id', '50');
    await page.fill('#name', 'Half-Life: Opposing Force');
    await page.fill('#date', '1999-10-31');
    await page.fill('#price', '4.99');
    await page.fill('#image', 'https://example.com/halflife.jpg');
    await page.fill('#positive', '14333');
    await page.fill('#negative', '718');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for the success or error message
    const successMessage = await page.waitForSelector('text=Data edited successfully');
    expect(await successMessage.textContent()).toBe('Data edited successfully');
});
});
