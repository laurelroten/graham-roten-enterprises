const { test, expect } = require('@playwright/test');

test.describe('Homepage Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Graham Roten Enterprises/);
    
    // Check main heading
    await expect(page.locator('h2').first()).toContainText('Construction Services & Materials Delivery');
    
    // Check logo is visible
    await expect(page.locator('.logo img')).toBeVisible();
    
    // Check company name is visible
    await expect(page.locator('.company-name')).toContainText('Graham Roten Enterprises');
  });

  test('should have working navigation menu', async ({ page }) => {
    // Check all main navigation links are present
    await expect(page.locator('nav a[href="index.html#home"]')).toBeVisible();
    await expect(page.locator('nav a[href="index.html#services"]')).toBeVisible();
    await expect(page.locator('nav a[href="index.html#about"]')).toBeVisible();
    await expect(page.locator('nav a[href="index.html#contact"]')).toBeVisible();
    await expect(page.locator('nav a[href="index.html#pay-bill"]')).toBeVisible();
    
    // Check CTA button
    await expect(page.locator('.cta-button')).toContainText('Get Quote');
  });

  test('should display hero section correctly', async ({ page }) => {
    // Check hero content
    await expect(page.locator('.hero-content h2')).toContainText('Construction Services & Materials Delivery');
    await expect(page.locator('.hero-subtitle')).toContainText('Comprehensive site services');
    await expect(page.locator('.hero-quote')).toContainText('Graham Roten Enterprises');
    
    // Check hero buttons
    await expect(page.locator('.btn-primary')).toContainText('Our Services');
    await expect(page.locator('.btn-secondary')).toContainText('Contact Us');
  });

  test('should display statistics section', async ({ page }) => {
    // Check stats are visible
    await expect(page.locator('.stats-section')).toBeVisible();
    await expect(page.locator('.stat-number').first()).toContainText('10+');
    await expect(page.locator('.stat-label').first()).toContainText('Years Experience');
    
    // Check all 4 stats are present
    const statItems = page.locator('.stat-item');
    await expect(statItems).toHaveCount(4);
  });

  test('should display all service cards', async ({ page }) => {
    // Check services section
    await expect(page.locator('#services')).toBeVisible();
    await expect(page.locator('.services-section h2')).toContainText('Our Services');
    
    // Check all service cards are present
    const serviceCards = page.locator('.service-card');
    await expect(serviceCards).toHaveCount(8);
    
    // Check first service card content
    const firstCard = serviceCards.first();
    await expect(firstCard.locator('h3')).toContainText('Heavy Hauling');
    await expect(firstCard.locator('.service-learn-more')).toContainText('Learn More');
  });

  test('should have working service card links', async ({ page }) => {
    // Test clicking on a service card link
    const heavyHaulingLink = page.locator('a[href="heavy-hauling.html"]');
    await expect(heavyHaulingLink).toBeVisible();
    
    // Click and check it navigates (but don't actually navigate in this test)
    await expect(heavyHaulingLink).toHaveAttribute('href', 'heavy-hauling.html');
  });

  test('should display equipment showcase', async ({ page }) => {
    // Check equipment section
    await expect(page.locator('.equipment-section')).toBeVisible();
    await expect(page.locator('.equipment-section h2')).toContainText('Our Fleet & Equipment');
    
    // Check equipment items
    const equipmentItems = page.locator('.equipment-item');
    await expect(equipmentItems).toHaveCount(6);
  });

  test('should display projects section', async ({ page }) => {
    // Check projects section
    await expect(page.locator('.projects-section')).toBeVisible();
    await expect(page.locator('.projects-section h2')).toContainText('Recent Projects');
    
    // Check project items
    const projectItems = page.locator('.project-item');
    await expect(projectItems).toHaveCount(6);
  });

  test('should display about section', async ({ page }) => {
    // Check about section
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('.about-section h2')).toContainText('About Graham Roten Enterprises');
    
    // Check about content
    await expect(page.locator('.lead')).toContainText('decade of experience');
    await expect(page.locator('.about-image img')).toBeVisible();
    
    // Check features list
    const features = page.locator('.feature');
    await expect(features).toHaveCount(3);
  });

  test('should display contact section', async ({ page }) => {
    // Check contact section
    await expect(page.locator('#contact')).toBeVisible();
    await expect(page.locator('.contact-section h2')).toContainText('Get In Touch');
    
    // Check contact info
    await expect(page.locator('.contact-details a[href="mailto:info@grahamroten.com"]')).toBeVisible();
    
    // Check contact form
    await expect(page.locator('.contact-form')).toBeVisible();
    await expect(page.locator('input[placeholder="Your Name"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Your Email"]')).toBeVisible();
    await expect(page.locator('textarea[placeholder="Your Message"]')).toBeVisible();
  });

  test('should display payment section', async ({ page }) => {
    // Check payment section
    await expect(page.locator('#pay-bill')).toBeVisible();
    await expect(page.locator('.payment-section h2')).toContainText('Pay Your Bill');
    
    // Check payment form
    await expect(page.locator('#payment-form')).toBeVisible();
    await expect(page.locator('#invoice-number')).toBeVisible();
    await expect(page.locator('#amount')).toBeVisible();
    await expect(page.locator('#customer-name')).toBeVisible();
    await expect(page.locator('#customer-email')).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    // Check footer
    await expect(page.locator('.footer')).toBeVisible();
    await expect(page.locator('.footer-info h3')).toContainText('Graham Roten Enterprises');
    
    // Check footer links
    await expect(page.locator('.footer-links ul li a[href="index.html#home"]')).toBeVisible();
    await expect(page.locator('.footer-bottom')).toContainText('2025 Graham Roten Enterprises');
  });
});