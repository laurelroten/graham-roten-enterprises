# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for **Graham Roten Enterprises**, a construction and trucking services company located in Boone, NC. The site is designed for deployment to GitHub Pages and uses plain HTML, CSS, and minimal JavaScript.

## Development Commands

### Local Development
```bash
# Start local server (Python method)
npm run serve

# Alternative Node.js server
npm run serve:node

# Or manually with Python
python -m http.server 8080

# Or with Node.js serve package
npx serve -s . -l 8080
```

### Testing
```bash
# Run all Playwright tests
npm test

# Run tests with browser UI visible
npm run test:headed

# Run tests with Playwright UI
npm run test:ui

# Debug tests
npm run test:debug

# Show test report
npm run test:report
```

## Architecture & Structure

### Core Files
- **index.html** - Main homepage with all primary content sections
- **style.css** - All styles using CSS custom properties for theming
- **script.js** - JavaScript for navigation, forms, and Stripe payment integration
- **Service Pages** - Individual HTML pages for each service (heavy-hauling.html, gravel-stone.html, etc.)

### Site Structure
The website follows a single-page application pattern with the main page containing:
- Hero section with company branding
- Statistics showcase (years experience, loads delivered, etc.)
- Services grid (8 different services)
- Equipment showcase with image galleries
- Projects gallery showing recent work
- About section with company information
- Payment section with Stripe integration (demo mode)
- Contact form and information
- Footer

### Service Pages
Each service has a dedicated page following consistent structure:
- Service-specific hero section
- Detailed service information
- Feature lists
- Customer testimonials
- Service statistics
- Call-to-action sections
- Image galleries

### Styling Architecture
- Uses CSS custom properties (variables) for consistent theming
- Responsive design with mobile-first approach
- Grid and flexbox layouts throughout
- Hover effects and transitions for interactive elements
- Consistent color scheme: primary (#1a1a1a), highlight (#ff6b35), text (#333)

### JavaScript Features
- Mobile navigation toggle
- Smooth scrolling for anchor links
- Stripe payment form integration (currently in demo mode)
- Form validation and submission handling
- Dynamic navbar styling on scroll

## Testing Structure

Tests are organized in `/tests/` directory using Playwright:
- **homepage.spec.js** - Tests for main page functionality, navigation, sections
- **service-pages.spec.js** - Tests for individual service pages
- **forms.spec.js** - Tests for contact and payment forms
- **test-utils.js** - Shared testing utilities

Test configuration in `playwright.config.js` includes:
- Multi-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile device testing (Chrome Mobile, Safari Mobile)
- Automatic local server startup
- Screenshot and video capture on failures
- CI-specific configurations

## Development Guidelines

### File Organization
- All images stored in `/images/` directory
- Service pages follow naming convention: `{service-name}.html`
- Single CSS file for all styles to minimize HTTP requests
- Single JavaScript file for all interactive functionality

### Content Management
- Contact email: info@grahamroten.com
- Company location: Boone, North Carolina
- All service content is statically defined in HTML
- Image assets are referenced relatively from `/images/` folder

### Payment Integration
- Stripe integration is currently in demo mode
- Uses test publishable key in script.js (line 7)
- Payment form simulates processing without actual transactions
- Real integration requires backend API for payment intent creation

### Responsive Design
- Mobile breakpoints: 768px and 480px
- Navigation collapses to hamburger menu on mobile
- Grid layouts adjust for different screen sizes
- Images and text scale appropriately

## Deployment

- Automatic deployment via GitHub Actions to GitHub Pages
- Deploys from `main` branch
- No build process required - static files served directly
- Any push to main triggers deployment

## Important Notes

- Stripe integration requires actual keys for production use
- All forms currently use JavaScript alerts for demo purposes
- No backend API currently exists for form submissions
- Images are optimized for web but could benefit from WebP conversion
- Consider adding meta tags for SEO optimization in future updates