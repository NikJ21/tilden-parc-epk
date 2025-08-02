// Logo animation script
let ytPlayer;
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('heroVideo', {
        events: {
            'onReady': function(event) {
                // Force autoplay for Safari
                if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
                    setTimeout(() => {
                        event.target.playVideo();
                    }, 1000);
                }
            }
        }
    });
}

// Safari autoplay workaround
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('heroVideo');
    
    // Safari-specific autoplay handling
    if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
        // Add click event to enable autoplay
        document.addEventListener('click', function() {
            if (ytPlayer && ytPlayer.playVideo) {
                ytPlayer.playVideo();
            }
        }, { once: true });
        
        // Also try to autoplay on scroll
        window.addEventListener('scroll', function() {
            if (ytPlayer && ytPlayer.playVideo) {
                ytPlayer.playVideo();
            }
        }, { once: true });
    }
});

console.log('Logo animation script running!');

document.addEventListener('DOMContentLoaded', () => {
    // Logo animation functionality
    const overlay = document.getElementById('introOverlay');
    const textLogo = document.getElementById('artistLogo');
    const folderLogo = document.getElementById('folderLogo');
    let animationActive = true;
    let current = 0;

    if (textLogo && folderLogo) {
        textLogo.style.opacity = 1;
        folderLogo.style.opacity = 0;

        function showLogo(logo) {
            textLogo.style.opacity = logo === 0 ? 1 : 0;
            folderLogo.style.opacity = logo === 1 ? 1 : 0;
        }

        function cycleLogos() {
            if (!animationActive) return;
            showLogo(current);
            setTimeout(() => {
                if (!animationActive) return;
                textLogo.style.opacity = 0;
                folderLogo.style.opacity = 0;
                setTimeout(() => {
                    if (!animationActive) return;
                    current = (current + 1) % 2;
                    cycleLogos();
                }, 350);
            }, 700);
        }
        cycleLogos();

        if (overlay) {
            overlay.addEventListener('click', () => {
                animationActive = false;
                textLogo.style.opacity = 0;
                folderLogo.style.opacity = 0;
            });
        }
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.music-item, .photo-item, .stat, .about-text, .contact-content > div');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Music item hover effects
    const musicItems = document.querySelectorAll('.music-item');
    
    musicItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Photo item click to enlarge (optional)
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                // Create modal for enlarged image
                const modal = document.createElement('div');
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    cursor: pointer;
                `;
                
                const modalImg = document.createElement('img');
                modalImg.src = img.src;
                modalImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                    border-radius: 10px;
                `;
                
                modal.appendChild(modalImg);
                document.body.appendChild(modal);
                
                modal.addEventListener('click', function() {
                    document.body.removeChild(modal);
                });
            }
        });
    });

    // Social link tracking
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track social media clicks (if analytics is set up)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'social',
                    'event_label': this.textContent
                });
            }
        });
    });

    // Contact email click tracking
    const contactLink = document.querySelector('.contact-link');
    if (contactLink) {
        contactLink.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'contact',
                    'event_label': 'email'
                });
            }
        });
    }

    // Music streaming link tracking
    const streamLinks = document.querySelectorAll('.btn-stream');
    
    streamLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'music',
                    'event_label': this.closest('.music-item').querySelector('h3').textContent
                });
            }
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero-video');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add loading animation to page
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals
            const modals = document.querySelectorAll('[style*="position: fixed"]');
            modals.forEach(modal => {
                if (modal.style.position === 'fixed') {
                    document.body.removeChild(modal);
                }
            });
        }
    });
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', optimizedScrollHandler); 