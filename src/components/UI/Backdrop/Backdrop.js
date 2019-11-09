import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Backdrop.module.css';

const Backdrop = (props) => {
  return props.show ? (
    <div className={cssClasses.Backdrop} onClick={props.clicked}></div>
  ) : null;
};

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: (props, propName, componentName) => {
    if (props.show) {
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
  }
};

export default Backdrop;
