
// Memory Game Logic
const cards = [
    { id: 1, img: 'path/to/image1.jpg' },
    { id: 2, img: 'path/to/image2.jpg' },
    { id: 3, img: 'path/to/image3.jpg' },
    { id: 4, img: 'path/to/image4.jpg' },
    { id: 5, img: 'path/to/image5.jpg' },
    { id: 6, img: 'path/to/image6.jpg' },
    { id: 7, img: 'path/to/image7.jpg' },
    { id: 8, img: 'path/to/image8.jpg' }
];

let flippedCards = [];
let matchedCards = 0;

// Shuffle the cards
function shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

// Initialize the game
function initGame() {
    shuffle(cards);
    const gameBoard = document.getElementById('memory-game');
    gameBoard.innerHTML = ''; // Clear the board
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'back');
        cardElement.dataset.id = card.id;
        cardElement.style.backgroundImage = `url('path/to/backside.jpg')`;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Flip the card
function flipCard(event) {
    const clickedCard = event.target;
    if (flippedCards.length < 2 && !clickedCard.classList.contains('flipped') && !clickedCard.classList.contains('matched')) {
        clickedCard.classList.add('flipped');
        clickedCard.style.backgroundImage = `url('path/to/frontside/${clickedCard.dataset.id}.jpg')`;
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Check if the flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.id === card2.dataset.id) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards += 2;
        flippedCards = [];
        updateProgressBar();

        if (matchedCards === cards.length) {
            showFinalReward();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.style.backgroundImage = `url('path/to/backside.jpg')`;
            card2.style.backgroundImage = `url('path/to/backside.jpg')`;
            flippedCards = [];
        }, 1000);
    }
}

// Update progress bar
function updateProgressBar() {
    const progressBar = document.querySelector('#progress-bar .progress');
    const progress = (matchedCards / cards.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Show final reward video
function showFinalReward() {
    const finalReward = document.getElementById('final-reward');
    finalReward.style.display = 'flex';
    const video = finalReward.querySelector('video');
    video.play();
}

// Start the game
document.addEventListener('DOMContentLoaded', () => {
    initGame();
});
