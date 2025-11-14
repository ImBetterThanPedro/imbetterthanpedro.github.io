// ============================================
// MODERN OPTIMIZED JAVASCRIPT
// Ultra Smooth & Beautiful Interactions
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // --- ÉLÉMENTS DU DOM & CONSTANTES ---
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const mainWrapper = document.getElementById('main-content'); 
    const loadDuration = 1700; // 1.70 secondes

    // Éléments Pieds2Marceau
    const videoFrame = document.querySelector('.video-frame');
    const rickVideo = document.getElementById('rick-video');
    let rickTimeout = null; 

    // Éléments Credits
    const creditPhoto = document.getElementById('credit-photo');
    const creditName = document.getElementById('credit-name');
    const creditDescription = document.getElementById('credit-description');
    const nextButton = document.getElementById('next-credit');

    // Protagonistes des crédits
    const protagonists = [
        {
            name: "Esteban",
            image: "assets/images/estbn.png",
            description: "Esteban était en charge de la conception graphique initiale, de la gestion du design CSS de la sidebar et de l'intégration de la vidéo de fond."
        },
        {
            name: "Raphaël",
            image: "assets/images/rfl.png",
            description: "Raphaël a principalement développé la logique JavaScript : le loader, la gestion des onglets, l'animation du Rickroll et la navigation entre les pages de crédits."
        }
    ];
    let currentProtagonistIndex = 0;

    // --- Performance: Preload videos ---
    function preloadVideos() {
        const videos = document.querySelectorAll('video[preload="auto"]');
        videos.forEach(video => {
            video.load();
        });
    }

    // --- Smooth fade transitions ---
    function fadeOut(element, duration = 300) {
        return new Promise((resolve) => {
            element.style.transition = `opacity ${duration}ms ease-out`;
            element.style.opacity = '0';
            setTimeout(() => {
                element.classList.add('hidden');
                resolve();
            }, duration);
        });
    }

    function fadeIn(element, duration = 300) {
        return new Promise((resolve) => {
            element.classList.remove('hidden');
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.transition = `opacity ${duration}ms ease-out`;
                element.style.opacity = '1';
                setTimeout(resolve, duration);
            }, 10);
        });
    }

    // 1. GESTION DE L'ÉCRAN DE CHARGEMENT (LOADER) - Enhanced
    setTimeout(function() {
        fadeOut(loader, 600).then(() => {
            mainContent.classList.remove('hidden');
            fadeIn(mainContent, 400);
            preloadVideos();
        });
    }, loadDuration);

    // --- Enhanced Sidebar Toggle with Animation ---
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = sidebar.classList.contains('open');
        
        if (isOpen) {
            sidebar.classList.remove('open');
            menuToggle.style.transform = 'rotate(0deg)';
        } else {
            sidebar.classList.add('open');
            menuToggle.style.transform = 'rotate(90deg)';
        }
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (sidebar.classList.contains('open') && !isClickInsideSidebar && !isClickOnToggle) {
            sidebar.classList.remove('open');
            menuToggle.style.transform = 'rotate(0deg)';
        }
    });

    // Add active class to sidebar items
    function updateActiveSidebarItem(targetId) {
        navLinks.forEach(link => {
            const parentLi = link.closest('li');
            if (link.dataset.tab === targetId) {
                link.classList.add('active-link');
                parentLi?.classList.add('active-item');
            } else {
                link.classList.remove('active-link');
                parentLi?.classList.remove('active-item');
            }
        });
    }

    // 3. GESTION DES ONGLETS (TABS) - Enhanced with smooth transitions

    // Fonction de réinitialisation de Pieds2Marceau
    function resetPieds2Marceau() {
        clearTimeout(rickTimeout);
        if (rickVideo) {
            rickVideo.pause();
            rickVideo.currentTime = 0;
            rickVideo.classList.remove('play-visible');
        }
        if (videoFrame) {
            videoFrame.classList.remove('fullscreen-zoom');
        }
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        }
    }

    // Fonction de mise à jour des crédits avec animation améliorée
    function updateCredits(index) {
        const p = protagonists[index];
        
        // Smooth fade transition
        if (creditPhoto) {
            creditPhoto.style.transition = 'opacity 0.4s ease';
            creditPhoto.style.opacity = '0';
        }
        if (creditName) {
            creditName.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            creditName.style.opacity = '0';
            creditName.style.transform = 'translateY(-10px)';
        }
        if (creditDescription) {
            creditDescription.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            creditDescription.style.opacity = '0';
            creditDescription.style.transform = 'translateY(10px)';
        }
        
        setTimeout(() => {
            if (creditPhoto) {
                creditPhoto.src = p.image;
                creditPhoto.style.opacity = '1';
            }
            if (creditName) {
                creditName.textContent = p.name;
                creditName.style.opacity = '1';
                creditName.style.transform = 'translateY(0)';
            }
            if (creditDescription) {
                creditDescription.textContent = p.description;
                creditDescription.style.opacity = '1';
                creditDescription.style.transform = 'translateY(0)';
            }

            // Masquer le bouton "Next" sur le dernier élément
            if (nextButton) {
                if (index === protagonists.length - 1) {
                    nextButton.style.display = 'none';
                } else {
                    nextButton.style.display = 'block';
                    // Animation du bouton
                    nextButton.style.animation = 'none';
                    setTimeout(() => {
                        nextButton.style.animation = 'pulse 0.5s ease';
                    }, 10);
                }
            }
        }, 400);
    }

    // Fonction principale pour afficher le bon onglet avec transitions fluides
    async function showTab(targetId) {
        
        // Réinitialiser la tab spéciale si l'on quitte
        if (targetId !== 'pieds2marceau') {
            resetPieds2Marceau();
        }
        
        // Fade out tous les contenus d'onglet actifs
        const activeTabs = document.querySelectorAll('.tab-content:not(.hidden)');
        for (const tab of activeTabs) {
            await fadeOut(tab, 200);
        }

        // Cacher tous les contenus d'onglet et désactiver les liens
        tabContents.forEach(tab => {
            tab.classList.add('hidden');
            tab.classList.remove('active');
        });

        // Mettre à jour la sidebar active
        updateActiveSidebarItem(targetId);

        // Afficher l'onglet cible avec fade in
        const activeTab = document.getElementById(targetId);
        if (activeTab) {
            activeTab.classList.remove('hidden');
            activeTab.classList.add('active');
            await fadeIn(activeTab, 300);
        }

        // Logique spécifique à l'ouverture de l'onglet Credits
        if (targetId === 'credits') {
            currentProtagonistIndex = 0;
            updateCredits(currentProtagonistIndex);
        }

        // ********** LOGIQUE SPÉCIALE POUR PIEDS2MARCEAU **********
        if (targetId === 'pieds2marceau' && rickVideo && videoFrame) {
            
            // 1. Lancer la tentative de Fullscreen (doit être fait par action utilisateur)
            const fullscreenPromise = mainWrapper.requestFullscreen?.() ||
                mainWrapper.webkitRequestFullscreen?.() ||
                mainWrapper.msRequestFullscreen?.() ||
                Promise.resolve();

            fullscreenPromise.catch(err => {
                console.log("Fullscreen not available:", err);
            });

            // 2. Démarrer l'animation de zoom et la lecture de la vidéo (muette)
            setTimeout(() => {
                videoFrame.classList.add('fullscreen-zoom');
                
                rickVideo.play().catch(error => {
                    console.error("Video playback failed:", error);
                });
                
                // Smooth fade in for video
                setTimeout(() => {
                    rickVideo.classList.add('play-visible');
                }, 100);

                // 3. Retour automatique au Hub après 10s (zoom) + 2s (attente) = 12000ms
                rickTimeout = setTimeout(() => {
                    showTab('hub'); // Retour au Hub
                    sidebar.classList.remove('open');
                    menuToggle.style.transform = 'rotate(0deg)';
                }, 12000); 

            }, 50); 
        }
    }

    // Écouteurs d'événements pour les liens de navigation avec smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.dataset.tab;
            
            // Close sidebar smoothly
            sidebar.classList.remove('open');
            menuToggle.style.transform = 'rotate(0deg)';
            
            // Show tab with animation
            showTab(target);
        });

        // Add hover effect
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Écouteur d'événement pour le bouton "Next" des crédits avec animation
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            if (currentProtagonistIndex < protagonists.length - 1) {
                currentProtagonistIndex++;
                updateCredits(currentProtagonistIndex);
                
                // Button click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    }

    // --- Keyboard Navigation Support ---
    document.addEventListener('keydown', function(e) {
        // ESC to close sidebar
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            menuToggle.style.transform = 'rotate(0deg)';
        }
        
        // Arrow keys for credits navigation
        const creditsTab = document.getElementById('credits');
        if (!creditsTab.classList.contains('hidden')) {
            if (e.key === 'ArrowRight' && currentProtagonistIndex < protagonists.length - 1) {
                currentProtagonistIndex++;
                updateCredits(currentProtagonistIndex);
            } else if (e.key === 'ArrowLeft' && currentProtagonistIndex > 0) {
                currentProtagonistIndex--;
                updateCredits(currentProtagonistIndex);
            }
        }
    });

    // --- Intersection Observer for performance (lazy animations) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.willChange = 'auto';
            }
        });
    }, observerOptions);

    // Observe all tab contents
    tabContents.forEach(tab => {
        observer.observe(tab);
    });

    // --- Preload images for credits ---
    function preloadCreditImages() {
        protagonists.forEach(p => {
            const img = new Image();
            img.src = p.image;
        });
    }
    preloadCreditImages();

    // --- Create subtle floating particles effect ---
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer || window.innerWidth < 768) return;

        const particleCount = 15;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 3 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(0, 255, 127, 0.4)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px rgba(0, 255, 127, 0.5)`;
            particle.style.animation = `float ${Math.random() * 20 + 15}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Initialize particles after page load
    setTimeout(createParticles, 2000);
    
    // Afficher l'onglet "Hub" par défaut au démarrage
    showTab('hub');
});
