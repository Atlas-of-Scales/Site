/* ============================================================
   Atlas of Scales — Main JavaScript
   ============================================================ */

(function () {
    'use strict';

    /* --- Sticky Nav --- */
    const nav = document.getElementById('nav');
    const hero = document.getElementById('hero');

    const navObserver = new IntersectionObserver(
        ([entry]) => {
            nav.classList.toggle('scrolled', !entry.isIntersecting);
        },
        { threshold: 0.1 }
    );
    navObserver.observe(hero);

    /* --- Smooth Scroll for Anchor Links --- */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            if (mobileOverlay.classList.contains('open')) {
                closeMobileMenu();
            }
        });
    });

    /* --- Active Section Highlighting --- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.toggle(
                            'active',
                            link.getAttribute('href') === '#' + id
                        );
                    });
                }
            });
        },
        { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(section => sectionObserver.observe(section));

    /* --- Mobile Hamburger Menu --- */
    const hamburger = document.querySelector('.hamburger');
    const mobileOverlay = document.querySelector('.mobile-overlay');

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        const isOpen = mobileOverlay.classList.contains('open');
        if (isOpen) {
            closeMobileMenu();
        } else {
            hamburger.classList.add('active');
            mobileOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    });

    mobileOverlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    /* --- Scroll Reveal --- */
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    reveals.forEach(el => revealObserver.observe(el));

    /* --- Dragon Card Armoured Toggle --- */
    document.querySelectorAll('.dragon-card').forEach(card => {
        const buttons = card.querySelectorAll('.dragon-toggle button');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const variant = btn.dataset.variant;
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                card.classList.toggle('show-armoured', variant === 'armoured');
            });
        });

        // Click image to toggle
        const imageWrapper = card.querySelector('.dragon-image-wrapper');
        if (imageWrapper) {
            imageWrapper.addEventListener('click', () => {
                const isArmoured = card.classList.contains('show-armoured');
                card.classList.toggle('show-armoured', !isArmoured);
                buttons.forEach(b => {
                    b.classList.toggle('active', b.dataset.variant === (isArmoured ? 'base' : 'armoured'));
                });
            });
        }
    });

    /* --- Biome Unit Tabs --- */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const biome = btn.dataset.biome;

            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabPanels.forEach(panel => {
                panel.classList.toggle('active', panel.dataset.biome === biome);
            });
        });
    });
})();
