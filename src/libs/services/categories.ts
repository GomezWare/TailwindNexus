import categories from '@data/categories.json'

const getMenu = ()=>{
    return categories.map(category => ({id:category.id,name:category.name,totalComponents: category.components.length}));
}


const getCategories = ()=>{
    return categories;
}

const getCategory = (id)=>{
    const category = categories.find((category) => category.id == id);
    return category
}

export {getMenu, getCategories, getCategory}