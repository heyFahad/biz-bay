import React from 'react';

import cssClasses from './Footer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const Footer = () => {
    return (
        <footer className={cssClasses.Footer}>
            <Logo />
            <nav>
                <NavigationItems />
            </nav>
            <div className={cssClasses.Copyright}>
                Copyright to <span className={cssClasses.Trademark}>Biz Bay</span>
            </div>
        </footer>
    );
};

export default Footer;
