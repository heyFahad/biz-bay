/**
 *
 * @param {Object} oldObject - The actual object which you want to update immutably (like the `state` object).
 * @param {Object} updatedProperties - The properties in actual object (and their updated values that) you specifically want to update.
 */
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};
