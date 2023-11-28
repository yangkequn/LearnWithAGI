/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"

import Divider from "@mui/material/Divider";


import { API, Cmd, GetUrl, HGET, RspType } from "../../component/api";
import BuildIcon from '@mui/icons-material/Build';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Context } from "./Context"
import { GlobalContext } from "../_app";
import DeleteIcon from '@mui/icons-material/Delete';
import ListIcon from '@mui/icons-material/List';
import { Jwt } from "../../component/jwt";
export const CheckBoxSVG = (className) => <svg className={className} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="m 3 0 c -1.644531 0 -3 1.355469 -3 3 v 10 c 0 1.644531 1.355469 3 3 3 h 10 c 1.644531 0 3 -1.355469 3 -3 v -10 c 0 -1.644531 -1.355469 -3 -3 -3 z m 0 2 h 10 c 0.570312 0 1 0.429688 1 1 v 10 c 0 0.570312 -0.429688 1 -1 1 h -10 c -0.570312 0 -1 -0.429688 -1 -1 v -10 c 0 -0.570312 0.429688 -1 1 -1 z m 0 0" fill="#2e3434" fill-opacity="0.34902" />
</svg>

export default function QAComponent({ volume }) {
    const { debugMode, setCreditTM } = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const { skillTree, setSkillTree, skillTreeSelected, setSkillTreeSelected, skillMyTrace, setSkillMyTrace, skillSessionNum, SessionName } = useContext(Context)
    //QAs: []struct {	Type     string	Question string	Answers  []string	Shown    int64	Answer   int64	Correct  int64}
    const [QAs, setQAs] = useState([]);
    const [qaIndex, setQAIndex] = useState(-1);
    const topic = () => skillTree?.Name + ":" + skillTree?.Detail
    const AnswersShuffled = (qa) => {
        //calculate hash of qa.question
        let hash = 0;
        for (let i = 0; i < qa.Question.length; i++) {
            hash = ((hash << 5) - hash) + qa.Question.charCodeAt(i);
            hash &= hash; // Convert to 32bit integer
        }
        let beginindex = hash % qa.Answers.length
        let p1 = qa.Answers.slice(beginindex), p2 = qa.Answers.slice(0, beginindex)
        let answers = [...p1, ...p2]
        return answers
    }

    //loadSkillPoint according to skillTreeSelected
    useEffect(() => {
        setQAs([])
        setQAIndex(-1)
        //auto load the first skill point
        if (!SessionName || SessionName.indexOf("undefined") >= 0 || SessionName.indexOf("undefined") >= 0) return
        HGET("SkillQAs", SessionName).then((qas) => !!qas?.length > 0 && setQAs(qas))
    }, [SessionName])

    //join skillMyTrace to string,for faster processing
    const [TraceQAsStr, setTraceQAsStr] = useState("")
    //auto scroll to the first uncompleted question
    useEffect(() => {
        setTraceQAsStr(skillMyTrace[SessionName]?.QAs?.join("") ?? "")
        if (!QAs || QAs.length == 0) return setQAIndex(-1)
        if (qaIndex >= 0) return

        let myTraceQAs = skillMyTrace[SessionName]?.QAs
        let myTraceQAsStr = myTraceQAs?.join("") ?? ""
        for (var i = 0; i < QAs.length; i++) {
            let question = QAs[i].Question, answer = QAs[i].Answer
            if (myTraceQAsStr.indexOf(question + "|||0") >= 0) continue
            return setQAIndex(i)
        }
    }, [QAs, skillMyTrace])

    const AnswerRight = (QA) => {
        if (TraceQAsStr?.indexOf(QA.Question + "|||0") >= 0) return "✅"
        if (TraceQAsStr?.indexOf(QA.Question) >= 0) return "❌"
        return ""
    }
    const AnswerItemRightWrong = (QA, aswItem) => {
        let answered = TraceQAsStr.indexOf(QA.Question) >= 0, correct = TraceQAsStr.indexOf(QA.Question + "|||0") >= 0
        //no answered
        if (!answered) return ""
        //case ansered
        if (correct && QA.Answers[0] == aswItem) return "✅"
        if (!correct && TraceQAsStr.indexOf(QA.Question + "|||" + QA.Answers.indexOf(aswItem)) >= 0) return "❌"
        return ""
    }
    const PlayTTSOgg = (...urls) => {
        //play each audio one by one
        let url = urls[0]
        let audio = new Audio(url)
        //set volume
        audio.volume = isNaN(volume) ? 0.5 : volume
        audio.onended = () => {
            if (urls.length > 1) PlayTTSOgg(...urls.slice(1))
        }
        audio.play()
    }

    return <div key={`QAComponent-${QAs}`} className="flex flex-col justify-start items-start w-full     max-w-[390px] min-w-[20%] pr-1">

        <div key='skill-sub-knowledge-point-title' className="flex flex-row text-black items-center my-2 gap-4 w-full">

            <div key="question-title-box" className={`flex flex-row  w-full flex-grow items-center md:pl-4 border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 
            rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] max-w-2xl self-center h-fit ${loading && "animate-pulse"}`}  >

                {!!debugMode && <div title={"重新开始练习 / reset all practice"} key="reset-practice" className="w-8 h-8 self-center" onClick={() => {
                    API("SkillMyTraceReport", { SkillName: topic(), SessionName: SessionName, Action: "reset-qas" }).then((res) => {
                        let newMySkillTrace = { ...skillMyTrace, [SessionName]: res }
                        setSkillMyTrace(newMySkillTrace)
                    })
                }}>
                    <div ><svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="RestartAltIcon" tabIndex="-1" ><path d="M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6 0 2.97-2.17 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93 0-4.42-3.58-8-8-8zm-6 8c0-1.65.67-3.15 1.76-4.24L6.34 7.34C4.9 8.79 4 10.79 4 13c0 4.08 3.05 7.44 7 7.93v-2.02c-2.83-.48-5-2.94-5-5.91z"></path></svg></div>
                </div>}
                <div className="flex flex-row gap-2 items-center w-full self-center resize-none border-0 bg-transparent  pr-4 focus:ring-0 
                focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0 outline-none ">
                    <div className="text-lg  font-bold">{`练习题:`}</div>
                    <div>  {SessionName}</div>
                </div>
                {debugMode >= 3 && <div className="flex self-center  right-10 md:right-9">
                    <button className={`self-center m-1 rounded-md text-gray-500  hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent right-1 md:right-2`} onClick={e => {
                        !!SessionName && API("SkillQAs", { Name: SessionName, Topic: topic(), Append: true })
                            .then((res) => setQAs(res ?? []))
                    }}>
                        <div title={"申请重建练习列表"} className="mx=1 self-center items-center justify-center w-6 h-6">
                            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AddIcon" tabIndex="-1" title="Add"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        </div>
                    </button>
                </div>}
            </div>

        </div>

        <div key="questions-all-completed-cheers" className=" flex flex-col bg-[#ddba3b]  justify-start items-start rounded-md w-full text-gray-700 text-lg" >
            {QAs?.length > 0 && QAs?.filter(qa => TraceQAsStr.indexOf(qa.Question) < 0).length == 0 && <div className="flex flex-row w-full h-full justify-center items-center font-semibold text-lg text-gray-800  font-sans leading-8 my-4 gap-6  animate-bounce " >
                <div className="flex flex-row w-fit self-center text-[56px]">😄</div>
                <div className="flex flex-row w-fit self-center text-xl">Completed! Nice Job!</div>
            </div>}
        </div>

        <div key="knowledge-point-questions" className="flex flex-row w-full justify-start text-gra-800 gap-5 mt-2 h-full" >
            <div key="current-questions-all" className="flex flex-row justify-start items-start rounded-md w-full  text-gray-800 text-lg min-h-[300px]  max-h-[460px] flex-auto overflow-y-auto flex-wrap" >
                <div key={`activeStep-${qaIndex}`} variant="dots" position="static" className="grid grid-cols-2 gap-4 justify-start rounded-md w-full text-gray-800 text-lg leading-5"
                    sx={{ boxShadow: "5px 5px 10px 0px gold", backgroundColor: "#f9f0d1" }}
                >
                    {QAs?.map((qa, index) => (
                        <div title="注意，每5分钟只能回答一次" key={`OtherQA${qa.Question}-${index}`}
                            className={`group flex flex-row justify-start items-center h-fit rounded-lg text-lg leading-7 text-gray-700 min-w-[200px] w-full flex-grow even:bg-lime-100 odd: bg-amber-100`}
                            onClick={() => setQAIndex(index)} >
                            <div key={`OtherQA${qa.Question}`} className={`p-1 flex flex-row  justify-between w-full  rounded-lg ${qaIndex == index && "font-bold bg-orange-400"}`}                            >
                                <div className="flex flex-row justify-between items-center pr-2 gap-1 w-full">
                                    <div className="rounded ">{AnswerRight(qa)}</div>
                                    <div className="flex flex-row w-full" onClick={() => {
                                        PlayTTSOgg(GetUrl(Cmd.HGET, "TTSOggQA", qa.Question, RspType.ogg))
                                    }}
                                    >{qa.Question}</div>
                                    <div className="flex-row w-min gap-1 self-end hidden group-hover:flex group-hover:visible">
                                        <div title="复制到剪贴板" >
                                            <ContentCopyIcon onClick={() => { navigator.clipboard.writeText(qa.Question) }}></ContentCopyIcon>
                                        </div>
                                        {debugMode >= 3 && (
                                            <div title="删除该条目" >
                                                <DeleteIcon onClick={() => {
                                                    API("SkillQAs", { Name: SessionName, Topic: topic(), DeleteQ: `${qa.Question}` })
                                                        .then((res) => setQAs(res ?? []))
                                                }}></DeleteIcon>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Dots stepper, current index is {QAIndex}, length is {QAS.length} */}
                {/* <Stepper activeStep={qaIndex} orientation="vertical" variant="dots" position="static"
                    className=" w-full flex flex-col justify-between rounded-md h-full  text-gray-800 text-lg leading-5 overflow-y-hidden bg-slate-300"
                    sx={{ boxShadow: "5px 5px 10px 0px gold", backgroundColor: "#f9f0d1" }} >
                    {QAs?.map((qa, index) => {
                        return <Step key={`OtherQA${qa.Question}`} className="flex flex-row justify-start items-center w-full h-10 text-lg text-gray-700 "
                            sx={{ boxShadow: index == qaIndex ? "inset 0px 0px 0px 200px gold" : "none", marginTop: index == 0 ? 0 : "-22px" }}
                            onClick={() => setQAIndex(index)} >
                            <StepLabel key={`OtherQA${qa.Question}`} className="flex flex-row w-full justify-between">
                                <div className="flex flex-row w-full justify-between pr-2">
                                    <div>{qa.Question}</div>
                                    <div className="flex flex-row w-min gap-1 items-center">
                                        {qaIndex == index && <ContentCopyIcon onClick={() => { navigator.clipboard.writeText(qa.Question) }}></ContentCopyIcon>}
                                        <div>{AnserRight(qa)}</div>
                                    </div>
                                </div>
                            </StepLabel>
                        </Step>
                    })}
                </Stepper> */}
            </div>



        </div>

        {/* 主题下相关的问题 */}
        <Divider sx={{ width: 280, m: 0.5 }} orientation="horizontal" />

        {
            !!QAs[qaIndex] && <div key="knowledge-point-answers" className="flex flex-col justify-start w-full items-start" >
                <div variant="h4" className="flex flex-row justify-between font-semibold text-lg text-gray-800  font-sans leading-8 my-2 w-full " >
                    <div>回答正确的是: </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                        {/* button with text 上一题, with color light-blue like alipay */}
                        <button className="flex flex-row justify-start items-center gap-2 bg-blue-500 text-white rounded-md px-2 py-1 " onClick={() => {
                            if (qaIndex - 1 >= 0) setQAIndex(qaIndex - 1)
                        }}>
                            上一题
                        </button>
                        <div className="flex flex-row justify-start items-center gap-2 bg-blue-500 text-white rounded-md px-2 py-1 " onClick={() => {
                            if (qaIndex + 1 < QAs.length) setQAIndex(qaIndex + 1)
                        }}>
                            下一题
                        </div>
                    </div>
                </div>
                <div key={`QA-answers-${qaIndex}`} className=" flex flex-row flex-wrap justify-center items-center w-full  max-w-screen-sm min-w-min gap-3  " style={{ boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.20)" }}>
                    {AnswersShuffled(QAs[qaIndex]).map((a, i) => <div key={`answer-item${a}-${i}`}
                        className={`flex flex-row items-center justify-center rounded text-gray-800  w-[48%] p-2
                        ${AnswerItemRightWrong(QAs[qaIndex], a) == "✅" ? " text-lg w-5/12 bg-green-200 font-bold min-h-max  py-4" : " text-base w-4/12 bg-orange-200 min-h-min"}`}
                        //response of  answer action
                        onClick={() => {
                            let answerIndex = QAs[qaIndex]?.Answers?.indexOf(a)
                            if (answerIndex === undefined) return
                            var wrongSound = [GetUrl(Cmd.HGET, "TTSOggQA", a, RspType.ogg), "/negative_beeps-6008.mp3", GetUrl(Cmd.HGET, "TTSOggQA", QAs[qaIndex]?.Why, RspType.ogg)]
                            var rightSound = [GetUrl(Cmd.HGET, "TTSOggQA", a, RspType.ogg), "/DingSoundEffect.ogg"]
                            QAs[qaIndex]?.Answers[0] === a ? PlayTTSOgg(...rightSound) : PlayTTSOgg(...wrongSound)

                            //	Name    string	Answer  int32	Ask     int32
                            API("SkillMyTraceReport", { SkillName: topic(), SessionName: SessionName, QA: QAs[qaIndex].Question + "|||" + answerIndex }).then((res) => {
                                //update creditTM to refresh rewards
                                setCreditTM(new Date().getTime())
                                let newMySkillTrace = { ...skillMyTrace, [SessionName]: res }
                                setSkillMyTrace(newMySkillTrace)
                            })
                        }}>
                        {AnswerItemRightWrong(QAs[qaIndex], a)} {a}
                    </div>)
                    }
                </div>
                <div>
                    {TraceQAsStr?.indexOf(QAs[qaIndex].Question) >= 0 && QAs[qaIndex]?.Why}
                </div>
            </div>
        }

    </div >
}