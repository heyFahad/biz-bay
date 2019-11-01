import React from 'react';

import cssClasses from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import * as ROUTES from '../../../constants/routes';

const NavigationItems = () => {
    return (
        <ul className={cssClasses.NavigationItems}>
            <NavigationItem to={ROUTES.HOME} exact>Home</NavigationItem>
            <NavigationItem to={ROUTES.CITIES}>Cities</NavigationItem>
            <NavigationItem to={ROUTES.INFLUENCERS}>Top Rated Influencers</NavigationItem>
            <NavigationItem to={ROUTES.DESIGNS}>Template Designs</NavigationItem>
            <NavigationItem to={ROUTES.SUPPORT}>Admin Support</NavigationItem>
            <NavigationItem to={ROUTES.ABOUT}>About Us</NavigationItem>
        </ul>
    );
};

export default NavigationItems;
