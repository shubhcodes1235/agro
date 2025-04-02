// Select elements
const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links li a");
const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");
const ctaButtons = document.querySelectorAll('.cta-btn'); // For hero buttons
const sortingSelect = document.querySelector('.sorting select'); // Sorting dropdown
const productCards = document.querySelectorAll('.product-card'); // Product cards

let lastScrollTop = 0;
let isMenuOpen = false;
let currentIndex = 0;

// Function to toggle the mobile menu when the hamburger is clicked
menuIcon.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;
    navLinks.classList.toggle("active", isMenuOpen);
    menuIcon.classList.toggle("open", isMenuOpen);
});

// Close menu when a nav link is clicked
navItems.forEach((item) => {
    item.addEventListener("click", () => {
        if (isMenuOpen) {
            isMenuOpen = false;
            navLinks.classList.remove("active");
            menuIcon.classList.remove("open");
        }
    });
});

// Debounce function to handle scrolling behavior
function debounce(func, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

// Hide/show menu icon on scroll
window.addEventListener("scroll", debounce(() => {
    const scrollTop = window.scrollY;

    if (scrollTop > lastScrollTop && !isMenuOpen) {
        menuIcon.classList.add("hidden"); // Hide when scrolling down
    } else if (scrollTop < lastScrollTop || isMenuOpen) {
        menuIcon.classList.remove("hidden"); // Show when scrolling up or menu is open
    }
    lastScrollTop = scrollTop;
}, 100));

// Function to change the active slide
function changeSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
        dots[i].classList.toggle("active", i === index);
    });
    currentIndex = index;
}

// Auto-slide every 5 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    changeSlide(currentIndex);
}, 5000);

// Scroll to sections on button click
ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        const sectionId = button.getAttribute('data-section'); // Assuming you set data-section attribute on buttons
        scrollToSection(sectionId);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.scrollY;
    hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});

// Sorting functionality for product listing
sortingSelect.addEventListener('change', function() {
    const sortedCards = Array.from(productCards).sort((a, b) => {
        const priceA = parseInt(a.querySelector('p').textContent.replace('₹', ''));
        const priceB = parseInt(b.querySelector('p').textContent.replace('₹', ''));
        
        if (this.value === 'price') {
            return priceA - priceB; // Sort by price
        } else if (this.value === 'popularity') {
            return Math.random() - 0.5; // Random order for simulated popularity
        } else {
            return 0; // Default case (do not sort)
        }
    });
    
    const grid = document.querySelector('.product-grid');
    grid.innerHTML = ''; // Clear existing products
    sortedCards.forEach(card => grid.appendChild(card)); // Append sorted cards
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        const whatsappMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
        window.location.href = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;
        this.reset();
    } else {
        alert('Please fill in all fields!');
    }
});

// Sticky Buy Now Button on Mobile
window.addEventListener('scroll', () => {
    const buyNowBtn = document.querySelector('.buy-now');
    if (window.innerWidth <= 768 && window.scrollY > 200) {
        buyNowBtn.classList.add('sticky');
    } else {
        buyNowBtn.classList.remove('sticky');
    }
});
