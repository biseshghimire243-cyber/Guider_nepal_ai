// ==========================================
// API CONFIGURATION
// ==========================================

const API_URL = "/api";


// ==========================================
// GLOBAL VARIABLES
// ==========================================

let destinations = [];
let filteredDestinations = [];


// ==========================================
// DOM ELEMENTS
// ==========================================

const destinationList = document.getElementById("destinationList");
const destinationSearch = document.getElementById("destinationSearch");
const clearSearch = document.getElementById("clearSearch");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");
const resetFilters = document.getElementById("resetFilters");
const filterButtons = document.querySelectorAll(".filter-btn");


// ==========================================
// LOAD DESTINATIONS FROM PYTHON API
// ==========================================

async function loadDestinations() {

    try {

        destinationList.innerHTML = `
            <div class="loading-message">
                <i class="fa-solid fa-spinner fa-spin"></i>
                Loading destinations...
            </div>
        `;

        const response = await fetch(`${API_URL}/destinations`);

        if (!response.ok) {
            throw new Error("Failed to load destinations");
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error("API returned an error");
        }

        destinations = data.destinations;
        filteredDestinations = [...destinations];

        renderDestinations();

    } catch (error) {

        console.error("Destination loading error:", error);

        destinationList.innerHTML = `
            <div class="loading-message">
                <i class="fa-solid fa-triangle-exclamation"></i>
                Unable to load destinations.
                Please make sure the Python server is running.
            </div>
        `;

        resultCount.textContent = "0 destinations";
    }
}


// ==========================================
// RENDER DESTINATIONS
// ==========================================

function renderDestinations() {

    destinationList.innerHTML = "";

    resultCount.textContent =
        `${filteredDestinations.length} destination${filteredDestinations.length !== 1 ? "s" : ""}`;

    if (filteredDestinations.length === 0) {

        noResults.style.display = "block";

        return;
    }

    noResults.style.display = "none";

    filteredDestinations.forEach(destination => {

        const card = document.createElement("article");

        card.className = "destination-card";

        if (destination.featured) {
            card.classList.add("featured-card");
        }

        card.innerHTML = `
            <div class="destination-image">

                <img
                    src="${getDestinationImage(destination.name)}"
                    alt="${destination.name}"
                    loading="lazy"
                >

                ${
                    destination.featured
                        ? `<span class="featured-badge">
                            <i class="fa-solid fa-star"></i>
                            Featured
                           </span>`
                        : ""
                }

                <span class="difficulty-badge">
                    ${destination.difficulty}
                </span>

            </div>

            <div class="destination-content">

                <div class="destination-location">
                    <i class="fa-solid fa-location-dot"></i>
                    ${destination.location}, ${destination.country}
                </div>

                <h3>${destination.name}</h3>

                <p>
                    ${destination.description}
                </p>

                <div class="destination-meta">

                    <span>
                        <i class="fa-solid fa-mountain"></i>
                        ${destination.type}
                    </span>

                    <span>
                        <i class="fa-solid fa-compass"></i>
                        ${destination.region}
                    </span>

                </div>

                <a
                    href="destination-details.html?id=${destination.id}"
                    class="destination-link"
                >
                    Explore Destination
                    <i class="fa-solid fa-arrow-right"></i>
                </a>

            </div>
        `;

        destinationList.appendChild(card);
    });
}


// ==========================================
// DESTINATION IMAGES
// ==========================================

function getDestinationImage(name) {

    const images = {

        "Mount Everest":
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",

        "Pokhara":
            "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",

        "Annapurna":
            "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1200&q=80",

        "Upper Mustang":
            "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",

        "Kathmandu Valley":
            "https://images.unsplash.com/photo-1558799401-1dc9f7a5c5b5?auto=format&fit=crop&w=1200&q=80",

        "Chitwan":
            "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80",

        "Bhutan Himalayas":
            "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=80",

        "Swiss Alps":
            "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80",

        "Kyoto":
            "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80"
    };

    return images[name] || 
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80";
}


// ==========================================
// SEARCH
// ==========================================

function searchDestinations() {

    const searchTerm = destinationSearch.value
        .toLowerCase()
        .trim();

    filteredDestinations = destinations.filter(destination => {

        return (
            destination.name.toLowerCase().includes(searchTerm) ||
            destination.country.toLowerCase().includes(searchTerm) ||
            destination.region.toLowerCase().includes(searchTerm) ||
            destination.category.toLowerCase().includes(searchTerm) ||
            destination.location.toLowerCase().includes(searchTerm) ||
            destination.type.toLowerCase().includes(searchTerm)
        );

    });

    renderDestinations();
}


// ==========================================
// FILTER
// ==========================================

function filterDestinations(category) {

    if (category === "all") {

        filteredDestinations = [...destinations];

    } else {

        filteredDestinations = destinations.filter(destination =>
            destination.category.toLowerCase() === category.toLowerCase() ||
            destination.region.toLowerCase() === category.toLowerCase()
        );
    }

    renderDestinations();
}


// ==========================================
// FILTER BUTTONS
// ==========================================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.filter;

        filterDestinations(category);

    });

});


// ==========================================
// SEARCH EVENT
// ==========================================

if (destinationSearch) {

    destinationSearch.addEventListener("input", () => {

        searchDestinations();

        if (destinationSearch.value.trim() !== "") {
            clearSearch.style.display = "flex";
        } else {
            clearSearch.style.display = "none";
        }

    });
}


// ==========================================
// CLEAR SEARCH
// ==========================================

if (clearSearch) {

    clearSearch.addEventListener("click", () => {

        destinationSearch.value = "";

        clearSearch.style.display = "none";

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        const allButton = document.querySelector(
            '.filter-btn[data-filter="all"]'
        );

        if (allButton) {
            allButton.classList.add("active");
        }

        filteredDestinations = [...destinations];

        renderDestinations();

    });
}


// ==========================================
// RESET FILTERS
// ==========================================

if (resetFilters) {

    resetFilters.addEventListener("click", () => {

        destinationSearch.value = "";

        clearSearch.style.display = "none";

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        const allButton = document.querySelector(
            '.filter-btn[data-filter="all"]'
        );

        if (allButton) {
            allButton.classList.add("active");
        }

        filteredDestinations = [...destinations];

        renderDestinations();

    });
}


// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

        const icon = menuButton.querySelector("i");

        if (mobileMenu.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    });

}


// ==========================================
// NAVBAR SCROLL
// ==========================================

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


// ==========================================
// INITIAL LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    loadDestinations();

});