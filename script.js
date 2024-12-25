document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Service Card Hover Effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.backgroundColor = '#2c3e50';
        });
        card.addEventListener('mouseout', () => {
            card.style.backgroundColor = '';
        });
    });

    // Form Submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email, message });
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
    });

    // Animated Counter for Services
    const animateCounter = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Add counters to service cards
    serviceCards.forEach((card, index) => {
        const counter = document.createElement('div');
        counter.classList.add('service-counter');
        counter.textContent = '0';
        card.appendChild(counter);

        // Animate counter when card comes into view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounter(counter, 0, (index + 1) * 25, 2000);
                observer.unobserve(card);
            }
        });
        observer.observe(card);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const hero = document.getElementById('hero');
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = scrollPosition * 0.7 + 'px';
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('#hero h1');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    typeWriter();

    // Interactive portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('expanded');
            if (item.classList.contains('expanded')) {
                const description = document.createElement('p');
                description.textContent = 'Click to view more details about this project.';
                description.classList.add('portfolio-description');
                item.appendChild(description);
            } else {
                const description = item.querySelector('.portfolio-description');
                if (description) {
                    item.removeChild(description);
                }
            }
        });});

    // Animated social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            icon.style.transform = 'scale(1.2)';
        });
        icon.addEventListener('mouseout', () => {
            icon.style.transform = 'scale(1)';
        });
    });

    // Live crypto price ticker
    const createCryptoPriceTicker = () => {
        const ticker = document.createElement('div');
        ticker.id = 'crypto-ticker';
        ticker.style.position = 'fixed';
        ticker.style.bottom = '20px';
        ticker.style.left = '20px';
        ticker.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        ticker.style.padding = '10px';
        ticker.style.borderRadius = '5px';
        document.body.appendChild(ticker);

        const updatePrices = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
                const data = await response.json();
                ticker.innerHTML = `
                    <span>BTC: $${data.bitcoin.usd}</span>
                    <span style="margin-left: 10px;">ETH: $${data.ethereum.usd}</span>
                `;
            } catch (error) {
                console.error('Error fetching crypto prices:', error);
            }
        };

        updatePrices();
        setInterval(updatePrices, 60000); // Update every minute
    };

    createCryptoPriceTicker();
});