// assets/js/script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // --- ÉLÉMENTS DU DOM ---
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const mainWrapper = document.getElementById('main-content'); 

    // Éléments spécifiques à l'onglet Pieds2Marceau
    const videoFrame = document.querySelector('.video-frame');
    const rickVideo = document.getElementById('rick-video');
    const loadDuration = 1700; // 1.70 secondes


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
        // Arrêter la vidéo et réinitialiser
        if (rickVideo) {
            rickVideo.pause();
            rickVideo.currentTime = 0;
            rickVideo.classList.remove('play-visible');
        }
        // Réinitialiser la taille du cadre
        if (videoFrame) {
            videoFrame.classList.remove('fullscreen-zoom');
        }
        // Quitter le mode plein écran si actif
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }

    // Fonction principale pour afficher le bon onglet et gérer les actions spéciales
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

        // ********** LOGIQUE SPÉCIALE POUR PIEDS2MARCEAU **********
        if (targetId === 'pieds2marceau') {
            
            // 1. Lancer la tentative de Fullscreen (doit être fait par action utilisateur)
            if (mainWrapper.requestFullscreen) {
                mainWrapper.requestFullscreen();
            } else if (mainWrapper.webkitRequestFullscreen) { // Safari et anciens Chrome
                mainWrapper.webkitRequestFullscreen();
            } else if (mainWrapper.msRequestFullscreen) { // IE/Edge
                mainWrapper.msRequestFullscreen();
            }

            // 2. Démarrer l'animation de zoom et la lecture de la vidéo (muette)
            // L'animation CSS dure 10 secondes.
            setTimeout(() => {
                videoFrame.classList.add('fullscreen-zoom');
                
                // Mettre la vidéo visible et la lancer
                rickVideo.play().catch(error => {
                    // Gestion des erreurs de lecture automatique (si muted n'est pas suffisant)
                    console.error("Video playback failed, likely due to browser policy:", error);
                });
                rickVideo.classList.add('play-visible');

            }, 50); // Petit délai pour s'assurer que l'UI réagisse bien
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
    
    // Afficher l'onglet "Hub" par défaut au démarrage
    showTab('hub');
});