document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;
    
    // Update last modified date
    document.getElementById('lastModified').textContent = `Last Update: ${document.lastModified}`;
}); 