document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS Animation Library
    AOS.init({
        once: true, // whether animation should happen only once - while scrolling down
        offset: 50, // offset (in px) from the original trigger point
        duration: 800, // values from 0 to 3000, with step 50ms
        easing: 'ease-out-cubic', // default easing for AOS animations
    });

    // 2. Set Current Year in Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // 3. Typing Effect
    const text = "Software Engineer";
    const typingElement = document.getElementById("typing");
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Optional: Add a blinking cursor effect after typing finishes
            typingElement.style.borderRight = "2px solid var(--accent-color)";
            typingElement.style.animation = "blink 1s step-end infinite";
        }
    }

    // Add cursor animation via dynamic style
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes blink {
            from, to { border-color: transparent }
            50% { border-color: var(--accent-color) }
        }
    `;
    document.head.appendChild(style);

    // Start typing effect with a slight delay
    setTimeout(typeWriter, 500);

    // 4. Counter Animation for Achievement Banner
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    // Intersection Observer to trigger counters only when in view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                
                const updateCount = () => {
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
                observer.unobserve(counter); // Stop observing once animated
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // 5. Navbar Scroll Effect & ScrollSpy implementation
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Navbar glassmorphism enhancement on scroll
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(9, 9, 11, 0.9)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(9, 9, 11, 0.7)';
            navbar.style.boxShadow = 'none';
        }

        // Active link switching
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id') || '';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });

});
