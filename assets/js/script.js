// assets/js/script.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. GESTION DE L'ÉCRAN DE CHARGEMENT (LOADER)
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    const loadDuration = 1700; // 1.70 secondes

    // Cache le loader et affiche le contenu principal après le délai
    setTimeout(function() {
        // Ajout d'une transition pour le fondu du loader
        loader.style.opacity = '0';
        
        // Après la transition, on masque l'élément
        setTimeout(function() {
            loader.classList.add('hidden');
            mainContent.classList.remove('hidden');
        }, 500); // 500ms est la durée de la transition CSS du loader
        
    }, loadDuration);


    // 2. GESTION DE LA BARRE LATÉRALE (SIDEBAR)
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        // Optionnel: changer l'icône du hamburger en "X" si vous voulez
        // this.querySelector('i').classList.toggle('fa-bars');
        // this.querySelector('i').classList.toggle('fa-times');
    });

    // Fermer la sidebar si l'on clique en dehors (ou sur un lien)
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (sidebar.classList.contains('open') && !isClickInsideSidebar && !isClickOnToggle) {
            sidebar.classList.remove('open');
        }
    });


    // 3. GESTION DES ONGLES (TABS)
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // Fonction pour afficher le bon onglet
    function showTab(targetId) {
        // Cacher tous les contenus d'onglet
        tabContents.forEach(tab => {
            tab.classList.add('hidden');
            tab.classList.remove('active');
        });

        // Afficher l'onglet cible
        const activeTab = document.getElementById(targetId);
        if (activeTab) {
            activeTab.classList.remove('hidden');
            activeTab.classList.add('active');
        }
    }

    // Écouteurs d'événements pour les liens de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Empêche le changement de page
            const target = this.dataset.tab;
            showTab(target);
            sidebar.classList.remove('open'); // Ferme la sidebar après la sélection
        });
    });
    
    // Assurez-vous que le premier onglet est affiché au démarrage
    if (tabContents.length > 0) {
        showTab(tabContents[0].id);
    }
});