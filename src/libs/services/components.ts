// TODO Document this service when its finally complete

import components from "@data/components.json";

const getComponents = () => {
  return components;
};

const getComponent = (id) => {
  const component = components.find((component) => component.id == id);
  return component;
};

export { getComponents, getComponent };
