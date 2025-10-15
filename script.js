// Real product data from products folder
const products = [
    {
        id: 1,
        name: "UGREEN 6-in-1 Hub",
        description: "6 In 1 USB C Hub Type C to HDMI Adapter 4k@60Hz PD 100W Fast Charging 2USB C 3.2 10Gbps + 2USB A 3.0 Ports Compatible With Phone 16 Pro Max Macbook Air Pro iPad Pro Lenovo Thinkpad NS SLR Galaxy | Black",
        price: null, // Price not specified in info
        category: "electronics",
        brand: "UGREEN",
        image: "products/Ugreen 6-in1 Adapter/1.avif",
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
        description: "Nintendo Switch 2 with 7.9\" 1080p HDR, up to 120 fps, Joy‑Con 2, 4K docked, 256GB storage...",
        price: null,
        category: "electronics",
        brand: "Nintendo",
        image: "products/Nintendo Switch 2 Standalone (International Version)/1.png",
        affiliateLink: "https://s.noon.com/PhnHkwWScuA",
        availability: "In Stock",
        features: [
            "Next evolution of Nintendo Switch",
            "TV, Tabletop, and Handheld modes",
            "7.9\" LCD with HDR and up to 120 fps",
            "256GB storage, microSD Express expandable",
            "GameChat voice, screen share, video chat"
        ],
        color: "Black"
    }
];

// DOM Elements - will be initialized when DOM is ready
let productsGrid;
let categoryFilter;
let navToggle;
let navMenu;

// Current filters
let currentFilters = {
    category: 'all'
};

// Initialize the application - CONSOLIDATED DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Disable smooth scrolling initially to prevent animation on back navigation
    const html = document.documentElement;
    html.style.scrollBehavior = 'auto';
    
    // Initialize DOM elements first
    productsGrid = document.getElementById('products-grid');
    categoryFilter = document.getElementById('category-filter');
    navToggle = document.querySelector('.nav-toggle');
    navMenu = document.querySelector('.nav-menu');
    
    // FORCE reset filters to default values - no exceptions
    if (categoryFilter) {
        categoryFilter.value = 'all';
        currentFilters.category = 'all';
    }
    
    // Always display all products on page load
    displayProducts(products);
    
    updateProductCount();
    updateBrandCount();
    setupEventListeners();
    setupMobileNavigation();
    setupSmoothScrolling();
    setupActiveNavigation();
    
    // Re-enable smooth scrolling after a short delay for normal navigation
    setTimeout(() => {
        html.style.scrollBehavior = 'smooth';
    }, 200);
    
    // Handle success popup functionality
    handleSuccessPopup();
    
    // Add touch-friendly interactions
    addTouchInteractions();
    
    // Add search functionality
    addSearchFunctionality();
    
    // Add CSS styles
    addDynamicStyles();
});

// Additional fallback for mobile browsers - check after page load
window.addEventListener('load', function() {
    // Force reset filters and show all products
    setTimeout(() => {
        if (categoryFilter) {
            categoryFilter.value = 'all';
            currentFilters.category = 'all';
        }
        
        // Always display all products
        displayProducts(products);
    }, 100);
});

// Setup event listeners
function setupEventListeners() {
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleFilterChange);
    }
    
    // Footer category links
    document.querySelectorAll('[data-category]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.getAttribute('data-category');
            if (categoryFilter) {
                categoryFilter.value = category;
                handleFilterChange();
            }
        });
    });
}

// Handle filter changes
function handleFilterChange() {
    if (categoryFilter) {
        currentFilters.category = categoryFilter.value;
    }
    
    const filteredProducts = filterProducts(products);
    displayProducts(filteredProducts);
}

// Filter products based on current filters
function filterProducts(products) {
    let filtered = products.filter(product => {
        // Category filter
        if (currentFilters.category !== 'all' && product.category !== currentFilters.category) {
            return false;
        }
        
        return true;
    });
    
    return filtered;
}

// Display products in the grid
function displayProducts(products) {
    if (!productsGrid) {
        console.error('Products grid element not found');
        return;
    }
    
    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3>No products found</h3>
                <p>Try adjusting your filters to see more products.</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}" onclick="viewProduct(${product.id})" style="cursor: pointer;">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: fill;">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">View product for price</div>
                <button class="product-button" onclick="event.stopPropagation(); viewProduct(${product.id})">
                    View Product
                </button>
            </div>
        </div>
    `).join('');
}

// Mobile navigation setup
function setupMobileNavigation() {
    if (!navToggle || !navMenu) return;
    
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
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                const windowHeight = window.innerHeight;
                const targetHeight = target.offsetHeight;
                
                // Calculate position to center the section
                let scrollToPosition;
                if (targetHeight < windowHeight) {
                    // If section is smaller than viewport, center it
                    scrollToPosition = targetPosition - (windowHeight - targetHeight) / 2;
                } else {
                    // If section is larger than viewport, scroll to top with navbar offset
                    scrollToPosition = targetPosition;
                }
                
                // Ensure we don't scroll above the top of the page
                scrollToPosition = Math.max(0, scrollToPosition);
                
                window.scrollTo({
                    top: scrollToPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar scroll effect and active navigation
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(25px)';
            navbar.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    }
    
    // Update active navigation
    updateActiveNavigation();
});

// Setup active navigation functionality
function setupActiveNavigation() {
    // Set initial active state
    updateActiveNavigation();
    
    // Update on window load and resize
    window.addEventListener('load', updateActiveNavigation);
    window.addEventListener('resize', updateActiveNavigation);
}

// Update active navigation based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const scrollPosition = window.scrollY + navbarHeight;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const viewportCenter = window.scrollY + windowHeight / 2;
    
    // Check if we're at the bottom of the page
    const isAtBottom = window.scrollY + windowHeight >= documentHeight - 10;
    
    // If at bottom, activate the last section (recommendations)
    if (isAtBottom) {
        const lastSection = Array.from(sections).pop();
        if (lastSection) {
            currentSection = lastSection.getAttribute('id');
        }
    } else {
        // Find which section the viewport center is in
        let closestSection = null;
        let closestDistance = Infinity;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionCenter = sectionTop + sectionHeight / 2;
            const sectionBottom = sectionTop + sectionHeight;
            
            // Check if viewport center is within the section
            if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
                currentSection = section.getAttribute('id');
                return;
            }
            
            // Find closest section center for fallback
            const distanceToCenter = Math.abs(viewportCenter - sectionCenter);
            if (distanceToCenter < closestDistance) {
                closestDistance = distanceToCenter;
                closestSection = section;
            }
        });
        
        // If no section contains the viewport center, use the closest one
        if (!currentSection && closestSection) {
            currentSection = closestSection.getAttribute('id');
        }
        
        // If we're at the very top, default to 'home'
        if (window.scrollY < 50) {
            currentSection = 'home';
        }
    }
    
    // Update nav links
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const sectionId = href ? href.replace('#', '') : '';
        
        if (sectionId === currentSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Handle success popup functionality
function handleSuccessPopup() {
    const urlParams = new URLSearchParams(window.location.search);
    const successParam = urlParams.get('success');
    
    if (successParam === 'true') {
        // Show success popup and scroll to recommendations section
        const successMessage = document.getElementById('success-message');
        if (successMessage) {
            successMessage.textContent = 'Thank you for your recommendation! We appreciate your feedback and will review your suggestion.';
        }
        
        // Scroll to recommendations section instantly
        const recommendationsSection = document.getElementById('recommendations');
        if (recommendationsSection) {
            recommendationsSection.scrollIntoView({ behavior: 'auto', block: 'center' });
        }
        // Show popup immediately
        showSuccessPopup();
        
        // Clean up URL without page reload
        const url = new URL(window.location);
        url.searchParams.delete('success');
        window.history.replaceState({}, document.title, url);
    }
    
    // Add loading state to form submission and save scroll position
    const form = document.getElementById('recommendation-form');
    if (form) {
        form.addEventListener('submit', function() {
            // Save current scroll position
            sessionStorage.setItem('scrollPosition', window.scrollY);
            
            const submitBtn = form.querySelector('.submit-button');
            if (submitBtn) {
                submitBtn.textContent = 'Submitting...';
                submitBtn.disabled = true;
            }
        });
    }
}

function showSuccessPopup() {
    const popup = document.getElementById('success-popup');
    if (!popup) return;
    
    const popupContent = popup.querySelector('.popup-content');
    
    popup.classList.add('show');
    
    // Start timer animation after popup is fully visible
    setTimeout(() => {
        if (popupContent) {
            popupContent.classList.add('timer-active');
        }
    }, 100);
    
    // Auto-close after 3 seconds
    setTimeout(() => {
        closeSuccessPopup();
    }, 3000);
}

function closeSuccessPopup() {
    const popup = document.getElementById('success-popup');
    if (!popup) return;
    
    const popupContent = popup.querySelector('.popup-content');
    
    popup.classList.remove('show');
    
    // Reset timer animation for next time
    setTimeout(() => {
        if (popupContent) {
            popupContent.classList.remove('timer-active');
        }
    }, 300);
}

// Close popup when clicking outside
document.addEventListener('click', function(e) {
    const popup = document.getElementById('success-popup');
    if (popup && e.target === popup) {
        closeSuccessPopup();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSuccessPopup();
    }
});

// Touch-friendly interactions for mobile
function addTouchInteractions() {
    // Check if device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        // Add touch feedback for interactive elements (excluding product cards and product buttons per user request)
        const touchElements = document.querySelectorAll(`
            .nav-link,
            .cta-button,
            .platform-card,
            .recommendation-type,
            .popup-button,
            .submit-button,
            .product-detail-button,
            .footer-section ul li a,
            .social-links a,
            .close-modal,
            .modal-button,
            .gallery-nav,
            .thumbnail,
            .back-button
        `.split(',').map(s => s.trim()).join(', '));
        
        touchElements.forEach(element => {
            // Store initial touch position for scroll detection
            element.addEventListener('touchstart', function(e) {
                this.touchStartY = e.touches[0].clientY;
                this.touchStartX = e.touches[0].clientX;
                
                // Add touch-active class immediately for responsive feedback
                this.classList.add('touch-active');
            }, { passive: true });
            
            // Remove touch-active class on touch end with satisfying timing
            element.addEventListener('touchend', function(e) {
                // Keep the effect visible for a moment before smooth return
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 50); // Brief hold for satisfying feedback
            }, { passive: true });
            
            // Also remove on touch cancel (when user drags away)
            element.addEventListener('touchcancel', function(e) {
                this.classList.remove('touch-active');
            }, { passive: true });
            
            // Remove on scroll/drag to prevent stuck states
            element.addEventListener('touchmove', function(e) {
                const moveX = Math.abs(e.touches[0].clientX - (this.touchStartX || 0));
                const moveY = Math.abs(e.touches[0].clientY - (this.touchStartY || 0));
                
                // If user is scrolling or dragging significantly, remove the active state
                if (moveX > 15 || moveY > 15) {
                    this.classList.remove('touch-active');
                }
            }, { passive: true });
        });
        
        // Add ripple effect for buttons on touch (excluding product buttons per user request)
        const buttons = document.querySelectorAll(`
            .submit-button,
            .popup-button,
            .product-detail-button,
            .modal-button,
            .cta-button,
            .gallery-nav,
            .back-button
        `.split(',').map(s => s.trim()).join(', '));
        buttons.forEach(button => {
            button.addEventListener('touchstart', function(e) {
                // Only add ripple if not already present
                if (this.querySelector('.ripple')) return;
                
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.touches[0].clientX - rect.left - size / 2;
                const y = e.touches[0].clientY - rect.top - size / 2;
                
                ripple.className = 'ripple';
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple && ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            }, { passive: true });
        });
        
        // Aggressive approach: completely lock product button styles on mobile
        document.querySelectorAll('.product-button').forEach(button => {
            // Set initial locked styles including size properties
            const lockedStyles = {
                webkitTapHighlightColor: 'transparent',
                webkitTouchCallout: 'none',
                webkitUserSelect: 'none',
                userSelect: 'none',
                outline: 'none',
                border: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                transform: 'scale(1)',
                webkitTransform: 'scale(1)',
                transition: 'none',
                webkitTransition: 'none',
                animation: 'none',
                webkitAnimation: 'none',
                boxShadow: 'none',
                webkitBoxShadow: 'none',
                filter: 'none',
                webkitFilter: 'none',
                opacity: '1',
                width: '100%',
                minWidth: '100%',
                maxWidth: '100%',
                height: 'auto',
                padding: '0.75rem',
                margin: '0',
                scale: '1',
                transformOrigin: 'center',
                webkitTransformOrigin: 'center',
                backfaceVisibility: 'hidden',
                webkitBackfaceVisibility: 'hidden',
                willChange: 'auto'
            };
            
            // Apply locked styles
            Object.assign(button.style, lockedStyles);
            
            // Lock styles during all touch events
            ['touchstart', 'touchmove', 'touchend', 'touchcancel'].forEach(eventType => {
                button.addEventListener(eventType, function(e) {
                    Object.assign(this.style, lockedStyles);
                }, { passive: true });
            });
            
            // Also lock on focus/blur events
            ['focus', 'blur', 'focusin', 'focusout'].forEach(eventType => {
                button.addEventListener(eventType, function(e) {
                    Object.assign(this.style, lockedStyles);
                }, { passive: true });
            });
        });

        // Global cleanup for stuck hover states with better timing
        document.addEventListener('touchstart', function(event) {
            // Remove any stuck touch-active classes from other elements
            document.querySelectorAll('.touch-active').forEach(el => {
                // Only remove if it's not the current target
                if (!el.contains(event.target)) {
                    setTimeout(() => el.classList.remove('touch-active'), 100);
                }
            });
        }, { passive: true });
        
        // Add event delegation for dynamically added elements (excluding product cards and product buttons)
        document.addEventListener('touchstart', function(event) {
            const target = event.target.closest(`
                .nav-link,
                .cta-button,
                .platform-card,
                .recommendation-type,
                .popup-button,
                .submit-button,
                .product-detail-button,
                .footer-section ul li a,
                .social-links a,
                .close-modal,
                .modal-button,
                .gallery-nav,
                .thumbnail,
                .back-button
            `.split(',').map(s => s.trim()).join(', '));
            
            if (target && !target.hasAttribute('data-touch-handled')) {
                // Mark as handled to prevent duplicate listeners
                target.setAttribute('data-touch-handled', 'true');
                
                // Store initial touch position
                target.touchStartY = event.touches[0].clientY;
                target.touchStartX = event.touches[0].clientX;
                
                // Add touch-active class
                target.classList.add('touch-active');
            }
        }, { passive: true });
        
        document.addEventListener('touchend', function(event) {
            const target = event.target.closest('[data-touch-handled]');
            if (target) {
                setTimeout(() => {
                    target.classList.remove('touch-active');
                }, 50);
            }
        }, { passive: true });
        
        document.addEventListener('touchmove', function(event) {
            const target = event.target.closest('[data-touch-handled]');
            if (target) {
                const moveX = Math.abs(event.touches[0].clientX - (target.touchStartX || 0));
                const moveY = Math.abs(event.touches[0].clientY - (target.touchStartY || 0));
                
                if (moveX > 15 || moveY > 15) {
                    target.classList.remove('touch-active');
                }
            }
        }, { passive: true });
    }
}

// Add loading animation for better UX
function showLoading() {
    if (productsGrid) {
        productsGrid.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
            </div>
        `;
    }
}

// Product search functionality
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search products...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        padding: 0.75rem 1rem;
        border: 2px solid #e1e5e9;
        border-radius: 10px;
        font-size: 1rem;
        margin-bottom: 2rem;
        width: 100%;
        max-width: 400px;
        display: block;
        margin-left: auto;
        margin-right: auto;
    `;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        displayProducts(filtered);
    });
    
    // Insert search input before the filter container and center it
    const filterContainer = document.querySelector('.filter-container');
    if (filterContainer) {
        filterContainer.parentNode.insertBefore(searchInput, filterContainer);
    }
}

// Add dynamic styles (consolidated)
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .no-products {
            text-align: center;
            padding: 3rem;
            grid-column: 1 / -1;
        }
        
        .no-products h3 {
            color: #333;
            margin-bottom: 0.5rem;
        }
        
        .no-products p {
            color: #666;
        }
        
        /* Clamp product description to keep cards compact */
        .product-description {
            display: -webkit-box;
            -webkit-line-clamp: 2; /* show up to 2 lines */
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        /* Ensure touch-active class works properly */
        .touch-active {
            -webkit-tap-highlight-color: transparent;
        }
        
        /* Ensure consistent effects across devices */
        @media (hover: hover) and (pointer: fine) {
            /* Desktop hover effects - these match the touch-active effects */
            .product-card:hover {
                transform: translateY(-10px);
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
            }
            
            .platform-card:hover {
                transform: translateY(-3px);
                filter: drop-shadow(0 5px 15px rgba(102, 126, 234, 0.3));
            }
            
            .recommendation-type:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            }
            
            .popup-button:hover,
            .submit-button:hover,
            .product-detail-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
            }
        }
    `;
    document.head.appendChild(style);
}

// Function to update product count in the About section
function updateProductCount() {
    const productCountElement = document.getElementById('product-count');
    if (productCountElement) {
        productCountElement.textContent = `${products.length}+`;
    }
}

// Function to update brand count in the About section
function updateBrandCount() {
    const brandCountElement = document.getElementById('brand-count');
    if (brandCountElement) {
        // Get unique brands from products
        const uniqueBrands = [...new Set(products.map(product => product.brand))];
        brandCountElement.textContent = `${uniqueBrands.length}+`;
    }
}

// Function to view product details
function viewProduct(productId) {
    // Navigate to product detail page
    window.location.href = `product-detail.html?id=${productId}`;
}

// Setup stat item touch effects for mobile
function setupStatItemTouchEffects() {
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
        // Add touch start event
        item.addEventListener('touchstart', function() {
            // Remove touch-active from all stat items
            statItems.forEach(otherItem => {
                otherItem.classList.remove('touch-active');
            });
            // Add touch-active to current item
            this.classList.add('touch-active');
        }, { passive: true });
        
        // Add touch end event to remove effect after a short delay
        item.addEventListener('touchend', function() {
            const currentItem = this;
            setTimeout(() => {
                currentItem.classList.remove('touch-active');
            }, 200); // Quick deselect after 200ms
        }, { passive: true });
        
        // Remove effect when touching elsewhere
        document.addEventListener('touchstart', function(e) {
            if (!item.contains(e.target)) {
                item.classList.remove('touch-active');
            }
        }, { passive: true });
    });
}

// Add to existing DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    setupStatItemTouchEffects();
});