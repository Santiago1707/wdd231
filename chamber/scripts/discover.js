document.addEventListener('DOMContentLoaded', function() {
    fetch('data/montreal-attractions.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.cards-container');
            
            data.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = 'card';
                
                // Add specific class for each attraction for potential custom styling
                card.classList.add(`attraction-${index + 1}`);
                
                card.innerHTML = `
                    <h2>${item.name}</h2>
                    <figure>
                        <img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
                    </figure>
                    <address>${item.address}</address>
                    <p>${item.description}</p>
                    <button aria-label="Learn more about ${item.name}">Learn More</button>
                `;
                
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading attractions data:', error));
});

document.addEventListener('DOMContentLoaded', function() {
    const visitMessageElement = document.getElementById('visit-message');
    const now = Date.now(); // Current time in milliseconds
    const lastVisit = localStorage.getItem('lastVisit'); // Get last visit from localStorage

    if (lastVisit) {
        const daysBetween = Math.round((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24)); // Calculate days

        if (daysBetween < 1) {
            visitMessageElement.textContent = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            visitMessageElement.textContent = "You last visited 1 day ago.";
        } else {
            visitMessageElement.textContent = `You last visited ${daysBetween} days ago.`;
        }
    } else {
        visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
    }

    // Store the current visit time for the next visit
    localStorage.setItem('lastVisit', now);
});