/**
 * NINETY EIGHT TRAINING CAMP - CORE SCRIPT (2026)
 * Pure JavaScript (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. LOADING SCREEN
    // ==========================================
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            // Berikan sedikit delay untuk kelancaran visual
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
            }, 600);
        });

        // Fallback jika event 'load' terlalu lama terpicu
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 3000);
    }

    // ==========================================
    // 2. STICKY NAVBAR & NAVIGATION HIGHLIGHT
    // ==========================================
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Navbar Toggle
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }

        // Active Section Navigation Link Highlight
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // offset navbar
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // 3. MOBILE MENU HAMBURGER
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Mencegah scroll pada body saat menu terbuka
            body.classList.toggle('overflow-hidden');
        });

        // Tutup menu jika salah satu link diklik
        const mobileLinks = document.querySelectorAll('.nav-link, .nav-cta-mobile');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('overflow-hidden');
            });
        });
    }

    // ==========================================
    // 4. SCROLL REVEAL ANIMATIONS
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Stop observing once animated to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null, // viewport
            threshold: 0.1, // Trigger when 10% is visible
            rootMargin: '0px 0px -50px 0px' // offset trigger sedikit
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback jika browser sangat lama
        revealElements.forEach(element => {
            element.classList.add('revealed');
        });
    }

    // ==========================================
    // 5. TRAINING PROGRAM SELECT BUTTON INTEGRATION
    // ==========================================
    const selectProgramBtns = document.querySelectorAll('.select-program-btn');
    const programSelect = document.getElementById('program');

    selectProgramBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const programName = btn.getAttribute('data-program');
            if (programSelect && programName) {
                programSelect.value = programName;
            }
        });
    });

    // ==========================================
    // 6. GALLERY LIGHTBOX MODAL
    // ==========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (galleryItems.length > 0 && lightbox && lightboxImg) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('.gallery-img');
                const tag = item.querySelector('.gallery-tag');
                
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxCaption.textContent = tag ? tag.textContent : '';
                    lightbox.classList.add('active');
                    body.style.overflow = 'hidden'; // Disable scroll
                }
            });
        });

        // Close functions
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            body.style.overflow = ''; // Restore scroll
        };

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        // Close on clicking overlay (outside the image container)
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
                closeLightbox();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // ==========================================
    // 7. REAL-TIME COUNTDOWN TIMER (PROMOTION)
    // ==========================================
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date();
        
        // Atur target countdown ke akhir bulan berjalan jam 23:59:59
        let targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        
        // Jika sisa waktu sangat sedikit atau sudah lewat (keamanan), buat target bergulir per 3 hari
        let difference = targetDate.getTime() - now.getTime();
        
        if (difference <= 0) {
            // Alternatif target: 3 hari dari sekarang
            targetDate = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000));
            difference = targetDate.getTime() - now.getTime();
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Jalankan timer instan dan atur interval
    if (daysEl) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ==========================================
    // 8. TESTIMONIALS SLIDER
    // ==========================================
    const slider = document.getElementById('testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');

    if (slider && slides.length > 0) {
        let currentIndex = 0;
        let slideInterval;

        const updateSliderPosition = () => {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSliderPosition();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSliderPosition();
        };

        // Event listeners untuk tombol kontrol
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoplay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoplay();
            });
        }

        // Event listeners untuk dots
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                currentIndex = parseInt(e.target.getAttribute('data-index'));
                updateSliderPosition();
                resetAutoplay();
            });
        });

        // Autoplay Logic
        const startAutoplay = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        const resetAutoplay = () => {
            clearInterval(slideInterval);
            startAutoplay();
        };

        startAutoplay();

        // Pause autoplay on mouse hover
        const sliderContainer = document.querySelector('.slider-wrapper');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
            sliderContainer.addEventListener('mouseleave', startAutoplay);
        }
    }

    // ==========================================
    // 9. FAQ ACCORDION
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        const bodyEl = item.querySelector('.faq-body');

        if (header && bodyEl) {
            header.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');

                // Tutup FAQ item lain yang sedang terbuka (opsional, untuk kerapihan layout)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-body').style.maxHeight = null;
                        otherItem.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle status saat ini
                if (isOpen) {
                    item.classList.remove('active');
                    bodyEl.style.maxHeight = null;
                    header.setAttribute('aria-expanded', 'false');
                } else {
                    item.classList.add('active');
                    bodyEl.style.maxHeight = bodyEl.scrollHeight + 'px';
                    header.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });

    // ==========================================
    // 10. WHATSAPP REGISTRATION INTEGRATION
    // ==========================================
    const registrationForm = document.getElementById('registration-form');

    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Mencegah reload halaman

            // Ambil data form
            const nama = document.getElementById('nama').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const umur = document.getElementById('umur').value.trim();
            const gender = document.getElementById('gender').value;
            const program = document.getElementById('program').value;

            // Form Validation dasar
            if (!nama || !whatsapp || !umur || !gender || !program) {
                alert('Silakan lengkapi semua bidang formulir pendaftaran!');
                return;
            }

            // WhatsApp Admin Details
            const adminWA = '6287769862058'; // Sesuai instruksi prompt

            // Format Pesan WhatsApp Sesuai Instruksi
            const message = `Halo Admin Ninety Eight Training Camp,

Saya ingin mendaftar.

Nama: ${nama}
No HP: ${whatsapp}
Umur: ${umur}
Program: ${program}`;

            // Encode string teks ke URL format
            const encodedMessage = encodeURIComponent(message);
            const waURL = `https://wa.me/${adminWA}?text=${encodedMessage}`;

            // Buka link chat di tab baru
            window.open(waURL, '_blank');
        });
    }

    // ==========================================
    // 11. SCROLL TO TOP BUTTON
    // ==========================================
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('active');
            } else {
                scrollToTopBtn.classList.remove('active');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
