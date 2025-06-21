document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Change icon
            const icon = themeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });

        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.querySelector('i').classList.remove('fa-moon');
            themeToggle.querySelector('i').classList.add('fa-sun');
        }
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks) navLinks.classList.remove('show');
                }
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Projects Carousel
    const projectsTrack = document.getElementById('projectsTrack');
    const carouselNav = document.getElementById('carouselNav');
    
    if (projectsTrack && carouselNav) {
        const projects = projectsTrack.querySelectorAll('.project-card');
        let currentIndex = 0;
        let autoSlideInterval;
        
        // Create navigation dots
        projects.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToProject(index));
            carouselNav.appendChild(dot);
        });
        
        function goToProject(index) {
            currentIndex = index;
            projectsTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active dot
            carouselNav.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            // Reset autoplay timer
            resetAutoSlide();
        }
        
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % projects.length;
                goToProject(currentIndex);
            }, 5000);
        }
        
        // Start autoplay
        resetAutoSlide();
        
        // Pause on hover
        projectsTrack.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        projectsTrack.addEventListener('mouseleave', resetAutoSlide);
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formMessage = document.getElementById('formMessage');
            
            // Simulate form submission
            formMessage.textContent = "Sending your message...";
            formMessage.style.color = "var(--accent)";
            formMessage.style.display = "block";
            
            setTimeout(() => {
                formMessage.textContent = "Message sent successfully! I'll get back to you soon.";
                formMessage.style.color = "var(--secondary)";
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = "none";
                }, 5000);
            }, 1500);
        });
    }

    // Apple-like Scroll Effects
    let lastScroll = 0;
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        
        if (currentScroll > lastScroll) {
            // Scrolling down
            document.body.classList.add('scrolling-down');
            document.body.classList.remove('scrolling-up');
        } else {
            // Scrolling up
            document.body.classList.add('scrolling-up');
            document.body.classList.remove('scrolling-down');
        }
        lastScroll = currentScroll;
    });

    // Scroll Reveal Animation
    const scrollReveal = () => {
        const elements = document.querySelectorAll('.about-details, .skill-category, .project-card, .photo-item');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize elements with hidden state
    document.querySelectorAll('.about-details, .skill-category, .project-card, .photo-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', scrollReveal);
    scrollReveal(); // Initial check
});

// Enhanced scroll reveal animation
const scrollReveal = () => {
    const elements = document.querySelectorAll('.education-item, .skill-category, .project-card, .photo-item');
    const windowHeight = window.innerHeight;
    
    elements.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        
        if (elementPosition < windowHeight - 100) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 150 * index); // Staggered delay
        }
    });
};

// Add to your script.js
document.addEventListener('DOMContentLoaded', function() {
  // Filter certificates by category (example)
  const filterButtons = document.querySelectorAll('.certificate-filter');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      // Filter logic here
    });
  });
});


// Initialize elements with hidden state
document.querySelectorAll('.education-item, .skill-category, .project-card, .photo-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.5, 0, 0, 1)';
});

// Apple-like smooth scrolling between sections
let ticking = false;
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            scrollReveal();
            
            // Section-based color morphing
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop - window.innerHeight/3 && 
                    window.scrollY < sectionTop + sectionHeight - window.innerHeight/3) {
                    document.documentElement.style.setProperty('--primary', section.dataset.primary || '#344e41');
                    document.documentElement.style.setProperty('--secondary', section.dataset.secondary || '#3a5a40');
                }
            });
            
            ticking = false;
        });
        ticking = true;
    }
});