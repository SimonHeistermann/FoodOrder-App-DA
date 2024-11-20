let recentOrders = [];


function openRecentOrders(id) {
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
    let currentFood = recentOrders.slice(indexRecentOrders, indexRecentOrders + 1)[0];
    if (currentFood.amountInCart === 0) {
        currentFood.amountInCart += 1;
        cart.push(currentFood);
    } else {
        currentFood.amountInCart += 1;
    }
    saveToLocalStorage();
    renderCart();
};