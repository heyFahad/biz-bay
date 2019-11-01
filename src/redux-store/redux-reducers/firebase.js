import { updateObject } from '../../utils/updateObject';
import * as actionTypes from '../redux-actions/actionTypes';

const initialState = {
    isUserAuthenticated: JSON.parse(localStorage.getItem('currentFirebaseUser')) !== null
};

const setCurrentAuthenticationState = (state, action) => {
    return updateObject(state, {
        isUserAuthenticated: action.isAuthenticated
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_SIGNED_IN:
        case actionTypes.USER_SIGNED_OUT: return setCurrentAuthenticationState(state, action);
        default: return state;
    }
};

export default reducer;
