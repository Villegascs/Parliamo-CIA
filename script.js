document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Prevent background scrolling when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }));

    // 3. Directionally-aware Header
    const navbar = document.querySelector('.navbar-wrapper');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        let currentScrollY = window.scrollY;

        // Add scrolled class for background styling
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Directionally-aware hiding logic
        // Only hide if the mobile menu is NOT active
        if (currentScrollY > 100 && !navLinks.classList.contains('active')) {
            if (currentScrollY > lastScrollY) {
                // Scrolling down
                navbar.classList.add('nav-hidden');
            } else {
                // Scrolling up
                navbar.classList.remove('nav-hidden');
            }
        }

        // If we scroll all the way to the top, make sure it's visible
        if (currentScrollY <= 100) {
            navbar.classList.remove('nav-hidden');
        }

        lastScrollY = currentScrollY;
    });

    // 4. Handle Form Submission -> WhatsApp
    const leadForm = document.getElementById('leadForm');

    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values
        const modalidad = document.getElementById('modalidad').value;
        const edad = document.getElementById('edad').value;
        const plidaRadio = document.querySelector('input[name="plida"]:checked');
        const plida = plidaRadio ? plidaRadio.value : 'No especificado';
        const objetivo = document.getElementById('objetivo').value;

        // WhatsApp Number
        const phoneNumber = '584129550860'; // +58 412-9550860

        // Format message
        const message = `¡Hola Parliamo Ciao! 🇮🇹 Estoy interesado/a en aprender italiano y completé el formulario web:

*Modalidad:* ${modalidad}
*Edad:* ${edad} años
*¿Aplica a PLIDA?:* ${plida}
*Mi objetivo principal:* ${objetivo}

Quedo atento/a a su asesoría. ¡Gracias!`;

        // Encode URI
        const encodedMessage = encodeURIComponent(message);

        // Build WhatsApp URL
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');

        // Optional: Reset form after sending
        leadForm.reset();
    });

    // 5. Scroll Reveal Animations (E-Lab Style)
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed for one-time animation
                // observer.unobserve(entry.target); 
            } else {
                // Optional: remove 'active' to animate again when scrolling up
                entry.target.classList.remove('active');
            }
        });
    };

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Number Counter Animation
    const counters = document.querySelectorAll('.counter');
    const animationDuration = 2000; // 2 seconds

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const counter = entry.target;
            
            if (entry.isIntersecting) {
                const target = +counter.getAttribute('data-target');
                const isFormatted = counter.hasAttribute('data-format');
                let startTime = null;

                const updateCount = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / animationDuration, 1);
                    
                    // Ease out expo function for smoother finish
                    const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    
                    const currentCount = Math.floor(easeOutExpo * target);

                    if (isFormatted) {
                        counter.innerText = currentCount.toLocaleString('es-ES');
                    } else {
                        counter.innerText = currentCount;
                    }

                    if (progress < 1) {
                        counter.animationFrameId = requestAnimationFrame(updateCount);
                    } else {
                        if (isFormatted) {
                            counter.innerText = target.toLocaleString('es-ES');
                        } else {
                            counter.innerText = target;
                        }
                    }
                };

                if (counter.animationFrameId) {
                    cancelAnimationFrame(counter.animationFrameId);
                }
                counter.animationFrameId = requestAnimationFrame(updateCount);
                
            } else {
                // Resetear al salir de la pantalla para que anime de nuevo
                if (counter.animationFrameId) {
                    cancelAnimationFrame(counter.animationFrameId);
                }
                counter.innerText = "0";
            }
        });
    }, { threshold: 0.1 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // 6. Remove hash from URL on load to keep the URL clean
    if (window.location.hash) {
        setTimeout(() => {
            history.replaceState(null, null, window.location.pathname + window.location.search);
        }, 10);
    }



    // 8. Combobox Logic (Shadcn UI style without search)
    const comboboxes = document.querySelectorAll('.combobox-wrapper');

    comboboxes.forEach(wrapper => {
        const trigger = wrapper.querySelector('.combobox-trigger');
        const content = wrapper.querySelector('.combobox-content');
        const options = wrapper.querySelectorAll('.combobox-option');
        const hiddenInput = wrapper.querySelector('input[type="hidden"]');
        const valueDisplay = trigger.querySelector('.combobox-value');

        // Toggle open/close
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                closeCombobox();
            } else {
                openCombobox();
            }
        });

        function openCombobox() {
            trigger.setAttribute('aria-expanded', 'true');
            content.removeAttribute('hidden');
        }

        function closeCombobox() {
            trigger.setAttribute('aria-expanded', 'false');
            content.setAttribute('hidden', '');
        }

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                closeCombobox();
            }
        });

        // Selection
        options.forEach(option => {
            option.addEventListener('click', () => {
                // Remove selected class from all
                options.forEach(opt => opt.classList.remove('selected'));

                // Add selected class to clicked
                option.classList.add('selected');

                // Update values
                const value = option.getAttribute('data-value');
                const text = option.querySelector('.option-text').textContent;

                hiddenInput.value = value;
                valueDisplay.textContent = text;
                trigger.classList.add('has-value');

                closeCombobox();
            });
        });
    });

    // 9. Smooth Scroll Initialization (Lenis or Native fallback)
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            lerp: 0.08, // Gives a very controlled, smooth, high-end feel
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Make anchor links smooth scroll using Lenis
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Offset by -80 to account for the fixed sticky navbar
                        lenis.scrollTo(targetElement, { offset: -80 });
                    }
                }
                // Asegurar que la URL se mantiene limpia sin el hash
                history.replaceState(null, null, window.location.pathname + window.location.search);
            });
        });
    } else {
        // Fallback nativo si Lenis falla
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
                // Asegurar que la URL se mantiene limpia sin el hash
                history.replaceState(null, null, window.location.pathname + window.location.search);
            });
        });
    }

    // 10. Pre-select Modalidad when clicking on pill buttons
    const pillButtons = document.querySelectorAll('.modalidad-pill-btn');
    pillButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const preselectValue = btn.getAttribute('data-preselect');
            if (preselectValue) {
                const targetOption = document.querySelector(`.combobox-option[data-value="${preselectValue}"]`);
                if (targetOption) {
                    targetOption.click();
                }
            }
        });
    });

    // 11. Video Facades (Load iframe on click)
    document.querySelectorAll('.video-facade').forEach(facade => {
        facade.addEventListener('click', () => {
            const videoId = facade.getAttribute('data-video-id');
            if (videoId) {
                const iframe = document.createElement('iframe');
                iframe.src = `https://player.mediadelivery.net/play/690762/${videoId}?autoplay=true&loop=false&muted=false&preload=true&responsive=true`;
                iframe.style.cssText = "border:0;position:absolute;top:50%;left:-5px;width:calc(100% + 10px);height:142.22%;transform:translateY(calc(-50% - 50px));";
                iframe.allow = "accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;";
                iframe.setAttribute('allowfullscreen', 'true');
                
                facade.innerHTML = '';
                facade.appendChild(iframe);
                facade.style.cursor = 'default';
                facade.classList.remove('video-facade');
            }
        });
    });
});
