// ==========================================
// GUIDER NEPAL AI
// MAIN JAVASCRIPT
// ==========================================


// ==========================================
// ELEMENTS
// ==========================================

const navbar =
    document.getElementById("navbar");

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const searchInput =
    document.getElementById("destinationSearch");

const searchButton =
    document.getElementById("searchButton");


// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

window.addEventListener("scroll", function () {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


// ==========================================
// MOBILE MENU
// ==========================================

menuButton.addEventListener("click", function () {

    if (
        mobileMenu.style.display === "block"
    ) {

        mobileMenu.style.display = "none";

    } else {

        mobileMenu.style.display = "block";

    }

});


// ==========================================
// CLOSE MOBILE MENU
// ==========================================

const mobileLinks =
    mobileMenu.querySelectorAll("a");

mobileLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        mobileMenu.style.display = "none";

    });

});


// ==========================================
// SEARCH
// ==========================================

function searchDestination() {

    const value =
        searchInput.value.trim();

    if (value === "") {

        alert(
            "Please enter a destination."
        );

        searchInput.focus();

        return;

    }

    /*
        Later this will connect to:

        Python Flask API

        /api/destinations?search=...

        For now we redirect to
        destinations.html.
    */

    window.location.href =
        "destinations.html?search=" +
        encodeURIComponent(value);

}


// ==========================================
// SEARCH BUTTON
// ==========================================

searchButton.addEventListener(
    "click",
    searchDestination
);


// ==========================================
// ENTER KEY SEARCH
// ==========================================

searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            searchDestination();

        }

    }
);


// ==========================================
// QUICK SEARCH BUTTONS
// ==========================================

const quickSearchButtons =
    document.querySelectorAll(
        ".quick-search button"
    );

quickSearchButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const searchValue =
                    button.dataset.search;

                searchInput.value =
                    searchValue;

                searchDestination();

            }
        );

    }
);


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Guider Nepal AI loaded successfully."
        );

    }
);