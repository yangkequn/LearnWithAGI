/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useMemo, useState } from "react"
import { API, Cmd, GetUrl, HGET, RspType } from "../../component/api";
import BuildIcon from '@mui/icons-material/Build';
import { Context } from "./Context"
import { GlobalContext } from "../_app";
import { Avatar, Tooltip } from "@mui/material";
import { AvatarWithName } from "../Auth/avatar";

export default function Socratics({ topic, volume }) {
    const { setCreditTM } = useContext(GlobalContext)
    const { skillMyTrace, setSkillMyTrace, skillSession, setSkillSession } = useContext(Context)
    //all QAs about this skill topic
    const [QAs, setQAs] = useState([])
    //CurrentQAs QA that use has selected. format [question,answer,question,answer,...]
    const [QATraces, setQAsTraces] = useState([])
    const FullName = () => `${skillSession?.Name}:${skillSession?.Detail}`

    const [ScenerInfos, setScenerInfos] = useState([])
    const [CurrentScene, setCurrentScene] = useState(-1)
    const [CiteQuestion, setCiteQuestion] = useState("")
    const [QASocratics, setQASocratics] = useState([])
    //QAs and QATrace according to skillTreeSelected
    useEffect(() => {
        setQAs([])
        setQAsTraces([])
        setQASocratics([])
        let Name = FullName()
        if (!Name || Name.indexOf("undefined") >= 0 || Name.indexOf("undefined") >= 0) return
        //loadSkillSessionQAs
        API("SkillSocratic", { Name, Topic: topic, Rebuild: false }).then((res) => (Name === FullName()) && setQAs(res ?? []))
        setQAsTraces(skillMyTrace[FullName()]?.Asks ?? [])
        //Senery TTSInfo
        HGET("TTSInfo", FullName()).then((res) => (Name === FullName()) && setScenerInfos(res ?? []))

    }, [topic, skillSession])

    useEffect(() => {
        if (!FullName()) return
        setQAsTraces(skillMyTrace[FullName()]?.Asks ?? [])
    }, [topic, skillSession, skillMyTrace])
    const LoadNextDialogue = () => setCurrentScene(CurrentScene + 1)
    //when CiteQuestion move to another question, play mario ding sound
    useEffect(() => {
        if (!!CiteQuestion && QASocratics?.length > 0) {
            var audioDing = new Audio("/DingSoundEffect.ogg")
            //set volume
            audioDing.volume = isNaN(volume) ? 0.5 : volume
            audioDing.play()
        }
    }, [CiteQuestion])

    let audio = null

    //按时间线逐渐显示对话
    const [SpeechDuration, setSpeechDuration] = useState(0)
    const [TalkPassed, setTalkPassed] = useState(0)
    useEffect(() => {
        if (TalkPassed < SpeechDuration) {
            //increase duration passed every 100ms
            let interval = setTimeout(() => setTalkPassed(TalkPassed + 0.11), 100)
            //clear interval when duration passed
            setTimeout(() => clearTimeout(interval), 120)
        }
    }, [SpeechDuration, TalkPassed])
    const StartPlay = (Text) => {
        audio = new Audio(GetUrl(Cmd.HGET, "TTSOgg", Text, RspType.ogg))
        audio.volume = 0.5
        audio.onended = LoadNextDialogue
        audio.play()
    }
    const ToDialogueTextOnly = (Text) => {
        //remove the prefix of "女孩:" or "男孩:" or "苏格拉底:"        
        Text = Text.replace("女孩:", "").replace("男孩:", "").replace("苏格拉底:", "")
        return Text.trim()
    }
    useEffect(() => {
        if (!FullName()) return
        if (CurrentScene < 0 || CurrentScene >= ScenerInfos.length) return


        //handle of autoplay
        let Text = ScenerInfos[CurrentScene].Text
        StartPlay(Text)
        setTalkPassed(0.5)
        setSpeechDuration((ScenerInfos[CurrentScene]?.DurationSec ?? 0) + Math.random() * 0.0001)
        var citeQ = ScenerInfos[CurrentScene]?.CiteQuestion
        citeQ && setCiteQuestion(citeQ)

        //handle of text demo
        //if QASocratics has element that has same question, then add talk to it
        var latestQASocratics = QASocratics.filter((qa) => qa.Q === (citeQ || CiteQuestion))
        //for non exist question, add it to QASocratics
        if (latestQASocratics.length == 0) latestQASocratics = [{ Q: (citeQ || CiteQuestion), A: "", Talks: [] }]
        latestQASocratics = latestQASocratics[0]
        //if citeQ in QAs, then add it to QASocratics
        if (!!citeQ) {
            let matchedQA = QAs.filter((qa) => qa.Q === citeQ)
            if (matchedQA.length > 0) latestQASocratics.A = matchedQA[0].A
        }

        //append to header of Talks
        if (!latestQASocratics.Talks.includes(Text)) latestQASocratics.Talks = [Text, ...latestQASocratics.Talks]
        //remove latestQASocratics from _QASocratics
        var _QASocratics = [latestQASocratics, ...QASocratics.filter((qa) => qa.Q !== (citeQ || CiteQuestion))]
        setQASocratics(_QASocratics)

    }, [CurrentScene])

    if (!FullName(skillSession)) return <div key={`socratic-container-nodata`} className="flex flex-col justify-between items-start w-full h-full overflow-scroll  max-w-[40%]" ></div>
    return <div key={`socratic-container-${skillSession}`} style={{ width: "40%" }} className="flex flex-col justify-between items-start w-full h-full overflow-scroll  max-w-[40%]"    >
        {/* //list Tags of QAs,using mui tag */}
        <div className="flex flex-col flex-wrap justify-start items-start overflow-scroll w-full  mt-2 gap-[7px] opacity-90 max-h-[60%] min-h-min"        >

            <div className="flex flex-col text-xl text-gray-800 font-sans leading-4  w-full  bg-white/70 rounded-md px-2 pt-1 gap-1 items-center">

                <div className="flex flex-row w-full">
                    <div className="w-24 h-24" ><img className=" " src="/image-girl.jpg"></img> </div>
                    <div className="flex flex-col w-full items-center">
                        <div className="w-20 h-14 -mt-4" title={"苏格拉底之问"}> <img src="/socratics.jpeg"></img></div>
                        <div className="flex flex-row">
                            <div title={"自动修复错误的问答列表"} className="flex flex-row pr-1 h-full self-center items-center justify-center"
                                onClick={() => FullName() && API("SkillSocratic", { Name: FullName(), Topic: topic, Rebuild: true }).then((res) => setQAs(res ?? []))
                                } >
                                <BuildIcon />
                            </div>
                            {/* play or pause senery accoridng to PlayingSenery */}
                            <div title={"播放场景"} className="flex flex-row pr-1 h-full self-center items-center justify-center"

                                onClick={() => {
                                    if (CurrentScene >= 0) {
                                        audio?.pause()
                                        setCiteQuestion("")
                                        return setCurrentScene(-1)
                                    }
                                    setCurrentScene(0)
                                }} >
                                {CurrentScene >= 0 && <div className="animate-pulse">🔊:暂停苏格拉底之问 </div>}
                                {CurrentScene === -1 && <div>🔇:开始苏格拉底之问</div>}
                            </div>
                        </div>
                    </div>

                    <div className="w-24 h-24" ><img src="/image-man.jpeg"></img> </div>
                </div>

                <div className="flex flex-col w-full text-base justify-start items-start" >
                </div>

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
                QASocratics?.length === 0 && QATraces.reverse().map((qa, index) => {
                    return <div key={`question-answer-q-${qa.Q}-${index}`} className="flex flex-col justify-start items-start w-full h-fit py-3">
                        <div variant="18px" className="flex flex-row justify-start items-start  text-base text-gray-800 font-sans w-fit bg-orange-100 rounded-full  px-2 mb-2">
                            <div className="text-lg mr-1">🤔</div>  {qa.split("|||")[0]}
                        </div>

                        {/* align answer to the right */}
                        <div key={`question-answer-a${qa[1]}-${index}`} style={{ maxWidth: "80%", backgroundColor: "#d2f9d1" }}
                            className="flex flex-col justify-start items-start self-end text-sm text-gray-800 font-sans w-fit rounded-lg  px-2 py-2 whitespace-pre-line">

                            💬 {qa.split("|||")[1]}
                        </div>
                    </div>
                })
            }
            {
                //苏格拉底演练
                QASocratics?.length > 0 && QASocratics.map((qa, index) => {
                    return <div key={`question-answer-q-${qa.Q}-${index}`} className="flex flex-col justify-start items-start w-full h-fit py-3 gap-1">
                        <div variant="18px" className="flex flex-row justify-start items-start  text-base text-gray-800 font-sans w-fit bg-orange-100 rounded-full  px-2 mb-2">
                            <div className="text-lg mr-1">🤔</div>  {qa.Q}
                        </div>
                        {/* align answer to the right */}
                        {CurrentScene >= 0 && (CurrentScene == ScenerInfos.length || (CiteQuestion != qa.Q)) && <div key={`question-answer-a${qa[1]}-${index}`} style={{ maxWidth: "80%", backgroundColor: "#d2f9d1" }}
                            className="flex flex-col justify-start items-start self-end text-sm text-gray-800 font-sans w-fit rounded-lg  px-2 py-2 whitespace-pre-line bg-orange-100 ">

                            💬 {qa.A}
                        </div>
                        }
                        {
                            qa.Talks?.map((talk, ind) => <div key={`question-answer-talks${qa[1]}-${ind}`} style={{ maxWidth: "80%", backgroundColor: "#d2f9d1" }}
                                className={"flex flex-row justify-start items-start self-end font-sans w-fit rounded-lg  px-2 py-2 whitespace-pre-line  selection:bg-fuchsia-300" + (talk === ScenerInfos[CurrentScene]?.Text ? " ring-2 text-lg text-gray-900 text-bold animate-pulse" : " text-sm  text-gray-800 ")} >
                                {talk.substr(0, 3) === "女孩:" && <Avatar alt="女孩" src="/image-girl.jpg"></Avatar>}
                                {talk.substr(0, 3) === "男孩:" && <Avatar alt="男孩" src="/image-man.jpeg"></Avatar>}
                                {talk.substr(0, 5) === "苏格拉底:" && <Avatar alt="苏格拉底" src="/socratics.jpeg"></Avatar>}
                                {talk === ScenerInfos[CurrentScene]?.Text ? ToDialogueTextOnly(talk).substr(0, talk.length * (TalkPassed / SpeechDuration)) : ToDialogueTextOnly(talk)}
                            </div>)
                        }
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