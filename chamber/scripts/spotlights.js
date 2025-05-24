document.addEventListener('DOMContentLoaded', function() {
    fetch('data/members.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            displayRandomSpotlights(data.members);
        })
        .catch(error => {
            console.error('Error loading member data:', error);
            document.getElementById('spotlight-container').innerHTML = `
                <div class="error-message">
                    <p>Featured members will be displayed here soon.</p>
                </div>
            `;
        });

    function displayRandomSpotlights(members) {
        const container = document.getElementById('spotlight-container');
        container.innerHTML = '';

        // Filter Gold (3) and Silver (2) members
        const qualifiedMembers = members.filter(member => 
            member.membershipLevel === 2 || member.membershipLevel === 3
        );

        // Shuffle and select 2-3 members
        const shuffled = [...qualifiedMembers].sort(() => 0.5 - Math.random());
        const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
        const selected = shuffled.slice(0, count);

        selected.forEach(member => {
            const membershipLevel = member.membershipLevel === 3 ? 'Gold' : 'Silver';
            
            const card = document.createElement('div');
            card.className = 'spotlight-card';
            card.innerHTML = `
                <div class="spotlight-header">
                    <h3>${member.name}</h3>
                    <span class="membership-badge ${membershipLevel.toLowerCase()}">
                        ${membershipLevel} Member
                    </span>
                </div>
                <div class="spotlight-body">
                    <p class="tagline">${member.description}</p>
                    <div class="contact-info">
                        <p><strong>Address:</strong> ${member.address}</p>
                        <p><strong>Phone:</strong> ${member.phone}</p>
                        <p><strong>Website:</strong> 
                            <a href="${member.website}" target="_blank" rel="noopener">
                                ${member.website.replace(/^https?:\/\//, '')}
                            </a>
                        </p>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        if (selected.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <p>Check back soon for featured members!</p>
                </div>
            `;
        }
    }
});