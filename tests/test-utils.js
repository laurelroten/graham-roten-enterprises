// Test utilities and helper functions for Playwright tests

/**
 * Helper function to wait for a page to load completely
 * @param {import('@playwright/test').Page} page 
 */
async function waitForPageLoad(page) {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Helper function to check if an element is visible in the viewport
 * @param {import('@playwright/test').Page} page 
 * @param {string} selector 
 */
async function isElementInViewport(page, selector) {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, selector);
}

/**
 * Helper function to scroll to element and ensure it's visible
 * @param {import('@playwright/test').Page} page 
 * @param {string} selector 
 */
async function scrollToElement(page, selector) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(500); // Allow scroll animation to complete
}

/**
 * Helper function to check for console errors
 * @param {import('@playwright/test').Page} page 
 * @returns {Promise<string[]>} Array of console error messages
 */
async function getConsoleErrors(page) {
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  return errors;
}

/**
 * Helper function to check for broken images
 * @param {import('@playwright/test').Page} page 
 * @returns {Promise<string[]>} Array of broken image sources
 */
async function getBrokenImages(page) {
  return await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    return images
      .filter(img => !img.complete || img.naturalHeight === 0)
      .map(img => img.src);
  });
}

/**
 * Helper function to check accessibility violations
 * @param {import('@playwright/test').Page} page 
 */
async function checkBasicAccessibility(page) {
  // Check for missing alt text on images
  const imagesWithoutAlt = await page.locator('img:not([alt])').count();
  
  // Check for missing form labels
  const inputsWithoutLabels = await page.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
    return inputs.filter(input => {
      if (input.type === 'hidden' || input.type === 'submit' || input.type === 'button') {
        return false;
      }
      const hasLabel = input.labels && input.labels.length > 0;
      const hasAriaLabel = input.getAttribute('aria-label');
      const hasAriaLabelledBy = input.getAttribute('aria-labelledby');
      const hasPlaceholder = input.getAttribute('placeholder');
      
      return !(hasLabel || hasAriaLabel || hasAriaLabelledBy || hasPlaceholder);
    }).length;
  });
  
  return {
    imagesWithoutAlt,
    inputsWithoutLabels
  };
}

/**
 * Helper function to test form validation
 * @param {import('@playwright/test').Page} page 
 * @param {string} formSelector 
 * @param {Object} testData 
 */
async function testFormValidation(page, formSelector, testData) {
  const form = page.locator(formSelector);
  
  // Test empty form submission
  await form.locator('button[type="submit"], input[type="submit"]').click();
  
  // Fill form with test data
  for (const [field, value] of Object.entries(testData)) {
    if (value) {
      await page.fill(`${formSelector} [name="${field}"], ${formSelector} #${field}`, value);
    }
  }
  
  return form;
}

/**
 * Helper function to test responsive design at different breakpoints
 * @param {import('@playwright/test').Page} page 
 * @param {Array} breakpoints 
 */
async function testResponsiveBreakpoints(page, breakpoints = [
  { width: 320, height: 568, name: 'Mobile Small' },
  { width: 375, height: 667, name: 'Mobile Medium' },
  { width: 768, height: 1024, name: 'Tablet' },
  { width: 1024, height: 768, name: 'Laptop' },
  { width: 1440, height: 900, name: 'Desktop' }
]) {
  const results = [];
  
  for (const breakpoint of breakpoints) {
    await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
    await page.waitForTimeout(500); // Allow layout to adjust
    
    // Check if navigation is accessible
    const navVisible = await page.locator('nav').isVisible();
    const menuToggleVisible = await page.locator('.menu-toggle').isVisible();
    
    results.push({
      ...breakpoint,
      navVisible,
      menuToggleVisible,
      hasHorizontalScroll: await page.evaluate(() => document.body.scrollWidth > window.innerWidth)
    });
  }
  
  return results;
}

/**
 * Helper function to mock network requests
 * @param {import('@playwright/test').Page} page 
 * @param {string} url 
 * @param {Object} response 
 */
async function mockNetworkRequest(page, url, response) {
  await page.route(url, route => {
    route.fulfill({
      status: response.status || 200,
      contentType: response.contentType || 'application/json',
      body: response.body || '{}'
    });
  });
}

/**
 * Helper function to simulate slow network conditions
 * @param {import('@playwright/test').Page} page 
 */
async function simulateSlowNetwork(page) {
  const client = await page.context().newCDPSession(page);
  await client.send('Network.emulateNetworkConditions', {
    offline: false,
    downloadThroughput: 1000 * 1024 / 8, // 1 Mbps
    uploadThroughput: 500 * 1024 / 8,    // 500 Kbps
    latency: 100 // 100ms
  });
}

module.exports = {
  waitForPageLoad,
  isElementInViewport,
  scrollToElement,
  getConsoleErrors,
  getBrokenImages,
  checkBasicAccessibility,
  testFormValidation,
  testResponsiveBreakpoints,
  mockNetworkRequest,
  simulateSlowNetwork
};