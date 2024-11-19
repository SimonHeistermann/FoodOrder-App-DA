function renderHTMLCategories(indexCategory) {
    return  `
            <div onclick="renderFood(${indexCategory})" class="category__container" id="${foodCategories[indexCategory].name}">
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
                    <input type="checkbox" onchange="">
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
                    <button class="wishlist__button">Wunschliste</button>
                    <button class="order__button" onclick="moveFoodTo(foodCategories, cart, ${4}, ${indexPreview})">Bestellen</button>
                </div>
            </div>
            `
};

function renderHTMLFood(indexCategory, indexFood) {
    return  `
            <div class="food__container">
                <label class="checkbox__container">
                    <input type="checkbox" onchange="">
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
                    <button class="wishlist__button">Wunschliste</button>
                    <button onclick="moveFoodTo(foodCategories, cart, ${indexCategory}, ${indexFood})" class="order__button">Bestellen</button>
                </div>
            </div>
            `
};

function renderHTMLCartStructure() {
    return  `
            <form onsubmit="submitOrder(event)" class="shopping__cart" id="shopping_cart">
                <div class="shoppingcart__content">
                <div class="cart__header">
                    <h2>Einkaufswagen</h2>
                    <button onclick="clearItems(cart)" class="clearcart__button">leeren</button>
                </div>
                <div class="cart__container" id="cartitems_container">
                </div>
                <div class="cart__bottom">
                    <div class="payment__section">
                        <div class="payment__container">
                            <h4>Zusammenfassung</h4>
                            <div class="payment__sums">
                                <div class="paymentsum__box">
                                    <span>Nettosumme:</span>
                                    <span>${replaceDotWithComma(nettoSum.toFixed(2))}€</span>
                                </div>
                                <div class="paymentsum__box">
                                    <span>MwSt.(19%):</span>
                                    <span>${replaceDotWithComma((subTotalSum * 0.19).toFixed(2))}€</span>
                                </div>
                                <div class="paymentsum__box">
                                    <span>Zwischensumme:</span>
                                    <span>${replaceDotWithComma(subTotalSum.toFixed(2))}€</span>
                                </div>
                                    <div class="deliverycost__chooser">
                                        <button onclick="toggleDeliveryCost(event, true)" class="delivery__button ${delivered ? 'deliverybutton__selected' : ''}">
                                            <span class="tooltip__delivery ${delivered ? 'display__tooltip' : ''}">Liefern</span>
                                        </button>
                                        <button onclick="toggleDeliveryCost(event, false)" class="takehome__button ${delivered ? '' : 'takehomebutton__selected'}">
                                            <span class="tooltip__takehome ${delivered ? '' : 'display__tooltip'}">Abholen</span>
                                        </button>
                                    </div>
                                <div class="paymentsum__box">
                                    <span>Lieferkosten:</span>
                                    <span>${replaceDotWithComma(deliveryCost.toFixed(2))}€</span>
                                </div>
                                <div class="giftcode__container">
                                    <label>Gutscheincode:</label>
                                    <input onkeydown="checkGiftCode(event)" id="giftcode" maxlength="12" type="text" value="" placeholder="..."></input>
                                </div>
                                <div class="gift__sum ${displayErorrGift ? 'giftsum__errormessage' : ''}">
                                    <span class="${displayErorrGift ? '' : 'd__none'}">Falscher Gutscheincode!</span>
                                    <span>-${replaceDotWithComma(giftValue.toFixed(2))}€</span>
                                </div>
                            </div>
                            <div class="completesum__container">
                                <div class="payment__seperator"></div>
                                <div class="complete__sum">
                                    <span>Gesamtsumme:</span>
                                    <span>${replaceDotWithComma(totalSum.toFixed(2))}€</span>
                                </div>
                            </div>
                        </div>
                        <div class="paymentservice__section">
                            <h4>Bezahlmethoden</h4>
                            <div class="paymentservices__container">
                                <div onclick="toggleBorderOnPayment('apple_pay')" class="payment__service" id="apple_pay">
                                    <img src="./assets/icons/apple_pay_icon.png" alt="Apple Pay">
                                </div>
                                <div onclick="toggleBorderOnPayment('mastercard')" class="payment__service" id="mastercard">
                                    <img src="./assets/icons/mastercard_icon.png" alt="Mastercard">
                                </div>
                                <div onclick="toggleBorderOnPayment('paypal')" class="payment__service" id="paypal">
                                    <img src="./assets/icons/paypal_icon.png" alt="Paypal">
                                </div>
                                <div onclick="toggleBorderOnPayment('google_pay')" class="payment__service" id="google_pay">
                                    <img src="./assets/icons/google_pay_icon.png" alt="Google Pay">
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="completeorder__button">Bestellung abschließen</button>
                </div>
            </form>
            `
};

function renderHTMLCartItems(indexCart) {
    return  `
             <div class="cart__item">
                <div class="cartitem__img" id="">
                    <img src="${cart[indexCart].img}" alt="${cart[indexCart].alternativeForImg}">
                </div>
                <div class="cartitem__content">
                    <div class="cartitem__header">
                        <h3>${cart[indexCart].name}</h3>
                    </div>
                    <div class="cartitemcontent__container">
                        <div class="adjust__quantity">
                            <button onclick="changeItemAmount(${indexCart}, 'minus')" class="minus__button"></button>
                            <input id="amountincart" onkeydown="changeItemAmountWithInput(event, ${indexCart})" required class="quantatiy__input" min="1" type="number" value="${cart[indexCart].amountInCart}">
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

