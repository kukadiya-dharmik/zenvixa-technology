// ============================================
// Modern IT Services Company Website Scripts
// ============================================

// Generate floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
});

// Enhanced scroll animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animate-reveal');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-card, .why-us-card, .feature-box, .about-card');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// EmailJS Configuration
// ============================================
// To enable real-time email functionality:
// 1. Sign up at https://www.emailjs.com/
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Get your Public Key from Account → General
// 5. Replace the placeholders below with your actual IDs
// See EMAILJS_SETUP.md for detailed instructions

// Initialize EmailJS
// Replace 'YOUR_PUBLIC_KEY' with your EmailJS public key
// Get it from: https://dashboard.emailjs.com/admin/integration
(function() {
    // TODO: Replace with your EmailJS Public Key
    emailjs.init("hxGXlNwRRpObmNHFd");
})();

// Contact form submission with EmailJS
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');
const formAlert = document.getElementById('formAlert');

// Mark form fields as touched after user interaction
// This ensures red borders only show after user tries to fill the field
const formFields = contactForm.querySelectorAll('.form-control');
formFields.forEach(field => {
    // Mark as touched when user leaves the field (blur event)
    field.addEventListener('blur', function() {
        this.classList.add('touched');
    });
    
    // Also mark as touched on input to handle real-time validation
    field.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.classList.add('touched');
        }
    });
});

// Show alert message
function showAlert(message, type = 'success') {
    formAlert.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    formAlert.innerHTML = `
        <i class="bi bi-${type === 'success' ? 'check-circle-fill' : 'exclamation-triangle-fill'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    formAlert.classList.remove('d-none');
    
    // Auto hide after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            formAlert.classList.add('d-none');
        }, 5000);
    }
    
    // Scroll to alert
    formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Set loading state
function setLoadingState(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        btnText.classList.add('d-none');
        btnLoading.classList.remove('d-none');
    } else {
        submitBtn.disabled = false;
        btnText.classList.remove('d-none');
        btnLoading.classList.add('d-none');
    }
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Hide previous alerts
    formAlert.classList.add('d-none');
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !message) {
        showAlert('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address.', 'error');
        return;
    }
    
    // Phone validation (if provided)
    if (phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone) || phone.length < 10) {
            showAlert('Please enter a valid phone number.', 'error');
            return;
        }
    }
    
    // Set loading state
    setLoadingState(true);
    
    // Prepare email template parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        phone: phone || 'Not provided',
        message: message,
        to_email: 'zenvixatechnology@gmail.com', // Your business email
        reply_to: email
    };
    
    // Send email using EmailJS
    // TODO: Replace these with your actual EmailJS IDs
    // Get Service ID from: Email Services → Your Service
    // Get Template ID from: Email Templates → Your Template
    emailjs.send(
        'service_0ps6j2b',    // TODO: Replace with your EmailJS Service ID
        'template_7ikec2d',   // TODO: Replace with your EmailJS Template ID
        templateParams
    )
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        showAlert('Thank you for your message! We will get back to you soon.', 'success');
        contactForm.reset();
        
        // Optional: Track form submission (Google Analytics, etc.)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission', {
                'event_category': 'Contact',
                'event_label': 'Contact Form'
            });
        }
    })
    .catch(function(error) {
        console.error('FAILED...', error);
        showAlert('Sorry, there was an error sending your message. Please try again or contact us directly at info@zenvinixtech.com', 'error');
    })
    .finally(function() {
        setLoadingState(false);
    });
});

// Portfolio filter (for future implementation)
function filterPortfolio(category) {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Mobile menu close on link click
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Load project data from JSON file - TEMPORARILY COMMENTED
let projectData = {};

// Fetch project data from JSON file - COMMENTED OUT WHILE PORTFOLIO IS HIDDEN
/*
fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        projectData = data.projects;
        console.log('Project data loaded successfully');
    })
    .catch(error => {
        console.error('Error loading project data:', error);
        // Fallback to empty object if JSON fails to load
        projectData = {};
    });
*/

// Portfolio modal functionality - COMMENTED OUT WHILE PORTFOLIO IS HIDDEN
/*
const projectModal = document.getElementById('projectModal');
if (projectModal) {
    projectModal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget;
        const projectId = button.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
            // Update modal title
            const modalTitle = document.getElementById('projectModalLabel');
            modalTitle.textContent = project.title;
            
            // Update project title
            document.getElementById('projectTitle').textContent = project.title;
            
            // Update tech stack
            const techStackContainer = document.getElementById('projectTechStack');
            techStackContainer.innerHTML = '';
            project.techStack.forEach(tech => {
                const badge = document.createElement('span');
                badge.className = 'badge bg-primary me-2 mb-2';
                badge.textContent = tech;
                techStackContainer.appendChild(badge);
            });
            
            // Update description
            document.getElementById('projectDescription').innerHTML = `<p class="lead">${project.description}</p>`;
            
            // Update features
            const featuresList = document.getElementById('featuresList');
            featuresList.innerHTML = '';
            project.features.forEach(feature => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="bi bi-check-circle-fill text-primary me-2"></i>${feature}`;
                featuresList.appendChild(li);
            });
            
            // Update carousel
            const carouselInner = document.getElementById('carouselInner');
            const carouselIndicators = document.getElementById('carouselIndicators');
            carouselInner.innerHTML = '';
            carouselIndicators.innerHTML = '';
            
            project.images.forEach((image, index) => {
                // Create indicator
                const indicator = document.createElement('button');
                indicator.type = 'button';
                indicator.setAttribute('data-bs-target', '#projectCarousel');
                indicator.setAttribute('data-bs-slide-to', index);
                indicator.setAttribute('aria-label', `Slide ${index + 1}`);
                if (index === 0) {
                    indicator.classList.add('active');
                    indicator.setAttribute('aria-current', 'true');
                }
                carouselIndicators.appendChild(indicator);
                
                // Create carousel item
                const carouselItem = document.createElement('div');
                carouselItem.className = 'carousel-item' + (index === 0 ? ' active' : '');
                
                const imagePlaceholder = document.createElement('div');
                imagePlaceholder.className = 'project-modal-image';
                imagePlaceholder.style.background = `linear-gradient(135deg, ${image.color} 0%, ${image.color}dd 100%)`;
                imagePlaceholder.innerHTML = `<i class="bi ${image.icon}"></i>`;
                
                carouselItem.appendChild(imagePlaceholder);
                carouselInner.appendChild(carouselItem);
            });
            
            // Update project link
            const projectLink = document.getElementById('projectLink');
            projectLink.href = project.link;
        }
    });
}
*/

// Console message for developers
console.log('%c🚀 Zenvinix Tech - IT Services Company', 'color: #0066ff; font-size: 20px; font-weight: bold;');
console.log('%cWebsite built with modern technologies and best practices.', 'color: #666; font-size: 12px;');

