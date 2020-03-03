import React, {useState} from 'react';
import AUTH_TYPES from "./utils/auth_types";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Authenticate = ({action = AUTH_TYPES.SIGN_IN}) => {
  const [type, updateType] = useState(action);

  if (type === AUTH_TYPES.SIGN_IN) {
    return (
      <SignIn
        updateType={updateType}
      />
    )
  } else if (type === AUTH_TYPES.SIGN_UP) {
    return (
      <SignUp
        updateType={updateType}
      />
    )
  }

  return (
    <div>
      Unsupported auth method
    </div>
  );
};

export default Authenticate;