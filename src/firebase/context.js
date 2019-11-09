import React from 'react';

const FirebaseContext = React.createContext(null);

export const withFirebase = (WrappedComponent) => {
  return (props) => {
    return (
      <FirebaseContext.Consumer>
        {(context) => {
          return <WrappedComponent {...props} firebase={context} />;
        }}
      </FirebaseContext.Consumer>
    );
  };
};

export default FirebaseContext;
