
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
    if(mobileMode === false) {
        renderCart();
    }
};

function moveRecentOrdersToCart(indexRecentOrders) {
    let currentFood = recentOrders[indexRecentOrders];
    if (!currentFood) return;
    addToCartIfNotExists(cart, currentFood);
    if (currentFood.amountInCart === 0) {
        currentFood.amountInCart = 1;
    } else {
        currentFood.amountInCart += 1;
    }
    updateAmount(wishlist, currentFood);
    updateAmount(cart, currentFood);
    updateAmountInFoodCategories(currentFood); 
    saveToLocalStorage();
    if(mobileMode === false) {
        renderCart();
    }
};

function moveFoodToCart(indexCategory, indexFood) {
    let category = foodCategories[indexCategory];
    if (!category || !category.foods) return;
    let currentFood = category.foods[indexFood];
    if (!currentFood) return;
    addToCartIfNotExists(cart, currentFood);
    if (currentFood.amountInCart === 0) {
        currentFood.amountInCart = 1;
    } else {
        currentFood.amountInCart += 1;
    }
    updateAmount(wishlist, currentFood);
    updateAmount(recentOrders, currentFood);
    updateAmount(cart, currentFood);
    updateAmountInFoodCategories(currentFood); 
    saveToLocalStorage();
    if(mobileMode === false) {
        renderCart();
    }
};

function moveItemToCart(sourceArray, indexItem, updateArrays = []) {
    let currentFood = sourceArray[indexItem];
    if (!currentFood) return;
    addToCartIfNotExists(cart, currentFood);
    currentFood.amountInCart = (currentFood.amountInCart || 0) + 1;
    updateArrays.forEach(array => updateAmount(array, currentFood));
    updateAmount(cart, currentFood);
    updateAmountInFoodCategories(currentFood);
    saveToLocalStorage();
    if (!mobileMode) {
        renderCart();
    }
};
