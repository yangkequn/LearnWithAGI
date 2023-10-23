

import React, { useState } from "react";
export const Context = React.createContext({
    skillTree: [],
    setSkillTree: () => { },

    skillMyTrace: {},
    setSkillMyTrace: () => { },

    skillSession: null,
    setSkillSession: () => { },

    topic: "",
    setTopic: () => { },

    ShowDemo: true,
    setShowDemo: () => { },
    
    ShowAskAnswer: true,
    setShowAskAnswer: () => { },

    ShowQA: true,
    setShowQA: () => { },

});
export default function ContextComponent({ children }) {
    //[{Name,Rank,Path,QAs,Ask,Answer,Correct,Wrong,EmotionValence,EmotionArousal,EmotionDominance},...]
    const [skillTree, setSkillTree] = useState([]);
    const [topic, setTopic] = useState("");

    //key skillPoint name, value is the skillMyTrace{QAs,Asks}
    //for each line of QA, the first is question, the second is answer,seperated by |||. the answer is 0 or 1 or 2 or 3
    //for each line of Asks, the first is question, the second is answer,seperated by |||
    const [skillMyTrace, setSkillMyTrace] = useState({});
    const [skillSession, setSkillSession] = useState(null)
    const [ShowDemo, setShowDemo] = useState(true)
    const [ShowAskAnswer, setShowAskAnswer] = useState(true)
    const [ShowQA, setShowQA] = useState(true)
    const store = {
        skillTree, setSkillTree,
        skillMyTrace, setSkillMyTrace,
        skillSession, setSkillSession,
        topic, setTopic,
        ShowDemo, setShowDemo,
        ShowAskAnswer, setShowAskAnswer,
        ShowQA, setShowQA,
    }

    return <Context.Provider value={store}>{children}</Context.Provider>
}
