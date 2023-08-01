
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import AskContextComponent, { AskContext } from "./AskContext"
import { API, HMGET, ZRANGEBYSCORE, ZREM, ZREMRANGEBYSCORE } from "../../component/api"
import ListIcon from '@mui/icons-material/List';

export default function LeftPanel() {
    const { topics, setTopics, QA, setQA, setReload } = useContext(AskContext)
    const chatSVG = <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>

    return <div key="left-panel" className={"flex flex-col justify-start w-64 bg-gray-900 border-amber-200 text-base h-full  text-gray-100"}>

        <div key="list-of-topics" className="flex flex-col h-full w-full " >
            <div className={`flex flex-row justify-start items-center w-fit flex-nowrap ml-2 mr-10 m-3 text-base ring-1 hover:bg-amber-200 hover:text-gray-800 hover:cursor-pointer ${!QA?.Q && "bg-amber-100 text-gray-800"}`} onClick={() => {
                setQA({ Q: "", A: "" })
            }}>
                <div className="flex flex-row py-2 px-2 w-[236px]" >+ 新建对话</div>

            </div>
            {
                topics.map((topic, index) => <div key={index} onClick={() => setQA(topic)}
                    className={"flex flex-row justify-between group hover:bg-amber-200 hover:text-black items-center w-full self-center px-2 py-3 max-h-11 overflow-y-hidden text-sm "
                        + (QA?.Q === topic?.Q ? "bg-gray-500 " : "bg-gray-700")} >
                    <div className="flex-row flex flex-nowrap gap-1 items-center">
                        <div>{chatSVG}</div>
                        <div> {topic?.Title ?? topic?.Q} </div>
                    </div>
                    {/*  emoji delete button */}
                    <div className="flex-row self-center items-center gap-2 invisible group-hover:visible" onClick={(e) => {
                        topic?.Q && API("MyQuestions", { Question: topic?.Q, Action: "delete" }).then(() => { setReload(Date.now()) })
                    }}>
                        ⌫
                    </div>
                </div>
                )
            }
        </div>

        <div className="h-full flex flex-grow" />

        <div className="flex flex-col min-w-250 w-full h-10 justify-center items-center bg-gray-600 " onClick={() => {
            //remove all alement of ZSet
            [...topics].map((topic) => {
                ZREMRANGEBYSCORE("MyQuestionsList:@id", parseInt(topic.Time), parseInt(topic.Time))
            })
            setTopics([])
            setQA(null)
        }}>
            <div className="flex flex-row justify-start items-center gap-4 self-start flex-nowrap p-2 " >
                <div>
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </div>
                <div> 删除全部对话</div>
            </div>
        </div>
    </div>
}