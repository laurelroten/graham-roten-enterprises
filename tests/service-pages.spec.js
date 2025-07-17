const { test, expect } = require('@playwright/test');

const servicePages = [
  { url: 'heavy-hauling.html', title: 'Heavy Hauling Services', heading: 'Heavy Hauling Services' },
  { url: 'gravel-stone.html', title: 'Gravel & Stone Delivery', heading: 'Gravel & Stone Delivery' },
  { url: 'site-preparation.html', title: 'Site Preparation Services', heading: 'Site Preparation Services' },
  { url: 'residential.html', title: 'Residential Services', heading: 'Residential Services' },
  { url: 'equipment-transport.html', title: 'Equipment Transport Services', heading: 'Equipment Transport' },
  { url: 'septic.html', title: 'Septic Services', heading: 'Septic Services' },
  { url: 'welding.html', title: 'Welding & Fabrication Services', heading: 'Welding & Fabrication' },
  { url: 'equipment-services.html', title: 'Equipment Services', heading: 'Equipment Services' }
];

test.describe('Service Pages Tests', () => {
  servicePages.forEach(({ url, title, heading }) => {
    test.describe(`${heading} Page`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/${url}`);
      });

      test('should load page successfully', async ({ page }) => {
        // Check page title
        await expect(page).toHaveTitle(new RegExp(title));
        
        // Check main heading in hero section
        await expect(page.locator('.service-hero h1')).toContainText(heading);
        
        // Check page loads without errors
        await expect(page.locator('body')).toBeVisible();
      });

      test('should have proper navigation', async ({ page }) => {
        // Check logo and company name
        await expect(page.locator('.logo img')).toBeVisible();
        await expect(page.locator('.company-name')).toContainText('Graham Roten Enterprises');
        
        // Check navigation links back to main site
        await expect(page.locator('nav a[href="index.html"]')).toContainText('Home');
        await expect(page.locator('nav a[href="index.html#services"]')).toContainText('Services');
        await expect(page.locator('nav a[href="index.html#about"]')).toContainText('About');
        await expect(page.locator('nav a[href="index.html#contact"]:not(.cta-button)')).toContainText('Contact');
        
        // Check CTA button
        await expect(page.locator('.cta-button')).toContainText('Get Quote');
      });

      test('should display hero section correctly', async ({ page }) => {
        // Check hero section elements
        await expect(page.locator('.service-hero')).toBeVisible();
        await expect(page.locator('.service-icon-large')).toBeVisible();
        await expect(page.locator('.service-hero h1')).toContainText(heading);
        await expect(page.locator('.service-hero p')).toBeVisible();
        
        // Check icon is visible
        await expect(page.locator('.service-icon-large i')).toBeVisible();
      });

      test('should display service details section', async ({ page }) => {
        // Check service details section
        await expect(page.locator('.service-details')).toBeVisible();
        await expect(page.locator('.service-content')).toBeVisible();
        
        // Check main content
        await expect(page.locator('.service-main h2')).toContainText('Service Overview');
        await expect(page.locator('.service-main p').first()).toBeVisible();
        
        // Check features list
        await expect(page.locator('.service-features')).toBeVisible();
        const features = page.locator('.service-features li');
        await expect(features.first()).toBeVisible();
        
        // Check service areas section
        await expect(page.locator('.service-main h3')).toContainText('Service Areas');
      });

      test('should display sidebar with testimonial', async ({ page }) => {
        // Check sidebar
        await expect(page.locator('.service-sidebar')).toBeVisible();
        
        // Check customer testimonial
        await expect(page.locator('.customer-testimonial')).toBeVisible();
        await expect(page.locator('.customer-testimonial h4')).toContainText('Customer Review');
        await expect(page.locator('.customer-testimonial blockquote')).toBeVisible();
        await expect(page.locator('.customer-testimonial cite')).toBeVisible();
        
        // Check service stats
        await expect(page.locator('.service-stats')).toBeVisible();
        const stats = page.locator('.service-stats .stat');
        await expect(stats).toHaveCount(2);
        await expect(stats.first().locator('.stat-number')).toContainText('24/7');
        await expect(stats.last().locator('.stat-number')).toContainText('100%');
        
        // Check CTA
        await expect(page.locator('.service-cta .btn')).toContainText('Get Quote');
        await expect(page.locator('.service-cta .btn')).toHaveAttribute('href', 'index.html#contact');
      });

      test('should display service gallery', async ({ page }) => {
        // Check gallery section
        await expect(page.locator('.service-gallery')).toBeVisible();
        await expect(page.locator('.service-gallery h2')).toBeVisible();
        
        // Check gallery grid
        await expect(page.locator('.gallery-grid')).toBeVisible();
        const galleryImages = page.locator('.gallery-grid img');
        await expect(galleryImages.first()).toBeVisible();
        
        // Check that images have proper alt text
        await expect(galleryImages.first()).toHaveAttribute('alt');
      });

      test('should display footer', async ({ page }) => {
        // Check footer
        await expect(page.locator('.footer')).toBeVisible();
        await expect(page.locator('.footer-info h3')).toContainText('Graham Roten Enterprises');
        
        // Check footer links
        await expect(page.locator('.footer-links ul li a[href="index.html"]')).toContainText('Home');
        await expect(page.locator('.footer-bottom')).toContainText('2025 Graham Roten Enterprises');
      });

      test('should be responsive on mobile', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        
        // Check that page still loads and is readable
        await expect(page.locator('.service-hero h1')).toBeVisible();
        await expect(page.locator('.service-details')).toBeVisible();
        await expect(page.locator('.service-gallery')).toBeVisible();
        
        // Check mobile navigation
        await expect(page.locator('.menu-toggle')).toBeVisible();
      });
    });
  });

  test('should navigate between service pages', async ({ page }) => {
    // Start on homepage
    await page.goto('/');
    
    // Click on Heavy Hauling service
    await page.click('a[href="heavy-hauling.html"]');
    
    // Check we're on the Heavy Hauling page
    await expect(page).toHaveURL(/heavy-hauling\.html/);
    await expect(page.locator('.service-hero h1')).toContainText('Heavy Hauling Services');
    
    // Navigate back to home
    await page.click('nav a[href="index.html"]');
    
    // Check we're back on homepage
    await expect(page.locator('.hero-content h2')).toContainText('Construction Services & Materials Delivery');
  });
});