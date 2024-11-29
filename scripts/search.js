let filter = [
    {   
        "name": "appetizer",
        "categories" : [
            foodCategories[0]
        ]
    },
    {   
        "name": "sideDish",
        "categories" : [
            foodCategories[1],
            foodCategories[2]
        ]
    },
    {   
        "name": "mainDish",
        "categories" : [
            foodCategories[3],
            foodCategories[4],
            foodCategories[5],
            foodCategories[6],
            foodCategories[7]
        ]
    },
    {   
        "name": "dessert",
        "categories" : [
            foodCategories[8],
            foodCategories[9]
        ]
    }
];

let currentActiveFilter = [];
let filteredFoodItems = [];


function initFilterContainer() {
    let filterButton = document.getElementById('filter_button');
    let filterContainer = document.getElementById('filter_container');
    filterButton.addEventListener('click', function () {
        toggleFilterContainer(filterContainer, filterButton);
    });
    addResizeAndScrollListeners(filterContainer, filterButton);
};

function toggleFilterContainer(container, button) {
    if (container.classList.contains('show__filtercontainer')) {
        hideFilterContainer(container);
    } else {
        updateFilterPosition(container, button);
        showFilterContainer(container);
    }
};

function showFilterContainer(container) {
    container.classList.add('show__filtercontainer');
};

function hideFilterContainer(container) {
    container.classList.remove('show__filtercontainer');
};

function addResizeAndScrollListeners(container, button) {
    window.addEventListener('resize', function () {
        updateFilterPositionIfVisible(container, button);
    });
    window.addEventListener('scroll', function () {
        updateFilterPositionIfVisible(container, button);
    });
};

function updateFilterPositionIfVisible(container, button) {
    if (container.classList.contains('show__filtercontainer')) {
        updateFilterPosition(container, button);
    }
};

function updateFilterPosition(container, button) {
    let buttonRect = button.getBoundingClientRect();
    container.style.top = (buttonRect.bottom + window.scrollY + 14) + 'px';
    container.style.right = (window.innerWidth - buttonRect.right - 7) + 'px';
};

function toggleFilter(id) {
    let checkbox = document.getElementById(id);
    let filterName = getFilterNameFromId(id);
    if (checkbox.checked) {
        if (currentActiveFilter.indexOf(filterName) === -1) {
            currentActiveFilter.push(filterName);
        }
    } else {
        let index = currentActiveFilter.indexOf(filterName);
        if (index > -1) {
            currentActiveFilter.splice(index, 1);
        }
    }
};

function getFilterNameFromId(id) {
    let filterMap = {
        'appetizer': 'appetizer',
        'side_dish': 'side_dish',
        'main_dish': 'main_dish',
        'dessert': 'dessert'
    };
    return filterMap[id] || '';
};

function filterFood(event) {
    event.preventDefault();
    let searchTerm = document.getElementById('search_input').value.toLowerCase();
    filteredFoodItems = [];
    if (event.type === 'submit') document.getElementById('search_input').value = '';
    matchSearch(searchTerm);
    renderFilteredFoodItems(filteredFoodItems);
    ifEmptySearch(searchTerm);
    if (mobileMode === false) {
        renderCart();
    }
};

function matchSearch(searchTerm) {
    for (let i = 0; i < foodCategories.length; i++) {
        let category = foodCategories[i];
        if (shouldIncludeCategory(category)) {
            for (let j = 0; j < category.foods.length; j++) {
                let food = category.foods[j];
                if (food.name.toLowerCase().indexOf(searchTerm) !== -1) {
                    filteredFoodItems.push(food);
                }
            }
        }
    }
};

function ifEmptySearch(searchTerm) {
    if (searchTerm === "") {
        if (currentWindow === "standard") openHome();
        if (currentWindow === "wishlist") openWishlist();
        if (mobileCart === "on") openMobileCart();
        filteredFoodItems.length = 0;
        return;
    }
};

function shouldIncludeCategory(category) {
    for (let i = 0; i < filter.length; i++) {
        if (currentActiveFilter.indexOf(filter[i].name) !== -1) {
            for (let j = 0; j < filter[i].categories.length; j++) {
                if (filter[i].categories[j].name === category.name) {
                    return true;
                }
            }
        }
    }
    return currentActiveFilter.length === 0;
};

function renderFilteredFoodItems(filteredFoodItems) {
    renderSearchStructure();
    let contentRef = document.getElementById('food_section');
    contentRef.innerHTML = "";
    if(filteredFoodItems.length > 0) {
        for (let indexFilteredFood = 0; indexFilteredFood < filteredFoodItems.length; indexFilteredFood++) {
            contentRef.innerHTML += renderHTMLFilteredFood(filteredFoodItems, indexFilteredFood);
        }
    } else {
        contentRef.innerHTML += renderHTMLNoFilteredFoods();
    }
};

function renderSearchStructure() {
    let structureRef = document.getElementById('main_content');
    structureRef.innerHTML = "";
    structureRef.innerHTML = renderHTMLSearchStructure();
};

function copyFilteredFoodToWishlist(filteredFoodItems, indexFilteredFood) {
    let currentFood = filteredFoodItems[indexFilteredFood];
    let i = findObjectIndexInArray(wishlist, currentFood)
    if (i !== -1) {
        wishlist.splice(i, 1);
    }
    wishlist.push(currentFood);
    saveToLocalStorage();
};

function moveFilteredFoodToCart(filteredFoodItems, indexFilteredFood) {
    let currentFood = filteredFoodItems[indexFilteredFood];
    if (!currentFood) return;
    addToCartIfNotExists(cart, currentFood);
    currentFood.amountInCart = (currentFood.amountInCart || 0) + 1;
    for (i = 0; i < [wishlist, recentOrders].length; i++) {
        updateAmount([wishlist, recentOrders][i], currentFood);
    }
    updateAmount(cart, currentFood);
    updateAmountInFoodCategories(currentFood);
    saveToLocalStorage();
    if (!mobileMode) {
        renderCart();
    }
};




