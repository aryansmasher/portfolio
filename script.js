// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
        
        // Animate hamburger menu
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (mobileMenu.style.display === 'block') {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.style.display = 'none';
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Scroll spy for navigation
    const sections = document.querySelectorAll('.section');
    const navLinksAll = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Skills section - expandable clusters
    const skillClusters = document.querySelectorAll('.skill-cluster');
    skillClusters.forEach(cluster => {
        cluster.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });

    // Certificate modal functionality
    const certViewBtns = document.querySelectorAll('.cert-view-btn');
    const modal = document.getElementById('cert-modal');
    const modalClose = document.querySelector('.modal-close');

    certViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            modal.style.display = 'block';
            // Here you would typically load the actual certificate
            // For now, we'll just show a placeholder
        });
    });

    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Manifesto section - hidden easter egg
    let scrollCount = 0;
    let keySequence = [];
    const targetSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

    // Reveal manifesto on deep scroll
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > 90) {
            scrollCount++;
            if (scrollCount > 50) { // After scrolling near bottom for a while
                revealManifesto();
            }
        }
    });

    // Konami code easter egg
    document.addEventListener('keydown', function(e) {
        keySequence.push(e.code);
        if (keySequence.length > targetSequence.length) {
            keySequence.shift();
        }
        
        if (keySequence.length === targetSequence.length && 
            keySequence.every((key, index) => key === targetSequence[index])) {
            revealManifesto();
            keySequence = [];
        }
    });

    function revealManifesto() {
        const manifestoSection = document.getElementById('manifesto');
        if (manifestoSection.classList.contains('hidden')) {
            manifestoSection.classList.remove('hidden');
            manifestoSection.scrollIntoView({ behavior: 'smooth' });
            
            // Add glitch effect
            const title = manifestoSection.querySelector('.section-title');
            title.classList.add('glitch-text');
        }
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
    const animatedElements = document.querySelectorAll('.skill-cluster, .project-card, .blog-entry, .cert-entry');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Typing effect for hero name (optional enhancement)
    const heroName = document.querySelector('.hero-name');
    const originalText = heroName.textContent;
    heroName.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            heroName.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);

    // Parallax effect for background animation
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const backgroundAnimation = document.querySelector('.background-animation');
        const rate = scrolled * -0.5;
        backgroundAnimation.style.transform = `translateY(${rate}px)`;
    });

    // Add subtle hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Terminal-like cursor blink for certain elements
    function addCursorBlink(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            const cursor = document.createElement('span');
            cursor.textContent = '|';
            cursor.style.animation = 'blink 1s infinite';
            cursor.style.marginLeft = '2px';
            el.appendChild(cursor);
        });
    }

    // Add blinking cursor to certain headings
    setTimeout(() => {
        addCursorBlink('.section-title');
    }, 2000);

    // Glitch effect on hover for manifesto fragments
    const memoryFragments = document.querySelectorAll('.memory-fragment');
    memoryFragments.forEach(fragment => {
        fragment.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease-in-out';
        });
        
        fragment.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });

    // Add noise effect to background occasionally
    function addNoise() {
        const backgroundAnimation = document.querySelector('.background-animation');
        backgroundAnimation.style.filter = 'contrast(1.1) brightness(0.9)';
        
        setTimeout(() => {
            backgroundAnimation.style.filter = 'none';
        }, 100);
    }

    // Random noise effect
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
            addNoise();
        }
    }, 5000);

    // Console easter egg
    console.log(`
    ╔══════════════════════════════════════════════════════════════╗
    ║                                                              ║
    ║  > SYSTEM ACCESS GRANTED                                     ║
    ║  > USER: ARYAN_SHARMA                                        ║
    ║  > STATUS: DIGITAL_OPERATIVE                                 ║
    ║  > CLEARANCE: CLASSIFIED                                     ║
    ║                                                              ║
    ║  "In the space between keystrokes, I find myself."          ║
    ║                                                              ║
    ║  Try the Konami code: ↑↑↓↓←→←→                              ║
    ║  Or scroll to the very bottom...                             ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
    `);
});

// Additional utility functions
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
    // Any scroll-based animations or effects can go here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page loaded in ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        }, 0);
    });
}