// Ayaansh Mathur Football Portfolio - Interactive JavaScript
// Fixed version addressing navigation, form, and interaction issues

document.addEventListener('DOMContentLoaded', function() {
    console.log('Ayaansh Portfolio: Initializing...');
    
    // Initialize all functionality
    initNavigation();
    initMobileMenu();
    initHeroButtons();
    initSkillAnimations();
    initFormHandling();
    initScrollEffects();
    initInteractiveElements();
    
    console.log('Ayaansh Portfolio: All systems ready!');
});

// ==========================================
// Navigation System (FIXED)
// ==========================================

function initNavigation() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    const navbar = document.getElementById('navbar');
    
    console.log('Found navigation links:', navLinks.length);
    console.log('Found sections:', sections.length);
    
    // Smooth scrolling for ALL navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href').substring(1);
            console.log('Navigating to:', targetId);
            
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Close mobile menu first
                closeMobileMenu();
                
                // Calculate position with navbar offset
                const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - 80;
                
                // Smooth scroll
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                console.log('Scrolled to:', targetId);
                
                // Visual feedback
                this.style.color = '#10B981';
                setTimeout(() => {
                    this.style.color = '';
                }, 200);
            } else {
                console.warn('Section not found:', targetId);
            }
        });
    });
    
    // Update active navigation link on scroll
    let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                updateActiveNavLink();
                updateNavbarBackground();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    function updateActiveNavLink() {
        let current = 'hero'; // default to hero
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            
            if (sectionTop <= 150 && sectionTop + sectionHeight > 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    function updateNavbarBackground() {
        if (!navbar) return;
        
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
}

// ==========================================
// Mobile Menu System (FIXED)
// ==========================================

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    console.log('Mobile menu button:', mobileMenuBtn);
    console.log('Mobile menu:', mobileMenu);
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu button clicked');
            toggleMobileMenu();
        });
        
        // Close menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Mobile link clicked, closing menu');
                setTimeout(() => closeMobileMenu(), 100);
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('show') && 
                !mobileMenuBtn.contains(e.target) && 
                !mobileMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const icon = mobileMenuBtn.querySelector('i');
    
    if (mobileMenu.classList.contains('show')) {
        closeMobileMenu();
    } else {
        console.log('Opening mobile menu');
        mobileMenu.classList.add('show');
        mobileMenu.style.display = 'block';
        icon.className = 'fas fa-times text-xl text-gray-700';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const icon = mobileMenuBtn.querySelector('i');
    
    console.log('Closing mobile menu');
    mobileMenu.classList.remove('show');
    mobileMenu.style.display = 'none';
    icon.className = 'fas fa-bars text-xl text-gray-700';
}

// ==========================================
// Hero Buttons (FIXED)
// ==========================================

function initHeroButtons() {
    const heroButtons = document.querySelectorAll('#hero button');
    console.log('Found hero buttons:', heroButtons.length);
    
    heroButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Hero button clicked:', index);
            
            if (index === 0) {
                // View Highlights button
                showNotification('🎬 Video highlights will be available soon! Contact us to view Ayaansh\'s match footage.', 'info');
                
                // Visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            } else {
                // Contact Scout button
                console.log('Scrolling to contact section');
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    const offsetTop = contactSection.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Visual feedback
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                }
            }
        });
    });
}

// ==========================================
// Form Handling (SIMPLIFIED & FIXED)
// ==========================================

function initFormHandling() {
    const contactForm = document.getElementById('contact-form');
    console.log('Contact form found:', !!contactForm);
    
    if (contactForm) {
        // Remove any interfering styles that might block input
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.style.pointerEvents = 'auto';
            input.style.userSelect = 'text';
            input.disabled = false;
            
            // Add input event listeners for better UX
            input.addEventListener('input', function() {
                console.log('Input detected in:', this.name);
                // Clear any error styling
                this.style.borderColor = '#10B981';
                this.style.boxShadow = '0 0 0 2px rgba(16, 185, 129, 0.1)';
            });
            
            input.addEventListener('focus', function() {
                console.log('Input focused:', this.name);
                this.style.borderColor = '#10B981';
                this.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.2)';
            });
            
            input.addEventListener('blur', function() {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            handleFormSubmission(e);
        });
    }
}

function handleFormSubmission(e) {
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    console.log('Processing form submission...');
    
    // Basic validation
    const requiredFields = ['name', 'organization', 'email', 'interest', 'message'];
    let isValid = true;
    
    requiredFields.forEach(fieldName => {
        const value = formData.get(fieldName);
        if (!value || value.trim() === '') {
            isValid = false;
            console.log('Missing required field:', fieldName);
        }
    });
    
    if (!isValid) {
        showNotification('⚠️ Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('⚠️ Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const originalHTML = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending Message...';
    
    // Simulate form submission
    setTimeout(() => {
        console.log('Form submission completed');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.disabled = false;
        submitButton.innerHTML = originalHTML;
        
        // Show success message
        showNotification('✅ Thank you for your interest in Ayaansh! We will contact you within 24 hours.', 'success');
        
        // Visual feedback
        form.style.transform = 'scale(0.98)';
        setTimeout(() => {
            form.style.transform = 'scale(1)';
        }, 200);
        
    }, 2000);
}

// ==========================================
// Skill Bar Animations
// ==========================================

function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    console.log('Found skill bars:', skillBars.length);
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBar(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

function animateSkillBar(skillBar) {
    const targetWidth = skillBar.getAttribute('data-width');
    console.log('Animating skill bar to:', targetWidth);
    
    if (targetWidth) {
        setTimeout(() => {
            skillBar.style.width = targetWidth;
            skillBar.style.transition = 'width 1.5s ease-out';
        }, 200);
    }
}

// ==========================================
// Scroll Effects & Animations
// ==========================================

function initScrollEffects() {
    const animatedElements = document.querySelectorAll('[class*="bg-white"], .timeline-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.6s ease-out ${index * 0.05}s, transform 0.6s ease-out ${index * 0.05}s`;
        
        observer.observe(element);
    });
}

// ==========================================
// Interactive Elements
// ==========================================

function initInteractiveElements() {
    // Add subtle hover effects
    const hoverElements = document.querySelectorAll('button:not([disabled]), .nav-link, [class*="rounded-3xl"]');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-1px)';
                this.style.transition = 'transform 0.2s ease-out';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add click feedback to all interactive elements
    const clickElements = document.querySelectorAll('button, .nav-link, a');
    clickElements.forEach(element => {
        element.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
    });
}

// ==========================================
// Notification System (FIXED)
// ==========================================

function showNotification(message, type = 'info') {
    console.log('Showing notification:', message, type);
    
    // Remove existing notifications
    const existing = document.querySelector('.notification-toast');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification-toast fixed top-20 right-4 p-4 rounded-xl text-white font-semibold z-50 max-w-sm shadow-2xl transform translate-x-full transition-transform duration-300';
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10B981, #059669)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #DC2626, #B91C1C)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #3B82F6, #1D4ED8)';
    }
    
    notification.innerHTML = `
        <div class="flex items-start space-x-3">
            <div class="flex-1 text-sm leading-relaxed">${message}</div>
            <button class="text-white hover:text-gray-200 ml-2" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 6000);
}

// ==========================================
// Error Handling & Accessibility
// ==========================================

window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showNotification('🚨 Something went wrong. Please refresh the page if issues persist.', 'error');
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// ==========================================
// Initialize on Load
// ==========================================

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    console.log('Website fully loaded');
    
    // Welcome message
    setTimeout(() => {
        showNotification('⚽ Welcome to Ayaansh Mathur\'s football portfolio! Scroll to explore his journey.', 'success');
    }, 1500);
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        toggleMobileMenu,
        closeMobileMenu
    };
}