import { HMGET, ZRANGEBYSCORE } from "@/component/api";
import React, { useEffect, useState } from "react";

export const AskContext = React.createContext(null)
export const AskContextComponent = ({ children }) => {
    const [topics, setTopics] = useState([])
    const [QA, setQA] = useState([])
    const [topicLoaded, setTopicLoaded] = useState(false)
    const store = {
        topics, setTopics,
        QA, setQA,
        topicLoaded, setTopicLoaded,
    }
    useEffect(() => {
        ZRANGEBYSCORE("MyQuestionsList:@id", 0, "+inf").then((item_times) => {
            if (!item_times || item_times.length == 0) {
                setTopicLoaded(true)
                return setTopics([])
            }
            //kept no more than 200 topics
            item_times = item_times.slice(0, 200)
            //sort by time, from net to old
            item_times.sort((a, b) => parseInt(b) - parseInt(a))
            HMGET("MyQuestions:@id", item_times).then((data) => {
                setTopics(data)
                //if no QA, set the first one
                if (!QA || !QA.Q) {
                    setQA(data[0])
                }
                setTopicLoaded(true)
            })
        })
    }, [])

    return <AskContext.Provider value={store}>{children}</AskContext.Provider>
}
