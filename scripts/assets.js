function reloadWebsite() {
    location.href = location.href;
};

function styleSelectedCategory() {
    removeSelectedStyle();
    let categroryRef = document.getElementById(currentCategory);
    categroryRef.classList.add('categorycontainer__selected');
    let categoryImgRef = document.getElementById(currentCategory + "_img");
    categoryImgRef.classList.add('categorycontainerimg__selected');
};

function removeSelectedStyle() {
    for (let indexCategory = 0; indexCategory < foodCategories.length; indexCategory++) {
        let contentRef = document.getElementById(foodCategories[indexCategory].name);
        contentRef.classList.remove('categorycontainer__selected');
        let categoryImgRef = document.getElementById(foodCategories[indexCategory].name + "_img");
        categoryImgRef.classList.remove('categorycontainerimg__selected');  
    }
};

function replaceDotWithComma(number) {
    let formattedNumber = number.toString();
    return formattedNumber.replace(/\./g, ',');
};

function deleteItemFrom(index, from) {
    from.splice(index, 1);
    renderCart();
};

function clearItems(location) {
    for (let i = 0; i < location.length; i++) {
        location[i].amountInCart = 0;
    }
    location.length = 0;
    renderCart();
};