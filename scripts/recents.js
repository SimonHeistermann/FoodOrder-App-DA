let recentOrders = [];


function openRecentOrders(id){
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
        addOpenCartButton(contentRef);
    } else {
        contentRef.innerHTML += renderHTMLNoRecentOrders();
    }
};

function moveRecentOrdersToCart(indexRecentOrders) {
    moveItemToCart(recentOrders, indexRecentOrders, [wishlist]);
};


