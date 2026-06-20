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

    // 3. Navbar background on scroll
    const navbar = document.querySelector('.navbar-wrapper');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
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
        const message = `¡Hola Parliamo CIA! 🇮🇹 Estoy interesado/a en aprender italiano y completé el formulario web:

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
});
