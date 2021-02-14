import * as React from 'react';

export const gameContext = React.createContext();

const startingKeys = {
    left  : 0,
    right : 0,
    up    : 0,
    down  : 0,
    space : 0,
}

export const GameContextProvider = ({ children }) => {
    const [context, setContext] = React.useState(null)
    const [keys, setKeys] = React.useState(startingKeys)
    return <gameContext.Provider value={{context, setContext, keys, setKeys}}>{children}</gameContext.Provider>;
};