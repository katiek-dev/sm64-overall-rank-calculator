/* Code for the overall leaderboard functionality */

/* HTML elements assigned to variables */
const overallLeaderboardButton = document.querySelector(".lb-button");
const overallLeaderboardNavPanel = document.querySelector(".overall-lb-nav-panel")
const overallLeaderboardContainer = document.querySelector(".overall-leaderboard-container");
const overallLeaderboardPlacementsContainer = document.querySelector(".overall-leaderboard-placements-container")

/* Functionality for the overall leaderboard button */
overallLeaderboardButton.addEventListener('click', () => {
    // console.log("lb button clicked");
    categoryWeightsContainer.classList.add("hidden");
    overallLeaderboardNavPanel.classList.remove("hidden");
    overallLeaderboardContainer.classList.remove("hidden");
    // Display the overall leaderboard
    calculateAndDisplayOverallLeaderboard();
});


/* Function to visually display an overall leaderboard placement in the DOM */
function visuallyAddPlacement(placement, name, icon, playerColors, ranks) {
    const placementDiv = document.createElement("div");
    placementDiv.classList.add("leaderboard-place-panel");
    overallLeaderboardPlacementsContainer.appendChild(placementDiv);
    /* Placement Number Element */
    const numberPlacementText = document.createElement("span");
    numberPlacementText.textContent = `#${placement}`
    numberPlacementText.classList.add("player-rank");
    // /* Check if it's rank 1, 2, or 3, if it is add styling */
    if (placement == 1) {
        numberPlacementText.classList.add("rank-one");
    } else if (placement == 2) {
        numberPlacementText.classList.add("rank-two");
    } else if (placement == 3) {
        numberPlacementText.classList.add("rank-three");
    }
    placementDiv.appendChild(numberPlacementText);
    /* Player Icon*/
    if (icon != null && icon !== "") {
        const playerIcon = document.createElement("img");
        playerIcon.classList.add("player-icon");
        playerIcon.src = `${icon}`;
        placementDiv.appendChild(playerIcon);
    } else {
        const playerIcon = document.createElement("img");
        playerIcon.classList.add("player-icon");
        playerIcon.src = "images/user.png";
        playerIcon.style.backgroundColor = playerColors[0];
        placementDiv.appendChild(playerIcon);
    }
    /* Name element */
    const nameElement = document.createElement("span");
    nameElement.textContent = `${name}`
    nameElement.style.color = playerColors[0];
    /* Check if the player color is #000000, if it is, 
     * then remove the text-shadow styling */
    if (playerColors[0] == "#000000") {
        nameElement.style.textShadow = "none";
    }
    nameElement.classList.add("player-name");
    placementDiv.appendChild(nameElement);
    shrinkToFit(nameElement);
    /* Ranks for 120, 70, 16, 1, and 0 */
    const categories = ["120", "70", "16", "1", "0"];
    categories.forEach( (category, index, categories) => {
        const rank = categories[index];
        const rankElement = document.createElement("span");
        if (ranks[category] != -1) {
            rankElement.textContent = `${category}: #${ranks[category]}`;
        } else { // Otherwise, that means they don't have a time in this category
            rankElement.textContent = "-"
        }
        rankElement.classList.add("rank-element");
        placementDiv.appendChild(rankElement);
        shrinkToFit(rankElement);
    })
    /* Add an event listener to the name element that will open the players modal */
    nameElement.addEventListener('click', () => {
        /* This function takes the parameter of just the placement div itself,
         * so that it can just clone all of the elements inside of it */
        openPlayerModal(placementDiv, placement, ranks);
    });
}





    