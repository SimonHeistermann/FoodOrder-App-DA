function renderHTMLCategories(indexCategory) {
    return  `
            <div onclick="openFoodCategory(${indexCategory}, 'popular')" class="category__container" id="${foodCategories[indexCategory].name}">
                <div class="categorycontainer__img" id="${foodCategories[indexCategory].name}_img">
                    <img src="${foodCategories[indexCategory].icon}" alt="${foodCategories[indexCategory].alternativeForIcon}">
                </div>
                ${foodCategories[indexCategory].name}
            </div>
            `
};

function renderHTMLStandardPreview(indexPreview) {
    return  `
            <div class="food__container">
                <label class="checkbox__container">
                    <input id="checkbox_${indexPreview}" type="checkbox" onclick="checkCheckBox(${4}, ${indexPreview})">
                    <span class="food__checkbox"></span>
                </label>
                <div class="foodcontainer__img">
                    <img src="${foodCategories[4].foods[indexPreview].img}" alt="${foodCategories[4].foods[indexPreview].alternativeForImg}">
                </div>
                <div class="foodcontainer__content">
                    <h2>${foodCategories[4].foods[indexPreview].name}</h2>
                    <div class="priceandrating__container">
                        <div class="price__container">
                            <span class="current__price">€${replaceDotWithComma(foodCategories[4].foods[indexPreview].currentPrice)}</span>
                            <span class="prev__price">€${replaceDotWithComma(foodCategories[4].foods[indexPreview].prevPrice)}</span>
                        </div>
                        <div class="rating__container">
                            <img src="../assets/icons/star_icon.png" alt="Stern">
                            ${foodCategories[4].foods[indexPreview].rating}/5
                        </div>
                    </div>
                </div>
                <div class="foodbutton__container">
                    <button onclick="copyFoodToWishlist(${4}, ${indexPreview})" class="wishlist__button">Wunschliste</button>
                    <button class="order__button" onclick="moveFoodToCart(${4}, ${indexPreview})">Bestellen</button>
                </div>
            </div>
            `
};

function renderHTMLFood(indexCategory, indexFood) {
    return  `
            <div class="food__container">
                <label class="checkbox__container">
                    <input id="checkbox_${indexFood}" type="checkbox" onclick="checkCheckBox(${indexCategory}, ${indexFood})">
                    <span class="food__checkbox"></span>
                </label>
                <div class="foodcontainer__img">
                    <img src="${foodCategories[indexCategory].foods[indexFood].img}" alt="${foodCategories[indexCategory].foods[indexFood].alternativeForImg}">
                </div>
                <div class="foodcontainer__content">
                    <h2>${foodCategories[indexCategory].foods[indexFood].name}</h2>
                    <div class="priceandrating__container">
                        <div class="price__container">
                            <span class="current__price">€${replaceDotWithComma(foodCategories[indexCategory].foods[indexFood].currentPrice)}</span>
                            <span class="prev__price">€${replaceDotWithComma(foodCategories[indexCategory].foods[indexFood].prevPrice)}</span>
                        </div>
                        <div class="rating__container">
                            <img src="../assets/icons/star_icon.png" alt="Stern">
                            ${foodCategories[indexCategory].foods[indexFood].rating}/5
                        </div>
                    </div>
                </div>
                <div class="foodbutton__container">
                    <button onclick="copyFoodToWishlist(${indexCategory}, ${indexFood})" class="wishlist__button">Wunschliste</button>
                    <button onclick="moveFoodToCart(${indexCategory}, ${indexFood})" class="order__button">Bestellen</button>
                </div>
            </div>
            `
};
 
function renderHTMLCartItems(indexCart) {
    return  `
             <div class="cart__item">
                <div class="cartitem__img">
                    <img src="${cart[indexCart].img}" alt="${cart[indexCart].alternativeForImg}">
                </div>
                <div class="cartitem__content">
                    <div class="cartitem__header">
                        <h3>${cart[indexCart].name}</h3>
                    </div>
                    <div class="cartitemcontent__container">
                        <div class="adjust__quantity">
                            <button onclick="changeItemAmount(${indexCart}, 'minus')" class="minus__button"></button>
                            <input id="amountincart" onkeydown="changeItemAmountWithInput(event, ${indexCart})" required class="quantatiy__input" min="1" max="48" type="number" value="${cart[indexCart].amountInCart}">
                            <button onclick="changeItemAmount(${indexCart}, 'plus')" class="plus__button"></button>
                        </div>
                        <span class="cartitem__price">${replaceDotWithComma(sumOfRowInCart(cart[indexCart].currentPrice, cart[indexCart].amountInCart))}€</span>
                        <button onclick="deleteItemFrom(${indexCart}, cart)" class="delete__button"></button>
                    </div>
                </div>
            </div>
            `
};

function renderHTMLNoCartItems() {
    return `
            <div class="noitemsin__cart">
                Keine Bestellungen im Warenkrob...
            </div>
            `
};

function renderHTMLSuccessfulOrder() {
    return  `
            <div class="noitemsin__cart">
                <span>Bestellung erfolgreich!</span>
                <span class="${delivered ? '' : 'd__none'}">In 20 Minuten bei Ihnen...</span>
                <span class="${delivered ? 'd__none' : ''}">In 15 Minuten abholbereit...</span>
            </div>
            `
};

function renderHTMLRecentOrders(indexRecentOrders) {
    return  `
            <div class="food__container">
                <div class="foodcontainer__img">
                    <img src="${recentOrders[indexRecentOrders].img}" alt="${recentOrders[indexRecentOrders].alternativeForImg}">
                </div>
                <div class="foodcontainer__content">
                    <h2>${recentOrders[indexRecentOrders].name}</h2>
                    <div class="priceandrating__container">
                        <div class="price__container">
                            <span class="current__price">€${replaceDotWithComma(recentOrders[indexRecentOrders].currentPrice)}</span>
                            <span class="prev__price">€${replaceDotWithComma(recentOrders[indexRecentOrders].prevPrice)}</span>
                        </div>
                        <div class="rating__container">
                            <img src="../assets/icons/star_icon.png" alt="Stern">
                            ${recentOrders[indexRecentOrders].rating}/5
                        </div>
                    </div>
                </div>
                <div class="foodbutton__container">
                    <button onclick="removeFromArray(recentOrders, ${indexRecentOrders})" class="wishlist__button">Entfernen</button>
                    <button onclick="moveRecentOrdersToCart(${indexRecentOrders})" class="order__button">Bestellen</button>
                </div>
            </div>
            `
};

function renderHTMLNoRecentOrders() {
    return  `
            <div class="food__container">
                <h2>Noch keine Bestellung getätigt...<h2>
                <button onclick="openPopularFoods('popular')" class="completeorder__button">Jetzt betstellen</button>
            </div>
            `
};

function renderHTMLNotSuccessfulOrder() {
    return  `
            <div class="noitemsin__cart">
                <span>Bestellung war nicht erfolgreich!</span>
                <span>Keine Bestellungen im Warenkorb...</span>
            </div>
            `
};

function renderHTMLWishlistFood(indexWishlist) {
    return  `
        <div class="food__container">
                <div class="foodcontainer__img">
                    <img src="${wishlist[indexWishlist].img}" alt="${wishlist[indexWishlist].alternativeForImg}">
                </div>
                <div class="foodcontainer__content">
                    <h2>${wishlist[indexWishlist].name}</h2>
                    <div class="priceandrating__container">
                        <div class="price__container">
                            <span class="current__price">€${replaceDotWithComma(wishlist[indexWishlist].currentPrice)}</span>
                            <span class="prev__price">€${replaceDotWithComma(wishlist[indexWishlist].prevPrice)}</span>
                        </div>
                        <div class="rating__container">
                            <img src="../assets/icons/star_icon.png" alt="Stern">
                            ${wishlist[indexWishlist].rating}/5
                        </div>
                    </div>
                </div>
                <div class="foodbutton__container">
                    <button onclick="removeFromArray(wishlist, ${indexWishlist})" class="wishlist__button">Entfernen</button>
                    <button onclick="moveWishlistFoodToCart(${indexWishlist})" class="order__button">Bestellen</button>
                </div>
            </div>
            `
};

function renderHTMLWishlistNoContent() {
    return  `
            <div class="food__container">
                <h2>Noch kein Essen in der Wunschliste...<h2>
                <button onclick="openPopularFoods('popular')" class="completeorder__button">Jetzt betstellen</button>
            </div>
            `
};

function renderHTMLOpenCartButton() {
    return  `
            <div class="opencartbutton__container">
                <button onclick="openMobileCart()" class="opencartonbottom__button">
                    Warenkorb
                    <img class="cart__icon" src="../assets/icons/basket_icon_outlined_white.png" alt="Einkaufskorb">
                </button>
            </div>
            `
};

function renderHTMLMobileCartItems(indexCart) {
    return  `
            <div class="cart__itemmobile">
                    <div class="cartitem__img">
                        <img src="${cart[indexCart].img}" alt="${cart[indexCart].alternativeForImg}">
                    </div>
                    <div class="cartitem__contentmobile">
                        <div class="cartitem__headermobile">
                            <h3>${cart[indexCart].name}</h3>
                        </div>
                        <div class="cartitemcontent__containermobile">
                            <div class="adjust__quantitymobile">
                                <button onclick="changeItemAmount(${indexCart}, 'minus')" class="minus__button"></button>
                                <input id="amountincart" onkeydown="changeItemAmountWithInput(event, ${indexCart})" required class="quantatiy__inputmobile" min="1" max="48" type="number" value="${cart[indexCart].amountInCart}">
                                <button onclick="changeItemAmount(${indexCart}, 'plus')" class="plus__button"></button>
                            </div>
                            <span class="cartitem__pricemobile">${replaceDotWithComma(sumOfRowInCart(cart[indexCart].currentPrice, cart[indexCart].amountInCart))}€</span>
                            <button onclick="deleteItemFrom(${indexCart}, cart)" class="delete__button"></button>
                        </div>
                    </div>
                </div>
            `
};
