/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import { Container, Divider, IconButton, InputAdornment, List, ListItem, MobileStepper, Paper, Popover, Slider, Stack, Step, StepLabel, Stepper, TextField, Tooltip, Typography, } from "@mui/material";

import { Box } from "@mui/system";
import { API, HGET } from "../../component/api";
import BuildIcon from '@mui/icons-material/Build';

export const QAComponent = ({ skillPoint, skillMyTrace, setSkillMyTrace, setCreditTM, topic }) => {
    //QAs: []struct {	Type     string	Question string	Answers  []string	Shown    int64	Answer   int64	Correct  int64}
    const [QAs, setQAs] = useState([]);
    const [QAIndex, setQAIndex] = useState(-1);
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
    const LoadSkillQAs = (name, topic, useCallback) => API("SkillQAs", { Name: name, Topic: topic }).then((qas) => useCallback && !!qas?.length > 0 && setQAs(qas))
    useEffect(() => {
        setQAs([])
        setQAIndex(-1)
        //auto load the first skill point
        LoadSkillQAs(FullName(), topic, true)
    }, [skillPoint])

    //join skillMyTrace to string,for faster processing
    const [TraceQAsStr, setTraceQAsStr] = useState("")
    //scroll to the first uncompleted question
    useEffect(() => {
        setTraceQAsStr(skillMyTrace[FullName()]?.QAs?.join("") ?? "")
        if (!QAs || QAs.length == 0 || QAIndex >= 0) return setQAIndex(-1)

        let myTraceQAs = skillMyTrace[FullName()]?.QAs
        let myTraceQAsStr = myTraceQAs?.join("") ?? ""
        for (var i = 0; i < QAs.length; i++) {
            let question = QAs[i].Question, answer = QAs[i].Answer
            if (myTraceQAsStr.indexOf(question + "|||0") >= 0) continue
            return setQAIndex(i)
        }
    }, [QAs, skillMyTrace])

    const AnserRight = (QA) => {
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
    return <div key={`QAComponent-${QAs}`} className="flex flex-col justify-between items-start w-full ">

        <div key='skill-sub-knowledge-point-title' className="flex flex-row text-black items-center my-2 gap-3">
            <div className=" text-lg font-sans font-semibold " > 当前主题 </div>
            <div>{FullName()}  </div>
        </div>

        <div key="knowledge-point-questions" className="flex flex-row h-full w-full justify-start text-gra-800 gap-5"        >

            {/* 当前问题 */}
            {QAs?.filter(qa => TraceQAsStr.indexOf(qa.Question) < 0).length == 0 && <Box sx={{ backgroundColor: "#f9f0d1", boxShadow: "5px 5px 10px 0px gold" }}
                className=" flex flex-col h-full justify-start items-start rounded-md min-h-36 w-96 text-gray-700 text-lg" >
                <div className=" font-semibold text-lg text-gray-800  font-sans leading-8 my-4 " > ^_^ 所有题目均已回答. </div>
            </Box>
            }

            {/* 已经回答的题目 */}
            <div className="flex flex-row justify-start items-start rounded-md min-h-36 max-h-100 w-full text-gray-800 text-lg overflow-y-hidden bg-slate-300" >
                {/* Dots stepper, current index is {QAIndex}, length is {QAS.length} */}
                <Stepper activeStep={QAIndex} orientation="vertical" variant="dots" position="static"
                    className=" w-full flex flex-col justify-between rounded-md h-full  text-gray-800 text-lg leading-5 overflow-y-hidden bg-slate-300"
                    sx={{ boxShadow: "5px 5px 10px 0px gold", backgroundColor: "#f9f0d1" }} >
                    {QAs?.map((qa, index) => {
                        return <Step key={`OtherQA${qa.Question}`} className="flex flex-row justify-start items-center w-full h-10 text-lg text-gray-700 "
                            sx={{ boxShadow: index == QAIndex ? "inset 0px 0px 0px 200px gold" : "none", marginTop: index == 0 ? 0 : "-22px" }}
                            onClick={() => setQAIndex(index)} >
                            <StepLabel key={`OtherQA${qa.Question}`} className="flex flex-row w-full justify-between">
                                <div className="flex flex-row w-full justify-between pr-2">
                                    <div>{qa.Question}</div>
                                    <div>{AnserRight(qa)}</div>
                                </div>
                            </StepLabel>
                        </Step>
                    })}
                </Stepper>
            </div>
            <div onClick={() => {
                !!FullName() && API("SkillQAs", { Name: FullName(), Topic: topic, Rebuild: true })
                    .then((res) => !!res && setSkillQAs({ Name: FullName(), QAs: res }))
            }} className="pr-1">
                <Tooltip title={"修复问答列表"} placement="left" className="h-full self-center items-center justify-center"><BuildIcon></BuildIcon></Tooltip>
            </div>


        </div>

        {/* 主题下相关的问题 */}
        <Divider sx={{ width: 280, m: 0.5 }} orientation="horizontal" />

        <div key="knowledge-point-answers" className="flex flex-col justify-start items-start w-full" >
            <div variant="h4" className=" font-semibold text-lg text-gray-800  font-sans leading-8 my-2 " >
                以下哪个回答是正确的:
            </div>
            <div className=" flex flex-row flex-wrap justify-center items-center w-full overflow-scroll  max-w-screen-sm min-w-min gap-3" >
                {
                    QAIndex >= 0 && QAIndex < QAs?.length && AnswersShuffled(QAs[QAIndex]).map((a, i) => <ListItem key={`answer-item${a}-${i}`}
                        className={`flex flex-row items-center justify-center rounded text-gray-800 
                        ${AnswerItemRightWrong(QAs[QAIndex], a) == "✅" ? " text-lg w-5/12 bg-green-200 font-bold min-h-max  py-4" : " text-base w-4/12 bg-orange-200 min-h-min"}`}
                        //response of  answer action
                        onClick={() => {
                            let answerIndex = QAs[QAIndex]?.Answers?.indexOf(a)
                            if (answerIndex === undefined) return

                            //	Name    string	Answer  int32	Ask     int32
                            API("SkillMyTraceReport", { Name: FullName(), QA: QAs[QAIndex].Question + "|||" + answerIndex }).then((res) => {
                                //update creditTM to refresh rewards
                                setCreditTM(new Date().getTime())
                                let newMySkillTrace = { ...skillMyTrace, [FullName()]: res }
                                setSkillMyTrace(newMySkillTrace)
                                if (QAIndex + 1 < QAs.length) setQAIndex(QAIndex + 1)
                            })
                        }}>
                        {AnswerItemRightWrong(QAs[QAIndex], a)} {a}
                    </ListItem>)
                }
            </div>
        </div>

    </div >
}