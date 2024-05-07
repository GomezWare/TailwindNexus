// TODO Document this service when its finally complete

import components from '@data/components.json'


const getComponents = () => {
    return components;
}

const getComponent = (id) => {
    const category = components.find((category) => category.id == id);
    return category
}

export { getComponents, getComponent }