// Initialize the memory game
let memoryGameCards = [
    { id: 1, img: "path/to/img1.jpg", flipped: false },
    { id: 2, img: "path/to/img2.jpg", flipped: false },
    { id: 3, img: "path/to/img3.jpg", flipped: false },
    { id: 4, img: "path/to/img4.jpg", flipped: false },
    { id: 5, img: "path/to/img5.jpg", flipped: false },
    { id: 6, img: "path/to/img6.jpg", flipped: false },
    { id: 7, img: "path/to/img7.jpg", flipped: false },
    { id: 8, img: "path/to/img8.jpg", flipped: false },
];

let flippedCards = [];

// Function to flip a card
function flipCard(card) {
    if (flippedCards.length < 2 && !card.flipped) {
        card.flipped = true;
        flippedCards.push(card);
        renderMemoryGame();
    }

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Check if two flipped cards match
function checkMatch() {
    if (flippedCards[0].img === flippedCards[1].img) {
        flippedCards = [];
    } else {
        setTimeout(() => {
            flippedCards.forEach(card => card.flipped = false);
            flippedCards = [];
            renderMemoryGame();
        }, 1000);
    }
}

// Render memory game cards
function renderMemoryGame() {
    let gameBoard = document.getElementById("memory-game");
    gameBoard.innerHTML = "";

    memoryGameCards.forEach(card => {
        let cardElement = document.createElement("div");
        cardElement.classList.add("card");
        if (card.flipped) {
            cardElement.style.backgroundImage = `url(${card.img})`;
        } else {
            cardElement.classList.add("back");
        }

        cardElement.addEventListener("click", () => flipCard(card));
        gameBoard.appendChild(cardElement);
    });
}

// Shuffle the cards before starting the game
function shuffleCards() {
    memoryGameCards = memoryGameCards.sort(() => Math.random() - 0.5);
    renderMemoryGame();
}

// Call the shuffle function when the page loads
document.addEventListener("DOMContentLoaded", shuffleCards);
