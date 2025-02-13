document.addEventListener("DOMContentLoaded", function () {
    const memoryGame = document.getElementById("memory-game");
    const progressBar = document.getElementById("progress");
    let progress = 1; // Adjusted for correct tracking
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    
    const images = [
        "memory-1.JPG", "memory-2.JPG", "memory-3.JPG", "memory-4.JPG", 
        "memory-5.JPG", "memory-6.JPG", "memory-7.JPG", "memory-8.JPG"
    ];
    
    const cards = [...images, ...images]; // Duplicate images for matching pairs
    cards.sort(() => Math.random() - 0.5); // Shuffle cards
    
    cards.forEach((img, index) => {
        const card = document.createElement("div");
        card.classList.add("memory-card");
        card.dataset.image = img;
        card.innerHTML = `<img src="images/${img}" class="front-face" /><div class="back-face"></div>`;
        memoryGame.appendChild(card);
        card.addEventListener("click", flipCard);
    });
    
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        
        this.classList.add("flip");
        
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        
        secondCard = this;
        lockBoard = true;
        
        checkForMatch();
    }
    
    function checkForMatch() {
        let isMatch = firstCard.dataset.image === secondCard.dataset.image;
        isMatch ? disableCards() : unflipCards();
    }
    
    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetBoard();
        updateProgress();
    }
    
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            resetBoard();
        }, 1000);
    }
    
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
    
    function updateProgress() {
        progress++;
        progressBar.style.width = `${(progress / 8) * 100}%`;
    }
});
