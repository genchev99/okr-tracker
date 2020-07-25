import React from "react";

export default React.createContext({
  error: () => {},
  success: () => {},
  warn: () => {},
});