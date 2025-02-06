document.addEventListener("DOMContentLoaded", function() {
    // Initialize the game and load necessary resources
    const startGameButton = document.getElementById('start-game');
    const restartButton = document.getElementById('restart-game');

    // Play the intro music on page load
    playIntroMusic();

    startGameButton.addEventListener("click", function() {
        startGame();
    });

    restartButton.addEventListener("click", function() {
        restartGame();
    });

    function playIntroMusic() {
        // Play the intro music when the page loads
        const introMusic = new Audio('path_to_intro_music.mp3');
        introMusic.play();
    }

    function startGame() {
        // Start the game when the "Start Game" button is clicked
        document.getElementById('intro-section').classList.add('hidden');
        document.getElementById('game-section').classList.remove('hidden');
        // Additional game initialization logic goes here...
    }

    function restartGame() {
        // Restart the game when the "Restart Game" button is clicked
        document.getElementById('game-section').classList.add('hidden');
        document.getElementById('intro-section').classList.remove('hidden');
        // Reset game state and UI...
    }
});
