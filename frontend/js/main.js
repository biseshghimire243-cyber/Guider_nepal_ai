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

/* ==========================================
   AI TRIP PLANNER
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const styleOptions =
        document.querySelectorAll(".style-option");

    const createTripButton =
        document.getElementById("createTripPlan");


    let selectedStyle = "";


    /* ------------------------------------------
       SELECT TRAVEL STYLE
    ------------------------------------------ */

    styleOptions.forEach(option => {

        option.addEventListener("click", () => {

            styleOptions.forEach(item => {
                item.classList.remove("active");
            });

            option.classList.add("active");

            selectedStyle =
                option.dataset.style;

        });

    });


    /* ------------------------------------------
       CREATE TRIP PLAN
    ------------------------------------------ */

    if (createTripButton) {

        createTripButton.addEventListener("click", () => {

            const destination =
                document.getElementById(
                    "tripDestination"
                ).value;

            const duration =
                document.getElementById(
                    "tripDuration"
                ).value;

            const budget =
                document.getElementById(
                    "tripBudget"
                ).value;


            if (!destination) {
                alert(
                    "Please choose a destination."
                );
                return;
            }


            if (!duration) {
                alert(
                    "Please select your trip duration."
                );
                return;
            }


            if (!selectedStyle) {
                alert(
                    "Please choose your travel style."
                );
                return;
            }


            if (!budget) {
                alert(
                    "Please select your budget."
                );
                return;
            }


            const tripData = {
                destination,
                duration,
                style: selectedStyle,
                budget
            };


            localStorage.setItem(
                "guiderTripPlan",
                JSON.stringify(tripData)
            );


            /*
             * For now we show a temporary message.
             *
             * Later this button will send the
             * information to our Python AI backend.
             */

            alert(
                `Your ${duration}-day ${selectedStyle} trip to ${destination} is ready to be planned!`
            );

        });

    }

});

/* ==========================================
   SEASON SELECTOR
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const seasonTabs =
        document.querySelectorAll(".season-tab");

    const seasonPanels =
        document.querySelectorAll(".season-panel");


    seasonTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const selectedSeason =
                tab.dataset.season;


            /* Remove active tab */

            seasonTabs.forEach(item => {
                item.classList.remove("active");
            });


            /* Activate selected tab */

            tab.classList.add("active");


            /* Hide all panels */

            seasonPanels.forEach(panel => {
                panel.classList.remove("active");
            });


            /* Show selected panel */

            const selectedPanel =
                document.querySelector(
                    `.season-panel[data-panel="${selectedSeason}"]`
                );


            if (selectedPanel) {

                selectedPanel.classList.add("active");

            }

        });

    });

});