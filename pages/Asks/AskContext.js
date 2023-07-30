import { API, HMGET, ZRANGEBYSCORE } from "../../component/api";
import React, { useEffect, useState } from "react";

export const AskContext = React.createContext(undefined)
export default function AskContextComponent({ children }) {
    const [topics, setTopics] = useState([])
    const [QA, setQA] = useState({ Q: "", A: "", Time: 0 })
    const [topicLoaded, setTopicLoaded] = useState(false)
    const [reload, setReload] = useState(0)
    const [modelGPT, setModelGPT] = useState("gpt-3.5")
    const store = {
        topics, setTopics,
        QA, setQA,
        topicLoaded, setTopicLoaded,
        setReload,
        modelGPT, setModelGPT,
    }
    useEffect(() => {
        ZRANGEBYSCORE("MyQuestionsList:@id", 0, "+inf").then((item_times) => {
            if (!item_times || item_times.length == 0) {
                setTopicLoaded(true)
                return setTopics([])
            }
            //kept no more than 200 topics
            item_times = item_times.slice(0, 200)
            HMGET("MyQuestions:@id", item_times).then((data) => {
                //sort by time, from new to old
                data.sort((a, b) => parseInt(b.Time) - parseInt(a.Time))
                setTopics(data)
                //if no QA, set the first one
                if (!QA || !QA.Q) {
                    setQA(data[0])
                }
                setTopicLoaded(true)
            })
        })
    }, [reload])

    return <AskContext.Provider value={store}>{children}</AskContext.Provider>
}