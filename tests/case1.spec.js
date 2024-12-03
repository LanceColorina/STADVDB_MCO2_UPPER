const { test, expect } = require('@playwright/test');

test.describe.parallel('Search - Simulating Two Users', () => {
  // First user test
  test('User 1: should display correct game details for ID 50', async ({ page }) => {
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
