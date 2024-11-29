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
    moveItemToCart(category.foods, indexFood, [wishlist, recentOrders]);
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
    renderCorrectCart();
};

function checkGiftCode(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let giftcodeInput = document.getElementById('giftcode');
        let giftCode = giftcodeInput.value;
        let giftStatus = { validCode: false};
        checkingGiftCode(giftCode, giftStatus);
        displayGiftError(giftStatus.validCode)
        renderCorrectCart();
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
    renderCorrectCart();
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
        renderCorrectCart();
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
        renderNotSuccessfulOrder();
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

function renderNotSuccessfulOrder() {
    if(mobileMode === true) {
        let cartItemContainerRef = document.getElementById('cartitems_containermobile')
        cartItemContainerRef.innerHTML = "";
        cartItemContainerRef.innerHTML += renderHTMLNotSuccessfulOrder();
    } else if (mobileMode === false) {
        let cartItemContainerRef = document.getElementById('cartitems_container')
        cartItemContainerRef.innerHTML = "";
        cartItemContainerRef.innerHTML += renderHTMLNotSuccessfulOrder();
    }
};



