const { test, expect } = require('@playwright/test');

test.describe('Forms Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Contact Form', () => {
    test('should display contact form correctly', async ({ page }) => {
      // Scroll to contact section
      await page.locator('#contact').scrollIntoViewIfNeeded();
      
      // Check form is visible
      await expect(page.locator('.contact-form form')).toBeVisible();
      
      // Check all form fields
      await expect(page.locator('input[placeholder="Your Name"]')).toBeVisible();
      await expect(page.locator('input[placeholder="Your Email"]')).toBeVisible();
      await expect(page.locator('input[placeholder="Subject"]')).toBeVisible();
      await expect(page.locator('textarea[placeholder="Your Message"]')).toBeVisible();
      await expect(page.locator('.contact-form button[type="submit"]')).toContainText('Send Message');
    });

    test('should validate required fields', async ({ page }) => {
      // Scroll to contact section
      await page.locator('#contact').scrollIntoViewIfNeeded();
      
      // Try to submit empty form
      await page.click('.contact-form button[type="submit"]');
      
      // Check that HTML5 validation kicks in
      const nameField = page.locator('input[placeholder="Your Name"]');
      await expect(nameField).toHaveAttribute('required');
      
      const emailField = page.locator('input[placeholder="Your Email"]');
      await expect(emailField).toHaveAttribute('required');
      
      const subjectField = page.locator('input[placeholder="Subject"]');
      await expect(subjectField).toHaveAttribute('required');
      
      const messageField = page.locator('textarea[placeholder="Your Message"]');
      await expect(messageField).toHaveAttribute('required');
    });

    test('should fill out contact form successfully', async ({ page }) => {
      // Scroll to contact section
      await page.locator('#contact').scrollIntoViewIfNeeded();
      
      // Fill out the form
      await page.fill('input[placeholder="Your Name"]', 'John Doe');
      await page.fill('input[placeholder="Your Email"]', 'john@example.com');
      await page.fill('input[placeholder="Subject"]', 'Test Inquiry');
      await page.fill('textarea[placeholder="Your Message"]', 'This is a test message for the contact form.');
      
      // Verify form is filled
      await expect(page.locator('input[placeholder="Your Name"]')).toHaveValue('John Doe');
      await expect(page.locator('input[placeholder="Your Email"]')).toHaveValue('john@example.com');
      await expect(page.locator('input[placeholder="Subject"]')).toHaveValue('Test Inquiry');
      await expect(page.locator('textarea[placeholder="Your Message"]')).toHaveValue('This is a test message for the contact form.');
    });

    test('should validate email format', async ({ page }) => {
      // Scroll to contact section
      await page.locator('#contact').scrollIntoViewIfNeeded();
      
      // Fill email with invalid format
      await page.fill('input[placeholder="Your Email"]', 'invalid-email');
      
      // Check that email field has type="email" for validation
      await expect(page.locator('input[placeholder="Your Email"]')).toHaveAttribute('type', 'email');
    });
  });

  test.describe('Payment Form', () => {
    test('should display payment form correctly', async ({ page }) => {
      // Scroll to payment section
      await page.locator('#pay-bill').scrollIntoViewIfNeeded();
      
      // Check payment section is visible
      await expect(page.locator('.payment-section')).toBeVisible();
      await expect(page.locator('.payment-section h2')).toContainText('Pay Your Bill');
      
      // Check payment form fields
      await expect(page.locator('#invoice-number')).toBeVisible();
      await expect(page.locator('#amount')).toBeVisible();
      await expect(page.locator('#customer-name')).toBeVisible();
      await expect(page.locator('#customer-email')).toBeVisible();
      await expect(page.locator('#card-element')).toBeVisible();
      await expect(page.locator('#submit-payment')).toContainText('Pay Now');
    });

    test('should validate payment form fields', async ({ page }) => {
      // Scroll to payment section
      await page.locator('#pay-bill').scrollIntoViewIfNeeded();
      
      // Check required attributes
      await expect(page.locator('#invoice-number')).toHaveAttribute('required');
      await expect(page.locator('#amount')).toHaveAttribute('required');
      await expect(page.locator('#customer-name')).toHaveAttribute('required');
      await expect(page.locator('#customer-email')).toHaveAttribute('required');
      
      // Check input types
      await expect(page.locator('#amount')).toHaveAttribute('type', 'number');
      await expect(page.locator('#customer-email')).toHaveAttribute('type', 'email');
    });

    test('should fill out payment form successfully', async ({ page }) => {
      // Scroll to payment section
      await page.locator('#pay-bill').scrollIntoViewIfNeeded();
      
      // Fill out the payment form
      await page.fill('#invoice-number', 'INV-2025-001');
      await page.fill('#amount', '150.00');
      await page.fill('#customer-name', 'Jane Smith');
      await page.fill('#customer-email', 'jane@example.com');
      
      // Verify form is filled
      await expect(page.locator('#invoice-number')).toHaveValue('INV-2025-001');
      await expect(page.locator('#amount')).toHaveValue('150.00');
      await expect(page.locator('#customer-name')).toHaveValue('Jane Smith');
      await expect(page.locator('#customer-email')).toHaveValue('jane@example.com');
    });

    test('should show payment features', async ({ page }) => {
      // Scroll to payment section
      await page.locator('#pay-bill').scrollIntoViewIfNeeded();
      
      // Check payment features are displayed
      await expect(page.locator('.payment-feature').first()).toBeVisible();
      await expect(page.locator('.payment-feature h4').first()).toContainText('Secure Payment');
      await expect(page.locator('.payment-feature i.fa-shield-alt')).toBeVisible();
      await expect(page.locator('.payment-feature i.fa-clock')).toBeVisible();
      await expect(page.locator('.payment-feature i.fa-credit-card')).toBeVisible();
    });

    test('should handle payment form submission', async ({ page }) => {
      // Mock the alert to capture it
      let alertMessage = '';
      page.on('dialog', async dialog => {
        alertMessage = dialog.message();
        await dialog.accept();
      });
      
      // Scroll to payment section
      await page.locator('#pay-bill').scrollIntoViewIfNeeded();
      
      // Fill out the payment form
      await page.fill('#invoice-number', 'INV-2025-001');
      await page.fill('#amount', '150.00');
      await page.fill('#customer-name', 'Jane Smith');
      await page.fill('#customer-email', 'jane@example.com');
      
      // Submit the form
      await page.click('#submit-payment');
      
      // Wait for the simulated processing time
      await page.waitForTimeout(2500);
      
      // Check that the alert was shown (this is the demo behavior)
      expect(alertMessage).toContain('Payment simulation');
      expect(alertMessage).toContain('$150.00');
      expect(alertMessage).toContain('INV-2025-001');
    });
  });

  test.describe('Form Accessibility', () => {
    test('should have proper form labels and accessibility', async ({ page }) => {
      // Check contact form accessibility
      await page.locator('#contact').scrollIntoViewIfNeeded();
      
      // Contact form should have proper structure
      await expect(page.locator('.contact-form')).toBeVisible();
      
      // Check payment form accessibility
      await page.locator('#pay-bill').scrollIntoViewIfNeeded();
      
      // Payment form should have proper labels
      await expect(page.locator('label[for="invoice-number"]')).toContainText('Invoice Number');
      await expect(page.locator('label[for="amount"]')).toContainText('Amount');
      await expect(page.locator('label[for="customer-name"]')).toContainText('Customer Name');
      await expect(page.locator('label[for="customer-email"]')).toContainText('Email Address');
    });

    test('should support keyboard navigation', async ({ page }) => {
      // Test tab navigation through contact form
      await page.locator('#contact').scrollIntoViewIfNeeded();
      
      // Start at first form field
      await page.locator('input[placeholder="Your Name"]').focus();
      
      // Tab through fields
      await page.keyboard.press('Tab');
      await expect(page.locator('input[placeholder="Your Email"]')).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.locator('input[placeholder="Subject"]')).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.locator('textarea[placeholder="Your Message"]')).toBeFocused();
    });
  });
});