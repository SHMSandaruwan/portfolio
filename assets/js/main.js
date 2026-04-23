document.addEventListener("DOMContentLoaded", () => {
    
    // Preloader
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    // Mouse Move Animation
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.opacity = '1';
            // Use requestAnimationFrame for smoother performance if needed, but direct style update works well for simple glow
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });

        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
    }

    // Scroll Reveal functionality using Intersection Observer
    const reveals = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const words = [
            "Building Scalable GenAI & AWS Solutions.",
            "Architecting Robust Cloud Infrastructure.",
            "Developing High-Performance Web Apps.",
            "Delivering High-ROI Digital Products."
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        // Clear initial text
        typewriterElement.textContent = '';

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = 80; // typing speed

            if (isDeleting) {
                typeSpeed /= 2; // deleting is faster
            }

            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at the end of the word
                typeSpeed = 2500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Switch to next word
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before typing the next word
            }

            setTimeout(type, typeSpeed);
        }

        // Start typing after a short delay
        setTimeout(type, 1000);
    }
});
