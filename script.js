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
        const phoneNumber = '584244745917'; // +58 424-4745917

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

    // 6. Smooth Scroll Without Changing URL Hash
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 7. Preloader Intro Animation
    const preloader = document.getElementById('preloader');
    const preloaderText = document.getElementById('preloader-text');
    const textContainer = document.querySelector('.preloader-text-container');
    
    if (preloader && preloaderText) {
        const phrases = [
            "Bienvenido a Parliamo Ciao",
            "Welcome to Parliamo Ciao",
            "Bienvenue à Parliamo Ciao",
            "Benvenuto a Parliamo Ciao"
        ];
        
        let currentPhrase = 0;
        
        // Prevent scrolling while preloader is active
        document.body.style.overflow = 'hidden';
        
        const changeText = () => {
            currentPhrase++;
            if (currentPhrase < phrases.length) {
                // Fade out text
                textContainer.classList.add('fade-out');
                
                setTimeout(() => {
                    // Change text and fade back in
                    preloaderText.textContent = phrases[currentPhrase];
                    textContainer.classList.remove('fade-out');
                    
                    // Wait then change again
                    setTimeout(changeText, 800); 
                }, 400); // 400ms fade out duration
            } else {
                // Intro finished, hide preloader
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    document.body.style.overflow = '';
                    
                    // Trigger scroll event to ensure animations check their state
                    window.dispatchEvent(new Event('scroll'));
                }, 800);
            }
        };
        
        // Start animation after initial delay
        setTimeout(changeText, 1200);
    }
});
