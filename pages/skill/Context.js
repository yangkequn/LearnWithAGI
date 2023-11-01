

import React, { useEffect, useState } from "react";
export const Context = React.createContext({
    skillTree: [],
    setSkillTree: () => { },

    skillMyTrace: {},
    setSkillMyTrace: () => { },

    skillSession: null,
    setSkillSession: () => { },

    TopicName: "",

    ShowDemo: true,
    setShowDemo: () => { },

    ShowAskAnswer: true,
    setShowAskAnswer: () => { },

    ShowQA: true,
    setShowQA: () => { },

    SessionName: "",
    TopicName: "",
    setTopicName: () => { },
});
export default function ContextComponent({ children }) {
    //[{Name,Rank,Path,QAs,Ask,Answer,Correct,Wrong,EmotionValence,EmotionArousal,EmotionDominance},...]
    const [skillTree, setSkillTree] = useState([]);

    //key skillPoint name, value is the skillMyTrace{QAs,Asks}
    //for each line of QA, the first is question, the second is answer,seperated by |||. the answer is 0 or 1 or 2 or 3
    //for each line of Asks, the first is question, the second is answer,seperated by |||
    const [skillMyTrace, setSkillMyTrace] = useState({});
    const [skillSession, setSkillSession] = useState(null)
    const [ShowDemo, setShowDemo] = useState(true)
    const [ShowAskAnswer, setShowAskAnswer] = useState(false)
    const [ShowQA, setShowQA] = useState(true)
    const [SessionName, setSessionName] = useState("")
    const [TopicName, setTopicName] = useState("")
    useEffect(() => {
        if (!!skillSession && skillSession?.Name?.length > 0 && skillSession?.Detail?.length > 0) setSessionName(`${skillSession?.Name}:${skillSession?.Detail}`)
        else setSessionName("")
    }, [skillSession])

    useEffect(() => {
        var topicName = ""
        if (!!skillTree && !!skillTree?.Name && !!skillTree?.Detail) topicName = `${skillTree?.Name}:${skillTree?.Detail}`
        else if (!!skillTree && !!skillTree?.Name) topicName = skillTree?.Name
        setTopicName(topicName)
    }, [skillTree])


    const FullName = () => `${skillSession?.Name}:${skillSession?.Detail}`
    const store = {
        skillTree, setSkillTree,
        skillMyTrace, setSkillMyTrace,
        skillSession, setSkillSession,
        ShowDemo, setShowDemo,
        ShowAskAnswer, setShowAskAnswer,
        ShowQA, setShowQA,
        TopicName, setTopicName,
        SessionName
    }

    return <Context.Provider value={store}>{children}</Context.Provider>
}
