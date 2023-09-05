/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import { API } from "../../component/api";
import BuildIcon from '@mui/icons-material/Build';
import { Context } from "./Context"
import { GlobalContext } from "../_app";
import { Tooltip } from "@mui/material";

export default function Socratics({ topic }) {
    const { setCreditTM } = useContext(GlobalContext)
    const { skillMyTrace, setSkillMyTrace, skillSession, setSkillSession } = useContext(Context)
    //all QAs about this skill topic
    const [QAs, setQAs] = useState([])
    //CurrentQAs QA that use has selected. format [question,answer,question,answer,...]
    const [QATraces, setQAsTraces] = useState([])
    const FullName = () => `${skillSession?.Name}:${skillSession?.Detail}`
    //QAs and QATrace according to skillTreeSelected
    useEffect(() => {
        setQAs([])
        setQAsTraces([])
        let Name = FullName()
        if (!Name || Name.indexOf("undefined") >= 0 || Name.indexOf("undefined") >= 0) return
        //loadSkillSessionQAs
        API("SkillSocratic", { Name, Topic: topic, Rebuild: false }).then((res) => (Name === FullName()) && setQAs(res ?? []))
        setQAsTraces(skillMyTrace[FullName()]?.Asks ?? [])

    }, [topic, skillSession])

    useEffect(() => {
        if (!FullName()) return
        setQAsTraces(skillMyTrace[FullName()]?.Asks ?? [])
    }, [topic, skillSession, skillMyTrace])

    if (!FullName(skillSession)) return <div key={`socratic-container-nodata`} className="flex flex-col justify-between items-start w-full h-full overflow-scroll  max-w-[40%]" ></div>
    return <div key={`socratic-container-${skillSession}`} style={{ width: "40%" }} className="flex flex-col justify-between items-start w-full h-full overflow-scroll  max-w-[40%]"    >
        {/* //list Tags of QAs,using mui tag */}
        <div className="flex flex-col flex-wrap justify-start items-start overflow-scroll w-full  mt-2 gap-[7px] opacity-90 max-h-[60%] min-h-min"        >

            <div className="flex flow-row text-xl text-gray-800 font-sans leading-4 w-[100%]  bg-white/70 rounded-md px-2 pt-1 gap-1 items-center">
                <div className="w-24 h-24" ><img className=" " src="/WX20230901-103849@2x.jpg"></img> </div>
                <div className="flex flex-col">
                    <div className="w-20 h-14 -mt-4" title={"苏格拉底之问"}> <img src="/socratics.jpeg"></img></div>
                    <div title={"自动修复错误的问答列表"} className="pr-1 h-full self-center items-center justify-center"
                        onClick={() => FullName() && API("SkillSocratic", { Name: FullName(), Topic: topic, Rebuild: true }).then((res) => setQAs(res ?? []))
                        } >
                        <BuildIcon />
                    </div>
                </div>

                <div className="w-24 h-24" ><img src="/image-man.jpeg"></img> </div>

            </div>
            {
                QAs.filter((QA) => QATraces.join("").indexOf(QA.Q) < 0).map((QA, index) => {
                    return <div key={QA.Q} className=" text-base  even:bg-lime-100 odd: bg-amber-100 max-w-[49%] rounded-md px-4 py-[4px]  items-center"
                        onClick={() => API("SkillMyTraceReport", { SkillName: topic, SessionName: FullName(), Ask: `${QA.Q}|||${QA.A}` }).then((res) => {
                            let newMySkillTrace = { ...skillMyTrace, [FullName()]: res }
                            setSkillMyTrace(newMySkillTrace)
                            //update creditTM to refresh rewards
                            setCreditTM(new Date().getTime())
                        })} >
                        ❓{QA.Q}
                    </div>
                })
            }
        </div>


        {/* <div className="bg" style={{ boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.75)" }}>        </div> */}

        {/* The whole chat box is scrollable */}
        <div key="what-is-my-answered" className="flex flex-col justify-start items-start w-full  max-h-max min-h-min overflow-scroll my-2 " style={{ boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.20)" }}>
            {
                //display CurrentQAs as dialog box,question on the left,answer on the right
                QATraces.reverse().map((qa, index) => {
                    return <div key={`question-answer-q-${qa.Q}-${index}`} className="flex flex-col justify-start items-start w-full h-fit py-3">
                        <div variant="18px" className="flex flex-row justify-start items-start  text-base text-gray-800 font-sans w-fit bg-orange-100 rounded-full  px-2 mb-2">
                            <div className="text-lg mr-1">🤔</div>  {qa.split("|||")[0]}
                        </div>

                        {/* align answer to the right */}
                        <div key={`question-answer-a${qa[1]}-${index}`} style={{ maxWidth: "80%", backgroundColor: "#d2f9d1" }}
                            className="flex flex-col justify-start items-start self-end text-sm text-gray-800 font-sans w-fit rounded-lg  px-2 py-2 whitespace-pre-line"
                        >
                            💬 {qa.split("|||")[1]}
                        </div>
                    </div>
                })
            }
        </div>
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
                                API("SkillSocratic", { Name: FullName(), Quetion: question })
                                    .then((res) => setQAs(res ?? []))
                                API("SkillMyTraceReport", { SkillName: topic, SessionName: FullName(), Ask: `${question}|||${answer}` }).then((res) => {
                                    let newMySkillTrace = { ...skillMyTrace, [FullName()]: res }
                                    setSkillMyTrace(newMySkillTrace)
                                    //update creditTM to refresh rewards
                                    setCreditTM(new Date().getTime())
                                })
                            }
                        }
                    }}
            />
        </div> */}


    </div>
}