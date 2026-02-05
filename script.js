// Energy Capital Management - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    const primaryNavigation = document.getElementById('primary-navigation');
    const body = document.body;

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        primaryNavigation.classList.add('active');
        body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
    });

    // Close mobile menu
    mobileCloseBtn.addEventListener('click', function() {
        primaryNavigation.classList.remove('active');
        body.style.overflow = ''; // Restore scrolling
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });

    // Close menu when clicking on a link
    const navLinks = primaryNavigation.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            primaryNavigation.classList.remove('active');
            body.style.overflow = '';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    primaryNavigation.addEventListener('click', function(e) {
        if (e.target === primaryNavigation) {
            primaryNavigation.classList.remove('active');
            body.style.overflow = '';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444'; // red-500
                } else {
                    field.style.borderColor = ''; // reset
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, you would send the data to a server here
            // For now, we'll just show a success message
            alert('Thank you for your message! We will contact you soon.');
            contactForm.reset();
            
            // Log data to console (for testing)
            console.log('Form submitted:', data);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or external link
            if (href === '#' || href.includes('http')) {
                return;
            }
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle video loading and error states
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('error', function() {
            console.warn('Video failed to load:', video.src);
            // You could add fallback image logic here
        });
        
        video.addEventListener('loadeddata', function() {
            console.log('Video loaded successfully:', video.src);
        });
    });

    // Add current year to copyright
    const copyrightElements = document.querySelectorAll('footer span:first-child');
    const currentYear = new Date().getFullYear();
    copyrightElements.forEach(element => {
        if (element.textContent.includes('2026')) {
            element.textContent = element.textContent.replace('2026', currentYear);
        }
    });

    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add loading state to buttons
    const buttons = document.querySelectorAll('button[type="submit"], .btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit' || this.classList.contains('btn')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            }
        });
    });
});

// Add loading animation to CSS
const style = document.createElement('style');
style.textContent = `
    .loading {
        position: relative;
        pointer-events: none;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 50%;
        margin: -10px 0 0 -10px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);