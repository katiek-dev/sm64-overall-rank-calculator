/* Code for the category weights page functionality */

/* HTML elements assigned to variables */
const categoryWeightsButton = document.querySelector(".category-weights-button");
const categoryWeightsContainer = document.querySelector(".category-weights-container");
const weightsResetButton = document.querySelector(".weights-reset-button")

/* Functionality for the category weights button */
categoryWeightsButton.addEventListener('click', () => {
    //console.log("category weights button clicked");
    overallLeaderboardContainer.classList.add("hidden");
    overallLeaderboardNavPanel.classList.add("hidden");
    categoryWeightsContainer.classList.remove("hidden");    
});

weightsResetButton.addEventListener('click', () => {
    // console.log("resetting category weights");
    /* Reset all of the weights in the category_weights object to be 1.0 */
    const categories = [CATEGORY_120_STAR_ID, CATEGORY_70_STAR_ID, CATEGORY_16_STAR_ID, CATEGORY_1_STAR_ID, CATEGORY_0_STAR_ID];
    categories.forEach( (categoryID) => {
        category_weights[categoryID] = 1.0;
        // Find the slider by category ID
        const categoryWeightSlider = document.querySelector(`[data-category-id="${categoryID}"]`);
        // Find the slider-text class that should be a child element of the category weight slider
        const sliderText = categoryWeightSlider.querySelector(".slider-text");
        // It should just be 100%
        sliderText.textContent = `100%`;
    }); 
        
});


/* Select all left sliders for category weights and add event listeners to them */
const leftSliders = document.querySelectorAll(".slider-left-btn");

leftSliders.forEach(slider => {
    slider.addEventListener('click', () => {
        //console.log("left slider clicked");
        /* Check the category id of the slider that we are clicking */
        let CategoryID = slider.parentElement.getAttribute('data-category-id');
        // console.log(`left slider with category id of ${CategoryID} clicked`);
        updateCategoryWeight(CategoryID, -0.1); // Subtract 10%
    });
});

/* Select all right sliders for category weights and add event listeners to them */
const rightSliders = document.querySelectorAll(".slider-right-btn");

rightSliders.forEach(slider => {
    slider.addEventListener('click', () => {
        // console.log("right slider clicked");
        /* Check the category id of the slider that we are clicking */
        // let CategoryID = slider.parentElement.dataset.CategoryID;
        let CategoryID = slider.parentElement.getAttribute('data-category-id');
        // console.log(`right slider with category id of ${CategoryID} clicked`);
        updateCategoryWeight(CategoryID, 0.1); // Add 10%
    });
});

/* Function to both visually and programatically update the weights of
 * each category */
function updateCategoryWeight(categoryID, weightChange) {
    /* Check if the category ID exists in the lookup table */
    if (categoryID in category_weights) {
        // console.log(`category id of ${CategoryID} found in array`);
        /* Programatically update weight with weightChange */
        // console.log(`original category weight: ${category_weights[CategoryID]}`);
        category_weights[categoryID] += weightChange;
        // console.log(`new category weight: ${category_weights[CategoryID].value}`);
        /* Visually update weight on the html */
        // Find the slider by category ID
        const categoryWeightSlider = document.querySelector(`[data-category-id="${categoryID}"]`);
        // Find the slider-text class that should be a child element of the category weight slider
        const sliderText = categoryWeightSlider.querySelector(".slider-text");
        // Calculate percentage
        const percentAsInteger =  (category_weights[categoryID] * 100);
        // Update the text
        sliderText.textContent = `${percentAsInteger.toFixed(0)}%`;
    }
}