// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// State cards click functionality
document.querySelectorAll('.state-card').forEach(card => {
    card.addEventListener('click', function() {
        const state = this.dataset.state;
        showStateDetails(state);
    });
});

// Function to show state details (placeholder for modal or page navigation)
function showStateDetails(state) {
    const stateInfo = {
        assam: {
            name: 'Assam',
            description: 'Land of Tea Gardens & Wildlife',
            attractions: ['Kaziranga National Park', 'Manas National Park', 'Sivasagar', 'Majuli Island'],
            activities: ['Wildlife Safari', 'River Cruise', 'Tea Garden Tours', 'Cultural Tours']
        },
        arunachal: {
            name: 'Arunachal Pradesh',
            description: 'Land of Rising Sun',
            attractions: ['Tawang Monastery', 'Sela Pass', 'Bomdila', 'Namdapha National Park'],
            activities: ['Monastery Tours', 'Mountain Trekking', 'Wildlife Photography', 'Cultural Exploration']
        },
        meghalaya: {
            name: 'Meghalaya',
            description: 'Abode of Clouds',
            attractions: ['Living Root Bridges', 'Cherrapunji', 'Mawlynnong Village', 'Shillong'],
            activities: ['Root Bridge Trekking', 'Caving', 'Waterfall Rappelling', 'Village Tourism']
        },
        manipur: {
            name: 'Manipur',
            description: 'Jewel of India',
            attractions: ['Loktak Lake', 'Kangla Fort', 'Imphal War Cemetery', 'Keibul Lamjao National Park'],
            activities: ['Boating', 'Wildlife Viewing', 'Cultural Shows', 'Historical Tours']
        },
        mizoram: {
            name: 'Mizoram',
            description: 'Land of Blue Mountains',
            attractions: ['Aizawl', 'Champhai', 'Phawngpui Peak', 'Reiek Tlang'],
            activities: ['Mountain Climbing', 'Village Tourism', 'Handicraft Shopping', 'Nature Walks']
        },
        nagaland: {
            name: 'Nagaland',
            description: 'Land of Festivals',
            attractions: ['Kohima War Cemetery', 'Dzukou Valley', 'Mon District', 'Dimapur'],
            activities: ['Hornbill Festival', 'Trekking', 'Tribal Village Tours', 'Adventure Sports']
        },
        tripura: {
            name: 'Tripura',
            description: 'Land of Royal Heritage',
            attractions: ['Ujjayanta Palace', 'Neermahal', 'Sepahijala Wildlife Sanctuary', 'Unakoti'],
            activities: ['Palace Tours', 'Wildlife Safari', 'Boat Rides', 'Archaeological Tours']
        },
        sikkim: {
            name: 'Sikkim',
            description: 'Gateway to Himalayas',
            attractions: ['Gangtok', 'Tsomgo Lake', 'Nathula Pass', 'Yuksom'],
            activities: ['Monastery Tours', 'Cable Car Rides', 'Mountain Biking', 'Himalayan Trekking']
        }
    };

    const info = stateInfo[state];
    if (info) {
        alert(`${info.name} - ${info.description}\n\nTop Attractions:\n${info.attractions.join('\n')}\n\nActivities:\n${info.activities.join('\n')}`);
    }
}

// Contact form handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const destination = formData.get('destination');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your interest! We will contact you soon to plan your Northeast India adventure.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.state-card, .adventure-card, .place-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Image lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
});

// Adventure activity cards interaction
document.querySelectorAll('.adventure-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Place cards interaction
document.querySelectorAll('.place-card').forEach(card => {
    card.addEventListener('click', function() {
        const placeName = this.querySelector('h3').textContent;
        const location = this.querySelector('.place-location').textContent;
        const description = this.querySelector('p:not(.place-location)').textContent;
        
        // Create a simple modal-like alert (in a real app, you'd use a proper modal)
        alert(`${placeName}\n${location}\n\n${description}\n\nWould you like to plan a trip here? Contact us for more details!`);
    });
});

// Smooth reveal animation for hero section
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
});

// Add loading states and error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.opacity = '0.5';
        this.alt = 'Image not available';
    });
    
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
});

// Social media links functionality
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.querySelector('i').classList[1].split('-')[1];
        alert(`Follow us on ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`);
    });
});

// Navbar active link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
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

// Add CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #4589c2 !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Easter egg - Konami code for special message
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            alert('🎉 Congratulations! You discovered the secret Northeast India adventure mode! 🏔️');
            document.body.style.filter = 'none';
        }, 500);
        konamiCode = [];
    }
}); 