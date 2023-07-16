/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"

import Divider from "@mui/material/Divider";


import { API, HGET } from "../../component/api";
import BuildIcon from '@mui/icons-material/Build';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Context } from "./Context"
import { GlobalContext } from "../_app";
import DeleteIcon from '@mui/icons-material/Delete';

export default function QAComponent({ topic }) {
    const { setCreditTM } = useContext(GlobalContext)
    const [QANum, setQANum] = useState(5)
    const [loading, setLoading] = useState(false)
    const { skillTree, setSkillTree, skillTreeSelected, setSkillTreeSelected, skillMyTrace, setSkillMyTrace, skillPoint, setSkillPoint } = useContext(Context)
    //QAs: []struct {	Type     string	Question string	Answers  []string	Shown    int64	Answer   int64	Correct  int64}
    const [QAs, setQAs] = useState([]);
    const [qaIndex, setQAIndex] = useState(-1);
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
    const FullName = () => `${skillPoint?.Name}:${skillPoint?.Detail}`

    //loadSkillPoint according to skillTreeSelected
    const LoadSkillQAs = (Name, topic, useCallback) => API("SkillQAs", { Name: Name, Topic: topic }).then((qas) => useCallback && !!qas?.length > 0 && (Name === FullName()) && setQAs(qas))
    useEffect(() => {
        setQAs([])
        setQAIndex(-1)
        //auto load the first skill point
        let Name = FullName()
        if (!Name || Name.indexOf("undefined") >= 0 || Name.indexOf("undefined") >= 0) return
        LoadSkillQAs(Name, topic, true)
    }, [skillPoint])

    //join skillMyTrace to string,for faster processing
    const [TraceQAsStr, setTraceQAsStr] = useState("")
    //auto scroll to the first uncompleted question
    useEffect(() => {
        setTraceQAsStr(skillMyTrace[FullName()]?.QAs?.join("") ?? "")
        if (!QAs || QAs.length == 0) return setQAIndex(-1)
        if (qaIndex >= 0) return

        let myTraceQAs = skillMyTrace[FullName()]?.QAs
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
        return "⬜"
    }
    const AnswerItemRightWrong = (QA, aswItem) => {
        let answered = TraceQAsStr.indexOf(QA.Question) >= 0, correct = TraceQAsStr.indexOf(QA.Question + "|||0") >= 0
        //no answered
        if (!answered) return "⬜"
        //case ansered
        if (correct && QA.Answers[0] == aswItem) return "✅"
        if (!correct && TraceQAsStr.indexOf(QA.Question + "|||" + QA.Answers.indexOf(aswItem)) >= 0) return "❌"
        return "⬜"
    }

    return <div key={`QAComponent-${QAs}`} className="flex flex-col justify-start items-start w-full   overflow-scroll  max-w-[40%] min-w-[20%] pr-1">

        <div key='skill-sub-knowledge-point-title' className="flex flex-row text-black items-center my-2 gap-3 w-full">

            <div key="question-title-box" className={`flex flex-row w-full flex-grow items-center md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 
            rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] max-w-2xl self-center h-10  ${loading && "animate-pulse"}`}  >
                <div key="reset-practice" className="w-8 h-8 self-center" onClick={() => {
                    API("SkillMyTraceReport", { Name: FullName(), Action: "reset-qas" }).then((res) => {
                        let newMySkillTrace = { ...skillMyTrace, [FullName()]: res }
                        setSkillMyTrace(newMySkillTrace)
                    })
                }}>
                    <div title="reset all practice" ><svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="RestartAltIcon" tabIndex="-1" ><path d="M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6 0 2.97-2.17 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93 0-4.42-3.58-8-8-8zm-6 8c0-1.65.67-3.15 1.76-4.24L6.34 7.34C4.9 8.79 4 10.79 4 13c0 4.08 3.05 7.44 7 7.93v-2.02c-2.83-.48-5-2.94-5-5.91z"></path></svg></div>
                </div>

                <textarea className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0 outline-none "
                    //style="max-height: 200px; height: 24px; overflow-y: hidden;"
                    //    style={{ boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.25)", maxHeight: 200, height: 24, overflowY: "hidden" }}
                    style={{ maxHeight: 200, height: 24, overflowY: "hidden" }}
                    value={`问答练习：${FullName()}`}
                    //placeholder={FullName()}
                    onChange={(e) => {
                        setQuestion(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.keyCode !== 13) return
                        //if not empty
                        let Question = e.target.value
                        if (!Question) return
                        OnSubmitQuestion(Question)
                        // stop propagation
                        e.preventDefault()
                    }}
                    disabled={true}
                />
                <div className="flex self-center absolute  right-10 md:right-9">
                    {/* select how many questions to ask */}
                    <select className="bg-transparent border-0 text-gray-500 dark:text-gray-400 dark:bg-gray-900 dark:border-gray-900 dark:hover:text-gray-400 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent dark:disabled:hover:text-gray-400 hover:bg-gray-100 rounded-md p-1" disabled={loading} value={QANum}
                        onChange={(e) => {
                            setQANum(e.target.value)
                        }} >
                        {
                            // options betwenn 1 to 100, default 10 
                            [...Array(10).keys()].map((i) => <option key={`option-${i}`} value={(i + 1) * 5}>{(i + 1) * 5}题</option>)

                        }
                    </select>
                </div>
                <button className={`self-center absolute m-1 rounded-md text-gray-500  hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent right-1 md:right-2`} onClick={e => {
                    !!FullName() && API("SkillQAs", { Name: FullName(), Topic: topic, Action: "append", "QANum": parseInt(QANum) })
                        .then((res) => setQAs(res ?? []))
                }}>
                    <div title={"申请重建练习列表"} className="mx=1 self-center items-center justify-center w-6 h-6">
                        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AddIcon" tabIndex="-1" title="Add"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                    </div>

                </button>
            </div>

        </div>

        <div key="questions-all-completed-cheers" className=" flex flex-col bg-[#ddba3b]  justify-start items-start rounded-md w-full text-gray-700 text-lg" >
            {QAs?.length > 0 && QAs?.filter(qa => TraceQAsStr.indexOf(qa.Question) < 0).length == 0 && <div className="flex flex-row w-full h-full justify-center items-center font-semibold text-lg text-gray-800  font-sans leading-8 my-4 gap-6  animate-bounce " >
                <div className="flex flex-row w-fit self-center text-[56px]">😄</div>
                <div className="flex flex-row w-fit self-center text-xl">Completed! Nice Job!</div>
            </div>}
        </div>

        <div key="knowledge-point-questions" className="flex flex-row w-full justify-start text-gra-800 gap-5 mt-2"        >
            <div key="current-questions-all" className="flex flex-row justify-start items-start rounded-md w-full  text-gray-800 text-lg min-h-[300px]  max-h-[460px] flex-auto overflow-x-auto flex-wrap" >
                <div key={`activeStep-${qaIndex}`} variant="dots" position="static"
                    className=" flex flex-col justify-start rounded-md w-full  text-gray-800 text-lg leading-5  flex-wrap gap-2"
                    sx={{ boxShadow: "5px 5px 10px 0px gold", backgroundColor: "#f9f0d1" }} >
                    {QAs?.map((qa, index) => <div title="注意，每5分钟只能回答一次" key={`OtherQA${qa.Question}`}
                        className={`group flex flex-row justify-start items-center h-fit rounded-lg text-lg leading-7 text-gray-700 max-w-[48%] min-w-[200px] w-full flex-grow  even:bg-lime-100 odd: bg-amber-100`}
                        onClick={() => setQAIndex(index)} >
                        <div key={`OtherQA${qa.Question}`} className={`p-1 flex flex-row  justify-between w-full  rounded-lg ${qaIndex == index && "font-bold bg-orange-400"}`}>
                            <div className=" flex flex-row justify-between items-center pr-2 gap-1  w-full">
                                <div className="rounded ">{AnswerRight(qa)}</div>
                                <div className="flex flex-row w-full">{qa.Question}</div>
                                <div className="flex flex-row w-min gap-1 self-end invisible group-hover:visible">
                                    <div title="复制到剪贴板" > <ContentCopyIcon onClick={() => { navigator.clipboard.writeText(qa.Question) }}></ContentCopyIcon></div>
                                    <div title="删除该条目" > <DeleteIcon onClick={() => {
                                        API("SkillQAs", { Name: FullName(), Topic: topic, Action: `deleteItem:${qa.Question}` })
                                            .then((res) => setQAs(res ?? []))
                                    }}></DeleteIcon></div>

                                </div>
                            </div>
                        </div>
                    </div>
                    )}
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
            !!QAs[qaIndex] && <div key="knowledge-point-answers" className="flex flex-col justify-start w-full items-start]" >
                <div variant="h4" className=" font-semibold text-lg text-gray-800  font-sans leading-8 my-2 " >
                    回答正确的是:
                </div>
                <div key={`QA-answers-${qaIndex}`} className=" flex flex-row flex-wrap justify-center items-center w-full overflow-scroll  max-w-screen-sm min-w-min gap-3  " >
                    {AnswersShuffled(QAs[qaIndex]).map((a, i) => <div key={`answer-item${a}-${i}`}
                        className={`flex flex-row items-center justify-center rounded text-gray-800  w-[48%] p-2
                        ${AnswerItemRightWrong(QAs[qaIndex], a) == "✅" ? " text-lg w-5/12 bg-green-200 font-bold min-h-max  py-4" : " text-base w-4/12 bg-orange-200 min-h-min"}`}
                        //response of  answer action
                        onClick={() => {
                            let answerIndex = QAs[qaIndex]?.Answers?.indexOf(a)
                            if (answerIndex === undefined) return

                            //	Name    string	Answer  int32	Ask     int32
                            API("SkillMyTraceReport", { Name: FullName(), QA: QAs[qaIndex].Question + "|||" + answerIndex }).then((res) => {
                                //update creditTM to refresh rewards
                                setCreditTM(new Date().getTime())
                                let newMySkillTrace = { ...skillMyTrace, [FullName()]: res }
                                setSkillMyTrace(newMySkillTrace)
                                if (qaIndex + 1 < QAs.length) setQAIndex(qaIndex + 1)
                            })
                        }}>
                        {AnswerItemRightWrong(QAs[qaIndex], a)} {a}
                    </div>)
                    }
                </div>
            </div>
        }

    </div >
}