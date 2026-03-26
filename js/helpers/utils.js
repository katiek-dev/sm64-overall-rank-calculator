/* Helper method for turning category ID's into their string form */
function CategoryIDtoString(categoryID) {
    switch (categoryID) {
        case CATEGORY_120_STAR_ID:
            return "120 Star";
        case CATEGORY_70_STAR_ID:
            return "70 Star";
        case CATEGORY_16_STAR_ID:
            return "16 Star";
        case CATEGORY_1_STAR_ID:
            return "1 Star";
        case CATEGORY_0_STAR_ID:
            return "0 Star";
        default:
            return "Not found.";
    }
}

/* Helper function to update the "rank" attribute in a user object
 * in the overallLeaderboardArray */
function updatePlayerRank(userObject, categoryID, rank) {
    /* Update the "ranks" attribute of the userObject */
    if (categoryID == CATEGORY_120_STAR_ID) {
        userObject.ranks["120"] = rank;
    } else if (categoryID == CATEGORY_70_STAR_ID) {
        userObject.ranks["70"] = rank;
    } else if (categoryID == CATEGORY_16_STAR_ID) {
        userObject.ranks["16"] = rank;
    } else if (categoryID == CATEGORY_1_STAR_ID) {
        userObject.ranks["1"] = rank;
    } else if (categoryID == CATEGORY_0_STAR_ID) {
        userObject.ranks["0"] = rank;
    }
}

