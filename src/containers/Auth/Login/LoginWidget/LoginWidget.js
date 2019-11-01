import React from 'react';

import cssClasses from './LoginWidget.module.css';
import LoginForm from '../LoginForm/LoginForm';

const LoginWidget = (props) => {
    return (
        <div className={cssClasses.LoginWidget}>
            <button
                className={cssClasses.Login}>
                Login
            </button>
            <button
                className={cssClasses.SignUp}
                onClick={props.signUp}>
                Sign up
            </button>
            <div className={cssClasses.LoginForm}>
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginWidget;
