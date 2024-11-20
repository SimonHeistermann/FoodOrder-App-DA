let currentCategory = "Burger";


function init() {
    getFromLocalStorage();
    renderCategories();
    renderStandardPreview();
    renderCart();
};

function renderCategories() {
    let contentRef = document.getElementById('categories_container');
    contentRef.innerHTML = "";
    if (foodCategories) {
        for (let indexCategory = 0; indexCategory < foodCategories.length; indexCategory++) {
            contentRef.innerHTML += renderHTMLCategories(indexCategory);
        }
    }
};

function renderStandardPreview() {
    let contentRef = document.getElementById('food_section');
    contentRef.innerHTML = "";
    for (let indexPreview = 0; indexPreview < foodCategories[4].foods.length; indexPreview++) {
        contentRef.innerHTML += renderHTMLStandardPreview(indexPreview);
    }
    styleSelectedCategory();
};

function renderFood(indexCategory) {
    let contentRef = document.getElementById('food_section');
    contentRef.innerHTML = "";
    for (let indexFood= 0; indexFood < foodCategories[indexCategory].foods.length; indexFood++) {
        contentRef.innerHTML += renderHTMLFood(indexCategory, indexFood);
    }
    currentCategory = foodCategories[indexCategory].name;
    styleSelectedCategory();
};

function openPopularFoods(id) {
    currentCategory = "Burger";
    changeNavBorderStyling(id);
    changeWrapSytlingInFoods(id);
    renderStandardPreview();
};

function openFoodCategory(indexCategory, id) {
    changeNavBorderStyling(id);
    changeWrapSytlingInFoods(id);
    renderFood(indexCategory);
};

