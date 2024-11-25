function moveWishlistFoodToCart(indexWishlist) {
    let currentFood = wishlist.slice(indexWishlist, indexWishlist + 1)[0];
    if (currentFood.amountInCart === 0) {
        cart.push(currentFood);
        if (wishlist.length > 0) {
            let wishlistIndex = findObjectIndexInArray(wishlist, currentFood);
            wishlist[wishlistIndex].amountInCart += 1;
        }
        if (recentOrders.length > 0) {
            let recentOrdersIndex = findObjectIndexInArray(recentOrders, currentFood);
            recentOrders[recentOrdersIndex].amountInCart += 1;
        }
        if (cart.length > 0) {
            let cartIndex = findObjectIndexInArray(cart, currentFood);
            cart[cartIndex].amountInCart += 1;
        }
    } else {
        if (wishlist.length > 0) {
            let wishlistIndex = findObjectIndexInArray(wishlist, currentFood);
            wishlist[wishlistIndex].amountInCart += 1;
        }
        if (recentOrders.length > 0) {
            let recentOrdersIndex = findObjectIndexInArray(recentOrders, currentFood);
            recentOrders[recentOrdersIndex].amountInCart += 1;
        }
        if (cart.length > 0) {
            let cartIndex = findObjectIndexInArray(cart, currentFood);
            cart[cartIndex].amountInCart += 1;
        }
    }
    saveToLocalStorage();
    renderCart();
};

function moveRecentOrdersToCart(indexRecentOrders) {
    let currentFood = recentOrders.slice(indexRecentOrders, indexRecentOrders + 1)[0];
    if (currentFood.amountInCart === 0) {
        if (wishlist.length > 0) {
            let wishlistIndex = findObjectIndexInArray(wishlist, currentFood);
            wishlist[wishlistIndex].amountInCart += 1;
        } 
        if (cart.length > 0) {
            let cartIndex = findObjectIndexInArray(cart, currentFood);
            cart[cartIndex].amountInCart += 1;
        }
        currentFood.amountInCart += 1;
        cart.push(currentFood);
    } else {
        if (wishlist.length > 0) {
            let wishlistIndex = findObjectIndexInArray(wishlist, currentFood);
            wishlist[wishlistIndex].amountInCart += 1;
        } 
        if (cart.length > 0) {
            let cartIndex = findObjectIndexInArray(cart, currentFood);
            cart[cartIndex].amountInCart += 1;
        }
        currentFood.amountInCart += 1;
    }
    saveToLocalStorage();
    renderCart();
};

function moveFoodToCart(indexCategory, indexFood) {
    let currentFood = foodCategories[indexCategory].foods.slice(indexFood, indexFood + 1)[0];
    if (currentFood.amountInCart === 0) {
        cart.push(currentFood);
        if (wishlist.length > 0) {
            let wishlistIndex = findObjectIndexInArray(wishlist, currentFood);
            wishlist[wishlistIndex].amountInCart += 1;
        } 
        if (recentOrders.length > 0) {
            let recentOrdersIndex = findObjectIndexInArray(recentOrders, currentFood);
            recentOrders[recentOrdersIndex].amountInCart += 1;
        }
        if (cart.length > 0) {
            let cartIndex = findObjectIndexInArray(cart, currentFood);
            cart[cartIndex].amountInCart += 1;
        }
    } else {
        if (wishlist.length > 0) {
            let wishlistIndex = findObjectIndexInArray(wishlist, currentFood);
            wishlist[wishlistIndex].amountInCart += 1;
        } 
        if (recentOrders.length > 0) {
            let recentOrdersIndex = findObjectIndexInArray(recentOrders, currentFood);
            recentOrders[recentOrdersIndex].amountInCart += 1;
        }
        if (cart.length > 0) {
            let cartIndex = findObjectIndexInArray(cart, currentFood);
            cart[cartIndex].amountInCart += 1;
        }
    }
    saveToLocalStorage();
    renderCart();
};

function findObjectIndexInArray(array, objectToFind) {
    for (let j = 0; j < array.length; j++) {
        if (JSON.stringify(array[j]) === JSON.stringify(objectToFind)) {
            return j;
        }
    }
    return -1; 
};

function removeFoodFromTempCart(indexCategory, indexFood) {
    let currentFood = foodCategories[indexCategory].foods.slice(indexFood, indexFood + 1)[0];
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
        renderCart();
    }
};

function moveTempCartInCart() {
    for (let indexTempCart = 0; indexTempCart < tempCart.length; indexTempCart++) {
        let tempCartFood = tempCart[indexTempCart];
        if (tempCartFood.amountInCart === 0) {
            tempCartFood.amountInCart += 1;
            cart.push(tempCartFood);
        } else {
            tempCartFood.amountInCart += 1;
        }
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

function changeItemAmount(indexCart, mathOp) {
    if (mathOp === 'plus') {
        raiseItemAmount(indexCart);
    } else if (mathOp === 'minus') {
        reduceItemAmount(indexCart);
    }
    saveToLocalStorage();
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
        saveToLocalStorage();
        renderCart();
    }
};