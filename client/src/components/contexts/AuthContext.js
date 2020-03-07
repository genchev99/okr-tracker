import React from "react";

export default React.createContext({
  email: null,
  company: null,
  login: () => {},
  logout: () => {},
});