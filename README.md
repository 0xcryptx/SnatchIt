# SnatchIt - Affiliate Marketing Website

A beautiful, modern, and user-friendly affiliate marketing website built with HTML, CSS, and JavaScript. Perfect for showcasing affiliate products with advanced filtering and categorization features.

## Features

### 🎨 **Modern Design**
- Clean, aesthetic design with gradient backgrounds
- Responsive layout that works on all devices
- Smooth animations and hover effects
- Professional typography using Inter font

### 🛍️ **Product Management**
- Dynamic product grid with sample products
- Advanced filtering by category and price range
- Sorting options (featured, price, name)
- Search functionality for products
- Product cards with hover effects

### 📱 **User Experience**
- Mobile-responsive navigation with hamburger menu
- Smooth scrolling between sections
- Interactive contact form
- Loading animations and transitions
- No products found state

### 🔧 **Technical Features**
- Pure HTML, CSS, and JavaScript (no frameworks)
- Fast loading and optimized performance
- SEO-friendly structure
- Cross-browser compatible

## File Structure

```
SnatchIt/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Getting Started

1. **Open the website**: Simply open `index.html` in your web browser
2. **Customize content**: Edit the HTML file to change text, links, and structure
3. **Modify styling**: Update `styles.css` to change colors, fonts, and layout
4. **Add products**: Edit the products array in `script.js`

## Customization Guide

### Adding Your Logo

Replace the logo placeholder in `index.html`:

```html
<!-- Current placeholder -->
<div class="logo-placeholder">
    <i class="fas fa-shopping-bag"></i>
</div>

<!-- Replace with your logo -->
<div class="nav-logo">
    <img src="path/to/your/logo.png" alt="SnatchIt Logo" style="height: 40px;">
    <h1>SnatchIt</h1>
</div>
```

### Adding Products

Edit the `products` array in `script.js`:

```javascript
const products = [
    {
        id: 1,
        name: "Your Product Name",
        description: "Product description here",
        price: 99.99,
        category: "electronics", // Must match filter options
        image: "fas fa-headphones", // FontAwesome icon class
        affiliateLink: "https://your-affiliate-link.com"
    },
    // Add more products...
];
```

### Available Categories

The website supports these categories:
- `electronics`
- `fashion`
- `home`
- `health`
- `sports`
- `books`

### Changing Colors

Update the CSS variables in `styles.css`:

```css
/* Primary gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Secondary colors */
color: #667eea;
```

### Adding Real Affiliate Links

In `script.js`, update the `handleProductClick` function:

```javascript
function handleProductClick(affiliateLink) {
    // Uncomment this line and remove the alert
    window.open(affiliateLink, '_blank');
    // Remove this line
    // alert('This would redirect to the affiliate product page!');
}
```

## Sections Overview

### 1. Navigation
- Fixed header with logo and menu
- Mobile-responsive hamburger menu
- Smooth scroll navigation

### 2. Hero Section
- Eye-catching gradient background
- Call-to-action button
- Animated icons

### 3. Products Section
- Filter controls (category, price, sort)
- Search functionality
- Responsive product grid
- Product cards with hover effects

### 4. About Section
- Company information
- Statistics display
- Gradient stat cards

### 5. Contact Section
- Contact information
- Contact form with validation
- Social media links

### 6. Footer
- Quick links
- Category shortcuts
- Social media icons
- Copyright information

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance Tips

1. **Optimize images**: Use compressed images for product photos
2. **Minimize HTTP requests**: Combine CSS/JS files if needed
3. **Use CDN**: FontAwesome and Google Fonts are loaded from CDN
4. **Lazy loading**: Consider implementing lazy loading for large product catalogs

## SEO Optimization

The website includes:
- Semantic HTML structure
- Meta tags (add more in `<head>` section)
- Alt text for images
- Proper heading hierarchy
- Clean URLs with anchor links

## Future Enhancements

Consider adding:
- Product reviews and ratings
- Wishlist functionality
- Product comparison
- Newsletter signup
- Analytics integration
- Backend integration for dynamic products
- Payment processing (if needed)

## Support

For customization help or questions:
1. Check the code comments for guidance
2. Modify the sample data in `script.js`
3. Update colors and fonts in `styles.css`
4. Add your affiliate links to the product data

## License

This project is open source and available under the MIT License.

---

**Note**: This is a frontend-only implementation. For production use, consider adding:
- Backend server for dynamic content
- Database for product management
- User authentication
- Analytics tracking
- Security measures
