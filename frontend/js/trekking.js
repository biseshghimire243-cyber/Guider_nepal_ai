const trekkingRoutes = [

    {
        name: "Everest Base Camp Trek",
        location: "Solukhumbu, Nepal",
        difficulty: "Extreme",
        duration: "14–16 Days",
        altitude: "5,364 m",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=85",
        description:
            "Journey through the legendary Khumbu region toward the base of Mount Everest.",
        destinationId: 1
    },

    {
        name: "Annapurna Circuit",
        location: "Gandaki, Nepal",
        difficulty: "Hard",
        duration: "12–18 Days",
        altitude: "5,416 m",
        image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=900&q=85",
        description:
            "Experience diverse landscapes, mountain villages and dramatic Himalayan scenery.",
        destinationId: 3
    },

    {
        name: "Langtang Valley Trek",
        location: "Langtang, Nepal",
        difficulty: "Moderate",
        duration: "7–10 Days",
        altitude: "4,984 m",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85",
        description:
            "A scenic Himalayan trek through forests, villages and spectacular mountain valleys.",
        destinationId: 2
    },

    {
        name: "Mardi Himal Trek",
        location: "Gandaki, Nepal",
        difficulty: "Moderate",
        duration: "5–8 Days",
        altitude: "4,500 m",
        image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=85",
        description:
            "Discover a quieter Himalayan trail with impressive views of the Annapurna range.",
        destinationId: 3
    },

    {
        name: "Ghorepani Poon Hill",
        location: "Gandaki, Nepal",
        difficulty: "Easy",
        duration: "3–5 Days",
        altitude: "3,210 m",
        image: "https://images.unsplash.com/photo-1544735716-3f3f0c1e3a7c?auto=format&fit=crop&w=900&q=85",
        description:
            "Enjoy a relatively accessible Himalayan trek famous for sunrise mountain views.",
        destinationId: 3
    },

    {
        name: "Upper Mustang Trek",
        location: "Mustang, Nepal",
        difficulty: "Hard",
        duration: "12–16 Days",
        altitude: "3,840 m",
        image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=900&q=85",
        description:
            "Explore the dramatic landscapes and distinctive cultural heritage of Upper Mustang.",
        destinationId: 4
    },

    {
        name: "Manaslu Circuit Trek",
        location: "Gorkha, Nepal",
        difficulty: "Hard",
        duration: "14–18 Days",
        altitude: "5,106 m",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=85",
        description:
            "Travel around the magnificent Manaslu region through remote Himalayan landscapes.",
        destinationId: 3
    },

    {
        name: "Helambu Trek",
        location: "Bagmati, Nepal",
        difficulty: "Easy",
        duration: "5–8 Days",
        altitude: "3,650 m",
        image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=900&q=85",
        description:
            "Enjoy a beautiful short trek through mountain villages and peaceful Himalayan scenery.",
        destinationId: 2
    }

];


const trekGrid =
    document.getElementById("trekGrid");

const noTreks =
    document.getElementById("noTreks");

const trekSearch =
    document.getElementById("trekSearch");

const filterButtons =
    document.querySelectorAll(".trek-filter");


let currentDifficulty = "all";


function renderTreks() {

    const searchTerm =
        trekSearch.value
            .toLowerCase()
            .trim();


    const filtered =
        trekkingRoutes.filter(route => {

            const matchesDifficulty =
                currentDifficulty === "all" ||
                route.difficulty === currentDifficulty;


            const matchesSearch =
                route.name
                    .toLowerCase()
                    .includes(searchTerm) ||

                route.location
                    .toLowerCase()
                    .includes(searchTerm) ||

                route.description
                    .toLowerCase()
                    .includes(searchTerm);


            return matchesDifficulty && matchesSearch;

        });


    trekGrid.innerHTML = "";


    if (filtered.length === 0) {

        noTreks.style.display = "block";

        return;

    }


    noTreks.style.display = "none";


    filtered.forEach(route => {

        const card =
            document.createElement("article");

        card.className = "trek-card";


        card.innerHTML = `

            <div class="trek-image">

                <img
                    src="${route.image}"
                    alt="${route.name}"
                    loading="lazy"
                >

                <span class="trek-difficulty">
                    ${route.difficulty}
                </span>

            </div>


            <div class="trek-content">

                <div class="trek-location">
                    <i class="fa-solid fa-location-dot"></i>
                    ${route.location}
                </div>

                <h3>
                    ${route.name}
                </h3>

                <p>
                    ${route.description}
                </p>


                <div class="trek-meta">

                    <div class="trek-meta-item">
                        <i class="fa-regular fa-calendar"></i>
                        ${route.duration}
                    </div>

                    <div class="trek-meta-item">
                        <i class="fa-solid fa-mountain"></i>
                        ${route.altitude}
                    </div>

                </div>


                <a
                    href="destination-details.html?id=${route.destinationId}"
                    class="trek-link"
                >
                    Explore Route
                    <i class="fa-solid fa-arrow-right"></i>
                </a>

            </div>

        `;


        trekGrid.appendChild(card);

    });

}


/* SEARCH */

trekSearch.addEventListener(
    "input",
    renderTreks
);


/* FILTER */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });


            button.classList.add("active");


            currentDifficulty =
                button.dataset.difficulty;


            renderTreks();

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


/* INITIAL LOAD */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderTreks();

    }
);