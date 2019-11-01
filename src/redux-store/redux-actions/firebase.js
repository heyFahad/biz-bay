import * as actionTypes from './actionTypes';

export const userSignedIn = () => {
    return {
        type: actionTypes.USER_SIGNED_IN,
        isAuthenticated: true
    };
};

export const userSignedOut = () => {
    return {
        type: actionTypes.USER_SIGNED_OUT,
        isAuthenticated: false
    };
};

/* export const handleSignUpRequest = ({ displayName, email, phoneNo, password }) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                // User created and signed in successfully
                const currentUser = userCredential.user;
                currentUser.updateProfile({
                    displayName: displayName
                }).then(() => {
                    dispatch(setCurrentUser(currentUser));
                    console.log("[SUCCESS] - " + currentUser.displayName + " is created successfully");
                    currentUser.sendEmailVerification().then(() => {
                        console.log("Verification email sent!");
                    });
                }).catch(() => {
                    this.setState({ loading: false });
                    console.log("[ERROR] - Display name of the current user (uid=" + currentUser.uid + ") could not be updated.");
                });
            })
            .catch(error => {
                // this.setState({ loading: false });
                console.log("[ERROR] - " + error);
            });
    };
}; */
