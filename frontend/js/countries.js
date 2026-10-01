// ==========================================
// API
// ==========================================

const API_URL = "/api";


// ==========================================
// GLOBAL
// ==========================================

let countries = [];
let filteredCountries = [];


// ==========================================
// DOM
// ==========================================

const countryGrid =
    document.getElementById("countryGrid");

const countrySearch =
    document.getElementById("countrySearch");

const countryCount =
    document.getElementById("countryCount");


// ==========================================
// COUNTRY INFORMATION
// ==========================================

const countryInfo = {

    "Nepal": {
        icon: "fa-mountain",
        description:
            "Explore the Himalayas, ancient cities, trekking routes and diverse landscapes of Nepal."
    },

    "Bhutan": {
        icon: "fa-place-of-worship",
        description:
            "Discover Himalayan landscapes, monasteries and unique cultural experiences in Bhutan."
    },

    "Switzerland": {
        icon: "fa-mountain-sun",
        description:
            "Experience spectacular Alpine mountains, villages, lakes and outdoor adventures."
    },

    "Japan": {
        icon: "fa-torii-gate",
        description:
            "Explore historic temples, modern cities, traditional culture and beautiful landscapes."
    }

};


// ==========================================
// LOAD COUNTRIES
// ==========================================

async function loadCountries() {

    try {

        const response =
            await fetch(`${API_URL}/countries`);

        if (!response.ok) {
            throw new Error("Failed to load countries");
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error("API error");
        }

        countries = data.countries;

        filteredCountries = [...countries];

        renderCountries();

    } catch (error) {

        console.error(
            "Country loading error:",
            error
        );

        countryGrid.innerHTML = `
            <div class="no-countries">

                <i class="fa-solid fa-triangle-exclamation fa-2x"></i>

                <h3>
                    Unable to load countries
                </h3>

                <p>
                    Please make sure the Python server is running.
                </p>

            </div>
        `;

        countryCount.textContent =
            "Unable to load";

    }
}


// ==========================================
// RENDER COUNTRIES
// ==========================================

function renderCountries() {

    countryGrid.innerHTML = "";

    countryCount.textContent =
        `${filteredCountries.length} ${
            filteredCountries.length === 1
                ? "country"
                : "countries"
        }`;


    if (filteredCountries.length === 0) {

        countryGrid.innerHTML = `
            <div class="no-countries">

                <i class="fa-solid fa-earth-americas fa-2x"></i>

                <h3>
                    No countries found
                </h3>

                <p>
                    Try searching for another country.
                </p>

            </div>
        `;

        return;
    }


    filteredCountries.forEach(
        (country, index) => {

            const info =
                countryInfo[country] || {
                    icon: "fa-earth-americas",
                    description:
                        `Discover destinations, culture and travel experiences in ${country}.`
                };


            const card =
                document.createElement("article");

            card.className =
                "country-card";


            card.innerHTML = `

                <div class="country-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>

                <div class="country-icon">

                    <i class="fa-solid ${info.icon}"></i>

                </div>

                <h3>
                    ${country}
                </h3>

                <p>
                    ${info.description}
                </p>

                <a
                    href="destinations.html?country=${encodeURIComponent(country)}"
                    class="country-link"
                >

                    Explore ${country}

                    <i class="fa-solid fa-arrow-right"></i>

                </a>

            `;

            countryGrid.appendChild(card);

        }
    );
}


// ==========================================
// SEARCH
// ==========================================

if (countrySearch) {

    countrySearch.addEventListener(
        "input",
        () => {

            const search =
                countrySearch.value
                    .toLowerCase()
                    .trim();


            filteredCountries =
                countries.filter(country =>
                    country
                        .toLowerCase()
                        .includes(search)
                );


            renderCountries();

        }
    );

}


// ==========================================
// MOBILE MENU
// ==========================================

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuButton && mobileMenu) {

    menuButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "active"
            );


            const icon =
                menuButton.querySelector("i");


            if (
                mobileMenu.classList.contains(
                    "active"
                )
            ) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

            } else {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }
    );

}


// ==========================================
// NAVBAR SCROLL
// ==========================================

window.addEventListener(
    "scroll",
    () => {

        const navbar =
            document.querySelector(
                ".navbar"
            );

        if (!navbar) return;


        if (window.scrollY > 50) {

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
// INITIAL LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadCountries
); 