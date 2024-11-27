let currentCategory = "Burger";

function init() {
    getFromLocalStorage();
    generateObjectIds();
    changeWishlistAndHomeLogo('home');
    changeHeader('standard');
    renderStandardStructure();
    renderCategories();
    renderStandardPreview();
    renderCart();
};

function generateObjectIds() {
    foodCategories.forEach(function(category, categoryIndex) {
        category.foods.forEach(function(food, foodIndex) {
            food.id = `category_${categoryIndex}_food_${foodIndex}`;
        });
    });
    saveToLocalStorage();
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
    addOpenCartButton(contentRef);
    styleSelectedCategory();
};

function renderFood(indexCategory) {
    let contentRef = document.getElementById('food_section');
    contentRef.innerHTML = "";
    for (let indexFood= 0; indexFood < foodCategories[indexCategory].foods.length; indexFood++) {
        contentRef.innerHTML += renderHTMLFood(indexCategory, indexFood);
    }
    addOpenCartButton(contentRef);
    currentCategory = foodCategories[indexCategory].name;
    styleSelectedCategory();
};

function openPopularFoods(id) {
    currentCategory = "Burger";
    renderStandardStructure();
    renderCategories();
    changeNavBorderStyling(id);
    changeHeader('standard');
    changeWrapSytlingInFoods(id);
    renderStandardPreview();
};

function openFoodCategory(indexCategory, id) {
    changeNavBorderStyling(id);
    changeWrapSytlingInFoods(id);
    renderFood(indexCategory);
};

