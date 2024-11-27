let windows = ["standard", "wishlist"];
let wishlist = [];

function openWishlist() {
    changeWishlistAndHomeLogo('wishlist');
    changeHeader('wishlist');
    renderWishlistStructure();
    renderWishlistContent();
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
    let currentFood = wishlist[indexWishlist];
    if (!currentFood) return;
    addToCartIfNotExists(cart, currentFood);
    if (currentFood.amountInCart === 0) {
        currentFood.amountInCart = 1; 
    } else {
        currentFood.amountInCart += 1;
    }
    updateAmount(recentOrders, currentFood);
    updateAmount(cart, currentFood);
    updateAmountInFoodCategories(currentFood);
    saveToLocalStorage();
    renderCart();
};




