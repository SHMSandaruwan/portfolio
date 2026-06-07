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
            "Building Scalable GenAI & Cloud Solutions.",
            "Architecting Enterprise ERP & CRM Platforms.",
            "Developing High-Performance Web & Mobile Apps.",
            "Delivering High-ROI Business Systems."
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
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

            let typeSpeed = 80;

            if (isDeleting) {
                typeSpeed /= 2;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1000);
    }

    // Experience Tabs Switcher
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
    
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab");
            
            tabBtns.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));
            
            btn.classList.add("active");
            const activeContent = document.getElementById(`content-${targetTab}`);
            if (activeContent) {
                activeContent.classList.add("active");
            }
        });
    });

    // Projects Filter, Search & Load More
    const searchInput = document.getElementById("project-search");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    const btnLoadMore = document.getElementById("btn-load-more");
    const loadMoreContainer = document.getElementById("load-more-container");
    
    let currentFilter = "all";
    const INITIAL_LIMIT = 6;
    let showingAll = false;

    function updateProjects() {
        let visibleCount = 0;
        let matchCount = 0;
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
        
        projectCards.forEach(card => {
            const categoryAttr = card.getAttribute("data-category") || "";
            const tagsAttr = card.getAttribute("data-tags") || "";
            const title = card.querySelector("h3") ? card.querySelector("h3").textContent.toLowerCase() : "";
            const description = card.querySelector(".project-description") ? card.querySelector(".project-description").textContent.toLowerCase() : "";
            
            const categories = categoryAttr.split(" ");
            const tags = tagsAttr.split(" ");
            
            // Check category filter
            const matchesFilter = currentFilter === "all" || categories.includes(currentFilter);
            
            // Check search query matches title, description, or tags
            const matchesSearch = query === "" || 
                                  title.includes(query) || 
                                  description.includes(query) || 
                                  tags.some(tag => tag.includes(query));
            
            if (matchesFilter && matchesSearch) {
                matchCount++;
                if (showingAll || visibleCount < INITIAL_LIMIT) {
                    card.classList.remove("hidden");
                    // Apply subtle animations to newly filtered items
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 50);
                    visibleCount++;
                } else {
                    card.classList.add("hidden");
                    card.style.opacity = "0";
                    card.style.transform = "translateY(15px)";
                }
            } else {
                card.classList.add("hidden");
                card.style.opacity = "0";
                card.style.transform = "translateY(15px)";
            }
        });
        
        // Show or hide the Load More container
        if (loadMoreContainer) {
            if (matchCount > INITIAL_LIMIT && !showingAll) {
                loadMoreContainer.style.display = "flex";
            } else {
                loadMoreContainer.style.display = "none";
            }
        }
    }

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            showingAll = false; // Reset pagination limit on typing
            updateProjects();
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.getAttribute("data-filter");
            showingAll = false; // Reset pagination limit on filter switch
            updateProjects();
        });
    });

    if (btnLoadMore) {
        btnLoadMore.addEventListener("click", () => {
            showingAll = true;
            updateProjects();
        });
    }

    // Initial run
    updateProjects();
});
