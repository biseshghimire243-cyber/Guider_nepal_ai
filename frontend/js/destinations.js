// ==========================================
// GUIDER NEPAL AI
// DESTINATIONS
// ==========================================


// ==========================================
// DESTINATION DATA
// ==========================================

const destinations = [

    {
        id: 1,

        name: "Mount Everest",

        country: "Nepal",

        category: [
            "nepal",
            "himalaya",
            "adventure"
        ],

        location: "Solukhumbu, Nepal",

        difficulty: "Extreme",

        type: "Mountain",

        description:
            "Home to the world's highest mountain and one of the most famous trekking regions on Earth.",

        image:
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85",

        featured: true
    },


    {
        id: 2,

        name: "Pokhara",

        country: "Nepal",

        category: [
            "nepal",
            "himalaya"
        ],

        location: "Gandaki, Nepal",

        difficulty: "Easy",

        type: "City & Nature",

        description:
            "A beautiful lakeside city surrounded by spectacular Himalayan scenery.",

        image:
            "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=85"
    },


    {
        id: 3,

        name: "Annapurna",

        country: "Nepal",

        category: [
            "nepal",
            "himalaya",
            "adventure"
        ],

        location: "Gandaki, Nepal",

        difficulty: "Hard",

        type: "Trekking",

        description:
            "One of Nepal's most popular trekking destinations with incredible mountain landscapes.",

        image:
            "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1000&q=85"
    },


    {
        id: 4,

        name: "Upper Mustang",

        country: "Nepal",

        category: [
            "nepal",
            "himalaya",
            "adventure"
        ],

        location: "Mustang, Nepal",

        difficulty: "Moderate",

        type: "Culture & Trekking",

        description:
            "A dramatic high-altitude region known for ancient villages, monasteries and desert-like landscapes.",

        image:
            "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=85"
    },


    {
        id: 5,

        name: "Kathmandu Valley",

        country: "Nepal",

        category: [
            "nepal"
        ],

        location: "Kathmandu, Nepal",

        difficulty: "Easy",

        type: "Culture",

        description:
            "A cultural treasure filled with ancient temples, historic cities and living traditions.",

        image:
            "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=85"
    },


    {
        id: 6,

        name: "Chitwan",

        country: "Nepal",

        category: [
            "nepal",
            "adventure"
        ],

        location: "Chitwan, Nepal",

        difficulty: "Easy",

        type: "Wildlife",

        description:
            "Discover jungles, wildlife and one of Nepal's most famous national parks.",

        image:
            "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1000&q=85"
    },


    {
        id: 7,

        name: "Bhutan Himalayas",

        country: "Bhutan",

        category: [
            "himalaya",
            "asia",
            "adventure"
        ],

        location: "Bhutan",

        difficulty: "Moderate",

        type: "Mountain",

        description:
            "Explore dramatic Himalayan landscapes and the unique culture of Bhutan.",

        image:
            "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1000&q=85"
    },


    {
        id: 8,

        name: "Swiss Alps",

        country: "Switzerland",

        category: [
            "europe",
            "adventure"
        ],

        location: "Switzerland",

        difficulty: "Moderate",

        type: "Mountain",

        description:
            "Spectacular alpine landscapes, mountain villages and world-class outdoor adventures.",

        image:
            "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1000&q=85"
    },


    {
        id: 9,

        name: "Kyoto",

        country: "Japan",

        category: [
            "asia"
        ],

        location: "Japan",

        difficulty: "Easy",

        type: "Culture",

        description:
            "Discover historic temples, traditional neighborhoods and Japanese culture.",

        image:
            "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=85"
    }

];


// ==========================================
// ELEMENTS
// ==========================================

const destinationList =
    document.getElementById(
        "destinationList"
    );

const searchInput =
    document.getElementById(
        "destinationSearch"
    );

const resultCount =
    document.getElementById(
        "resultCount"
    );

const noResults =
    document.getElementById(
        "noResults"
    );

const clearSearch =
    document.getElementById(
        "clearSearch"
    );

const resetFilters =
    document.getElementById(
        "resetFilters"
    );

const filterButtons =
    document.querySelectorAll(
        ".filter-button"
    );

const navbar =
    document.getElementById("navbar");

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


// ==========================================
// CURRENT FILTER
// ==========================================

let currentFilter = "all";


// ==========================================
// DISPLAY DESTINATIONS
// ==========================================

function displayDestinations() {

    const searchValue =
        searchInput.value
            .trim()
            .toLowerCase();


    const filteredDestinations =
        destinations.filter(
            function (destination) {

                const matchesFilter =
                    currentFilter === "all" ||
                    destination.category.includes(
                        currentFilter
                    );


                const searchableText =
                    (
                        destination.name +
                        " " +
                        destination.country +
                        " " +
                        destination.location +
                        " " +
                        destination.type
                    ).toLowerCase();


                const matchesSearch =
                    searchableText.includes(
                        searchValue
                    );


                return (
                    matchesFilter &&
                    matchesSearch
                );

            }
        );


    destinationList.innerHTML = "";


    resultCount.textContent =
        `${filteredDestinations.length} destination${
            filteredDestinations.length !== 1
                ? "s"
                : ""
        }`;


    if (
        filteredDestinations.length === 0
    ) {

        noResults.classList.add("show");

        return;

    }


    noResults.classList.remove("show");


    filteredDestinations.forEach(
        function (destination) {

            const card =
                document.createElement("article");


            card.className =
                "destination-item";


            if (destination.featured) {

                card.classList.add(
                    "featured"
                );

            }


            card.style.backgroundImage =
                `url("${destination.image}")`;


            card.innerHTML = `

                <div class="destination-item-overlay"></div>

                <div class="destination-item-content">

                    <span class="destination-country">
                        ${destination.country}
                    </span>

                    <h3>
                        ${destination.name}
                    </h3>

                    <p>
                        ${destination.description}
                    </p>

                    <div class="destination-meta">

                        <span>
                            📍 ${destination.location}
                        </span>

                        <span>
                            ${destination.type}
                        </span>

                        <span>
                            ${destination.difficulty}
                        </span>

                    </div>

                    <a
                        href="destination-details.html?id=${destination.id}"
                        class="destination-explore"
                    >
                        Explore Destination →
                    </a>

                </div>

            `;


            destinationList.appendChild(
                card
            );

        }
    );

}


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    displayDestinations
);


// ==========================================
// FILTER
// ==========================================

filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                currentFilter =
                    button.dataset.filter;


                displayDestinations();

            }
        );

    }
);


// ==========================================
// CLEAR SEARCH
// ==========================================

clearSearch.addEventListener(
    "click",
    function () {

        searchInput.value = "";

        displayDestinations();

        searchInput.focus();

    }
);


// ==========================================
// RESET FILTERS
// ==========================================

resetFilters.addEventListener(
    "click",
    function () {

        searchInput.value = "";

        currentFilter = "all";


        filterButtons.forEach(
            function (button) {

                button.classList.remove(
                    "active"
                );

            }
        );


        document
            .querySelector(
                '[data-filter="all"]'
            )
            .classList.add("active");


        displayDestinations();

    }
);


// ==========================================
// READ SEARCH FROM URL
// ==========================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const urlSearch =
    urlParams.get("search");


if (urlSearch) {

    searchInput.value =
        urlSearch;

}


// ==========================================
// NAVBAR
// ==========================================

window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 40) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }
);


// ==========================================
// MOBILE MENU
// ==========================================

menuButton.addEventListener(
    "click",
    function () {

        if (
            mobileMenu.style.display ===
            "block"
        ) {

            mobileMenu.style.display =
                "none";

        } else {

            mobileMenu.style.display =
                "block";

        }

    }
);


// ==========================================
// INITIAL LOAD
// ==========================================

displayDestinations();

console.log(
    "Destinations loaded:",
    destinations.length
);