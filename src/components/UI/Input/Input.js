import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Input.module.css';

const Input = React.forwardRef(function Input(props, ref) {
  const inputClasses = [cssClasses.InputElement];
  if (props.invalid && props.touched) {
    inputClasses.push(cssClasses.Invalid);
  }
  if (props.invalid && props.isFocused && props.touched) {
    inputClasses.pop();
  }

  let inputElement = null;
  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          ref={ref}
          id={props.id}
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          required={props.required}
          value={props.value}
          onChange={props.changed}
          onFocus={props.focused}
          onBlur={props.blurred}
        />
      );
      break;

    case 'textarea':
      inputElement = (
        <textarea
          ref={ref}
          id={props.id}
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          required={props.required}
          value={props.value}
          onChange={props.changed}
          onFocus={props.focused}
          onBlur={props.blurred}
        />
      );
      break;

    case 'select':
      const selectOptions = props.elementConfig.options;
      if (selectOptions !== undefined) {
        inputElement = (
          <select
            ref={ref}
            id={props.id}
            className={inputClasses.join(' ')}
            required={props.required}
            value={props.value}
            onChange={props.changed}>
            {selectOptions.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.displayValue}
                </option>
              );
            })}
          </select>
        );
      }
      break;

    default:
      break;
  }

  return (
    <div className={cssClasses.Input}>
      <label className={cssClasses.Label} htmlFor={props.id}>
        {props.label}
      </label>
      {inputElement}
    </div>
  );
});

Input.propTypes = {
  label: PropTypes.string,
  id: (props, propName, componentName) => {
    if (props.label !== undefined) {
      if (props[propName] === undefined) {
        return new Error(
          'The prop `' +
            propName +
            '` is marked as required, for better Web Accessibility (allow assistive technology to interpret web pages) in `' +
            componentName +
            '`, but its value is `undefined`.'
        );
      } else if (typeof props[propName] !== 'string') {
        return new Error(
          'Invalid prop `' +
            propName +
            '` of type `' +
            typeof props[propName] +
            '` supplied to `' +
            componentName +
            '`, expected `string`.'
        );
      }
    }
  },
  elementType: PropTypes.oneOf(['input', 'textarea', 'select']),
  elementConfig: PropTypes.object.isRequired,
  invalid: PropTypes.bool,
  required: PropTypes.bool,
  touched: PropTypes.bool,
  isFocused: PropTypes.bool,
  value: PropTypes.string,
  changed: (props, propName, componentName) => {
    if (props.value !== undefined) {
      if (props[propName] === undefined) {
        return new Error(
          'The prop `' +
            propName +
            '` is marked as required in `' +
            componentName +
            '`, but its value is `undefined`.'
        );
      } else if (typeof props[propName] !== 'function') {
        return new Error(
          'Invalid prop `' +
            propName +
            '` of type `' +
            typeof props[propName] +
            '` supplied to `' +
            componentName +
            '`, expected `function`.'
        );
      }
    }
  },
  focused: (props, propName, componentName) => {
    if (props.isFocused !== undefined) {
      if (props[propName] === undefined) {
        return new Error(
          'The prop `' +
            propName +
            '` is marked as required in `' +
            componentName +
            '`, but its value is `undefined`.'
        );
      } else if (typeof props[propName] !== 'function') {
        return new Error(
          'Invalid prop `' +
            propName +
            '` of type `' +
            typeof props[propName] +
            '` supplied to `' +
            componentName +
            '`, expected `function`.'
        );
      }
    }
  },
  blurred: PropTypes.func
};

export default Input;
