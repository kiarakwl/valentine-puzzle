document.addEventListener("DOMContentLoaded", function () {
    const backgroundMusic = document.getElementById("background-music");
    const toggleMusicBtn = document.getElementById("toggle-music");

    // Start music automatically
    backgroundMusic.volume = 0.5; // Set volume to 50%
    backgroundMusic.loop = true;

    function toggleMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            toggleMusicBtn.textContent = "Pause Music";
        } else {
            backgroundMusic.pause();
            toggleMusicBtn.textContent = "Play Music";
        }
    }

    toggleMusicBtn.addEventListener("click", toggleMusic);
});
