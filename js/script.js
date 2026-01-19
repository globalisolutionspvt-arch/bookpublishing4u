// Initialize all scripts when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeWOW();
    initializeFancybox();
    initializePortfolioTabs();
    initializePopupForms();
    initializeChatFunctionality();
    initializeFormSubmissions();
    initializeScrollAnimations();
    initializeModernAnimations();
    setupPortfolioImages();
});

// Initialize WOW.js animations
function initializeWOW() {
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }
}

// Initialize Fancybox for image gallery
function initializeFancybox() {
    function setupFancybox() {
        if (typeof Fancybox !== 'undefined') {
            Fancybox.destroy(); // Destroy any previous instances to avoid conflicts
            Fancybox.bind(".fancybox", {
                groupAll: false,
                groupAttr: "rel",
                Image: {
                    zoom: true,
                },
                on: {
                    init: (fancybox) => {
                        console.log("Fancybox initialized");
                    },
                },
            });
        }
    }

    // Initialize Fancybox initially
    setupFancybox();

    // Re-initialize when tabs change
    window.reinitializeFancybox = setupFancybox;
}

// Portfolio Tab Functionality
function initializePortfolioTabs() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const loadMoreBtns = document.querySelectorAll('.load-more-btn');
    
    // Function to get initial image count based on screen size
    function getInitialImageCount() {
        if (window.innerWidth <= 480) {
            return 3; // Mobile
        } else if (window.innerWidth <= 768) {
            return 4; // Tablet
        } else {
            return 6; // Desktop
        }
    }

    // Initial load: show different number of images based on screen size
    function setInitialImages() {
        const initialCount = getInitialImageCount();
        tabPanes.forEach(pane => {
            const images = pane.querySelectorAll('.port-img');
            images.forEach((img, index) => {
                if (index >= initialCount) {
                    img.classList.add('hidden');
                } else {
                    img.classList.remove('hidden');
                }
            });
            
            // Show/hide load more button based on whether there are hidden images
            const loadMoreBtn = pane.querySelector('.load-more-btn');
            const hiddenImages = pane.querySelectorAll('.port-img.hidden');
            if (hiddenImages.length === 0) {
                loadMoreBtn.classList.add('hidden');
            } else {
                loadMoreBtn.classList.remove('hidden');
            }
        });
    }

    // Set initial images
    setInitialImages();

    // Re-calculate on window resize
    window.addEventListener('resize', function() {
        setInitialImages();
    });

    // Tab switching functionality
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs and panes
            tabLinks.forEach(tab => tab.classList.remove('active'));
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                pane.style.display = 'none';
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding tab pane
            const targetTab = this.getAttribute('data-tab');
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.style.display = 'block';
                setTimeout(() => {
                    targetPane.classList.add('active');
                }, 10);
            }
            
            // Reinitialize Fancybox for the active tab
            setTimeout(function() {
                if (window.reinitializeFancybox) {
                    window.reinitializeFancybox();
                }
            }, 100);
        });
    });

    // Load More functionality
    loadMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabPane = document.getElementById(tabId);
            const hiddenImages = tabPane.querySelectorAll('.port-img.hidden');
            
            // Determine how many images to show based on screen size
            let imagesToShow = 6; // Desktop default
            
            if (window.innerWidth <= 480) {
                imagesToShow = 3; // Mobile
            } else if (window.innerWidth <= 768) {
                imagesToShow = 4; // Tablet
            }
            
            // Show next images based on screen size
            for (let i = 0; i < Math.min(imagesToShow, hiddenImages.length); i++) {
                hiddenImages[i].classList.remove('hidden');
                // Add animation
                hiddenImages[i].style.opacity = '0';
                hiddenImages[i].style.transform = 'translateY(30px)';
                setTimeout(() => {
                    hiddenImages[i].style.opacity = '1';
                    hiddenImages[i].style.transform = 'translateY(0)';
                }, i * 100);
            }
            
            // Hide Load More button if no more images
            const remainingHidden = tabPane.querySelectorAll('.port-img.hidden');
            if (remainingHidden.length === 0) {
                this.classList.add('hidden');
            }
        });
    });

    // Image Modal Functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');

    if (modal && modalImg && closeBtn) {
        document.addEventListener('click', function(e) {
            if (e.target.closest('.port-img') && !e.target.closest('.port-img').classList.contains('hidden')) {
                const portImg = e.target.closest('.port-img');
                modal.style.display = 'block';
                modalImg.src = portImg.getAttribute('data-src');
                document.body.style.overflow = 'hidden';
            }
        });

        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Keyboard navigation for modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Popup Forms Functionality
function initializePopupForms() {
    var popupTimeout;
    
    // Close button functionality
    const closeBtns = document.querySelectorAll(".close-btn");
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const popup = document.querySelector(".new-popupform-main");
            if (popup) {
                popup.style.display = "none";
                clearTimeout(popupTimeout);
            }
        });
    });
    
    // Open popup button functionality
    const popupBtns = document.querySelectorAll('.poupBtn');
    popupBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const popup = document.querySelector(".new-popupform-main");
            if (popup) {
                popup.style.display = "block";
                popup.style.opacity = "1";
            }
        });
    });
    
    // Auto-show popup after 10 seconds only if it's not already open
    popupTimeout = setTimeout(function() {
        const popup = document.querySelector(".new-popupform-main");
        if (popup && window.getComputedStyle(popup).display === "none") {
            popup.style.display = "block";
            popup.style.opacity = "1";
        }
    }, 10000);
}

// Chat Functionality
function initializeChatFunctionality() {
    const chatBtns = document.querySelectorAll('.btn-chat');
    chatBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleChat();
        });
    });
}

// Chat toggle function
function toggleChat() {
    console.log('Opening LiveChat...');
    if (typeof window.LiveChatWidget !== 'undefined') {
        try {
            window.LiveChatWidget.call('maximize');
        } catch (error) {
            console.error('LiveChat error:', error);
            // Fallback - direct call
            window.location.href = 'tel:+12109004511';
        }
    } else {
        // LiveChat not loaded, fallback to phone
        window.location.href = 'tel:+12109004511';
    }
}

// Set button URL function
function setButtonURL() {
    if (typeof zE !== 'undefined') {
        zE.activate();
    } else {
        toggleChat();
    }
}

// Form Submissions
function initializeFormSubmissions() {
    // Basic form validation and submission handling
    const forms = document.querySelectorAll('.form_submission');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff0000';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return false;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Submitting...';
            }
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature_card, .author_card, .service-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animated');
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Modern Animations Class
class ModernAnimations {
    constructor() {
        this.initCounterAnimations();
        this.initScrollAnimations();
        this.initParallaxEffects();
        this.initInteractiveElements();
    }
    
    // Counter animations with modern easing
    initCounterAnimations() {
        const counters = document.querySelectorAll('.metric_number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.7 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const text = element.textContent;
        const target = parseInt(text.replace(/[^0-9]/g, ''));
        const suffix = text.replace(/[0-9]/g, '');
        
        if (isNaN(target)) return;
        
        let current = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        };
        
        updateCounter();
    }
    
    // Simple scroll animations
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in-up');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        animatedElements.forEach(el => observer.observe(el));
    }
    
    // Parallax effects for modern feel
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.why_authors_choose_sec::before');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            parallaxElements.forEach(el => {
                el.style.transform = `translateY(${rate}px)`;
            });
        });
    }
    
    // Simple hover effects
    initInteractiveElements() {
        // Basic button ripple effects
        document.querySelectorAll('.btn_modern').forEach(btn => {
            btn.addEventListener('click', this.createRipple);
        });
    }
    
    createRipple(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    smoothScroll(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Initialize Modern Animations
function initializeModernAnimations() {
    new ModernAnimations();
    
    // Add CSS animations for cards
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .feature_card, .author_card {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Portfolio Images Setup
function setupPortfolioImages() {
    // Ensure images are visible
    const portfolioImages = document.querySelectorAll('.port-img img');
    portfolioImages.forEach(img => {
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        img.style.display = 'block';
        
        // Add load event listener
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Add error handling
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            this.style.display = 'none';
        });
    });
    
    // Add smooth scroll animation for page load
    window.addEventListener('load', function() {
        const visibleElements = document.querySelectorAll('.port-img:not(.hidden)');
        visibleElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100);
            }, index * 100);
        });
    });
}

// Performance optimization
function optimizePerformance() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Reduce animation on low-end devices
    if (navigator.hardwareConcurrency < 4) {
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
    }
}

// Call performance optimization
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Analytics and tracking
function trackInteraction(element, action) {
    console.log(`User ${action} on ${element}`);
    // Add your analytics code here
    // gtag('event', action, { 'event_category': 'engagement', 'event_label': element });
}

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn_modern')) {
        trackInteraction('CTA Button', 'click');
    }
    
    if (e.target.classList.contains('btn-started')) {
        trackInteraction('Get Started Button', 'click');
    }
    
    if (e.target.classList.contains('btn-chat')) {
        trackInteraction('Chat Button', 'click');
    }
});

// Global Functions (for backward compatibility)
window.getStarted = function() {
    console.log('Get Started clicked!');
    // Add your custom functionality here
    trackInteraction('Get Started', 'click');
};

window.toggleChat = toggleChat;
window.setButtonURL = setButtonURL;

// Fix for initial tab state
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        var activeTab = document.querySelector('.nav-tabs a.active');
        if (!activeTab) {
            // If no active tab, activate the first one
            const firstTab = document.querySelector('.nav-tabs a:first-child');
            const firstPane = document.querySelector('.tab-pane:first-child');
            if (firstTab && firstPane) {
                firstTab.classList.add('active');
                firstPane.classList.add('active');
                firstPane.style.display = 'block';
            }
        } else {
            const targetTab = activeTab.getAttribute('data-tab') || activeTab.getAttribute('href');
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.add('active');
                targetPane.style.display = 'block';
            }
        }
        
        // Initialize Fancybox after tab setup
        if (window.reinitializeFancybox) {
            window.reinitializeFancybox();
        }
    }, 100);
});

// Additional form handling
$(document).ready(function() {
    // Popup form functionality using jQuery for compatibility
    $(".close-btn").click(function() {
        $(".new-popupform-main").fadeOut();
    });
    
    $('.poupBtn').click(function() {
        $(".new-popupform-main").css("display", "block").fadeIn();
    });
    
    // Auto-show popup after 10 seconds
    const popupTimer = setTimeout(function() {
        if ($(".new-popupform-main").css("display") === "none") {
            $(".new-popupform-main").css("display", "block").fadeIn();
        }
    }, 10000);
    
    // Chat button functionality
    $('.btn-chat').click(function() {
        toggleChat();
    });
    
    // Initialize International Telephone Input if available
    if (typeof window.intlTelInput !== 'undefined') {
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            window.intlTelInput(input, {
                initialCountry: "us",
                separateDialCode: true,
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
            });
        });
    }
    
    // Form validation enhancement
    $('form.form_submission').on('submit', function(e) {
        const form = $(this);
        const requiredFields = form.find('[required]');
        let hasErrors = false;
        
        // Clear previous error states
        requiredFields.removeClass('error');
        
        // Validate each required field
        requiredFields.each(function() {
            const field = $(this);
            const value = field.val().trim();
            
            if (!value) {
                field.addClass('error').css('border-color', '#ff0000');
                hasErrors = true;
            } else {
                field.removeClass('error').css('border-color', '');
                
                // Email validation
                if (field.attr('type') === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        field.addClass('error').css('border-color', '#ff0000');
                        hasErrors = true;
                    }
                }
                
                // Phone validation
                if (field.attr('type') === 'tel') {
                    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                        field.addClass('error').css('border-color', '#ff0000');
                        hasErrors = true;
                    }
                }
            }
        });
        
        if (hasErrors) {
            e.preventDefault();
            
            // Show error message
            const errorDiv = form.find('.error');
            if (errorDiv.length) {
                errorDiv.text('Please fill in all required fields correctly.').show();
            }
            
            // Focus on first error field
            form.find('.error').first().focus();
            
            return false;
        }
        
        // Show loading state
        const submitBtn = form.find('button[type="submit"], input[type="submit"]');
        if (submitBtn.length) {
            submitBtn.prop('disabled', true);
            const originalText = submitBtn.text() || submitBtn.val();
            submitBtn.text('Submitting...').val('Submitting...');
            
            // Reset button after 5 seconds (in case form submission fails)
            setTimeout(() => {
                submitBtn.prop('disabled', false);
                submitBtn.text(originalText).val(originalText);
            }, 5000);
        }
        
        // Show success message (simulated)
        setTimeout(() => {
            const successDiv = form.find('.success');
            if (successDiv.length) {
                successDiv.text('Thank you for your submission! We will get back to you soon.').show();
            }
        }, 2000);
    });
    
    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }
    });
    
    // Portfolio image lazy loading
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src && !img.classList.contains('loaded')) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        lazyImageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('.port-img img[data-src]').forEach(img => {
            lazyImageObserver.observe(img);
        });
    }
    
    // Initialize slick carousel if available
    if (typeof $.fn.slick !== 'undefined') {
        $('.testimonials-slider').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 5000
        });
    }
    
    // Initialize owl carousel if available
    if (typeof $.fn.owlCarousel !== 'undefined') {
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });
    }
    
    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });
    
    $('.back-to-top').click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });
    
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });
    
    // Counter animation on scroll
    function animateCounters() {
        $('.counter').each(function() {
            const counter = $(this);
            const target = parseInt(counter.text());
            
            if (target && !counter.hasClass('animated')) {
                counter.addClass('animated');
                $({countNum: 0}).animate({
                    countNum: target
                }, {
                    duration: 2000,
                    easing: 'linear',
                    step: function() {
                        counter.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        counter.text(target);
                    }
                });
            }
        });
    }
    
    // Trigger counter animation when in viewport
    $(window).scroll(function() {
        $('.counter').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                animateCounters();
            }
        });
    });
    
    // Mobile menu toggle
    $('.navbar-toggle').click(function() {
        $('.navbar-collapse').toggleClass('in');
    });
    
    // Close mobile menu when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('.navbar-collapse').removeClass('in');
        }
    });
    
    // Tooltip initialization if Bootstrap tooltips are available
    if (typeof $.fn.tooltip !== 'undefined') {
        $('[data-toggle="tooltip"]').tooltip();
    }
    
    // Popover initialization if Bootstrap popovers are available
    if (typeof $.fn.popover !== 'undefined') {
        $('[data-toggle="popover"]').popover();
    }
});

// GTM and Analytics Functions
function gtag_report_conversion() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-17342295189/conversion'
        });
    }
    return true;
}

// Cookie consent handling
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Error handling for images
function handleImageError(img) {
    img.style.display = 'none';
    console.log('Image failed to load:', img.src);
}

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimized scroll handlers
const optimizedScrollHandler = throttle(function() {
    // Handle scroll-based animations and effects here
    const scrollTop = window.pageYOffset;
    
    // Navbar effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        if (scrollTop > 100) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    }
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Resize handler
const optimizedResizeHandler = debounce(function() {
    // Handle responsive adjustments
    const portfolioTabs = document.querySelectorAll('.tab-pane');
    portfolioTabs.forEach(pane => {
        const images = pane.querySelectorAll('.port-img');
        // Recalculate visible images based on new screen size
        // This logic would be similar to the initial setup
    });
}, 250);

window.addEventListener('resize', optimizedResizeHandler);

// Page visibility API for performance optimization
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations, stop timers, etc.
        console.log('Page is hidden - pausing animations');
    } else {
        // Resume animations, restart timers, etc.
        console.log('Page is visible - resuming animations');
    }
});

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Export functions for external use
window.InstantDesigning = {
    toggleChat: toggleChat,
    setButtonURL: setButtonURL,
    getStarted: window.getStarted,
    trackInteraction: trackInteraction,
    gtag_report_conversion: gtag_report_conversion,
    handleImageError: handleImageError,
    optimizePerformance: optimizePerformance
};

// Final initialization check
document.addEventListener('DOMContentLoaded', function() {
    console.log('Instant Designing website fully loaded and initialized');
    
    // Final check for any missing elements
    setTimeout(() => {
        // Ensure all images are properly loaded
        const images = document.querySelectorAll('.port-img img');
        images.forEach(img => {
            if (!img.complete) {
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
            }
        });
        
        // Final Fancybox initialization
        if (window.reinitializeFancybox) {
            window.reinitializeFancybox();
        }
    }, 1000);
});