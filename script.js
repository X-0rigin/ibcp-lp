/**
 * India Business Case Programme (IBCP) Microsite
 * Interactive Scripts & Animations
 * Bootstrap 5 powered modals — no custom modal code needed
 */

document.addEventListener('DOMContentLoaded', () => {
    initStickyHeaderScroll();
    initScrollReveal();
    initTimelineProgress();
    initBackToTop();
    initVideoModal();
});

/* --- 1. Header scroll class (kept for future header) --- */
function initStickyHeaderScroll() {
    window.addEventListener('scroll', () => {
        const header = document.getElementById('mainHeader');
        if (!header) return;
        header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
}

/* --- 2. IntersectionObserver Scroll Reveal --- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.12
    });

    revealElements.forEach(el => observer.observe(el));
}

/* --- 3. Timeline Progress Bar Animation --- */
function initTimelineProgress() {
    const timelineSection = document.getElementById('timeline');
    const progressLine = document.getElementById('timelineProgress');

    if (!timelineSection || !progressLine) return;

    window.addEventListener('scroll', () => {
        const rect = timelineSection.getBoundingClientRect();
        const sectionHeight = timelineSection.offsetHeight;
        const viewportHeight = window.innerHeight;

        let scrollPercentage = (viewportHeight / 2 - rect.top) / sectionHeight * 100;
        scrollPercentage = Math.max(0, Math.min(100, scrollPercentage));

        progressLine.style.height = `${scrollPercentage}%`;
    }, { passive: true });
}

/* --- 4. Video Modal — stop video when closed --- */
function initVideoModal() {
    const videoModal = document.getElementById('videoModal');
    if (!videoModal) return;

    videoModal.addEventListener('hidden.bs.modal', () => {
        const iframe = videoModal.querySelector('iframe');
        if (iframe) {
            const src = iframe.src;
            iframe.src = '';
            iframe.src = src;
        }
    });
}

/* --- 5. Back to Top Button --- */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        backToTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
