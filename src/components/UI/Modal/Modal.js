import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Modal.module.css';
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
    return (
        <React.Fragment>
            <Backdrop
                show={props.showBackdrop}
                clicked={props.backdropClicked} />
            {
                props.showBackdrop ?
                    <div className={cssClasses.Modal}>
                        {props.children}
                    </div> : null
            }
        </React.Fragment>
    );
};

Modal.propTypes = {
    showBackdrop: PropTypes.bool.isRequired,
    backdropClicked: (props, propName, componentName) => {
        if (props.showBackdrop) {
            if (props[propName] === undefined) {
                return new Error('The prop `' + propName + '` is marked as required in `' + componentName + '`, but its value is `undefined`.');
            } else if (typeof (props[propName]) !== 'function') {
                return new Error('Invalid prop `' + propName + '` of type `' + typeof (props[propName]) + '` supplied to `' + componentName + '`, expected `function`.');
            }
        }
    }
};

export default Modal;
