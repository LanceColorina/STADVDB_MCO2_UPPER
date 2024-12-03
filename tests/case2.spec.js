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
  test('User 2: should display correct game details for ID 50', async ({ page }) => {
    // Navigate to the search page
    await page.goto('https://stadvdb-mco-2-group-4.vercel.app/search');

    // Input the ID "50" into the search bar
    await page.fill('input[type="text"]', '50');

    // Click the search button
    await page.click('button[type="submit"]');

    
    // Wait for the loading indicator to disappear
    await page.waitForSelector('p:has-text("Loading...")', { state: 'detached' });

    // Verify the displayed game details for ID 50
    const gameTitle = await page.textContent('h2');
    expect(gameTitle).toBe('Half-Life: Opposing Force');

    const releaseDate = await page.textContent('p:has-text("Release Date:")');
    expect(releaseDate).toBe('Release Date: 1999-10-31T00:00:00.000Z');

    const price = await page.textContent('p:has-text("Price:")');
    expect(price).toBe('Price: $4.99');

    const positiveReviews = await page.textContent('p:has-text("Positive:")');
    expect(positiveReviews).toBe('Positive: 14333');

    const negativeReviews = await page.textContent('p:has-text("Negative:")');
    expect(negativeReviews).toBe('Negative: 718');


  });
});
