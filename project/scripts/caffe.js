document.addEventListener("DOMContentLoaded", function () {
    // Hamburger menu functionality
    const hamburger = document.querySelector('#menu');
    const navigation = document.querySelector('nav');

    if (hamburger && navigation) {
        hamburger.addEventListener('click', function () {
            document.body.classList.toggle('show');
        });

        // Close menu when clicking a menu item (for mobile)
        document.querySelectorAll('.navigation a').forEach(link => {
            link.addEventListener('click', function () {
                document.body.classList.remove('show'); // Close menu
            });
        });
        }
    });

    // Reservation form submission handling
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent page reload
            alert('Reservation submitted successfully!'); // Success message
            reservationForm.reset(); // Reset form
        });
    }


    // Get the modal
var modal = document.getElementById("orderModal");

// Get the button that opens the modal
var btn = document.getElementById("orderButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Form submission handler (optional)
document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Your order has been submitted!");
    modal.style.display = "none"; // Close the modal after submission
});

    // Data Fetching and Dynamic Content
    async function fetchAndDisplayCoffees() {
    try {
    const response = await fetch('../data/coffees.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();

    // Filter featured coffees (demonstrating array method)
    const featuredCoffees = data.coffees.filter(coffee => coffee.price < 5);

    // Display coffees (demonstrating array method)
    const coffeeContainer = document.getElementById('coffee-container');
    if (coffeeContainer) {
        featuredCoffees.forEach(coffee => {
        const card = document.createElement('div');
        card.className = 'coffee-card';
        card.innerHTML = `
            <h3>${coffee.name}</h3>
            <p>${coffee.description}</p>
            <p>Origin: ${coffee.origin}</p>
            <p>Price: $${coffee.price.toFixed(2)}</p>
        `;
        coffeeContainer.appendChild(card);
        });
    }

    // Store in local storage
    localStorage.setItem('coffeeData', JSON.stringify(data));
    } catch (error) {
    console.error('Error:', error);
    }
    }

    // Modal functionality (existing)
    document.addEventListener("DOMContentLoaded", function () {
    fetchAndDisplayCoffees();

    // Hamburger menu
    const hamburger = document.querySelector('#menu');
    if (hamburger) {
    hamburger.addEventListener('click', function () {
        document.body.classList.toggle('show');
    });
    }

    // Modal
    const modal = document.getElementById("orderModal");
    const btn = document.getElementById("orderButton");
    const span = document.getElementsByClassName("close")[0];

    if (btn) btn.onclick = () => modal.style.display = "block";
    if (span) span.onclick = () => modal.style.display = "none";

    window.onclick = function(event) {
    if (event.target == modal) modal.style.display = "none";
    };

    // Form submission
    const orderForm = document.getElementById("orderForm");
    if (orderForm) {
    orderForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const coffeeType = document.getElementById("coffee").value;
        const quantity = document.getElementById("quantity").value;
        
        // Store order in local storage
        const order = { coffeeType, quantity, date: new Date() };
        localStorage.setItem('lastOrder', JSON.stringify(order));
        
        alert(`Order placed for ${quantity} ${coffeeType}(s)!`);
        modal.style.display = "none";
    });
    }
    });