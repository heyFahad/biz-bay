import React from 'react';
import { Link } from 'react-router-dom';

import cssClasses from './Logo.module.css';
import logoPNG from '../../assets/images/logo.png';
import * as ROUTES from '../../constants/routes';

const Logo = () => {
  return (
    <div className={cssClasses.Logo}>
      <Link to={ROUTES.LANDING_PAGE}>
        <img src={logoPNG} alt="BizBay" />
      </Link>
    </div>
  );
};

export default Logo;
