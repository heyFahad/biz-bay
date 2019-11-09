import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import cssClasses from './NavigationItem.module.css';

const NavigationItem = (props) => {
  return (
    <li className={cssClasses.NavigationItem}>
      <NavLink
        to={props.to}
        exact={props.exact}
        activeClassName={cssClasses.active}>
        {props.children}
      </NavLink>
    </li>
  );
};

NavigationItem.propTypes = {
  to: PropTypes.string.isRequired,
  exact: PropTypes.bool
};

export default NavigationItem;
