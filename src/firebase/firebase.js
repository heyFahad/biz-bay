import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

class Firebase {
    constructor() {
        if (!Firebase.instance) {
            Firebase.instance = this;
            this.app = firebase.initializeApp(firebaseConfig);
            this.auth = firebase.auth();
            this.auth.useDeviceLanguage();
            this.currentUser = this.auth.currentUser;
        }
        return Firebase.instance;
    };

    /**
     * Auth API
     */
    // *** firebase.auth.Auth ***
    doConfirmPasswordReset = ({ code: confirmationCode, password: newPassword }) => {
        return this.auth.confirmPasswordReset(confirmationCode, newPassword);
    };

    doCreateUserWithEmailAndPassword = ({ email, password }) => {
        return this.auth.createUserWithEmailAndPassword(email, password);
    };

    doPasswordReset = ({ email }) => {
        return this.auth.sendPasswordResetEmail(email);
    };

    doSignInWithEmailAndPassword = ({ email, password }) => {
        return this.auth.signInWithEmailAndPassword(email, password);
    };

    doSignInWithPhoneNumber = ({ formData: { phoneNo }, applicationVerifier }) => {
        return this.auth.signInWithPhoneNumber(phoneNo, applicationVerifier);
    };

    doSignOut = () => {
        return this.auth.signOut();
    };

    // *** firebase.auth.EmailAuthProvider ***
    doCreateEmailPasswordAuthCredential = ({ email, password }) => {
        return firebase.auth.EmailAuthProvider.credential(email, password);
    };

    // *** firebase.auth.RecaptchaVerifier ***
    doCreateInvisibleRecaptchaVerifier = ({ buttonId: container, renderParameters: parameters }) => {
        return new firebase.auth.RecaptchaVerifier(container, parameters);
    };

    // *** firebase.User ***
    doDeleteUser = () => {
        return this.currentUser.delete();
    };

    doLinkWithCredential = ({ credential: authCredential }) => {
        // const currentUser = this;
        console.log(this.currentUser);
        return this.currentUser.linkWithCredential(authCredential);
    };

    doReauthenticateUserWithCredential = ({ credential }) => {
        return this.currentUser.reauthenticateWithCredential(credential);
    };

    doSendVerificationEmail = () => {
        return this.currentUser.sendEmailVerification();
    };

    doEmailUpdate = ({ email: newEmail }) => {
        return this.currentUser.updateEmail(newEmail);
    };

    doPasswordUpdate = ({ password: newPassword }) => {
        return this.currentUser.updatePassword(newPassword);
    };

    doUserProfileUpdate = ({ displayName = this.currentUser.displayName, photoURL = this.currentUser.photoURL }) => {
        return this.currentUser.updateProfile({
            displayName: displayName,
            photoURL: photoURL
        });
    };
};

export default Firebase;
