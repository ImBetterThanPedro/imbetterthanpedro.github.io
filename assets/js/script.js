// This file contains the main JavaScript functionality for the website, including event listeners for buttons and tab interactions.

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.tab-button');
    const tabs = document.querySelectorAll('.tab-content');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.dataset.target;

            // Hide all tabs
            tabs.forEach(tab => {
                tab.style.display = 'none';
            });

            // Show the selected tab
            const activeTab = document.getElementById(target);
            if (activeTab) {
                activeTab.style.display = 'block';
            }
        });
    });

    // Optionally, activate the first tab by default
    if (buttons.length > 0) {
        buttons[0].click();
    }
});