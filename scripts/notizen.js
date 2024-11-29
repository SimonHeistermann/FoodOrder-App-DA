
function shouldIncludeCategory(category) {
    for (let i = 0; i < filter.length; i++) {
        if (currentActiveFilter.indexOf(filter[i].name) !== -1) {
            for (let j = 0; j < filter[i].categories.length; j++) {
                if (filter[i].categories[j].name === category.name) {
                    return true;
                }
            }
        }
    }
    return currentActiveFilter.length === 0;
};