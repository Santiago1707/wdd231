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
