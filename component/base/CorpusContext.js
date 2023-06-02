import React, { useState, useEffect } from "react";

export const CorpusContext = React.createContext();
// export const CorpusContext = React.createContext<GlobalContextType>({} as GlobalContextType);
//create GlobalContextProvider
export const CorpusContextProvider = ({ children }) => {

    const [CurCorpusId, setCurCorpusId] = useState("")

    const store = {
        CurCorpusId, setCurCorpusId
    }

    return (
        <CorpusContext.Provider value={store}>
            {children}
        </CorpusContext.Provider>
    )
}
