// ===== Lucide Icons Init =====
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const parent = entry.target.parentElement;
            const siblings = Array.from(parent.children).filter(el => el.hasAttribute('data-animate'));
            const siblingIndex = siblings.indexOf(entry.target);

            setTimeout(() => {
                entry.target.classList.add('visible');
            }, siblingIndex * 100);

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});

// ===== FAQ Accordion (Accessible) =====
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const answer = item.querySelector('.faq-answer');
        const isActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
            const btn = faq.querySelector('.faq-question');
            const ans = faq.querySelector('.faq-answer');
            if (btn) btn.setAttribute('aria-expanded', 'false');
            if (ans) ans.hidden = true;
        });

        // Toggle current
        if (!isActive) {
            item.classList.add('active');
            button.setAttribute('aria-expanded', 'true');
            answer.hidden = false;
        }
    });
});

// ===== Navbar scroll hide/show =====
const navbar = document.querySelector('.navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
        navbar.style.transition = 'transform 0.3s ease';
        if (currentScrollY > lastScrollY && currentScrollY > 300) {
            navbar.style.transform = 'translateX(-50%) translateY(-100px)';
        } else {
            navbar.style.transform = 'translateX(-50%) translateY(0)';
        }
    }

    lastScrollY = currentScrollY;
}, { passive: true });

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Tag hover micro-interaction =====
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
});