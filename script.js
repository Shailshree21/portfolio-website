// Elements
const themeToggle = document.getElementById('themeToggle');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.getElementById('navbar');
const typedTextElement = document.getElementById('typed-text');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

// Typing Effect
const text = "I build intelligent systems";
const target = document.getElementById("typed-text");
let index = 0;

function type() {
  if (index < text.length) {
    target.innerHTML += text.charAt(index);
    index++;
    setTimeout(type, 90);
  }
}
type();

// Theme Toggle
themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    
    // Save theme preference
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.textContent = '☀️';
}

// Mobile Menu Toggle
if (hamburger) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('show');
    });
}

// Sticky Navbar
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active menu item
    let current = '';
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach((item) => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// Typing Effect
const typingTexts = ["AI/ML Engineer", "Data Scientist", "Problem Solver"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        // Pause at the end
        isDeleting = true;
        typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        // Move to next text
        textIndex = (textIndex + 1) % typingTexts.length;
        // Pause before typing next
        typingSpeed = 500;
    }

    setTimeout(typeText, typingSpeed);
}

// Start typing effect
setTimeout(typeText, 1000);

// Project Filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                card.style.display = 'block';
                
                // Add animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.25
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section-header, .about-image, .about-content, .timeline-item, .project-card, .contact-form, .contact-info').forEach(element => {
    element.classList.add('scroll-animation');
    observer.observe(element);
});

// Handle form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data - in a real application, send this data to your backend
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Here you would normally send the data to your server
        console.log('Form submitted with data:', formValues);
        
        // Show success message
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent ✓';
        submitBtn.disabled = true;
        
        // Reset form and button after delay
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }, 3000);
    });
}

// Add this CSS for animations
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .scroll-animation {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .scroll-animation.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .timeline-entry {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-timeline {
            opacity: 1;
            transform: translateY(0);
        }
        
        .timeline-entry:nth-child(1) { transition-delay: 0.1s; }
        .timeline-entry:nth-child(2) { transition-delay: 0.3s; }
        .timeline-entry:nth-child(3) { transition-delay: 0.5s; }
        .timeline-entry:nth-child(4) { transition-delay: 0.7s; }
        .timeline-entry:nth-child(5) { transition-delay: 0.9s; }
    </style>
`);

// Add animation for timeline entries
document.addEventListener('DOMContentLoaded', function() {
    // Add timeline animation
    const timelineEntries = document.querySelectorAll('.timeline-entry');
    
    // Add scroll animation for timeline entries
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-timeline');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineEntries.forEach(entry => {
        timelineObserver.observe(entry);
    });
    
    // Add hover effect for timeline entries
    timelineEntries.forEach(entry => {
        entry.addEventListener('mouseenter', function() {
            const dot = this.querySelector('.timeline-dot');
            if (dot && !dot.classList.contains('active')) {
                dot.style.transform = 'translateX(-50%) scale(1.2)';
            }
        });
        
        entry.addEventListener('mouseleave', function() {
            const dot = this.querySelector('.timeline-dot');
            if (dot && !dot.classList.contains('active')) {
                dot.style.transform = 'translateX(-50%) scale(1)';
            }
        });
    });
});

const roles = [
  {
    title: "Animation Intern @ <span class='highlight'>Innovate Tech</span>",
    period: "2023 – 2024",
    details: [
      "🎨 Developed <span class='highlight'>2D character animations</span> for <strong>MySecondTeacherNepal</strong> eBooks (Grade 11 & 12)",
      "🖌️ Designed illustrations from scratch using <span class='highlight'>Adobe Illustrator</span>",
      "📘 Created structured academic book layouts in <span class='highlight'>Adobe InDesign</span>",
      "🤝 Collaborated on cross-functional <span class='highlight'>design + tech projects</span>"
    ]
  },
  {
    title: "Computer Vision Intern @ <span class='highlight'>Danson Solution</span>",
    period: "2023",
    details: [
      "🎮 Built <span class='highlight'>AI-powered learning games</span> using computer vision",
      "📷 Worked with <span class='highlight'>object detection</span> and gesture recognition models",
      "⚡ Optimized gameplay using <span class='highlight'>real-time ML feedback loops</span>"
    ]
  },
  {
    title: "AI Intern @ <span class='highlight'>ING Skill Academy</span>",
    period: "2022 – 2023",
    details: [
      "🧠 Built foundational <span class='highlight'>ML models</span> for real-world datasets",
      "📚 Helped design <span class='highlight'>AI curriculum</span> and hands-on labs",
      "💬 Explored <span class='highlight'>NLP</span> and classification pipelines"
    ]
  }
];


function showRole(index) {
  const role = roles[index];

  document.querySelectorAll(".timeline-item").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });

  const detailsContainer = document.getElementById("roleDetails");

  // Clear + re-add animation
  detailsContainer.classList.remove("role-details");
  void detailsContainer.offsetWidth; // Force reflow
  detailsContainer.classList.add("role-details");

  detailsContainer.innerHTML = `
    <h3>${role.title}</h3>
    <span>${role.period}</span>
    <ul>${role.details.map(item => `<li>${item}</li>`).join("")}</ul>
  `;
}

showRole(0);

// Auto-update year
document.getElementById("footer-year").textContent = new Date().getFullYear();

// Scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault(); // Stop default browser anchor jump

    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    // Close nav first
    navLinks.classList.remove('show');
    hamburger.classList.remove('active');

    // Scroll to the section after closing menu
    setTimeout(() => {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  });
});

