document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------
    // 1. Sticky Navigation Bar
    // -------------------------------------------------------------------
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Add/remove 'sticky' class based on scroll position
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Highlight active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // -------------------------------------------------------------------
    // 2. Smooth Scrolling
    // -------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // -------------------------------------------------------------------
    // 3. Typing Animation (Hero Section)
    // -------------------------------------------------------------------
    const typedTextSpan = document.querySelector('.animated-text');
    const textArray = ["THARANI KRISHNA AM", "Aspiring AI/ML Engineer"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            // Delete character
            typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Type character
            typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = 100;

        if (isDeleting) {
            typingSpeed /= 2; // Faster deletion
        }

        if (!isDeleting && charIndex === currentText.length + 1) {
            typingSpeed = 2000; // Pause at end of sentence
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length; // Move to next text
            typingSpeed = 500; // Pause before start typing again
        }

        setTimeout(type, typingSpeed);
    }

    // Start the typing animation
    type();

    // -------------------------------------------------------------------
    // 4. Scroll Reveal Animation
    // -------------------------------------------------------------------
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Optional: Remove 'visible' class if you want the animation to reset on scroll back up
                // entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the item is visible
    });

    // Apply animation to all sections and cards
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    document.querySelectorAll('.card').forEach((el) => observer.observe(el));


    // Inject CSS for the scroll-reveal effect
    const style = document.createElement('style');
    style.textContent = `
        /* Hidden state */
        .reveal {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 1s ease-out, transform 1s ease-out;
        }
        
        /* Visible state */
        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Apply to card elements too (using a different class if desired) */
        .card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .card.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // -------------------------------------------------------------------
    // 5. Contact Form Validation and Submission (Basic)
    // -------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        formMessage.classList.add('hidden');
        formMessage.classList.remove('success', 'error');

        // Basic validation check (required attributes handle most of it)
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            formMessage.textContent = 'Please fill out all fields.';
            formMessage.classList.add('error');
            formMessage.classList.remove('hidden');
            return;
        }

        // Simulate form submission success
        setTimeout(() => {
            formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            formMessage.classList.add('success');
            formMessage.classList.remove('hidden');
            contactForm.reset();
        }, 1000);
        
        // NOTE: For a real portfolio, you would replace the above 'setTimeout'
        // with an actual 'fetch' or 'XMLHttpRequest' to send data to a backend service 
        // (like Formspree, Netlify Forms, or a custom API endpoint).
    });
    
    // Set Current Year in Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
