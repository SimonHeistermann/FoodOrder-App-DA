let cart = [];
let recents = [];
let subTotalSum = 0;
let nettoSum = 0;
let deliveryCost = 5;
let delivered = true;
let giftValue = 0;
let displayErorrGift = false;
let totalSum = 0;

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

function moveFoodTo(from, target, indexCategory, indexFood) {
    let currentFood = from[indexCategory].foods.slice(indexFood, indexFood + 1)[0];
    if (currentFood.amountInCart === 0) {
        currentFood.amountInCart += 1;
        target.push(currentFood);
    } else {
        currentFood.amountInCart += 1;
    }
    renderCart();
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
    renderCart();
};

function checkGiftCode(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let giftcodeInput = document.getElementById('giftcode');
        let giftCode = giftcodeInput.value;
        let giftStatus = { validCode: false};
        checkingGiftCode(giftCode, giftStatus);
        displayGiftError(giftStatus.validCode)
        renderCart();
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
    let allPayments = ['apple_pay', 'mastercard', 'paypal', 'google_pay']
    for (let i = 0; i < allPayments.length; i++) {
        let element = document.getElementById(allPayments[i]);
        element.classList.remove('paymentservice__selected');
    }
    let element = document.getElementById(id);
    element.classList.toggle('paymentservice__selected');
};

function changeItemAmount(indexCart, mathOp) {
    if (mathOp === 'plus') {
        raiseItemAmount(indexCart);
    } else if (mathOp === 'minus') {
        reduceItemAmount(indexCart);
    }
    renderCart();
};

function raiseItemAmount(indexCart) {
    if(cart[indexCart].amountInCart > 0) {
        cart[indexCart].amountInCart++;
    }
};

function reduceItemAmount(indexCart) {
    if(cart[indexCart].amountInCart > 1) {
        cart[indexCart].amountInCart--;
    } else if (cart[indexCart].amountInCart === 1){
        cart[indexCart].amountInCart--;
        cart.splice(indexCart, 1);
    }
};

function changeItemAmountWithInput(event, indexCart) {
    if(event.key === "Enter") {
        let amountInput = document.getElementById('amountincart');
        amount = amountInput.value;
        if(amount > 0) {
            cart[indexCart].amountInCart = amount;
        } else if (amount == 0) {
            cart[indexCart].amountInCart = amount;
            cart.splice(indexCart, 1);
        }
        renderCart();
    }
};

function submitOrder(event) {
    event.preventDefault();
    let cartItemContainerRef = document.getElementById('cartitems_container');
    cartItemContainerRef.innerHTML = "";
    cartItemContainerRef.innerHTML += renderHTMLSuccessfulOrder();
    recents = cart.slice(0, cart.length);
    clearItems(cart);
};


