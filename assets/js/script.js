// assets/js/script.js

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


    // 1. GESTION DE L'ÉCRAN DE CHARGEMENT (LOADER)
    setTimeout(function() {
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.classList.add('hidden');
            mainContent.classList.remove('hidden');
        }, 500);
    }, loadDuration);


    // 2. GESTION DE LA BARRE LATÉRALE (SIDEBAR)
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });

    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (sidebar.classList.contains('open') && !isClickInsideSidebar && !isClickOnToggle) {
            sidebar.classList.remove('open');
        }
    });

    // 3. GESTION DES ONGLES (TABS)

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
            document.exitFullscreen();
        }
    }

    // Fonction de mise à jour des crédits
    function updateCredits(index) {
        const p = protagonists[index];
        
        // Transition d'opacité pour le changement d'image
        if (creditPhoto) {
            creditPhoto.style.opacity = 0;
        }
        
        setTimeout(() => {
            if (creditPhoto) creditPhoto.src = p.image;
            if (creditName) creditName.textContent = p.name;
            if (creditDescription) creditDescription.textContent = p.description;
            if (creditPhoto) creditPhoto.style.opacity = 1;

            // Masquer le bouton "Next" sur le dernier élément
            if (nextButton) {
                if (index === protagonists.length - 1) {
                    nextButton.style.display = 'none';
                } else {
                    nextButton.style.display = 'block';
                }
            }
        }, 500); // Délai pour la transition
    }

    // Fonction principale pour afficher le bon onglet
    function showTab(targetId) {
        
        // Réinitialiser la tab spéciale si l'on quitte
        if (targetId !== 'pieds2marceau') {
            resetPieds2Marceau();
        }
        
        // Cacher tous les contenus d'onglet et désactiver les liens
        tabContents.forEach(tab => {
            tab.classList.add('hidden');
            tab.classList.remove('active');
        });
        navLinks.forEach(link => {
            link.classList.remove('active-link');
        });

        // Afficher l'onglet cible
        const activeTab = document.getElementById(targetId);
        if (activeTab) {
            activeTab.classList.remove('hidden');
            activeTab.classList.add('active');
        }

        // Activer le lien correspondant
        const activeNavLink = document.querySelector(`.nav-link[data-tab="${targetId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active-link');
        }

        // Logique spécifique à l'ouverture de l'onglet Credits
        if (targetId === 'credits') {
            currentProtagonistIndex = 0;
            updateCredits(currentProtagonistIndex);
        }

        // ********** LOGIQUE SPÉCIALE POUR PIEDS2MARCEAU **********
        if (targetId === 'pieds2marceau' && rickVideo && videoFrame) {
            
            // 1. Lancer la tentative de Fullscreen (doit être fait par action utilisateur)
            if (mainWrapper.requestFullscreen) {
                mainWrapper.requestFullscreen();
            } else if (mainWrapper.webkitRequestFullscreen) { 
                mainWrapper.webkitRequestFullscreen();
            } else if (mainWrapper.msRequestFullscreen) {
                mainWrapper.msRequestFullscreen();
            }

            // 2. Démarrer l'animation de zoom et la lecture de la vidéo (muette)
            setTimeout(() => {
                videoFrame.classList.add('fullscreen-zoom');
                
                rickVideo.play().catch(error => {
                    console.error("Video playback failed:", error);
                });
                rickVideo.classList.add('play-visible');

                // 3. Retour automatique au Hub après 10s (zoom) + 2s (attente) = 12000ms
                rickTimeout = setTimeout(() => {
                    showTab('hub'); // Retour au Hub
                    sidebar.classList.remove('open');
                }, 12000); 

            }, 50); 
        }
    }

    // Écouteurs d'événements pour les liens de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.dataset.tab;
            showTab(target);
            sidebar.classList.remove('open');
        });
    });

    // Écouteur d'événement pour le bouton "Next" des crédits
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            if (currentProtagonistIndex < protagonists.length - 1) {
                currentProtagonistIndex++;
                updateCredits(currentProtagonistIndex);
            }
        });
    }
    
    // Afficher l'onglet "Hub" par défaut au démarrage
    showTab('hub');
});