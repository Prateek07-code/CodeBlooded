const gamesData = [
    {
        name: "VALORANT",
        image: "valo.jpeg",
        tournaments: [
            { name: "VCT Champions", link: "https://liquipedia.net/valorant/VCT" },
            { name: "Masters Madrid", link: "https://liquipedia.net/valorant" },
            { name: "Pacific League", link: "https://liquipedia.net/valorant" }
        ]
    },
    {
        name: "Dota 2",
        image: "dota2.jpg",
        tournaments: [
            { name: "The International", link: "#" },
            { name: "DreamLeague", link: "#" }
        ]
    },
    {
        name: "CS:2",
        image: "cs2.jpg",
        tournaments: [
            { name: "BLAST Premier", link: "#" },
            { name: "ESL Pro League", link: "#" }
        ]
    }
];

const grid = document.getElementById("gamesGrid");
const carousel = document.getElementById("carousel");

/* RENDER LOGIC */
function renderGames(data) {
    grid.innerHTML = "";
    carousel.innerHTML = ""; // Reset carousel to prevent duplicates
    let totalTournaments = 0;

    data.forEach(game => {
        totalTournaments += game.tournaments.length;

        // 1. Build the Interactive Info Card
        const card = document.createElement("div");
        card.className = "tilt-card"; // Hook for our JS tilt effect

        card.innerHTML = `
            <img src="${game.image}" class="card-image" alt="${game.name}">
            <div class="card-content">
                <h2>${game.name}</h2>
                <div class="tournament-list">
                    ${game.tournaments.map(t => `
                        <div class="tournament" onclick="openLink('${t.link}')">
                            <span>${t.name}</span>
                            <span style="color: var(--accent-color)">↗</span>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
        grid.appendChild(card);

        // 2. Build the Carousel Showcase item
        const c = document.createElement("div");
        c.className = "carousel-card";
        c.innerHTML = `<span>${game.name}</span>`;
        carousel.appendChild(c);
    });

    // Update Stats
    document.getElementById("gamesCount").innerText = data.length;
    document.getElementById("tournamentsCount").innerText = totalTournaments;

    // VERY IMPORTANT: Attach the 3D mouse effect AFTER the cards are injected into the DOM
    attachTiltEffect();
}

/* 07: INTERACTIVE TILT EFFECT LOGIC */
function attachTiltEffect() {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (Max 15 degrees)
            const rotateX = ((y - centerY) / centerY) * -15; 
            const rotateY = ((x - centerX) / centerX) * 15;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            // Add a smooth snap back
            card.style.transition = 'transform 0.5s ease-out'; 
            setTimeout(() => card.style.transition = 'transform 0.1s ease-out', 500);
        });
    });
}

/* SEARCH FILTER */
document.getElementById("search").addEventListener("input", e => {
    const val = e.target.value.toLowerCase();
    const filtered = gamesData.filter(g => g.name.toLowerCase().includes(val));
    renderGames(filtered);
});

/* OVERDRIVE THEME TOGGLE (Instead of light mode) */
let isOverdrive = false;
function toggleOverdrive() {
    const root = document.documentElement;
    isOverdrive = !isOverdrive;
    
    if(isOverdrive) {
        // Switch accent to hot pink/red
        root.style.setProperty('--accent-color', '#ff3366');
        document.querySelector('.neon-btn').innerText = "⚡ SYSTEM NORMAL";
        document.getElementById('hero-subtitle').innerText = "WARNING: OVERDRIVE PROTOCOL ENGAGED.";
    } else {
        // Switch back to cyan
        root.style.setProperty('--accent-color', '#00f3ff');
        document.querySelector('.neon-btn').innerText = "⚡ OVERDRIVE";
        document.getElementById('hero-subtitle').innerText = "Initializing global tournament tracking protocols...";
    }
    
    // Re-trigger typewriter animation
    const el = document.getElementById('hero-subtitle');
    el.style.animation = 'none';
    el.offsetHeight; /* trigger reflow */
    el.style.animation = null; 
}

/* OPEN LINK */
function openLink(link) {
    if(link !== "#") window.open(link, "_blank");
}

/* AUTO SCROLL SHOWCASE (Smooth 60fps) */
let scrollAmount = 0;
function scrollShowcase() {
    const car = document.getElementById("carousel");
    if(car) {
        car.scrollLeft += 1;
        // Simple infinite loop trick: if scrolled to end, snap back
        if(car.scrollLeft >= (car.scrollWidth - car.clientWidth)) {
            car.scrollLeft = 0;
        }
    }
    requestAnimationFrame(scrollShowcase);
}

// Initializing
renderGames(gamesData);
scrollShowcase();
