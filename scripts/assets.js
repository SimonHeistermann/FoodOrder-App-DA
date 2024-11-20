function reloadWebsite() {
    location.href = location.href;
};

function styleSelectedCategory() {
    removeSelectedStyle();
    let categroryRef = document.getElementById(currentCategory);
    categroryRef.classList.add('categorycontainer__selected');
    let categoryImgRef = document.getElementById(currentCategory + "_img");
    categoryImgRef.classList.add('categorycontainerimg__selected');
};

function removeSelectedStyle() {
    for (let indexCategory = 0; indexCategory < foodCategories.length; indexCategory++) {
        let contentRef = document.getElementById(foodCategories[indexCategory].name);
        contentRef.classList.remove('categorycontainer__selected');
        let categoryImgRef = document.getElementById(foodCategories[indexCategory].name + "_img");
        categoryImgRef.classList.remove('categorycontainerimg__selected');  
    }
};

function replaceDotWithComma(number) {
    let formattedNumber = number.toString();
    return formattedNumber.replace(/\./g, ',');
};

function deleteItemFrom(index, from) {
    from.splice(index, 1);
    saveToLocalStorage();
    renderCart();
};

function clearItems(location) {
    for (let i = 0; i < location.length; i++) {
        location[i].amountInCart = 0;
    }
    location.length = 0;
    saveToLocalStorage();
    renderCart();
};

function changeNavBorderStyling(id) {
    removeNavBorderStyling();
    let navRef = document.getElementById('nav_' + id);
    navRef.classList.add('navbutton__open');
};

function removeNavBorderStyling() {
    for (let i = 0; i < navOptions.length; i++) {
        let navRef = document.getElementById('nav_' + navOptions[i]);
        navRef.classList.remove('navbutton__open');
    }
};

function changeWrapSytlingInFoods(identification) {
    let foodRef = document.getElementById('food_section');
    if(identification === "popular") {
        foodRef.classList.remove('foodsection__recents');
    } else if(identification === "recent") {
        foodRef.classList.add('foodsection__recents');
    }
};

function checkIfNavRecent() {
    let navRef = document.getElementById('nav_recent');
    if (navRef.classList.contains('navbutton__open')) {
        renderRecentOrders();
    }
};

function findObjectIndexInArray(array, objectToFind) {
    for (let j = 0; j < array.length; j++) {
        if (JSON.stringify(array[j]) === JSON.stringify(objectToFind)) {
            return j;
        }
    }
    return -1; 
};