// Smooth scroll functions
function scrollToLeadForm() {
    document.getElementById('lead-form').scrollIntoView({ behavior: 'smooth' });
}

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

// Form submission handler
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('.btn-primary');
    const msg = document.getElementById('form-message');
    
    // Add loading state
    btn.innerHTML = '<span class="loading-spinner"></span> שולח...';
    btn.disabled = true;
    
    // Simulate sending (replace with actual API call)
    setTimeout(() => {
        msg.style.display = 'block';
        msg.textContent = 'תודה! הפרטים התקבלו. תדהר תחזור אליכם בהקדם.';
        btn.innerHTML = 'נשלח בהצלחה ✓';
        form.reset();
        
        setTimeout(() => {
            btn.innerHTML = 'שלחו לי הצעה';
            btn.disabled = false;
        }, 3000);
    }, 1500);
}

// Fade-in animations on scroll
const fadeEls = document.querySelectorAll('.fade-in');
const dividerImgs = document.querySelectorAll('.section-divider-img');

function onScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    
    fadeEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < triggerBottom) {
            el.classList.add('visible');
        }
    });
    
    // Smooth parallax effect for divider images using transform
    dividerImgs.forEach(img => {
        const parent = img.parentElement;
        const rect = parent.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how far through the viewport the element is
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        
        // Distance from center of viewport
        const distanceFromCenter = (elementCenter - viewportCenter) / windowHeight;
        
        // Convert to a progress value: 1 when at center, 0 when far away
        const progress = Math.max(0, 1 - Math.abs(distanceFromCenter) * 2);
        
        // Apply smooth easing
        const easedProgress = easeOutCubic(progress);
        
        // Calculate translateX based on progress
        // Images start off-screen and slide to center (-50% to center the element)
        const isFromLeft = img.classList.contains('from-left');
        const startX = isFromLeft ? -250 : 250; // Start off-screen (percentage)
        const endX = isFromLeft ? -50 : 50; // End centered (accounting for left:50%/right:50%)
        
        const currentX = startX + (endX - startX) * easedProgress;
        const opacity = Math.min(1, easedProgress * 1.2); // Fade in a bit faster
        
        // Apply transform (keeping the translateY for vertical centering)
        img.style.transform = `translateY(-50%) translateX(${currentX}%)`;
        img.style.opacity = opacity;
    });
}

// Easing function for smooth animation
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);
window.addEventListener('resize', onScroll);

// Header background on scroll
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mouse parallax effect on hero orb
const orb = document.querySelector('.floating-orb');
if (orb) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        orb.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
}

// Magnetic button effect
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translateY(-2px) translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// Typing effect for gradient text (optional enhancement)
const gradientText = document.querySelector('.gradient');
if (gradientText) {
    const text = gradientText.textContent;
    gradientText.style.opacity = '0';
    
    setTimeout(() => {
        gradientText.style.opacity = '1';
        gradientText.style.animation = 'gradient-shift 3s ease infinite';
    }, 500);
}

// Add CSS animation for gradient
const style = document.createElement('style');
style.textContent = `
    @keyframes gradient-shift {
        0%, 100% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(30deg); }
    }
    
    .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Intersection Observer for more efficient scroll detection
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Card tilt effect on hover
document.querySelectorAll('.feature-card, .preview-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Mobile touch support for speech bubbles
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('touchstart', (e) => {
        // Remove touched class from all other cards
        document.querySelectorAll('.feature-card.touched').forEach(c => {
            if (c !== card) c.classList.remove('touched');
        });
        // Toggle this card
        card.classList.toggle('touched');
    });
});

// Close speech bubbles when tapping outside
document.addEventListener('touchstart', (e) => {
    if (!e.target.closest('.feature-card')) {
        document.querySelectorAll('.feature-card.touched').forEach(card => {
            card.classList.remove('touched');
        });
    }
});

console.log('Landing page loaded with effects ✨');
