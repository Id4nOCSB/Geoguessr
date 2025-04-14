// Initialize variables
let players = [];
let currentPlayerIndex = 0;
let map;
let targetLocation;
let currentRound = 1; // Start at round 1
const maxRounds = 10; // Total number of rounds

// Function to update the scoreboard
function updateScoreboard() {
    const scoreboard = document.getElementById('scoreboard');
    scoreboard.innerHTML = `
        <p>Round: ${currentRound} / ${maxRounds}</p>
        ${players.map(player => `<p>${player.name}: ${player.score} points</p>`).join('')}
    `;
}

// Function to initialize the Google Map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 }, // Center of the map
        zoom: 2, // Zoom level
        mapTypeId: 'roadmap', // Map type
    });

    // Add a click listener to the map
    map.addListener('click', (event) => {
        handleMapClick(event.latLng);
    });

    // Start the game by setting a random target location
    setRandomTargetLocation();
    updateScoreboard();
    alert(`${players[currentPlayerIndex].name}'s turn!`);
}

// Function to set a random target location
function setRandomTargetLocation() {
    const lat = (Math.random() * 180 - 90).toFixed(6); // Random latitude between -90 and 90
    const lng = (Math.random() * 360 - 180).toFixed(6); // Random longitude between -180 and 180
    targetLocation = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));

    console.log(`Target location: ${targetLocation.toString()}`); // For debugging
}

// Function to handle map clicks
function handleMapClick(latLng) {
    // Calculate the distance between the guessed location and the target location
    const distance = google.maps.geometry.spherical.computeDistanceBetween(latLng, targetLocation);

    // Convert distance to kilometers and calculate points
    const distanceInKm = (distance / 1000).toFixed(2);
    const points = Math.max(0, Math.round(10000 / (distanceInKm + 1))); // Points decrease with distance

    // Update the current player's score
    players[currentPlayerIndex].score += points;

    // Place a marker where the user clicked
    new google.maps.Marker({
        position: latLng,
        map: map,
        title: `${players[currentPlayerIndex].name}'s Guess`,
    });

    // Place a marker at the target location
    new google.maps.Marker({
        position: targetLocation,
        map: map,
        title: `Target Location`,
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png", // Green marker for the target
        },
    });

    // Display the result
    alert(`${players[currentPlayerIndex].name} guessed ${distanceInKm} km away and earned ${points} points!`);

    // Update the scoreboard
    updateScoreboard();

    // Check if the game has reached the maximum number of rounds
    if (currentRound >= maxRounds) {
        endGame();
        return;
    }

    // Switch to the next player
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

    // If all players have played, move to the next round
    if (currentPlayerIndex === 0) {
        currentRound++;
    }

    // Set a new random target location for the next round
    setRandomTargetLocation();

    // Notify the next player
    alert(`${players[currentPlayerIndex].name}'s turn!`);
}

// Function to end the game
function endGame() {
    // Determine the winner
    const winner = players.reduce((prev, current) => (prev.score > current.score ? prev : current));
    alert(`Game Over! The winner is ${winner.name} with ${winner.score} points!`);

    // Disable further interaction
    map.setOptions({ draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true });
    document.getElementById('guess-button').disabled = true;
}

// Function to handle the name form submission
document.getElementById('name-form').addEventListener('submit', (event) => {
    event.preventDefault();

    // Get player names from the form
    const player1Name = document.getElementById('player1-name').value.trim();
    const player2Name = document.getElementById('player2-name').value.trim();

    // Initialize players
    players = [
        { name: player1Name || "Player 1", score: 0 },
        { name: player2Name || "Player 2", score: 0 },
    ];

    // Hide the name form and show the game container
    document.getElementById('name-form-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'flex';

    // Initialize the map
    initMap();
});