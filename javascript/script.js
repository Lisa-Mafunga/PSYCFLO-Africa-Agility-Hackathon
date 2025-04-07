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

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel-img');

    let index = 0;
    const totalSlides = images.length;

    function nextSlide() {
        index = (index + 1) % totalSlides;
        if (carousel) {
            carousel.style.transform = `translateX(${-index * 50}%)`;
        }
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
});


// menu

document.getElementById("hamburger").addEventListener("click", function () {
    document.getElementById("nav").classList.toggle("active");
});

// index page
function openModal() {
    document.querySelector(".overlay").style.display = "block";
    document.querySelector(".modal").style.display = "flex";
}

function closeModal() {
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".modal").style.display = "none";
    // Reset modal content
    document.getElementById("modal-content").innerHTML = `
        <h2>Select User Category</h2>
        <span class="button" onclick="loadForm('mentalhealth.html')">Mental Health Care</span>
        <span class="button" onclick="loadForm('menstrualhealth.html')">Menstrual Health Care</span>
        <span class="button" onclick="loadForm('partners.html')">Partners (Sponsors)</span>
    `;
}

function loadForm(formUrl) {
    fetch(`forms/${formUrl}`)
        .then(res => res.text())
        .then(html => {
            // Create a parser to extract the content we need
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            let content;

            // Special handling for partners.html (non-form content)
            if (formUrl === 'partners.html') {
                content = doc.querySelector('body').innerHTML;
            }
            // Handling for form files
            else {
                content = doc.querySelector('.container')?.innerHTML ||
                    doc.querySelector('form')?.innerHTML ||
                    doc.querySelector('body').innerHTML;
            }

            // Inject the content into modal
            document.getElementById("modal-content").innerHTML = `
        <button class="close-btn" onclick="closeModal()">&times;</button>
        ${content}
    `;

            // Adjust modal styling based on content type
            const modal = document.querySelector('.modal');
            modal.style.width = '70%';
            modal.style.maxWidth = '90%';
            modal.style.maxHeight = 'auto';
            modal.style.overflowY = '150vh';

            // Special styling for partners page
            if (formUrl === 'partners.html') {
                modal.style.textAlign = 'center';
                modal.style.padding = '30px';

                // Make buttons look consistent with your modal style
                const buttons = modal.querySelectorAll('.button');
                buttons.forEach(button => {
                    button.style.display = 'block';
                    button.style.width = '100%';
                    button.style.margin = '15px 0';
                    button.style.padding = '15px';
                });
            }
        })
        .catch(err => {
            console.error("Error loading form:", err);
            document.getElementById("modal-content").innerHTML = `
        <p>Error loading form. Check console for details.</p>
        <button class="button" onclick="closeModal()">Close</button>
    `;
        });
}