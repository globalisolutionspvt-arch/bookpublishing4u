  function openTab(evt, tabName) {
            // Hide all tab panes
            var tabPanes = document.getElementsByClassName("about-tab-pane");
            for (var i = 0; i < tabPanes.length; i++) {
                tabPanes[i].classList.remove("active");
            }
            
            // Remove active class from all tab buttons
            var tabBtns = document.getElementsByClassName("about-tab-btn");
            for (var i = 0; i < tabBtns.length; i++) {
                tabBtns[i].classList.remove("active");
            }
            
            // Show the selected tab and mark button as active
            document.getElementById(tabName).classList.add("active");
            evt.currentTarget.classList.add("active");
        }
        
        // Form submission functions
function getStarted() {
    $('.new-popupform-main').fadeIn();
}

function toggleChat() {
    console.log('Chat toggled');
    // Add your chat implementation here
}

// Handle all form submissions
document.addEventListener('DOMContentLoaded', function() {
    // Hero form submission
    const heroForm = document.getElementById('heroForm');
    if (heroForm) {
        heroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitForm(this, 'heroFormMessage');
        });
    }

    // Story form submission
    const storyForm = document.getElementById('storyForm');
    if (storyForm) {
        storyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitForm(this, 'storyFormMessage');
        });
    }

    // Popup form submission
    const popupForm = document.getElementById('lets-started');
    if (popupForm) {
        popupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitForm(this, 'popupFormMessage');
        });
    }
});

function submitForm(form, messageElementId) {
    const formData = new FormData(form);
    const messageElement = document.getElementById(messageElementId);
    
    // Show loading state
    if (messageElement) {
        messageElement.innerHTML = '<div class="alert alert-info">Sending message...</div>';
    }
    
    fetch('send_email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (messageElement) {
            if (data.success) {
                messageElement.innerHTML = '<div class="alert alert-success">' + data.message + '</div>';
                form.reset();
            } else {
                messageElement.innerHTML = '<div class="alert alert-danger">' + data.message + '</div>';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        if (messageElement) {
            messageElement.innerHTML = '<div class="alert alert-danger">There was an error sending your message. Please try again.</div>';
        }
    });
}

// Slider functionality
const sliderImages = [
    "images/page/our_story4.png",
    "images/page/our_story4.png",
    "images/page/our_story4.png",
    "images/page/our_story4.png"
];

let currentImageIndex = 0;

function changeImage(newIndex) {
    const imageElement = document.getElementById('sliderImage');
    if (imageElement) {
        imageElement.classList.add('fade-out');
        
        setTimeout(() => {
            imageElement.src = sliderImages[newIndex];
            imageElement.classList.remove('fade-out');
            imageElement.classList.add('fade-in');
            
            setTimeout(() => {
                imageElement.classList.remove('fade-in');
            }, 300);
        }, 150);
    }
}

function nextImage() {
    currentImageIndex++;
    if (currentImageIndex >= sliderImages.length) {
        currentImageIndex = 0;
    }
    changeImage(currentImageIndex);
}

function prevImage() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = sliderImages.length - 1;
    }
    changeImage(currentImageIndex);
}

// FAQ functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            
            // Toggle active class
            faqItem.classList.toggle('active');
            
            // Close other FAQ items (optional - remove if you want multiple items open)
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    otherQuestion.parentElement.classList.remove('active');
                }
            });
        });
    });
});

// Tab functionality with Load More
document.addEventListener('DOMContentLoaded', function() {
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

// Simple scroll animations
const initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('.author_card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });
    
    animatedElements.forEach(el => {
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
};

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
});

// Enhanced scroll animations
const observeElements = () => {
    const elements = document.querySelectorAll('.fade-in-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', observeElements);


 $(document).ready(function () {
        $(".close-btn").click(function () {
          $(".new-popupform-main").fadeOut();
        });
        $('.poupBtn').click(function(){
            $(".new-popupform-main").css("display", "block").fadeIn();
        })
      })
      
      const myTimeout = setTimeout(showForm, 10000);

function showForm() {
    $(".new-popupform-main").css("display", "block").fadeIn();
}

    </script>
<script>
function setButtonURL() {
    if (typeof zE !== 'undefined') {
        zE.activate();
    }
}

$('.btn-chat').click( function(){
    if (typeof zE !== 'undefined') {
        zE.activate();
    }
});

// Initialize everything when DOM is ready
$(document).ready(function() {
    // Initialize WOW.js
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }
    
    // Popup form functionality
    var popupTimeout;
    $(".close-btn").click(function () {
        $(".new-popupform-main").fadeOut();
        clearTimeout(popupTimeout);
    });
    
    $('.poupBtn').click(function(){
        $(".new-popupform-main").css("display", "block").fadeIn();
    });
    
    // Auto-show popup after 10 seconds
    popupTimeout = setTimeout(function() {
        if ($(".new-popupform-main").css("display") === "none") {
            $(".new-popupform-main").css("display", "block").fadeIn();
        }
    }, 10000);
});


function toggleChat() {
        // Check if LiveChatWidget is loaded
        if (window.LiveChatWidget) {
            window.LiveChatWidget.call('maximize');
        } else {
            // Fallback - try again after a short delay
            setTimeout(function() {
                if (window.LiveChatWidget) {
                    window.LiveChatWidget.call('maximize');
                }
            }, 1000);
        }
    }
    
    