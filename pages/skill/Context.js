

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
    const store = {
        skillTree, setSkillTree,
        skillMyTrace, setSkillMyTrace,
        skillSession, setSkillSession,
        topic, setTopic,
    }

    return <Context.Provider value={store}>{children}</Context.Provider>
}
