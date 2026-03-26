/* Using the variables for the 5 categories, sort the overall leaderboard (AKA
 * the overallLeaderboardArray) based on the category weights */
function calculateAndDisplayOverallLeaderboard() {
    // Make sure the data is retrieved, otherwise there's nothing to display
    if (dataRetrieved == true) {
        /* Clear the usersAndPoints array */
        overallLeaderboardArray.length = 0;

        /* Loop through the 5 leaderboards that we got in the startApp()
        * function, based on the category_weights object that is customizable
        * by the user, creating a new overall leaderboard  */
        loopThroughLeaderBoardAndAssignPoints(combined120lb, CATEGORY_120_STAR_ID); // 120 
        loopThroughLeaderBoardAndAssignPoints(combined70lb, CATEGORY_70_STAR_ID); // 70
        loopThroughLeaderBoardAndAssignPoints(combined16lb, CATEGORY_16_STAR_ID); // 16
        loopThroughLeaderBoardAndAssignPoints(combined1lb, CATEGORY_1_STAR_ID); // 1
        loopThroughLeaderBoardAndAssignPoints(combined0lb, CATEGORY_0_STAR_ID); // 0

        /* Sort the overallLeaderboardArray by points before displaying it */
        overallLeaderboardArray.sort((a, b) => b.points - a.points);

        /* Based on the size of the array, calculate the final page number
        * and set that variable accordingly */
        finalPage = Math.floor( overallLeaderboardArray.length / 50 ); // The final page will be the length divided by 50 rounded down
        // console.log(`final page calculated to be ${finalPage}`);

        /* Display overall leaderboard based on their users and points */
        console.log("overall leaderboard:");
        console.log(overallLeaderboardArray);
        // Start by displaying the first page
        visuallyDisplayPage(currentPage);
    }
}

/* Re-usable function to loop through a leaderboard, and assign points to the overallLeaderboardArray */
function loopThroughLeaderBoardAndAssignPoints(leaderboard, categoryID) {
    /* Calculate weight based on category ID */
    let weight = category_weights[categoryID];
     /* Loop through the array, check if the user is already in the array,
     * if the user is already in the array, then add points, if the user was not in 
     * the array, then add a new user */
    leaderboard.forEach((run, index) => {
        // Calculate points (1000 for first place, 500 for second place, 333 for third place, etc...)
        let calculatedPoints = (weight * ( 1000 * ( 1 / (index + 1) ) ) );
        let playerName = run.name;
        let playerIcon = run.playerIcon;
        let playerColors = run.playerColors;

        // Check if the user is already in the usersAndPoints array
        const player = overallLeaderboardArray.find(obj => obj.name === playerName);

        if (player !== undefined) { // If true then we found the object with the matching player name
            // console.log(`Found player named ${player.name} giving them ${calculatedPoints} points`);
            player.points += calculatedPoints; // Give them points
            updatePlayerRank(player, categoryID, (index+1));
        } else { // otherwise, we need to create a new player object and award them with the points
            const userObject = new Object({
                name: run.name,
                icon: playerIcon,
                points: calculatedPoints,
                colors: playerColors,
                ranks: {
                    "120": -1,
                    "70": -1,
                    "16": -1,
                    "1": -1,
                    "0": -1,
                }
            
            });
            updatePlayerRank(userObject, categoryID, (index+1));
            overallLeaderboardArray.push(userObject);
        }
    });
}

