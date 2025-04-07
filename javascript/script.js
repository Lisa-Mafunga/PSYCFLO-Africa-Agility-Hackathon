// active menu navigation

document.addEventListener("DOMContentLoaded", function () {
    const currentLocation = window.location.pathname.split("/").pop(); // Get current page
    const navLinks = document.querySelectorAll(".nav-link a");

    navLinks.forEach((link) => {
        if (link.getAttribute("href") === currentLocation) {
            link.classList.add("active"); // Add active class
        }
    });
});

// hero carousel

const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel-img');

let index = 0;
const totalSlides = images.length;

function nextSlide() {
    index = (index + 1) % totalSlides;
    carousel.style.transform = `translateX(${-index * 50}%)`;
}

// Auto-slide every 3 seconds
setInterval(nextSlide, 3000);

// go back arrow

function goBack() {
    if (document.referrer) {
        window.history.back();
    } else {
        window.location.href = '../index.html'; // Fallback if no history
    }
}

// menu

document.getElementById("hamburger").addEventListener("click", function () {
    document.getElementById("nav").classList.toggle("active");
});

// index page
document.querySelector('.get-started').addEventListener('click', function() {
    alert('Get to know you forms');
});