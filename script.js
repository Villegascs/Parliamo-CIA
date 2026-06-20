document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if(navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }));

    // 3. Directionally-aware Header
    const navbar = document.querySelector('.navbar-wrapper');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            if (currentScrollY > lastScrollY) {
                // Scrolling down
                navbar.classList.add('nav-hidden');
            } else {
                // Scrolling up
                navbar.classList.remove('nav-hidden');
            }
        } else {
            // At the top
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
});
