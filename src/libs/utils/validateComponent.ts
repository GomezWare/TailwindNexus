/**
 * This util is for validate components on server
 *
 * @param {Array} componentData
 * @returns {boolean}
 */
const validateComponent = (componentData) => {
  // Verify that data is provided and that it is an array
  if (!Array.isArray(componentData) || componentData.length !== 9) {
    return false;
  }

  // Validate that categoryId and userId are positive numbers
  if (typeof componentData[0] !== "number" || componentData[0] <= 0) {
    return false;
  }
  if (typeof componentData[1] !== "number" || componentData[1] <= 0) {
    return false;
  }

  // Validate that name is between 4 and 128 characters and is not empty.
  if (
    typeof componentData[2] !== "string" ||
    componentData[2].trim().length < 4 ||
    componentData[2].trim().length > 128 ||
    componentData[2].trim() === ""
  ) {
    return false;
  }

  // Validate that description is less than 512 characters and not empty
  if (
    typeof componentData[3] !== "string" ||
    componentData[3].trim().length >= 512 ||
    componentData[3].trim() === ""
  ) {
    return false;
  }

  // Validate that needsAlpine and needsCDN are Booleans
  if (
    typeof componentData[5] !== "boolean" ||
    typeof componentData[6] !== "boolean"
  ) {
    return false;
  }

  // Validate that tailwind is a string and does not contain <script> tags or events or iFrames.
  if (
    typeof componentData[7] !== "string" ||
    /<script[\s\S]*?>/i.test(componentData[7]) ||
    /on\w+\s*=/i.test(componentData[7]) ||
    /<iframe[\s\S]*?>/i.test(componentData[7]) ||
    componentData[2].trim() === ""
  ) {
    return false;
  }

  // Validate that javascript is a string of characters
  if (typeof componentData[8] !== "string" || componentData[2].trim() === "") {
    return false;
  }

  return true;
};

/**
 * This util is for validate components on client
 *
 * @param {Array} componentData
 * @returns {boolean}
 */
const getErrorsComponent = (componentData) => {
  let errors = [];

  // Verify that data is provided and that it is an array
  if (!Array.isArray(componentData) || componentData.length !== 9) {
    errors.push("Some fields are empty.");
  }

  // Validate that name is between 4 and 128 characters and is not empty.
  if (
    typeof componentData[2] !== "string" ||
    componentData[2].trim().length < 4 ||
    componentData[2].trim().length > 128 ||
    componentData[2].trim() === ""
  ) {
    errors.push("Component name must be between 4 and 128 characters.");
  }

  // Validate that description is less than 512 characters and not empty
  if (
    typeof componentData[3] !== "string" ||
    componentData[3].trim().length >= 512 ||
    componentData[3].trim() === ""
  ) {
    errors.push("Description must be less than 512 characters");
  }

  // Validate that tailwind is a string and does not contain <script> tags or events or iFrames.
  if (
    typeof componentData[7] !== "string" ||
    /<script[\s\S]*?>/i.test(componentData[7]) ||
    /on\w+\s*=/i.test(componentData[7]) ||
    /<iframe[\s\S]*?>/i.test(componentData[7])
  ) {
    errors.push(
      "Tailwind code is empty or contains some script elements (No <script>, <iframes> tags or onClick events are allowed)."
    );
  }

  // Validate that javascript is a string of characters
  if (typeof componentData[8] !== "string" || componentData[8].trim() === "") {
    errors.push(
      "No javascript code has been added, if you do not want to include it add a comment in the field ( //comment )"
    );
  }

  return errors;
};

export { validateComponent, getErrorsComponent };
