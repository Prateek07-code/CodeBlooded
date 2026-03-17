const gotyData = [
    {year: 2025, game: "Expedition 33", link: "#"},
    {year: 2024, game: "Baldur's Gate 3", link: "https://store.steampowered.com/app/1086940"},
    {year: 2023, game: "Elden Ring", link: "https://store.steampowered.com/app/1245620"},
    {year: 2022, game: "God of War Ragnarök", link: "#"},
    {year: 2021, game: "It Takes Two", link: "https://store.steampowered.com/app/1426210"},
    {year: 2020, game: "The Last of Us Part II", link: "#"},
    {year: 2019, game: "Sekiro: Shadows Die Twice", link: "https://store.steampowered.com/app/814380"},
    {year: 2018, game: "God of War", link: "https://store.steampowered.com/app/1593500"},
    {year: 2017, game: "Zelda: Breath of the Wild", link: "#"},
    {year: 2016, game: "Overwatch", link: "#"},
    {year: 2015, game: "The Witcher 3", link: "https://store.steampowered.com/app/292030"}
];

window.openModal = function() {
    document.getElementById("modal").style.display = "flex";
    const list = document.getElementById("gotyList");
    list.innerHTML = "";
    gotyData.forEach(item => {
        const li = document.createElement("li");
        if(item.link !== "#") {
            li.innerHTML = `<strong>${item.year}</strong> -  <a href="${item.link}" target="_blank">${item.game}</a>`;
        } else {
            li.innerHTML = `<strong>${item.year}</strong> - ${item.game}`;
        }
        list.appendChild(li);
    });
}

window.closeModal = function() {
    document.getElementById("modal").style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {
    // REVEAL HALL OF FAME
    const revealBtn = document.getElementById('revealGotyBtn');
    const gotySection = document.getElementById('gotyGridSection');

    if (revealBtn && gotySection) {
        revealBtn.addEventListener('click', () => {
            if (gotySection.style.display === 'none' || gotySection.style.display === '') {
                gotySection.style.display = 'block';
                revealBtn.textContent = 'HIDE HALL OF FAME';
                revealBtn.style.background = 'gold';
                revealBtn.style.color = 'black';
                setTimeout(() => { gotySection.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100); 
            } else {
                gotySection.style.display = 'none';
                revealBtn.textContent = 'ENTER HALL OF FAME';
                revealBtn.style.background = 'transparent';
                revealBtn.style.color = 'white';
            }
        });
    }

    // TYPEWRITER EFFECT
    const typeWriterElement = document.querySelector('.typewriter');
    if (typeWriterElement) {
        const text = typeWriterElement.innerHTML;
        typeWriterElement.innerHTML = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                typeWriterElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        setTimeout(type, 500); 
    }
    
    // MODAL CLOSE OUTSIDE CLICK
    window.onclick = function(event) {
        const modal = document.getElementById("modal");
        if (event.target == modal) { closeModal(); }
    }
});