const guideData = [

    {
        title: "Trip Planning",
        category: "Planning",
        icon: "fa-map",
        description:
            "Plan your route, destinations, activities and travel schedule before starting your journey.",
        points: [
            "Choose destinations based on available time",
            "Check weather and seasonal conditions",
            "Plan accommodation in advance when necessary"
        ]
    },

    {
        title: "Getting Around Nepal",
        category: "Transport",
        icon: "fa-bus",
        description:
            "Learn about common transportation options for traveling between cities and destinations.",
        points: [
            "Tourist buses connect many popular destinations",
            "Domestic flights can reduce travel time",
            "Local vehicles are commonly used for shorter routes"
        ]
    },

    {
        title: "Trekking Preparation",
        category: "Planning",
        icon: "fa-person-hiking",
        description:
            "Prepare properly before heading into the mountains and choose a route suitable for your experience.",
        points: [
            "Check route difficulty and altitude",
            "Prepare suitable clothing and footwear",
            "Consider local guides and current route conditions"
        ]
    },

    {
        title: "Travel Safety",
        category: "Safety",
        icon: "fa-shield-halved",
        description:
            "Take practical precautions and stay informed about local conditions during your trip.",
        points: [
            "Keep important documents secure",
            "Check weather and transportation conditions",
            "Share your itinerary with someone you trust"
        ]
    },

    {
        title: "What To Pack",
        category: "Packing",
        icon: "fa-suitcase-rolling",
        description:
            "Your packing list should match your destination, season and planned activities.",
        points: [
            "Comfortable clothing and footwear",
            "Personal medicines and first-aid supplies",
            "Chargers, power bank and essential electronics"
        ]
    },

    {
        title: "Travel Budget",
        category: "Budget",
        icon: "fa-wallet",
        description:
            "Create a realistic travel budget by considering transport, accommodation, food and activities.",
        points: [
            "Estimate daily accommodation costs",
            "Keep a separate transportation budget",
            "Reserve some money for unexpected expenses"
        ]
    },

    {
        title: "Mountain Travel",
        category: "Safety",
        icon: "fa-mountain-sun",
        description:
            "High-altitude travel requires additional preparation and attention to changing conditions.",
        points: [
            "Increase altitude gradually",
            "Stay hydrated and monitor how you feel",
            "Follow local advice and route information"
        ]
    },

    {
        title: "Local Culture",
        category: "Planning",
        icon: "fa-place-of-worship",
        description:
            "Respect local traditions, communities, religious sites and cultural practices.",
        points: [
            "Dress appropriately at religious sites",
            "Ask before photographing people",
            "Respect local customs and community spaces"
        ]
    },

    {
        title: "Travel Essentials",
        category: "Packing",
        icon: "fa-passport",
        description:
            "Keep important documents and essential items organized throughout your journey.",
        points: [
            "Passport and identification",
            "Travel documents and reservations",
            "Emergency contacts and important information"
        ]
    }

];


const guideGrid =
    document.getElementById("guideGrid");

const noGuides =
    document.getElementById("noGuides");

const guideSearch =
    document.getElementById("guideSearch");

const filterButtons =
    document.querySelectorAll(".guide-filter");


let currentCategory = "all";


function renderGuides() {

    const searchTerm =
        guideSearch.value
            .toLowerCase()
            .trim();


    const filtered =
        guideData.filter(guide => {

            const matchesCategory =
                currentCategory === "all" ||
                guide.category === currentCategory;


            const searchableText =
                `
                ${guide.title}
                ${guide.category}
                ${guide.description}
                ${guide.points.join(" ")}
                `.toLowerCase();


            const matchesSearch =
                searchableText.includes(searchTerm);


            return matchesCategory && matchesSearch;

        });


    guideGrid.innerHTML = "";


    if (filtered.length === 0) {

        noGuides.style.display = "block";

        return;

    }


    noGuides.style.display = "none";


    filtered.forEach(guide => {

        const card =
            document.createElement("article");

        card.className = "guide-card";


        const points =
            guide.points
                .map(point => `<li>${point}</li>`)
                .join("");


        card.innerHTML = `

            <div class="guide-icon">

                <i class="fa-solid ${guide.icon}"></i>

            </div>

            <h3>
                ${guide.title}
            </h3>

            <p>
                ${guide.description}
            </p>

            <ul>
                ${points}
            </ul>

        `;


        guideGrid.appendChild(card);

    });

}


/* SEARCH */

guideSearch.addEventListener(
    "input",
    renderGuides
);


/* FILTERS */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });


            button.classList.add("active");


            currentCategory =
                button.dataset.category;


            renderGuides();

        }
    );

});


/* MOBILE MENU */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuButton && mobileMenu) {

    menuButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle("show");

        }
    );

}


/* NAVBAR SCROLL */

window.addEventListener(
    "scroll",
    () => {

        const navbar =
            document.querySelector(".navbar");

        if (!navbar) return;


        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }
);


/* CHECKLIST */

const checklistItems =
    document.querySelectorAll(
        ".check-item input"
    );


checklistItems.forEach(item => {

    item.addEventListener(
        "change",
        () => {

            const label =
                document.querySelector(
                    `label[for="${item.id}"]`
                );


            if (!label) return;


            if (item.checked) {

                label.style.textDecoration =
                    "line-through";

                label.style.opacity =
                    "0.5";

            } else {

                label.style.textDecoration =
                    "none";

                label.style.opacity =
                    "1";

            }

        }
    );

});


/* INITIAL LOAD */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderGuides();

    }
);