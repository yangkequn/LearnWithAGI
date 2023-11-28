/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useMemo, useState } from "react"
import { API, Cmd, GetUrl, HGET, RspType } from "../../component/api";
import BuildIcon from '@mui/icons-material/Build';
import { Context } from "./Context"
import { GlobalContext } from "../_app";
import { Avatar, Box, Button, LinearProgress, MobileStepper, Tooltip, Typography } from "@mui/material";
import { AvatarWithName } from "../Auth/avatar";
import { TwoIO } from "../../component/appFrame/navigator";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { LoadingComponent } from ".";
import ScrollingBanner from "../../component/banner";


export default function AskAnswer({ }) {
    const { setCreditTM, debugMode } = useContext(GlobalContext)
    const { skillTree, skillMyTrace, setSkillMyTrace, skillSessionNum, SessionName } = useContext(Context)
    //all QAs about this skill topic
    const [QAs, setQAs] = useState([])
    //CurrentQAs QA that use has selected. format [question,answer,question,answer,...]
    const [QATraces, setQAsTraces] = useState([])

    const topic = () => skillTree?.Name + ":" + skillTree?.Detail
    //QAs and QATrace according to skillTreeSelected
    useEffect(() => {
        setQAs([])
        setQAsTraces([])
        if (!SessionName || SessionName.indexOf("undefined") >= 0 || SessionName.indexOf("undefined") >= 0) return
        if (!skillTree?.Sessions || skillTree?.Sessions?.length <= 0) return
        var Topic = topic()
        //loadskillSessionNumQAs
        API("SkillSocrates", { SessionName, Topic, Rebuild: false }).then((res) => setQAs(res ?? []))
        setQAsTraces(skillMyTrace[SessionName]?.Asks ?? [])

    }, [skillTree, skillSessionNum, SessionName])

    useEffect(() => {
        if (!SessionName) return
        setQAsTraces(skillMyTrace[SessionName]?.Asks ?? [])
    }, [skillSessionNum, skillMyTrace])


    if (!SessionName) return <div key={`socratic-container-nodata`} className="flex flex-col justify-between items-start w-full h-full overflow-auto  max-w-[560px]" ></div>
    return <div key={`socratic-container-${skillSessionNum}`} style={{ width: "40%" }} className="flex flex-col justify-between items-start w-full h-full overflow-auto  max-w-[560px]"    >


        <div key='skill-sub-knowledge-point-title' className="flex flex-row text-black items-center my-2 gap-4 w-full ">

            <div key="question-title-box" className={`flex flex-row  w-full flex-grow items-center md:pl-4 border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 
rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] max-w-2xl self-center h-fit opacity-90`}  >

                <div className="flex flex-row gap-2 items-center w-full self-center resize-none border-0 bg-transparent  pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0 outline-none  ">
                    <div className="text-lg ">{`苏格拉底之问 - 深度提问`}</div>
                </div>
            </div>

        </div>

        {/* <div className="grid grid-cols-2 gap-x-4 gap-y-4 w-full mt-2 opacity-90 max-h-[60%] min-h-min h-fit"> */}
        <div className="flex flex-row items-start max-h-[60%] min-h-min h-fit  mb-4 px-1">
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 w-full mt-2 opacity-90 ">
                {
                    QAs.filter((QA) => QATraces.join("").indexOf(QA.Question) < 0).map((QA, index) => {
                        return <div key={QA.Question} className="text-base even:bg-lime-100 odd:bg-amber-100 max-w-full rounded-md px-4 py-[4px] items-center"
                            onClick={() => API("SkillMyTraceReport", { SkillName: topic(), SessionName: SessionName, Ask: `${QA.Question}|||${QA.Options}` }).then((res) => {
                                let newMySkillTrace = { ...skillMyTrace, [SessionName]: res }
                                setSkillMyTrace(newMySkillTrace)
                                //update creditTM to refresh rewards
                                setCreditTM(new Date().getTime())
                            })}>
                            ❓{QA.Question}
                        </div>
                    })
                }
            </div>
        </div>

        {/* <div className="bg" style={{ boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.75)" }}>        </div> */}

        {/* The whole chat box is scrollable */}
        {<div key="what-is-my-answered" className="flex flex-col justify-start items-start w-full h-full  max-h-max min-h-min overflow-auto my-2 rounded-2xl " style={{ boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.20)" }}>
            {
                //display CurrentQAs as dialog box,question on the left,answer on the right
                QATraces.reverse().map((qa, index) => {
                    return <div key={`question-answer-q-${qa.Question}-${index}`} className="flex flex-col justify-start items-center w-full h-fit py-3">
                        <div variant="18px" className="flex flex-row justify-start items-center  text-base text-gray-800 font-sans w-fit bg-orange-100 rounded-full  px-2 mb-2">
                            <div className="text-4xl mr-1 " >🤔</div>
                            <div>{qa.split("|||")[0]}</div>
                        </div>

                        {/* align answer to the right */}
                        <div key={`question-answer-a${qa[1]}-${index}`} style={{ maxWidth: "80%", backgroundColor: "#d2f9d1" }}
                            className="flex flex-col justify-start items-start self-end text-sm text-gray-800 font-sans w-fit rounded-lg  px-2 py-2 whitespace-pre-line">

                            💬 {qa.split("|||")[1]}
                        </div>

                    </div>
                })
            }
        </div>}
        {!QAs?.length && <LoadingComponent Text="Loading..." />}
        {/* <div key="question-box" className="flex flex-col justify-start items-start w-full h-28 overflow-scroll py-2"  >
            <TextField label="提出一个新问题, Shift + Enter换行, 按Enter提交" multiline={true} rows={1} className="text-base text-gray-800 font-sans w-full h-full" style={{ boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.25)" }}
                onKeyDown={
                    (e) => {
                        //if key press enter+shift,add a new line
                        //if press enter without shift,submit
                        if (e.keyCode === 13 && !e.shiftKey) {
                            e.preventDefault()
                            if (!IsValidSkillPoint()) return
                            //if not empty
                            let question = e.target.value
                            if (!!question) {
                                e.target.value = ""
                                API("SkillSocratic", { Name: SessionName, Quetion: question })
                                    .then((res) => setQAs(res ?? []))
                                API("SkillMyTraceReport", { SkillName: topic(), SessionName: SessionName, Ask: `${question}|||${answer}` }).then((res) => {
                                    let newMySkillTrace = { ...skillMyTrace, [SessionName]: res }
                                    setSkillMyTrace(newMySkillTrace)
                                    //update creditTM to refresh rewards
                                    setCreditTM(new Date().getTime())
                                })
                            }
                        }
                    }}
            />
        </div> */}


    </div >
}