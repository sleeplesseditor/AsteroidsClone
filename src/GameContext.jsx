import * as React from 'react';

export const gameContext = React.createContext();

const contextValues = {
    keys: {},
    context: null
}

export const GameContextProvider = ({ children }) => {
  return <gameContext.Provider value={contextValues}>{children}</gameContext.Provider>;
};