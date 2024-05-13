/**
 * This util is for validate componentes
 *
 * @param {Array} componentData
 */
const validateComponent = (componentData) => {
  // Verify that data is provided and that it is an array
  if (!Array.isArray(componentData) || componentData.length !== 9) {
    console.log("arrFail");

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
    /<iframe[\s\S]*?>/i.test(componentData[7])
  ) {
    return false;
  }

  // Validate that javascript is a string of characters
  console.log(typeof componentData[8]);

  if (typeof componentData[8] !== "string") {
    return false;
  }

  return true;
};

export { validateComponent };
