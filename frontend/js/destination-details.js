// ==========================================
// API
// ==========================================

const API_URL = "/api";


// ==========================================
// DOM
// ==========================================

const detailsContent = document.getElementById("detailsContent");


// ==========================================
// GET DESTINATION ID
// ==========================================

const urlParams = new URLSearchParams(window.location.search);

const destinationId = urlParams.get("id");


// ==========================================
// DESTINATION IMAGES
// ==========================================

function getDestinationImage(name) {

    const images = {

        "Mount Everest":
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1800&q=85",

        "Pokhara":
            "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1800&q=85",

        "Annapurna":
            "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1800&q=85",

        "Upper Mustang":
            "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=85",

        "Kathmandu Valley":
            "https://images.unsplash.com/photo-1558799401-1dc9f7a5c5b5?auto=format&fit=crop&w=1800&q=85",

        "Chitwan":
            "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1800&q=85",

        "Bhutan Himalayas":
            "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1800&q=85",

        "Swiss Alps":
            "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1800&q=85",

        "Kyoto":
            "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=85"
    };

    return images[name] ||
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85";
}


// ==========================================
// LOAD DESTINATION
// ==========================================

async function loadDestination() {

    if (!destinationId) {

        showError("No destination was selected.");

        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/destinations/${destinationId}`
        );

        if (!response.ok) {
            throw new Error("Destination not found");
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        renderDestination(data.destination);

    } catch (error) {

        console.error(error);

        showError(
            "We could not find this destination."
        );
    }
}


// ==========================================
// RENDER DESTINATION
// ==========================================

function renderDestination(destination) {

    const image = getDestinationImage(destination.name);

    document.title =
        `${destination.name} | Guider Nepal AI`;

    detailsContent.innerHTML = `

        <section class="details-page">

            <section class="details-hero">

                <img
                    src="${image}"
                    alt="${destination.name}"
                    class="details-hero-image"
                >

                <div class="details-overlay"></div>

                <div class="details-hero-content">

                    <a
                        href="destinations.html"
                        class="back-link"
                    >
                        <i class="fa-solid fa-arrow-left"></i>
                        Back to Destinations
                    </a>

                    <div class="details-location">

                        <i class="fa-solid fa-location-dot"></i>

                        ${destination.location},
                        ${destination.country}

                    </div>

                    <h1 class="details-title">
                        ${destination.name}
                    </h1>

                    <p class="details-description">
                        ${destination.description}
                    </p>

                    <div class="details-badges">

                        <span class="details-badge">
                            <i class="fa-solid fa-mountain"></i>
                            ${destination.type}
                        </span>

                        <span class="details-badge">
                            <i class="fa-solid fa-compass"></i>
                            ${destination.region}
                        </span>

                        <span class="details-badge">
                            <i class="fa-solid fa-bolt"></i>
                            ${destination.difficulty}
                        </span>

                        <span class="details-badge">
                            <i class="fa-solid fa-tag"></i>
                            ${destination.category}
                        </span>

                    </div>

                </div>

            </section>


            <section class="details-section">

                <div class="details-grid">


                    <!-- MAIN INFORMATION -->

                    <div class="details-main">

                        <h2>
                            About ${destination.name}
                        </h2>

                        <p>
                            ${destination.description}
                        </p>

                        <p>
                            ${destination.name} is a destination
                            worth exploring for travelers interested
                            in discovering the landscapes, culture,
                            nature and experiences of this region.
                        </p>

                        <h2>
                            Explore ${destination.name}
                        </h2>

                        <p>
                            Use Guider Nepal AI to discover travel
                            information, activities, trekking routes,
                            attractions and useful travel guidance
                            for your journey.
                        </p>

                    </div>


                    <!-- SIDEBAR -->

                    <aside class="details-sidebar">

                        <div class="info-card">

                            <h3>
                                Destination Information
                            </h3>

                            <div class="info-item">

                                <i class="fa-solid fa-location-dot"></i>

                                <div>
                                    <strong>Location</strong>
                                    <span>
                                        ${destination.location}
                                    </span>
                                </div>

                            </div>


                            <div class="info-item">

                                <i class="fa-solid fa-earth-asia"></i>

                                <div>
                                    <strong>Country</strong>
                                    <span>
                                        ${destination.country}
                                    </span>
                                </div>

                            </div>


                            <div class="info-item">

                                <i class="fa-solid fa-mountain"></i>

                                <div>
                                    <strong>Type</strong>
                                    <span>
                                        ${destination.type}
                                    </span>
                                </div>

                            </div>


                            <div class="info-item">

                                <i class="fa-solid fa-signal"></i>

                                <div>
                                    <strong>Difficulty</strong>
                                    <span>
                                        ${destination.difficulty}
                                    </span>
                                </div>

                            </div>


                            <div class="info-item">

                                <i class="fa-solid fa-layer-group"></i>

                                <div>
                                    <strong>Region</strong>
                                    <span>
                                        ${destination.region}
                                    </span>
                                </div>

                            </div>


                            <div class="info-item">

                                <i class="fa-solid fa-star"></i>

                                <div>
                                    <strong>Category</strong>
                                    <span>
                                        ${destination.category}
                                    </span>
                                </div>

                            </div>

                        </div>

                    </aside>

                </div>

            </section>

        </section>
    `;
}


// ==========================================
// ERROR
// ==========================================

function showError(message) {

    detailsContent.innerHTML = `

        <div class="error-details">

            <div>

                <i class="fa-solid fa-map-location-dot fa-3x"></i>

                <h2>
                    Destination Not Found
                </h2>

                <p>
                    ${message}
                </p>

                <a
                    href="destinations.html"
                    class="back-button"
                >
                    <i class="fa-solid fa-arrow-left"></i>
                    Back to Destinations
                </a>

            </div>

        </div>
    `;
}


// ==========================================
// MOBILE MENU
// ==========================================

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

        const icon =
            menuButton.querySelector("i");

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
// INITIAL LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadDestination
);