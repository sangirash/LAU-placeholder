// Countdown Timer
function updateCountdown() {
    const launchDate = new Date('2026-03-16T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = launchDate - now;

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM
    document.getElementById('days').textContent = String(days).padStart(3, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // If countdown is finished
    if (distance < 0) {
        document.getElementById('days').textContent = '000';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Notify Form Handler
const notifyForm = document.getElementById('notifyForm');
const notifyMessage = document.getElementById('notifyMessage');

notifyForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value;

    // Simple email validation
    if (email && validateEmail(email)) {
        // Simulate form submission (replace with actual backend call)
        notifyMessage.textContent = 'Thank you! We\'ll notify you when we launch.';
        notifyMessage.className = 'notify-message success';
        emailInput.value = '';

        // Hide message after 5 seconds
        setTimeout(() => {
            notifyMessage.textContent = '';
            notifyMessage.className = 'notify-message';
        }, 5000);
    } else {
        notifyMessage.textContent = 'Please enter a valid email address.';
        notifyMessage.className = 'notify-message error';
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add smooth scroll behavior
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

// Add parallax effect to background on scroll
let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            const scrolled = window.pageYOffset;
            const stars = document.querySelector('.stars');
            const stars2 = document.querySelector('.stars2');
            const stars3 = document.querySelector('.stars3');

            if (stars) stars.style.transform = `translateY(${scrolled * 0.5}px)`;
            if (stars2) stars2.style.transform = `translateY(${scrolled * 0.3}px)`;
            if (stars3) stars3.style.transform = `translateY(${scrolled * 0.1}px)`;

            ticking = false;
        });
        ticking = true;
    }
});

// Add entrance animations on load
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Easter egg: Add particle effect on logo click
const logoIcon = document.querySelector('.logo-icon');
let clickCount = 0;

logoIcon.addEventListener('click', function(e) {
    clickCount++;

    // Create sparkle effect
    for (let i = 0; i < 10; i++) {
        createSparkle(e.clientX, e.clientY);
    }

    if (clickCount >= 5) {
        // Secret message after 5 clicks
        const secretMessage = document.createElement('div');
        secretMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 2rem 3rem;
            border-radius: 20px;
            color: white;
            font-size: 1.5rem;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 20px 60px rgba(102, 126, 234, 0.5);
            animation: fadeInUp 0.5s ease-out;
        `;
        secretMessage.textContent = '🎉 You found the easter egg! 🎉';
        document.body.appendChild(secretMessage);

        setTimeout(() => {
            secretMessage.style.animation = 'fadeInDown 0.5s ease-out reverse';
            setTimeout(() => secretMessage.remove(), 500);
        }, 2000);

        clickCount = 0;
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 10px;
        height: 10px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        animation: sparkle 1s ease-out forwards;
    `;
    document.body.appendChild(sparkle);

    // Random direction
    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 3;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity;

    sparkle.style.setProperty('--dx', `${dx * 50}px`);
    sparkle.style.setProperty('--dy', `${dy * 50}px`);

    setTimeout(() => sparkle.remove(), 1000);
}

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--dx), var(--dy)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
