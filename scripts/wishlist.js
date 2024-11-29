let windows = ["standard", "wishlist"];
let wishlist = [];

function openWishlist() {
    renderFoundation();
    currentWindow = 'wishlist';
    changeWishlistAndHomeLogo('wishlist');
    changeHeader('wishlist');
    changeIcon('cart');
    renderWishlistStructure();
    renderWishlistContent();
    initFilterContainer();
    if(mobileMode === false) {
        renderCart();
    }
};

function renderWishlistStructure() {
    let contentStructureRef = document.getElementById('content_left');
    contentStructureRef.innerHTML = "";
    contentStructureRef.innerHTML += renderHTMLWishlistStructure();
};

function renderWishlistContent() {
    let contentRef = document.getElementById('food_section');
    contentRef.innerHTML = "";
    if (wishlist.length > 0) {
        for (let indexWishlist = 0; indexWishlist < wishlist.length; indexWishlist++) {
            contentRef.innerHTML += renderHTMLWishlistFood(indexWishlist);
        }
        addOpenCartButton(contentRef);
    } else {
        contentRef.innerHTML += renderHTMLWishlistNoContent();
    }
};

function copyFoodToWishlist(indexCategory, indexFood) {
    let currentFood = foodCategories[indexCategory].foods.slice(indexFood, indexFood + 1)[0];
    let index = findObjectIndexInArray(wishlist, currentFood)
    if (index !== -1) {
        wishlist.splice(index, 1);
    }
    wishlist.push(currentFood);
    saveToLocalStorage();
};

function moveWishlistFoodToCart(indexWishlist) {
    moveItemToCart(wishlist, indexWishlist, [recentOrders]);
};




