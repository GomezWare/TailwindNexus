/**
 * This util is for validate components on server
 *
 * @param {Object} componentData
 * @returns {boolean}
 */
const validateComponent = (componentData) => {
  // Validate if we have all the data
  if (
    !componentData.categoryId ||
    !componentData.name ||
    !componentData.description ||
    !componentData.tailwind ||
    !componentData.javascript
  ) {
    return false;
  }

  // Validate that categoryId are positive numbers
  if (
    typeof componentData.categoryId !== "number" ||
    componentData.categoryId <= 0
  ) {
    return false;
  }

  // Validate that name is between 4 and 128 characters and is not empty.
  if (
    typeof componentData.name !== "string" ||
    componentData.name.trim().length < 4 ||
    componentData.name.trim().length > 128 ||
    componentData.name.trim() === ""
  ) {
    return false;
  }

  // Validate that description is less than 512 characters and not empty
  if (
    typeof componentData.description !== "string" ||
    componentData.description.trim().length >= 512 ||
    componentData.description.trim() === ""
  ) {
    return false;
  }

  // Validate that needsAlpine and needsCDN are Booleans
  if (
    typeof componentData.needsAlpine !== "boolean" ||
    typeof componentData.needsCDN !== "boolean"
  ) {
    return false;
  }

  // Validate that tailwind is a string and does not contain <script> tags or events or iFrames.
  if (
    typeof componentData.tailwind !== "string" ||
    /<script[\s\S]*?>/i.test(componentData.tailwind) ||
    // /on\w+\s*=/i.test(componentData.tailwind) ||
    /<iframe[\s\S]*?>/i.test(componentData.tailwind) ||
    componentData.tailwind.trim() === ""
  ) {
    return false;
  }

  // Validate that javascript is a string of characters
  if (
    typeof componentData.javascript !== "string" ||
    componentData.javascript.trim() === ""
  ) {
    return false;
  }

  return true;
};

/**
 * This util is for validate components on the client and get the error list
 *
 * @param {object} componentData
 * @returns {boolean}
 */
const validateComponentClient = (componentData) => {
  // Validate if we have all the data
  if (
    !componentData.categoryId ||
    !componentData.name ||
    !componentData.description ||
    !componentData.tailwind ||
    !componentData.javascript
  ) {
    return false;
  }

  // Validate that categoryId are positive numbers
  if (
    typeof componentData.categoryId !== "number" ||
    componentData.categoryId <= 0
  ) {
    return false;
  }

  // Validate that name is between 4 and 128 characters and is not empty.
  if (
    typeof componentData.name !== "string" ||
    componentData.name.trim().length < 4 ||
    componentData.name.trim().length > 128 ||
    componentData.name.trim() === ""
  ) {
    return false;
  }

  // Validate that description is less than 512 characters and not empty
  if (
    typeof componentData.description !== "string" ||
    componentData.description.trim().length >= 512 ||
    componentData.description.trim() === ""
  ) {
    return false;
  }

  // Validate that needsAlpine and needsCDN are Booleans
  if (
    typeof componentData.needsCDN !== "boolean" ||
    typeof componentData.needsAlpine !== "boolean"
  ) {
    return false;
  }

  // Validate that tailwind is a string and does not contain <script> tags or events or iFrames.
  if (
    typeof componentData.tailwind !== "string" ||
    /<script[\s\S]*?>/i.test(componentData.tailwind) ||
    // /on\w+\s*=/i.test(componentData.tailwind) ||
    /<iframe[\s\S]*?>/i.test(componentData.tailwind) ||
    componentData.tailwind.trim() === ""
  ) {
    return false;
  }

  // Validate that javascript is a string of characters
  if (
    typeof componentData.javascript !== "string" ||
    componentData.javascript.trim() === ""
  ) {
    return false;
  }

  return true;
};

/**
 * This util is for validate components on client
 *
 * @param {Object} componentData
 * @returns {Array}
 */
const getErrorsComponent = (componentData) => {
  let errors = [];

  // Validate if we have all the data
  if (
    !componentData.categoryId ||
    !componentData.name ||
    !componentData.description ||
    !componentData.tailwind ||
    !componentData.javascript
  ) {
    errors.push("There are empty fields in the form.");
  }

  // Validate that name is between 4 and 128 characters and is not empty.
  if (
    typeof componentData.name !== "string" ||
    componentData.name.trim().length < 4 ||
    componentData.name.trim().length > 128 ||
    componentData.name.trim() === ""
  ) {
    errors.push("The component name must be between 4 and 128 characters.");
  }

  // Validate that description is less than 512 characters and not empty
  if (
    typeof componentData.description !== "string" ||
    componentData.description.trim().length >= 512 ||
    componentData.description.trim() === ""
  ) {
    errors.push("Description must be less than 512 characters.");
  }

  // Validate that tailwind is a string and does not contain <script> tags or events or iFrames.
  if (
    typeof componentData.tailwind !== "string" ||
    /<script[\s\S]*?>/i.test(componentData.tailwind) ||
    /on\w+\s*=/i.test(componentData.tailwind) ||
    /<iframe[\s\S]*?>/i.test(componentData.tailwind) ||
    componentData.tailwind.trim() === ""
  ) {
    errors.push(
      "The tailwind code is empty or has forbidden tags (You cannot use tags such as &lt;script&gt, &lt;iframe&gt; or on events)."
    );
  }

  // Validate that javascript is a string of characters
  if (
    typeof componentData.javascript !== "string" ||
    componentData.javascript.trim() === ""
  ) {
    errors.push(
      "The javascript code is empty, if your component does not have code provide a comment."
    );
  }

  return errors;
};

export { validateComponent, getErrorsComponent, validateComponentClient };
