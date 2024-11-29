function renderHTMLStandardFoundation() {
    return  ` 
            <div id="filter_container" class="filter__container">
                <div class="filter__box">
                    <input id="appetizer" type="checkbox" onclick="toggleFilter('appetizer')" 
                    ${currentActiveFilter.includes('appetizer') ? 'checked' : ''}>
                    Vorspeisen
                </div>
                <div class="filter__box">
                    <input id="side_dish" type="checkbox" onclick="toggleFilter('side_dish')" 
                    ${currentActiveFilter.includes('side_dish') ? 'checked' : ''}>
                    Beilagen
                </div>
                <div class="filter__box">
                    <input id="main_dish" type="checkbox" onclick="toggleFilter('main_dish')" 
                    ${currentActiveFilter.includes('main_dish') ? 'checked' : ''}>
                    Hauptgang
                </div>
                <div class="filter__box">
                    <input id="dessert" type="checkbox" onclick="toggleFilter('dessert')" 
                    ${currentActiveFilter.includes('dessert') ? 'checked' : ''}>
                    Dessert
                </div>
            </div>
            <button class="totop__button" id="totop_button" onclick="backToTop()"></button>
        <h2 id="wishlist_header" class="d__none">Wunschliste</h2>
        <div class="content__container" id="content_container">
            <div class="content__left" id="content_left">
                <div class="aot__section">
                    <div class="aot__container">
                        <div class="aotimg__container">
                            <img class="aotimg" src="./assets/img/aot_img.png" alt="Header Foto">
                        </div>
                        <div class="aoticon__container">
                            <img src="./assets/icons/delivery_logo_icon_big.png" alt="Logo">
                        </div>
                    </div>
                </div>
                <h2 id="standard_header" class="">Entdecke unsere Kategorien</h2>
                <div class="categories__container" id="categories_container">
                </div>
                <nav>
                    <div class="nav__container">
                        <button class="navbutton__open" id="nav_popular" onclick="openPopularFoods('popular')"><h2>Beliebt</h2></button>
                        <button class="" id="nav_recent" onclick="openRecentOrders('recent')"><h2>Zuletzt</h2></button>
                    </div>
                    <button onclick="orderTempCartFoods()" id="orderselected_button" class="orderselected__button d__none">Alles Bestellen</button>
                    
                </nav>
                <div class="food__section" id="food_section">
                </div>
            </div>
            <div class="content__right" id="content_right">
            </div>
        </div>
            `
};

function renderHTMLStandardStructure() {
    return  `
            <div class="aot__section">
                    <div class="aot__container">
                        <div class="aotimg__container">
                            <img class="aotimg" src="./assets/img/aot_img.png" alt="Header Foto">
                        </div>
                        <div class="aoticon__container">
                            <img src="./assets/icons/delivery_logo_icon_big.png" alt="Logo">
                        </div>
                    </div>
            </div>
            <h2 id="standard_header" class="">Entdecke unsere Kategorien</h2>
            <div class="categories__container" id="categories_container">
            </div>
                <nav>
                    <div class="nav__container">
                        <button class="navbutton__open" id="nav_popular" onclick="openPopularFoods('popular')"><h2>Beliebt</h2></button>
                        <button class="" id="nav_recent" onclick="openRecentOrders('recent')"><h2>Zuletzt</h2></button>
                    </div>
                    <button onclick="orderTempCartFoods()" id="orderselected_button" class="orderselected__button d__none">
                        Alles Bestellen
                    </button>
                </nav>
                <div class="food__section" id="food_section">
                </div>
            `
};

function renderHTMLWishlistStructure() {
    return  `
            <div class="food__section" id="food_section">
            </div>
            
            `
};

function renderHTMLCartStructure() {
    return  `
            <form name="shoppingcart" onsubmit="submitOrder(event)" class="shopping__cart" id="shopping_cart">
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
                            <div class="paymentservice__header">
                                 <h4>Bezahlmethoden</h4>
                                 <span class="paymenterror__message d__none" id="payment_errormessage">Bitte wählen Sie eine aus!</span>
                            </div>
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

function renderHTMLMobileCartStructure() {
    return  `
            <div id="filter_container" class="filter__container">
                <div class="filter__box">
                    <input id="appetizer" type="checkbox" onclick="toggleFilter('appetizer')" 
                    ${currentActiveFilter.includes('appetizer') ? 'checked' : ''}>
                    Vorspeisen
                </div>
                <div class="filter__box">
                    <input id="side_dish" type="checkbox" onclick="toggleFilter('side_dish')" 
                    ${currentActiveFilter.includes('side_dish') ? 'checked' : ''}>
                    Beilagen
                </div>
                <div class="filter__box">
                    <input id="main_dish" type="checkbox" onclick="toggleFilter('main_dish')" 
                    ${currentActiveFilter.includes('main_dish') ? 'checked' : ''}>
                    Hauptgang
                </div>
                <div class="filter__box">
                    <input id="dessert" type="checkbox" onclick="toggleFilter('dessert')" 
                    ${currentActiveFilter.includes('dessert') ? 'checked' : ''}>
                    Dessert
                </div>
            </div>
            <form name="shoppingcart" onsubmit="submitOrder(event)" class="cartmobile__section" id="shopping_cart">
            <div class="shoppingcart__content">
            <div class="cartmobile__header">
                <h2>Einkaufswagen</h2>
                <button onclick="clearItems(cart)" class="clearcart__button">leeren</button>
            </div>
            <div class="cart__containermobile" id="cartitems_containermobile">
            </div>
            <div class="cart__bottom">
                <div class="payment__section">
                    <div class="payment__container">
                        <h4>Zusammenfassung</h4>
                        <div class="payment__sums">
                            <div class="paymentsum__boxmobile">
                                <span>Nettosumme:</span>
                                <span>${replaceDotWithComma(nettoSum.toFixed(2))}€</span>
                            </div>
                            <div class="paymentsum__boxmobile">
                                <span>MwSt.(19%):</span>
                                <span>${replaceDotWithComma((subTotalSum * 0.19).toFixed(2))}€</span>
                            </div>
                            <div class="paymentsum__boxmobile">
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
                            <div class="paymentsum__boxmobile">
                                <span>Lieferkosten:</span>
                                <span>${replaceDotWithComma(deliveryCost.toFixed(2))}€</span>
                            </div>
                            <div class="giftcode__containermobile">
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
                            <div class="complete__summobile">
                                <span>Gesamtsumme:</span>
                                <span>${replaceDotWithComma(totalSum.toFixed(2))}€</span>
                            </div>
                        </div>
                    </div>
                    <div class="paymentservice__section">
                        <div class="paymentservice__header">
                             <h4>Bezahlmethoden</h4>
                             <span class="paymenterror__message d__none" id="payment_errormessage">Bitte wählen Sie eine aus!</span>
                        </div>
                        <div class="paymentservices__containermobile">
                            <div onclick="toggleBorderOnPayment('apple_pay')" class="payment__servicemobile" id="apple_pay">
                                <img src="./assets/icons/apple_pay_icon.png" alt="Apple Pay">
                            </div>
                            <div onclick="toggleBorderOnPayment('mastercard')" class="payment__servicemobile" id="mastercard">
                                <img src="./assets/icons/mastercard_icon.png" alt="Mastercard">
                            </div>
                            <div onclick="toggleBorderOnPayment('paypal')" class="payment__servicemobile" id="paypal">
                                <img src="./assets/icons/paypal_icon.png" alt="Paypal">
                            </div>
                            <div onclick="toggleBorderOnPayment('google_pay')" class="payment__servicemobile" id="google_pay">
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

function renderHTMLSearchStructure() {
    return  `
            <div id="filter_container" class="filter__container">
                <div class="filter__box">
                    <input id="appetizer" type="checkbox" onclick="toggleFilter('appetizer')" 
                    ${currentActiveFilter.includes('appetizer') ? 'checked' : ''}>
                    Vorspeisen
                </div>
                <div class="filter__box">
                    <input id="side_dish" type="checkbox" onclick="toggleFilter('side_dish')" 
                    ${currentActiveFilter.includes('side_dish') ? 'checked' : ''}>
                    Beilagen
                </div>
                <div class="filter__box">
                    <input id="main_dish" type="checkbox" onclick="toggleFilter('main_dish')" 
                    ${currentActiveFilter.includes('main_dish') ? 'checked' : ''}>
                    Hauptgang
                </div>
                <div class="filter__box">
                    <input id="dessert" type="checkbox" onclick="toggleFilter('dessert')" 
                    ${currentActiveFilter.includes('dessert') ? 'checked' : ''}>
                    Dessert
                </div>
            </div>
        <button class="totop__button" id="totop_button" onclick="backToTop()"></button>
        <h2 id="search_header" class="">Suchergebnisse:</h2>
        <div class="content__container" id="content_container">
            <div class="content__left" id="content_left">
                <div class="food__section" id="food_section">
                </div>
            </div>
            <div class="content__right" id="content_right">
            </div>
        </div>
            `
}