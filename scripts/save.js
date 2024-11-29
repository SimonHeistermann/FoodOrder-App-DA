function saveToLocalStorage() {
    saveFoodToLocalStorage();
    saveCartToLocalStorage();
    saveRecentOrdersToLocalStorage();
    saveWishlistToLocalStorage();
};

function saveFoodToLocalStorage() {
    localStorage.setItem("food", JSON.stringify(foodCategories));
};

function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
};

function saveRecentOrdersToLocalStorage() {
    localStorage.setItem("recentOrders", JSON.stringify(recentOrders));
};

function saveWishlistToLocalStorage() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

function getFromLocalStorage() {
    getFromLocalStorage1();
    getFromLocalStorage2();
};

function getFromLocalStorage1() {
    let storedFood = localStorage.getItem("food");
    if (storedFood) {
        foodCategories = JSON.parse(storedFood);
    }
    let storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
};

function getFromLocalStorage2() {
    let storedRecentOrders = localStorage.getItem("recentOrders");
    if (storedRecentOrders) {
        recentOrders = JSON.parse(storedRecentOrders);
    }
    let storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
        wishlist = JSON.parse(storedWishlist);
    }
};
