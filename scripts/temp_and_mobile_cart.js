function moveFoodToTempCart(indexCategory, indexFood) {
    let currentFood = foodCategories[indexCategory].foods[indexFood];
    tempCart.push(currentFood);
};

function removeFoodFromTempCart(indexCategory, indexFood) {
    let currentFood = foodCategories[indexCategory].foods[indexFood];
    let index = findObjectIndexInArray(tempCart, currentFood);
    if (index !== -1) {
        tempCart.splice(index, 1);
    }
};

function orderTempCartFoods() {
    if (tempCart.length > 0) {
        moveTempCartInCart();
        removeAllFoodsFromTempCart();
        let orderSelectedButtonRef = document.getElementById('orderselected_button');
        orderSelectedButtonRef.classList.add('d__none');
        saveToLocalStorage();
        if(mobileMode === false) {
            renderCart();
        }
    }
};

function moveTempCartInCart() {
    for (let indexTempCart = 0; indexTempCart < tempCart.length; indexTempCart++) {
        let tempCartFood = tempCart[indexTempCart];
        if(!tempCartFood) return;
        addToCartIfNotExists(cart, tempCartFood);
        if (tempCartFood.amountInCart === 0) {
            tempCartFood.amountInCart = 1;
        } else {
            tempCartFood.amountInCart += 1;
        }
        updateAmount(recentOrders, tempCartFood);
        updateAmount(wishlist, tempCartFood);
        updateAmount(cart, tempCartFood);
        updateAmountInFoodCategories(tempCartFood);
        saveToLocalStorage();
    }
};

function removeAllFoodsFromTempCart() {
    for (let indexCategory = 0; indexCategory < foodCategories.length; indexCategory++) {
        for (let indexFood = 0; indexFood < foodCategories[indexCategory].foods.length; indexFood++) {
            foodCategories[indexCategory].foods[indexFood].selected = false;
            let checkBoxRef = document.getElementById('checkbox_' + indexFood);
            if (checkBoxRef) checkBoxRef.checked = false;
        }
    }
    tempCart.length = 0;
};

function openMobileCart() {
    if(mobileMode === true) {
        mobileCart = 'on';
        renderMobileCart();
        initFilterContainer();
        changeIcon('home2');
        changeWishlistAndHomeLogo('home');
    }
};

function renderMobileCart() {
    sumCalculator();
    let structureRef = document.getElementById('main_content');
    structureRef.innerHTML = "";
    structureRef.innerHTML = renderHTMLMobileCartStructure();
    let cartItemContainerRef = document.getElementById('cartitems_containermobile');
    cartItemContainerRef.innerHTML = "";
    if (cart.length > 0) {
        for (let indexCart = 0; indexCart < cart.length; indexCart++) {
            cartItemContainerRef.innerHTML += renderHTMLMobileCartItems(indexCart);
        }
    } else {
        cartItemContainerRef.innerHTML += renderHTMLNoCartItems();
    }
};