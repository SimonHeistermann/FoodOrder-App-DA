function saveToLocalStorage() {
    saveFoodToLocalStorage();
    saveCartToLocalStorage();
    saveRecentOrdersToLocalStorage();
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

function getFromLocalStorage() {
    let storedFood = localStorage.getItem("food");
    if (storedFood) {
        foodCategories = JSON.parse(storedFood);
    }
    let storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
    let storedRecentOrders = localStorage.getItem("recentOrders");
    if (storedRecentOrders) {
        recentOrders = JSON.parse(storedRecentOrders);
    }
};
