let recentOrders = [];


function openRecentOrders(id) {
    renderCategories();
    removeSelectedStyle();
    changeNavBorderStyling(id);
    changeWrapSytlingInFoods(id);
    renderRecentOrders();
};

function renderRecentOrders() {
    let contentRef = document.getElementById('food_section');
    contentRef.innerHTML = "";
    if (recentOrders.length > 0) {
        for (let indexRecentOrders= 0; indexRecentOrders < recentOrders.length; indexRecentOrders++) {
            contentRef.innerHTML += renderHTMLRecentOrders(indexRecentOrders);
        }
    } else {
        contentRef.innerHTML += renderHTMLNoRecentOrders();
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
    renderCart();
};


