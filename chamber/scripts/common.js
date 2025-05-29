document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;
    
    // Update last modified date
    document.getElementById('lastModified').textContent = `Last Update: ${document.lastModified}`;
}); 


    function openModal(id) {
        const modal = document.getElementById(id);
        modal.style.display = 'block';
        modal.querySelector('button').focus(); // Accessibility: focus on close button
    }

    function closeModal(id) {
        const modal = document.getElementById(id);
        modal.style.display = 'none';
    }

    // Optional: close modal on ESC key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
        }
    });
