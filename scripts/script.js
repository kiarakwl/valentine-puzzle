document.addEventListener("DOMContentLoaded", function () {
    // Handle background music
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");

    musicToggle.addEventListener("click", function () {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = "Pause Music";
        } else {
            bgMusic.pause();
            musicToggle.textContent = "Play Music";
        }
    });

    // Progress tracking
    let progress = 0;
    const progressText = document.getElementById("progress-text");

    function updateProgress(value) {
        progress += value;
        progressText.textContent = `Progress: ${progress}/8`;
    }

    // Show and hide sections
    function showSection(id) {
        document.querySelectorAll(".game-section").forEach(section => {
            section.style.display = "none";
        });
        document.getElementById(id).style.display = "block";
    }

    // Initial setup
    showSection("jigsaw-game");

    document.getElementById("start-game").addEventListener("click", function () {
        showSection("jigsaw-game");
    });

    document.getElementById("complete-jigsaw").addEventListener("click", function () {
        updateProgress(4);
        showSection("memory-game");
    });

    document.getElementById("complete-memory").addEventListener("click", function () {
        updateProgress(4);
        showSection("final-video");
    });
});

