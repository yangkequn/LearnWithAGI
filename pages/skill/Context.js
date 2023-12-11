

import React, { useEffect, useState } from "react";
export const Context = React.createContext({
    skillTree: [],
    setSkillTree: () => { },

    skillMyTrace: {},
    setSkillMyTrace: () => { },

    skillSessionNum: 0,
    setskillSessionNum: () => { },

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
    const [skillSessionNum, setskillSessionNum] = useState(0)
    const [ShowDemo, setShowDemo] = useState(true)
    const [ShowAskAnswer, setShowAskAnswer] = useState(false)
    const [ShowQA, setShowQA] = useState(true)
    const [SessionName, setSessionName] = useState("")
    const [TopicName, setTopicName] = useState("")
    useEffect(() => {
        if (skillSessionNum == -1) setSessionName("")
        if (!skillTree?.Sessions || skillTree.Sessions.length == 0 || skillTree.Sessions.length <= skillSessionNum) return setSessionName("")
        var session = skillTree.Sessions[skillSessionNum]
        var sessionName = []
        if (!!session.Name) sessionName.push(session.Name)
        if (!!session.Detail) sessionName.push(session.Detail)
        setSessionName(sessionName.join(":"))
    }, [skillTree, skillSessionNum])

    useEffect(() => {
        var topicName = ""
        if (!!skillTree && !!skillTree?.Name && !!skillTree?.Detail) topicName = `${skillTree?.Name}:${skillTree?.Detail}`
        else if (!!skillTree && !!skillTree?.Name) topicName = skillTree?.Name
        setTopicName(topicName)
    }, [skillTree])

    const store = {
        skillTree, setSkillTree,
        skillMyTrace, setSkillMyTrace,
        skillSessionNum, setskillSessionNum,
        ShowDemo, setShowDemo,
        ShowAskAnswer, setShowAskAnswer,
        ShowQA, setShowQA,
        TopicName, setTopicName,
        SessionName
    }

    return <Context.Provider value={store}>{children}</Context.Provider>
}
