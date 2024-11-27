let cart = [];
let tempCart = [];
let subTotalSum = 0;
let nettoSum = 0;
let deliveryCost = 5;
let delivered = true;
let giftValue = 0;
let displayErorrGift = false;
let totalSum = 0;
let mobileCart = 'off';


function renderCart() {
    sumCalculator();
    let structureRef = document.getElementById('content_right');
    structureRef.innerHTML = "";
    structureRef.innerHTML = renderHTMLCartStructure();
    let cartItemContainerRef = document.getElementById('cartitems_container');
    cartItemContainerRef.innerHTML = "";
    if (cart.length > 0) {
        for (let indexCart = 0; indexCart < cart.length; indexCart++) {
            cartItemContainerRef.innerHTML += renderHTMLCartItems(indexCart);
        }
    } else {
        cartItemContainerRef.innerHTML += renderHTMLNoCartItems();
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

function sumOfRowInCart(onePiecePrice, amountInCart) {
    let rowSum = onePiecePrice * amountInCart;
    return rowSum;
};

function sumCalculator() {
    let sum = 0;
    for (let indexCart = 0; indexCart < cart.length; indexCart++) {
        sum += (cart[indexCart].currentPrice * cart[indexCart].amountInCart);
    }
    subTotalSum = sum;
    nettoSum = sum - (sum * 0.19);
    totalSum = (subTotalSum + deliveryCost) - giftValue;
    if (totalSum <0) {
        totalSum = 0;
    }
};

function toggleDeliveryCost(event, delivery) {
    event.preventDefault();
    if(delivery) {
        delivered = true
        deliveryCost = 5;
    } else {
        delivered = false
        deliveryCost = 0;
    }
    if(mobileMode === false) {
        renderCart();
    } else if (mobileMode === true) {
        renderMobileCart();
    }
};

function checkGiftCode(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let giftcodeInput = document.getElementById('giftcode');
        let giftCode = giftcodeInput.value;
        let giftStatus = { validCode: false};
        checkingGiftCode(giftCode, giftStatus);
        displayGiftError(giftStatus.validCode)
        if(mobileMode === false) {
            renderCart();
        } else if (mobileMode === true) {
            renderMobileCart();
        }
    }
};

function checkingGiftCode(giftCode, giftStatus) {
    if (giftCode) {
        for (let i = 0; i < giftCodes.length; i++) {
            if (giftCode === giftCodes[i]) {
                giftStatus.validCode = true;
                if (giftCodes[i].includes('10')) {
                    giftValue = 10;
                } else if (giftCodes[i].includes('5')) {
                    giftValue = 5;
                }
                break;
            }
        }
    }
};

function displayGiftError(validCode) {
    if (!validCode) { 
        giftValue = 0;
        displayErorrGift = true;
        giftCode = "";
    } else {
        displayErorrGift = false; 
    }
};

function toggleBorderOnPayment(id) {
    removeBorderOnPayment();
    let element = document.getElementById(id);
    element.classList.toggle('paymentservice__selected');
};

function removeBorderOnPayment() {
    for (let i = 0; i < allPayments.length; i++) {
        let element = document.getElementById(allPayments[i]);
        element.classList.remove('paymentservice__selected');
    }
};

function changeItemAmount(indexCart, mathOp) {
    if (mathOp === 'plus') {
        raiseItemAmount(indexCart);
    } else if (mathOp === 'minus') {
        reduceItemAmount(indexCart);
    }
    saveToLocalStorage();
    if(mobileMode === false) {
        renderCart();
    } else if (mobileMode === true) {
        renderMobileCart();
    }
};


function raiseItemAmount(indexCart) {
    if (cart[indexCart].amountInCart > 0) {
        cart[indexCart].amountInCart++;
        updateAmountInFoodCategories(cart[indexCart]);
        updateAmount(wishlist, cart[indexCart]);
        updateAmount(recentOrders, cart[indexCart]);
    }
};


function reduceItemAmount(indexCart) {
    if (cart[indexCart].amountInCart > 1) {
        cart[indexCart].amountInCart--;
        updateAmountInFoodCategories(cart[indexCart]);
        updateAmount(wishlist, cart[indexCart]);
        updateAmount(recentOrders, cart[indexCart]);
    } else if (cart[indexCart].amountInCart === 1) {
        cart[indexCart].amountInCart--;
        updateAmountInFoodCategories(cart[indexCart]);
        updateAmount(wishlist, cart[indexCart]);
        updateAmount(recentOrders, cart[indexCart]);
        if (cart[indexCart].amountInCart === 0) {
            cart.splice(indexCart, 1);
        }
    }
};

function changeItemAmountWithInput(event, indexCart) {
    if (event.key === "Enter") {
        let amountInput = document.getElementById('amountincart');
        let amount = parseInt(amountInput.value, 10);
        if (amount > 0) {
            cart[indexCart].amountInCart = amount;
        } else if (amount === 0) {
            cart[indexCart].amountInCart = 0;
            cart.splice(indexCart, 1); 
        }
        updateAmountInFoodCategories(cart[indexCart]);
        updateAmount(wishlist, cart[indexCart]);
        updateAmount(recentOrders, cart[indexCart]);
        saveToLocalStorage();
        if(mobileMode === false) {
            renderCart();
        } else if (mobileMode === true) {
            renderMobileCart();
        }
    }
};

function submitOrder(event) {
    event.preventDefault();
    if(cart.length > 0) {
        if(checkForPaymentService()) {
            confirmOrder();
        } else {
        toggleDisplayPaymentError(true);
        }
    } else {
        if(mobileMode === true) {
            let cartItemContainerRef = document.getElementById('cartitems_containermobile')
            cartItemContainerRef.innerHTML = "";
            cartItemContainerRef.innerHTML += renderHTMLNotSuccessfulOrder();
        } else if (mobileMode === false) {
            let cartItemContainerRef = document.getElementById('cartitems_container')
            cartItemContainerRef.innerHTML = "";
            cartItemContainerRef.innerHTML += renderHTMLNotSuccessfulOrder();
        }
        removeBorderOnPayment();
    }
    backToTop();
};

function checkForPaymentService() {
    for (let i = 0; i < allPayments.length; i++) {
        let element = document.getElementById(allPayments[i]);
        if(element.classList.contains('paymentservice__selected')) {
            return true;
        }
    }
};

function confirmOrder() {
    toggleDisplayPaymentError(false);
    pushRecentOrderInRecentOrders();
    giftValue = 0;
    clearItems(cart);
    saveToLocalStorage();
    renderSuccessfulOrder();
    checkIfNavRecent();
};

function pushRecentOrderInRecentOrders() {
    let recentOrder = cart.slice(0, cart.length);

    for (let i = 0; i < recentOrder.length; i++) {
        let index = findObjectIndexInArray(recentOrders, recentOrder[i]);
        if (index !== -1) {
            recentOrders.splice(index, 1);
        }
        recentOrders.push(recentOrder[i]);
    }
};

function renderSuccessfulOrder() {
    if(mobileMode === false) {
        let cartItemContainerRef = document.getElementById('cartitems_container')
        cartItemContainerRef.innerHTML = "";
        cartItemContainerRef.innerHTML += renderHTMLSuccessfulOrder();
    } else if (mobileMode === true) {
        let cartItemContainerRef = document.getElementById('cartitems_containermobile')
        cartItemContainerRef.innerHTML = "";
        cartItemContainerRef.innerHTML += renderHTMLSuccessfulOrder();
    }
    removeBorderOnPayment();
};

function toggleDisplayPaymentError(value) {
    let errorRef = document.getElementById('payment_errormessage');
    if(value) {
        errorRef.classList.remove('d__none')
    } else {
        errorRef.classList.add('d__none');
    }
};

function checkCheckBox(indexCategory, indexFood) {
    let checkBoxRef = document.getElementById('checkbox_' + indexFood);
    let orderSelectedButtonRef = document.getElementById('orderselected_button');

    if (checkBoxRef.checked === true) {
        orderSelectedButtonRef.classList.remove('d__none');
        foodCategories[indexCategory].foods[indexFood].selected = true;
        moveFoodToTempCart(indexCategory, indexFood);
    } else if (checkBoxRef.checked === false) {
        foodCategories[indexCategory].foods[indexFood].selected = false;
        removeFoodFromTempCart(indexCategory, indexFood);
        if(tempCart.length === 0) {
            orderSelectedButtonRef.classList.add('d__none');
        }
    }
};

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
            checkBoxRef.checked = false;
        }
    }
    tempCart.length = 0;
};

function openMobileCart() {
    if(mobileMode === true) {
        mobileCart = 'on';
        renderMobileCart();
        changeIcon('home2');
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



