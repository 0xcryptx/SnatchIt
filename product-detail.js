// Real product data from products folder - same as in script.js
const products = [
    {
        id: 1,
        name: "UGREEN 6-in-1 Hub",
        description: "6 In 1 USB C Hub Type C to HDMI Adapter 4k@60Hz PD 100W Fast Charging 2USB C 3.2 10Gbps + 2USB A 3.0 Ports Compatible With Phone 16 Pro Max Macbook Air Pro iPad Pro Lenovo Thinkpad NS SLR Galaxy | Black",
        price: null, // Price not specified in info
        category: "electronics",
        brand: "UGREEN",
        image: "products/Ugreen 6-in1 Adapter/1.avif",
        images: [
            "products/Ugreen 6-in1 Adapter/1.avif",
            "products/Ugreen 6-in1 Adapter/2.avif",
            "products/Ugreen 6-in1 Adapter/3.avif",
            "products/Ugreen 6-in1 Adapter/4.avif",
            "products/Ugreen 6-in1 Adapter/5.avif",
            "products/Ugreen 6-in1 Adapter/6.avif",
            "products/Ugreen 6-in1 Adapter/7.avif"
        ],
        affiliateLink: "https://s.noon.com/PjnEqW9HKmc",
        availability: "In Stock",
        features: [
            "【6 In 1】: PD 100W USB C Port+ 4k@60Hz HDMI Port+ 2USB C 3.2 10Gbps Ports + 2 USB A 3.0 5Gpbs Ports",
            "【Upgraded USB Ports】: The Type C hub is equipped with 2USB C 3.2 and 2 USB A 3.0 ports. Not only for traditional USB A port devices but also for USB C devices max up to 10Gpbs speed. Whatever you want to connect, this one is enough",
            "【100W USB-C PD Adapter】: This Macbook USB C Hub with upgraded smart chip, USB C charging port can deliver up to 100W of power. Ideal for MacBook Pro/Air or other USB Type C devices, no worry again about your device running out of power",
            "【4K@60Hz High-Resolution HDMI Adapter】: Connect with the Type C to HDMI port and you can project UHD 4K@60Hz or Full HD 4K@30Hz video content on HDTV, Monitor, or projectors. Bring an immersive 3D resolution experience",
            "【Heat dissipation fast】: With our advanced technology and aluminum shell design, the USB type C adapter features double heat dissipation and stable connections to keep your devices safe and your data secure"
        ],
        color: "Black"
    },
    {
        id: 2,
        name: "Switch 2 Standalone (International Version)",
        description: "Discover Nintendo Switch 2 — vivid 7.9\" 1080p display, up to 120 fps, magnetic Joy‑Con 2 (can act as a mouse in supported games), 4K docked output, 256GB storage (expandable), and full compatibility with your existing Switch library. Connect with friends using GameChat for built‑in voice, screen share, and video chat.",
        price: null,
        category: "electronics",
        brand: "Nintendo",
        image: "products/Nintendo Switch 2 Standalone (International Version)/1.png",
        images: [
            "products/Nintendo Switch 2 Standalone (International Version)/1.png",
            "products/Nintendo Switch 2 Standalone (International Version)/2.png",
            "products/Nintendo Switch 2 Standalone (International Version)/3.png",
            "products/Nintendo Switch 2 Standalone (International Version)/4.png",
            "products/Nintendo Switch 2 Standalone (International Version)/5.png",
            "products/Nintendo Switch 2 Standalone (International Version)/6.png",
            "products/Nintendo Switch 2 Standalone (International Version)/7.png"
        ],
        affiliateLink: "https://s.noon.com/PhnHkwWScuA",
        availability: "In Stock",
        features: [
            "The next evolution of Nintendo Switch",
            "One system, three play modes: TV, Tabletop, and Handheld",
            "7.9\" LCD touch screen with HDR and up to 120 fps",
            "256GB internal storage, expandable with microSD Express",
            "GameChat for voice, screen share, and video chat"
        ],
        color: "Black"
    }
];

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProductDetails();
    setupMobileNavigation();
    setupSmoothScrolling();
});

// Image Gallery Variables
let currentImageIndex = 0;
let productImages = [];

// Initialize Image Gallery
function initializeImageGallery(product) {
    productImages = product.images || [product.image];
    currentImageIndex = 0;
    
    const mainImage = document.getElementById('main-product-image');
    const currentImageSpan = document.getElementById('current-image');
    const totalImagesSpan = document.getElementById('total-images');
    const thumbnailsContainer = document.getElementById('thumbnails-container');
    
    if (mainImage) {
        mainImage.src = productImages[0];
        mainImage.alt = product.name;
    }
    
    if (currentImageSpan) currentImageSpan.textContent = '1';
    if (totalImagesSpan) totalImagesSpan.textContent = productImages.length.toString();
    
    // Generate thumbnails
    if (thumbnailsContainer) {
        thumbnailsContainer.innerHTML = productImages.map((image, index) => `
            <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="showImage(${index})">
                <img src="${image}" alt="${product.name} - Image ${index + 1}">
            </div>
        `).join('');
    }
    
    // Add touch/swipe support
    addSwipeSupport();
}

// Show specific image
function showImage(index) {
    if (index < 0 || index >= productImages.length) return;
    
    currentImageIndex = index;
    const mainImage = document.getElementById('main-product-image');
    const currentImageSpan = document.getElementById('current-image');
    
    if (mainImage) {
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.src = productImages[index];
            mainImage.style.opacity = '1';
        }, 150);
    }
    
    if (currentImageSpan) {
        currentImageSpan.textContent = (index + 1).toString();
    }
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Previous image
function previousImage() {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : productImages.length - 1;
    showImage(newIndex);
}

// Next image
function nextImage() {
    const newIndex = currentImageIndex < productImages.length - 1 ? currentImageIndex + 1 : 0;
    showImage(newIndex);
}

// Add swipe support for touch devices
function addSwipeSupport() {
    const mainImageContainer = document.querySelector('.main-image-container');
    if (!mainImageContainer) return;
    
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    mainImageContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    mainImageContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const minSwipeDistance = 50;
        
        // Check if horizontal swipe is more significant than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right - previous image
                previousImage();
            } else {
                // Swipe left - next image
                nextImage();
            }
        }
    }
    
    // Add keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            previousImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });
}

// Go back function
function goBack() {
    // Disable smooth scrolling temporarily for instant back navigation
    const html = document.documentElement;
    const originalScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    
    // Use browser back for consistent behavior across all devices
    window.history.back();
    
    // Note: We don't restore scroll behavior here because we're navigating away
    // The main page will handle its own scroll behavior
}

// Load product details from URL parameter
function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        showError('Product ID not found');
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) {
        showError('Product not found');
        return;
    }
    
    // Update page title
    document.title = `${product.name} - SnatchIt`;
    
    // Populate product details
    const productIcon = document.getElementById('product-detail-icon');
    const productCategory = document.getElementById('product-detail-category');
    const productTitle = document.getElementById('product-detail-title');
    const productDescription = document.getElementById('product-detail-description');
    const productBrand = document.getElementById('product-detail-brand');
    const productCategoryFull = document.getElementById('product-detail-category-full');
    const productAvailability = document.getElementById('product-detail-availability');
    
    // Initialize image gallery
    initializeImageGallery(product);
    if (productCategory) productCategory.textContent = product.category;
    if (productTitle) productTitle.textContent = product.name;
    if (productDescription) {
        // Show description and features
        let descriptionHTML = `<p>${product.description}</p>`;
        if (product.features && product.features.length > 0) {
            descriptionHTML += '<br><strong>Key Features:</strong><ul>';
            product.features.forEach(feature => {
                descriptionHTML += `<li>${feature}</li>`;
            });
            descriptionHTML += '</ul>';
        }
        productDescription.innerHTML = descriptionHTML;
    }
    if (productBrand) productBrand.textContent = product.brand;
    if (productCategoryFull) productCategoryFull.textContent = product.category;
    if (productAvailability) productAvailability.textContent = product.availability;
    
    // Set affiliate button link
    const affiliateButton = document.getElementById('product-detail-affiliate-button');
    if (affiliateButton) {
        affiliateButton.onclick = () => {
            // Open the real affiliate link
            window.open(product.affiliateLink, '_blank');
        };
    }
}

// Show error message
function showError(message) {
    const container = document.querySelector('.product-detail-content');
    if (container) {
        container.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #f5576c; margin-bottom: 1rem;"></i>
                <h2>Error</h2>
                <p>${message}</p>
                <a href="index.html" class="product-detail-button secondary">Back to Products</a>
            </div>
        `;
    }
}

// Mobile navigation setup
function setupMobileNavigation() {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });
}

// Smooth scrolling setup
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(25px)';
        navbar.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});
