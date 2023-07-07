
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import { AskContext, AskContextComponent } from "./AskContext"
//use tailwindcss
import "tailwindcss/tailwind.css"
import { HMGET, ZRANGEBYSCORE, ZREM, ZREMRANGEBYSCORE } from "@/component/api"
import ListIcon from '@mui/icons-material/List';

export function LeftPanel() {
    const { topics, setTopics, QA, setQA, } = useContext(AskContext)
    useEffect(() => {
        ZRANGEBYSCORE("MyQuestionsList:@id", 0, "+inf").then((item_times) => {
            if (!item_times || item_times.length == 0) return setTopics([])
            //kept no more than 200 topics
            item_times = item_times.slice(0, 200)
            //sort by time
            item_times.sort((a, b) => {
                return parseInt(a) - parseInt(b)
            })
            HMGET("MyQuestions:@id", item_times).then((data) => {
                setTopics(data)
                //if no QA, set the first one
                if (!QA || !QA.Q) {
                    setQA(data[0])
                }
            })
        })
    }, [])
    return <div key="left-panel" className={"flex flex-col justify-start w-64 bg-gray-800 border-amber-200 text-base h-full  text-gray-100"}>
        <div className="flex flex-row flex-nowrap w-full h-10 justify-start items-center gap-3 px-2">
            <div className="self-center"><ListIcon></ListIcon> </div>
            <div className=" self-center  w-full leading-7 " > 问题列表</div>
        </div>

        <div key="list-of-topics" className="flex flex-col h-full w-full  gap-2 " >
            {
                topics.map((topic, index) => {
                    return <div key={index} className={"hover:bg-amber-200 flex-rowitems-center w-full self-start px-2 rounded-10 bg-gray-600 leading-5 text-base max-h-20 overflow-x-auto" + (QA?.Q === topic.Q ? " bg-amber-200" : "")}
                        onClick={() => {
                            setQA(topic)
                        }}>
                        {topic?.Q}
                    </div>
                })
            }
        </div>
        <div className="flex flex-col min-w-250 w-full h-10 justify-center items-center bg-gray-600 " onClick={() => {
            //remove all alement of ZSet
            [...topics].map((topic) => {
                ZREMRANGEBYSCORE("MyQuestionsList:@id", parseInt(topic.Time), parseInt(topic.Time))
            })
            setTopics([])
            setQA(null)
        }}>
            <div className="flex flex-row justify-start items-center gap-4 self-start flex-nowrap p-2" >
                <div>
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </div>
                <div> 删除全部对话</div>
            </div>
        </div>
    </div>
}