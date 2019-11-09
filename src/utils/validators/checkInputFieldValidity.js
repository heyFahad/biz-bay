/**
 *
 * @param {any} value - The `value` of the Input field whose validity is to be checked.
 * @param {Object} rules - An object of validation rules against which the validity of this Input field will be checked.
 */
export const checkInputFieldValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.isRequired) {
    isValid = value.trim().length >= 3 && isValid;
  }
  if (rules.minLength) {
    isValid = value.trim().length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.trim().length <= rules.minLength && isValid;
  }
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.isPhoneNo) {
    const pattern = /^(?:\+923)((?:[0-46]\d|55)\d{7})$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};
