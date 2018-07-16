import React  from 'react';
export const environment = process.env.NODE_ENV

export const EnvContext = React.createContext(
  environment // default value
);