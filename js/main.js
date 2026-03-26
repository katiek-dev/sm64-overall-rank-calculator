/* The other files other than this will contain the html elements selected, event listeners for them, and functionality
 * for seperate parts of this application and have been named accordingly */

/* Almost all of these .js files including this one have console.log lines in them stating what 
 * certain parts of the code are doing. these can be uncommented as needed for testing purposes */

// Wait until dom content is loaded to start the app
window.addEventListener('DOMContentLoaded', () => { 
    startApp(); 
});

/* Start the app by getting 120/70/16/1/0 star leaderboard times, that includes N64, emu, and console.
 * then combined leaderboards will be created for each category, based off of these combined leaderboards
 * an overall leaderboard is calculated and visually displayed */
async function startApp() {
    [combined120lb, combined70lb, combined16lb, combined1lb, combined0lb] = await Promise.all([
        fetchDataAndCreateCombineLeaderboard(CATEGORY_120_STAR_ID, SM64_GAME_ID),
        fetchDataAndCreateCombineLeaderboard(CATEGORY_70_STAR_ID, SM64_GAME_ID),
        fetchDataAndCreateCombineLeaderboard(CATEGORY_16_STAR_ID, SM64_GAME_ID),
        fetchDataAndCreateCombineLeaderboard(CATEGORY_1_STAR_ID, SM64_GAME_ID),
        fetchDataAndCreateCombineLeaderboard(CATEGORY_0_STAR_ID, SM64_GAME_ID),
    ])
    dataRetrieved = true;
    /* After getting the five categories, that is when we can display the 
    overall leaderboard: */
    calculateAndDisplayOverallLeaderboard();
}








