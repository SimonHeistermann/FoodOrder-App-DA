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
    from[index].amountInCart = 0;
    if (from[index].amountInCart === 0) {
        from.splice(index, 1);
    }
    updateAmountInFoodCategories(from[index]);
    updateAmount(wishlist, from[index]);
    updateAmount(recentOrders, from[index]);
    saveToLocalStorage();
    renderCorrectCart();
};

function clearItems(location) {
    let listsToClear = [location, wishlist, recentOrders];
    for (let list of listsToClear) {
        for (let i = 0; i < list.length; i++) {
            list[i].amountInCart = 0;
        }
    }
    for (let indexCategory = 0; indexCategory < foodCategories.length; indexCategory++) {
        for (let indexFood = 0; indexFood < foodCategories[indexCategory].foods.length; indexFood++) {
            foodCategories[indexCategory].foods[indexFood].amountInCart = 0;
        }
    }
    location.length = 0;
    saveToLocalStorage();
    renderCorrectCart();
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
    if (navRef !== undefined && navRef !== null) {
        if (navRef.classList.contains('navbutton__open')) {
            renderRecentOrders();
        }
    }
};

function findObjectIndexInArray(array, objectToFind) {
    if (!objectToFind || typeof objectToFind.id === "undefined") {
        return -1;
    }
    for (let i = 0; i < array.length; i++) {
        if (array[i] && typeof array[i].id !== "undefined" && array[i].id === objectToFind.id) {
            return i;
        }
    }
    return -1;
};

function renderStandardStructure() {
    let contentStructureRef = document.getElementById('content_left');
    contentStructureRef.innerHTML = "";
    contentStructureRef.innerHTML += renderHTMLStandardStructure();
};

function changeHeader(window) {
    for (let i = 0; i < windows.length; i++) {
        let headerRef = document.getElementById(windows[i] + '_header');
        headerRef.classList.add('d__none');
    }
    let headerRef = document.getElementById(window + '_header');
    headerRef.classList.remove('d__none');
};

function updateAmount(array, food) {
    let index = findObjectIndexInArray(array, food);
    if (index !== -1) {
        array[index].amountInCart = food.amountInCart;
    }
};

function addToCartIfNotExists(cart, food) {
    if (!cart.some(item => item.id === food.id)) {
        cart.push(food);
    }
};

function updateAmountInFoodCategories(food) {
    for (let i = 0; i < foodCategories.length; i++) {
        let category = foodCategories[i];
        let index = findObjectIndexInArray(category.foods, food);
        if (index !== -1) {
            category.foods[index].amountInCart = food.amountInCart;
            break;
        }
    }
};

function removeFromArray(array, index) {
    array[index].amountInCart = 0;
    array.splice(index, 1);
    if(array === wishlist) {
        openWishlist();
    } else if(array === recentOrders) {
        openRecentOrders('recent');
    }
};

function changeWishlistAndHomeLogo(window) {
    let openWishlistLogoRef = document.getElementById('wishlist_logo');
    let openHomeLogoRef = document.getElementById('home_logo')
    if (window === 'home') {
        openWishlistLogoRef.classList.remove('d__none');
        openHomeLogoRef.classList.add('d__none');
    } else if (window === 'wishlist') {
        openWishlistLogoRef.classList.add('d__none');
        openHomeLogoRef.classList.remove('d__none');
    }
};

function addOpenCartButton(contentRef) {
    let width = window.innerWidth;
    if(width <= 1025) {
        contentRef.innerHTML += renderHTMLOpenCartButton();
    }
};

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if(mobileCart === 'off') {
        let backToTopButton = document.getElementById("totop_button");
        let width = window.innerWidth;
        if ((document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) && width <= 1025) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    }
};

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

function updateLayout() {
    let width = window.innerWidth;
    if (width <= 1025) {
        mobileMode = true;
    } else if ( width > 1025) {
        mobileMode = false;
    }
};

document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("resize", renderUpdatedLayout);
    renderUpdatedLayout();
});

function renderUpdatedLayout() {
    getFromLocalStorage();
    if (document.getElementById('content_right')) {
        updateLayout();
        if (mobileMode === false) {
            renderCart();
        } else if(mobileMode === true) {
            scrollFunction();
        }
    }
};

function changeIcon(window) {
    let cartLogoRef = document.getElementById('cart_logo');
    cartLogoRef.classList.add('d__none');
    let homeLogoRef = document.getElementById('home2_logo');
    homeLogoRef.classList.add('d__none');
    let logoRef = document.getElementById(window + '_logo');
    logoRef.classList.remove('d__none');
};

function renderCorrectCart() {
    if(mobileMode === false) {
        renderCart();
    } else if (mobileMode === true) {
        renderMobileCart();
    }
};

function moveItemToCart(sourceArray, indexItem, updateArrays) {
    let currentFood = sourceArray[indexItem];
    if (!currentFood) return;
    addToCartIfNotExists(cart, currentFood);
    currentFood.amountInCart = (currentFood.amountInCart || 0) + 1;
    for (i = 0; i < updateArrays.length; i++) {
        updateAmount(updateArrays[i], currentFood);
    }
    updateAmount(cart, currentFood);
    updateAmountInFoodCategories(currentFood);
    saveToLocalStorage();
    if (!mobileMode) {
        renderCart();
    }
};
