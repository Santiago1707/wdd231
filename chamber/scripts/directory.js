document.addEventListener('DOMContentLoaded', () => {
    loadMembers();
});

async function loadMembers() {
    const container = document.getElementById('directory-container');
    
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Failed to load members.json');
        }

        const data = await response.json();
        const members = data.members;

        container.innerHTML = ''; // Clear any existing cards

        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('business-card');

            let membershipBadge = '';
            switch (member.membershipLevel) {
                case 3:
                    membershipBadge = '<span class="membership-badge gold">Gold Member</span>';
                    break;
                case 2:
                    membershipBadge = '<span class="membership-badge silver">Silver Member</span>';
                    break;
                case 1:
                    membershipBadge = '<span class="membership-badge">Member</span>';
                    break;
            }

            card.innerHTML = `
                <div class="card-header">
                    <img src="images/${member.image}" alt="${member.name} logo">
                    <h3>${member.name}</h3>
                    ${membershipBadge}
                </div>
                <div class="card-body">
                    <p class="tagline">${member.description}</p>
                    <div class="contact-info">
                        <p><strong>Address:</strong> ${member.address}</p>
                        <p><strong>Phone:</strong> ${member.phone}</p>
                        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website.replace('https://', '')}</a></p>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading members:', error);
        container.innerHTML = '<p class="error">Could not load members at this time.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const gridBtn = document.getElementById('grid-view');
    const listBtn = document.getElementById('list-view');
    const container = document.getElementById('directory-container');

    gridBtn.addEventListener('click', () => {
        container.classList.add('grid-view');
        container.classList.remove('list-view');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    });

    listBtn.addEventListener('click', () => {
        container.classList.add('list-view');
        container.classList.remove('grid-view');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    });
});
