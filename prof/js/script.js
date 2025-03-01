// Smooth scroll with enhanced easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 100;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    hero.style.backgroundPositionY = `${scroll * 0.5}px`;
});

// Animated counter for skills
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = `${Math.round(current)}%`;
    }, 10);
};

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const skillNumbers = document.querySelectorAll('.skill-number');
let animated = false;

const animateSkills = () => {
    if (animated) return;
    
    skillBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
            if (skillNumbers[index]) {
                animateCounter(skillNumbers[index], parseInt(width));
            }
        }, index * 200);
    });
    animated = true;
};

// Typing effect for hero title
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Project cards tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate hero title
    const heroTitle = document.querySelector('.hero .title');
    typeWriter(heroTitle, 'Rocket League Player | Editor | Programmer');
    
    // Observe sections for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('skills')) {
                    animateSkills();
                }
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Form animations
const form = document.querySelector('.contact-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = form.querySelector('button');
    button.innerHTML = '<span class="loading"></span>';
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    button.innerHTML = 'Message Sent!';
    button.classList.add('success');
    
    setTimeout(() => {
        button.innerHTML = 'Send Message';
        button.classList.remove('success');
        form.reset();
    }, 3000);
});
