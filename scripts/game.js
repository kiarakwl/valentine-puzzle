document.addEventListener("DOMContentLoaded", function () {
    // Jigsaw Puzzle Logic
    const puzzleContainer = document.getElementById("puzzle-container");
    const pieces = Array.from(document.querySelectorAll(".puzzle-piece"));
    let shuffledPieces = pieces.slice().sort(() => Math.random() - 0.5);
    
    shuffledPieces.forEach(piece => puzzleContainer.appendChild(piece));

    let correctPlacements = 0;
    pieces.forEach(piece => {
        piece.addEventListener("dragstart", dragStart);
        piece.addEventListener("dragover", dragOver);
        piece.addEventListener("drop", drop);
    });

    function dragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.id);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const draggedPiece = document.getElementById(event.dataTransfer.getData("text"));
        const target = event.target;

        if (target.classList.contains("puzzle-slot") && !target.hasChildNodes()) {
            target.appendChild(draggedPiece);
            correctPlacements++;

            if (correctPlacements === pieces.length) {
                setTimeout(() => {
                    alert("Jigsaw puzzle completed! Moving to the next game...");
                    document.getElementById("memory-game").style.display = "block";
                }, 500);
            }
        }
    }

    // Memory Matching Game Logic
    const memoryCards = document.querySelectorAll(".memory-card");
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;

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

        if (matchedPairs === memoryCards.length / 2) {
            setTimeout(() => {
                alert("Memory game completed! Enjoy your surprise!");
                document.getElementById("final-video").style.display = "block";
            }, 500);
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

