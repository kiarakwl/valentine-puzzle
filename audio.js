// Background music setup
let musicTracks = [
    {
        name: "Love Story",
        artist: "Taylor Swift",
        src: "path/to/Love-Story.mp3"
    },
    {
        name: "Just the Way You Are",
        artist: "Bruno Mars",
        src: "path/to/Just-the-Way-You-Are.mp3"
    },
    {
        name: "Make You Mine",
        artist: "PUBLIC",
        src: "path/to/Make-You-Mine.mp3"
    },
    {
        name: "Electric Love",
        artist: "BØRNS",
        src: "path/to/Electric-Love.mp3"
    },
    {
        name: "Paris",
        artist: "The Chainsmokers",
        src: "path/to/Paris.mp3"
    }
];

// Initialize background music player
let audioPlayer = new Audio();
let currentTrackIndex = 0;
audioPlayer.src = musicTracks[currentTrackIndex].src;
audioPlayer.loop = true;  // Loop the track

// Play the first track
audioPlayer.play();

// Function to switch to the next track
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
    audioPlayer.src = musicTracks[currentTrackIndex].src;
    audioPlayer.play();
}

// Function to pause and resume the music
function toggleMusic() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
}

// Add event listener for track changes
document.getElementById("next-track-btn").addEventListener("click", nextTrack);
document.getElementById("toggle-music-btn").addEventListener("click", toggleMusic);

// Control visibility of the music controls
document.getElementById("music-controls").style.display = 'block';
