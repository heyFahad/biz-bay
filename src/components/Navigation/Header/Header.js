import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import cssClasses from './Header.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import * as ROUTES from '../../../constants/routes';

const Header = (props) => {
    return (
        <header className={cssClasses.Header}>
            <Logo />
            <nav>
                <NavigationItems />
            </nav>
            <div className={cssClasses.CTA}>
                {
                    props.isUserAuthenticated ?
                        <NavLink to={ROUTES.LOGOUT} activeClassName={cssClasses.active}>Logout</NavLink> :
                        <NavLink to={ROUTES.HOW_IT_WORKS} activeClassName={cssClasses.active}>How it works</NavLink>
                }
            </div>
        </header>
    );
};

const mapStateToProps = (state) => {
    return {
        isUserAuthenticated: state.firebase.isUserAuthenticated
    };
};

export default connect(mapStateToProps)(Header);
