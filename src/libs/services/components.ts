// TODO Document this service when its finally complete

import components from "@data/components.json";

const getComponents = () => {
  return components;
};

const getComponent = (id) => {
  const component = components.find((component) => component.id == id);
  return component;
};

const getLatest = () => {
  const latest = components.slice().sort((a, b) => a.createdAt - b.createdAt);
  return latest;
};

export { getComponents, getComponent, getLatest };
