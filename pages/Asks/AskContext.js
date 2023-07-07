import React, { useState } from "react";

export const AskContext = React.createContext(null)
export const AskContextComponent = ({ children }) => {
    const [topics, setTopics] = useState([])
    const [QA, setQA] = useState([])
    const store = {
        topics, setTopics,
        QA, setQA,
    }

    return <AskContext.Provider value={store}>{children}</AskContext.Provider>
}
