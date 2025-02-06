document.addEventListener("DOMContentLoaded", () => {
    const memoryGrid = document.getElementById("memory-grid");

    const images = [
        "1.jpg", "2.jpg", "3.jpg", "4.jpg",
        "5.jpg", "6.jpg", "7.jpg", "8.jpg"
    ];

    let cards = [];
    images.forEach(img => {
        cards.push({ img: `images/${img}`, matched: false });
        cards.push({ img: `images/${img}`, matched: false });
    });

    cards.sort(() => 0.5 - Math.random());

    let selectedCards = [];
    let matchedPairs = 0;

    function createCard(cardData, index) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.index = index;

        const frontFace = document.createElement("div");
        frontFace.classList.add("front");
        
        const backFace = document.createElement("div");
        backFace.classList.add("back");
        const img = document.createElement("img");
        img.src = cardData.img;
        backFace.appendChild(img);

        card.appendChild(frontFace);
        card.appendChild(backFace);

        card.addEventListener("click", () => flipCard(card, cardData));
        return card;
    }

    function flipCard(card, cardData) {
        if (selectedCards.length < 2 && !card.classList.contains("flipped")) {
            card.classList.add("flipped");
            selectedCards.push({ card, cardData });

            if (selectedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }

    function checkMatch() {
        const [first, second] = selectedCards;

        if (first.cardData.img === second.cardData.img) {
            first.cardData.matched = true;
            second.cardData.matched = true;
            matchedPairs++;
        } else {
            first.card.classList.remove("flipped");
            second.card.classList.remove("flipped");
        }

        selectedCards = [];

        if (matchedPairs === images.length) {
            setTimeout(() => alert("You completed the memory game!"), 500);
        }
    }

    cards.forEach((cardData, index) => {
        const card = createCard(cardData, index);
        memoryGrid.appendChild(card);
    });
});

