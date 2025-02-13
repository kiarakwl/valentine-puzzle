document.addEventListener("DOMContentLoaded", function () {
    // Jigsaw Puzzle Logic
    const jigsawCompleteBtn = document.getElementById("complete-jigsaw");

    jigsawCompleteBtn.addEventListener("click", function () {
        alert("Jigsaw Puzzle Completed!");
        document.getElementById("memory-game").style.display = "block";
        document.getElementById("jigsaw-game").style.display = "none";
    });

    // Memory Matching Game Logic
    const memoryCards = document.querySelectorAll(".memory-card");
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;
    const totalPairs = 8;

    function flipCard() {
        if (lockBoard || this === firstCard) return;

        this.classList.add("flip");

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.image === secondCard.dataset.image;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        matchedPairs++;

        if (matchedPairs === totalPairs) {
            setTimeout(() => {
                alert("Memory Game Completed!");
                document.getElementById("final-video").style.display = "block";
                document.getElementById("memory-game").style.display = "none";
            }, 1000);
        }

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
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

    memoryCards.forEach(card => card.addEventListener("click", flipCard));
});
