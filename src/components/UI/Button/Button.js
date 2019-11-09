import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Button.module.css';

const Button = React.forwardRef(function Button(props, ref) {
  return (
    <button
      ref={ref}
      id={props.id}
      className={cssClasses.Button}
      onClick={props.clicked}
      disabled={props.disabled}>
      {props.children}
    </button>
  );
});

Button.propTypes = {
  id: PropTypes.string,
  clicked: PropTypes.func,
  disabled: PropTypes.bool
};

export default Button;
