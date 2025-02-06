/* ===== Global Variables & Customization ===== */
let currentPuzzle = 0; // Puzzle order: 0: Love letter, 1: Jigsaw, 2: Memory, 3: Heart Maze, 4: Polaroid, 5: Soft Toys, 6: Record, 7: Final Video
const totalPuzzles = 8;

// Customize names
let myName = "Your Name";
let hisName = "Nicholas";
document.getElementById("his-name").textContent = hisName;

// Music files – update paths if needed
const musicPlaylist = {
  loveLetter: new Audio('LoveStory_TaylorSwift.mp3'),
  jigsaw: new Audio('Photograph_EdSheeran.mp3'),
  memory: new Audio('CountOnMe_BrunoMars.mp3'),
  heartMaze: new Audio('ThinkingOutLoud_EdSheeran.mp3'), // reused track or change as desired
  polaroid: new Audio('TeenageDream_KatyPerry.mp3'),
  softToys: new Audio('ShakeItOff_TaylorSwift.mp3'),
  record: new Audio('Perfect_EdSheeran.mp3'),
  finalVideo: new Audio('MarryYou_BrunoMars.mp3')
};

/* ===== Puzzle Flow Control ===== */
window.onload = function() {
  showPuzzle(0);
};

function showPuzzle(index) {
  // List of section IDs in order (updated: replace heart graph with heart maze)
  const sections = ["love-letter", "jigsaw", "memory-game", "heart-maze", "polaroid", "soft-toys", "record", "final-video"];
  sections.forEach(id => document.getElementById(id).style.display = "none");

  // Stop any playing music
  Object.values(musicPlaylist).forEach(audio => { audio.pause(); audio.currentTime = 0; });

  switch(index) {
    case 0: // Love Letter
      document.getElementById("love-letter").style.display = "block";
      musicPlaylist.loveLetter.play();
      break;
    case 1: // Jigsaw Puzzle
      document.getElementById("jigsaw").style.display = "block";
      initJigsaw();
      musicPlaylist.jigsaw.play();
      break;
    case 2: // Memory Matching Game
      document.getElementById("memory-game").style.display = "block";
      initMemoryGame();
      musicPlaylist.memory.play();
      break;
    case 3: // Heart Maze Game (new replacement)
      document.getElementById("heart-maze").style.display = "block";
      initHeartMaze();  // Implement your heart maze logic here.
      musicPlaylist.heartMaze.play();
      break;
    case 4: // Interactive Polaroid
      document.getElementById("polaroid").style.display = "block";
      initPolaroid();
      musicPlaylist.polaroid.play();
      break;
    case 5: // Soft Toy Clues
      document.getElementById("soft-toys").style.display = "block";
      document.querySelectorAll("#soft-toys .toy").forEach(toy => {
        toy.onclick = function() {
          alert(this.dataset.hint);
        };
      });
      musicPlaylist.softToys.play();
      break;
    case 6: // Record/CD of Memories
      document.getElementById("record").style.display = "block";
      document.getElementById("record").onclick = function() {
        alert("Remember our favorite memory, " + hisName + "!");
      };
      musicPlaylist.record.play();
      break;
    case 7: // Final Reward Video
      document.getElementById("final-video").style.display = "block";
      musicPlaylist.finalVideo.play();
      break;
    default:
      console.log("All puzzles complete.");
  }
  currentPuzzle = index;
}

document.getElementById("next-btn").addEventListener("click", function() {
  if (currentPuzzle < totalPuzzles - 1) {
    currentPuzzle++;
    showPuzzle(currentPuzzle);
  } else {
    alert("You have completed all puzzles!");
  }
});

document.getElementById("start-btn").addEventListener("click", function() {
  showPuzzle(1);
});

/* ===== Jigsaw Puzzle Code (8x8) ===== */
function initJigsaw() {
  const container = document.getElementById("jigsaw");
  container.innerHTML = "";
  const imgSrc = "your_custom_jigsaw_image.jpg"; // Replace with your chosen photo
  const gridSize = 8;
  const containerSize = container.offsetWidth;
  const pieceSize = containerSize / gridSize;
  let pieces = [];
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let piece = document.createElement("div");
      piece.className = "jigsaw-piece";
      piece.style.width = pieceSize + "px";
      piece.style.height = pieceSize + "px";
      piece.style.backgroundImage = "url('" + imgSrc + "')";
      piece.style.backgroundPosition = `-${col * pieceSize}px -${row * pieceSize}px`;
      piece.dataset.origLeft = col * pieceSize;
      piece.dataset.origTop = row * pieceSize;
      pieces.push(piece);
      container.appendChild(piece);
    }
  }
  pieces.forEach(piece => {
    piece.style.left = Math.random() * (containerSize - pieceSize) + "px";
    piece.style.top = Math.random() * (containerSize - pieceSize) + "px";
    piece.draggable = true;
    piece.addEventListener("dragstart", jigsawDragStart);
    piece.addEventListener("dragover", jigsawDragOver);
    piece.addEventListener("drop", jigsawDrop);
  });
}

let jigsawDragged = null;
function jigsawDragStart(e) {
  jigsawDragged = this;
}
function jigsawDragOver(e) {
  e.preventDefault();
}
function jigsawDrop(e) {
  e.preventDefault();
  let tempLeft = this.style.left;
  let tempTop = this.style.top;
  this.style.left = jigsawDragged.style.left;
  this.style.top = jigsawDragged.style.top;
  jigsawDragged.style.left = tempLeft;
  jigsawDragged.style.top = tempTop;
  setTimeout(() => { showPuzzle(2); }, 5000);
}

/* ===== Memory Matching Game Code ===== */
function initMemoryGame() {
  const grid = document.querySelector("#memory-game .grid");
  grid.innerHTML = "";
  // Replace the fruit symbols with your custom image card paths if desired:
  const cardImages = [
    'card1.jpg', 'card2.jpg', 'card3.jpg', 'card4.jpg',
    'card5.jpg', 'card6.jpg', 'card7.jpg', 'card8.jpg'
  ];
  let cardsArray = cardImages.concat(cardImages);
  cardsArray.sort(() => 0.5 - Math.random());
  cardsArray.forEach(imgSrc => {
    let card = document.createElement("div");
    card.className = "card";
    card.dataset.img = imgSrc;
    // Instead of text, create an img element:
    card.innerHTML = `<img src="${imgSrc}" alt="Card image" style="width: 80%; display: none;">`;
    card.addEventListener("click", memoryCardClick);
    grid.appendChild(card);
  });
  updateProgressBar(0);
  memoryState.first = null;
  memoryState.second = null;
  memoryState.lock = false;
  memoryState.matches = 0;
}
let memoryState = { first: null, second: null, lock: false, matches: 0 };
function memoryCardClick() {
  if (memoryState.lock) return;
  if (this === memoryState.first) return;
  let img = this.querySelector("img");
  this.classList.add("flipped");
  img.style.display = "block";
  if (!memoryState.first) {
    memoryState.first = this;
    return;
  }
  memoryState.second = this;
  memoryState.lock = true;
  if (memoryState.first.dataset.img === memoryState.second.dataset.img) {
    memoryState.matches++;
    resetMemory();
    updateProgressBar((memoryState.matches / 8) * 100);
    if (memoryState.matches === 8) {
      setTimeout(() => { showPuzzle(3); }, 1000);
    }
  } else {
    setTimeout(() => {
      memoryState.first.classList.remove("flipped");
      memoryState.second.classList.remove("flipped");
      memoryState.first.querySelector("img").style.display = "none";
      memoryState.second.querySelector("img").style.display = "none";
      resetMemory();
    }, 1000);
  }
}
function resetMemory() {
  memoryState.first = null;
  memoryState.second = null;
  memoryState.lock = false;
}
function updateProgressBar(value) {
  document.querySelector(".progress-bar-fill").style.width = value + "%";
}

/* ===== Heart Maze Game Code (Placeholder) ===== */
function initHeartMaze() {
  const canvas = document.getElementById("mazeCanvas");
  const ctx = canvas.getContext("2d");
  // Clear and set up your maze background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#F3F0E8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Draw a simple heart maze outline (this is a placeholder – you can replace with more advanced logic)
  ctx.strokeStyle = "#971522";
  ctx.lineWidth = 4;
  ctx.beginPath();
  // Example: draw a heart shape outline that also works as a maze border
  ctx.moveTo(200, 100);
  ctx.bezierCurveTo(150, 0, 50, 0, 50, 150);
  ctx.bezierCurveTo(50, 250, 200, 350, 200, 400);
  ctx.bezierCurveTo(200, 350, 350, 250, 350, 150);
  ctx.bezierCurveTo(350, 0, 250, 0, 200, 100);
  ctx.stroke();
  // You can add interactivity here (e.g., allow the user to "navigate" the maze)
  // For now, after a short delay, advance to the next puzzle:
  setTimeout(() => { showPuzzle(4); }, 5000);
}

/* ===== Polaroid Interaction ===== */
function initPolaroid() {
  document.querySelectorAll("#polaroid .polaroid-container img").forEach(img => {
    img.onclick = function() {
      this.classList.toggle("zoomed");
    };
  });
  setTimeout(() => { showPuzzle(5); }, 3000);
}

/* ===== Global Next Button remains the same ===== */
