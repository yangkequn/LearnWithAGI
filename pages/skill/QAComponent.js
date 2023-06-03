/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import { Container, Divider, IconButton, InputAdornment, List, ListItem, MobileStepper, Paper, Popover, Slider, Stack, Step, StepLabel, Stepper, TextField, Typography, } from "@mui/material";

import { Box } from "@mui/system";
import { API, HGET } from "../../component/api";

export const QAComponent = ({ SkillPoint, setCreditTM }) => {
    const [QAIndex, setQAIndex] = useState(-1);
    const [refresh, setRefresh] = useState(1)
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
    useEffect(() => {
        if (!SkillPoint || !SkillPoint.QAs || SkillPoint.QAs.length == 0) {
            setQAIndex(-1)
            return
        }

        if (!!SkillPoint.Name && SkillPoint.Name.length > 0) setQAIndex(0)
        //for each QAS, choose elements not completed
        let uncompleted = SkillPoint.QAs.filter(qa => !qa.answer)
        if (!uncompleted.length) return

        //set the index to the first uncompleted one
        setQAIndex(SkillPoint.QAs.indexOf(uncompleted[0]))
    }, [SkillPoint])
    const [skillPath, setSkillPath] = useState(null)

    useEffect(() => {
        if (!skillPath || !skillPath.QAs || skillPath.QAs.length == 0) return
        if (!SkillPoint || !SkillPoint.QAs || SkillPoint.QAs.length == 0) return
        if (SkillPoint.Name != skillPath.Name) return
        //merge answers
        for (var i = 0; i < skillPath.QAs.length; i += 2) {
            var q = skillPath.QAs[i], a = skillPath.QAs[i + 1]
            if (!q || !a) continue
            if (!!SkillPoint && SkillPoint.QAs) {
                var qa = SkillPoint.QAs.find(qa => qa.Question == q)
                if (!qa) continue
                let indexAnswer = parseInt(a)
                qa.answer = qa.Answers[indexAnswer]
                qa.correct = a == "0"
            }
        }
        setRefresh(refresh + 1)
    }, [skillPath])

    useEffect(() => {
        if (!SkillPoint || !SkillPoint.Name) return
        //don't reload if the skillpath is already loaded
        if (!!skillPath && skillPath.Name == SkillPoint.Name) return
        HGET("SkillPath:@id", SkillPoint.Name).then((p) => setSkillPath(p))
    }, [SkillPoint])
    const RightWrong = (QA, a) => {
        if (!QA || !QA.answer) return ""
        if (QA.correct && a === QA.Answers[0]) return "✅"
        if (!QA.correct && QA.answer === a) return "❌"
    }
    const Answer = (a) => {
        if (!SkillPoint || !SkillPoint.QAs || QAIndex > SkillPoint.QAs.length || SkillPoint.QAs[QAIndex].correct) return

        SkillPoint.QAs[QAIndex].answer = a
        let answerIndex = SkillPoint.QAs[QAIndex].Answers.indexOf(a)
        SkillPoint.QAs[QAIndex].correct = answerIndex == 0
        //	Name    string	Answer  int32	Ask     int32
        API("SkillPathReport", { Name: SkillPoint.Name, QA: [SkillPoint.QAs[QAIndex].Question, answerIndex.toString()] }).then((res) => {
            setRefresh(refresh + 1)
            //update creditTM to refresh rewards
            setCreditTM(new Date().getTime())
        })

        //for each QAS, choose elements not completed
        let uncompleted = SkillPoint.QAs.filter(qa => !qa.answer)
        if (uncompleted.length > 0) {
            //set the index to the first uncompleted one
            setQAIndex(SkillPoint.QAs.indexOf(uncompleted[0]))
        }

    }

    return <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }} key={`QAComponent-${refresh}`}>

        <Box sx={{
            display: "flex", flexDirection: "row", color: "black"
            //texts in middle
            , alignItems: "center"

        }}>
            <Typography variant="h4" sx={{ fontWeight: 600, fontSize: 18, fontFamily: "Roboto, Arial, sans-serif", margin: "10px 10px 10px 0" }}>
                当前主题
            </Typography>

            <Typography>{SkillPoint.Name}  </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", height: "100%", width: "100%", justifyContent: "flex-start", color: "#222", gap: "20px" }}>

            {/* 当前问题 */}
            {!!SkillPoint.QAs && SkillPoint.QAs.length > 0 && SkillPoint.QAs.filter(qa => !qa.answer).length == 0 && <Box sx={{
                 backgroundColor: "#f9f0d1", boxShadow: "5px 5px 10px 0px gold"
                //, position: "relative"
            }} className=" flex flex-col h-full justify-start items-start rounded-md min-h-36 w-96 text-gray-700" >

                <Typography variant="h4" sx={{ fontWeight: 600, fontSize: 18, color: "#333", fontFamily: "Roboto, Arial, sans-serif", lineHeight: "32px", margin: "16px 0px" }}>
                    {"^_^ 所有题目均已回答. 点击左侧主題"}
                </Typography>
            </Box>
            }

            {/* 已经回答的题目 */}
            <Box sx={{
                width: "100%", height: 250, bgcolor: '#bbb', overflowY: "hidden", borderRadius: "6px"
                //nowrap
                , flexWrap: "nowrap", borderRadius: "6px"
            }}>
                {/* Dots stepper, current index is {QAIndex}, length is {QAS.length} */}
                <Stepper activeStep={QAIndex} orientation="vertical"
                    variant="dots"
                    position="static"
                    sx={{
                        width: "100%", backgroundColor: "#f9f0d1", boxShadow: "5px 5px 10px 0px gold"
                        //space-between
                        , justifyContent: "space-between"
                        , height: "10px"
                    }}
                >
                    {SkillPoint.QAs.map((qa, index) => {
                        return <Step key={`OtherQA${qa.Question}`} className="flex flex-row justify-start items-center w-full h-10 text-lg text-gray-700 "
                            sx={{ boxShadow: index == QAIndex ? "inset 0px 0px 0px 200px gold" : "none", marginTop: index == 0 ? 0 : "-22px" }}
                            onClick={() => {
                                setQAIndex(index)
                            }} >
                            <StepLabel key={`OtherQA${qa.Question}`} noWrap={true} >
                                {!qa.answer ? "" : (!!qa.correct ? "✅" : "❌")} {qa.Question}
                            </StepLabel>
                        </Step>
                    })}
                </Stepper>
            </Box>


        </Box>

        {/* 主题下相关的问题 */}




        <Divider sx={{ width: 280, m: 0.5 }} orientation="horizontal" />

        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "flex-start" }}>
            <Typography variant="h4" sx={{ fontWeight: 600, fontSize: 18, color: "#333", fontFamily: "Roboto, Arial, sans-serif", lineHeight: "32px", margin: "16px 0px" }}>
                以下哪个回答是正确的:
            </Typography>
            <div className=" flex flex-row flex-wrap justify-center items-center w-full overflow-scroll  max-w-screen-sm min-w-min gap-2" >
                {
                    QAIndex >= 0 && SkillPoint.QAs.length > QAIndex && AnswersShuffled(SkillPoint.QAs[QAIndex]).map((a, i) => <ListItem key={`answer-item${a}`}
                        className={`flex flex-row items-center justify-center rounded text-gray-800 
                        ${SkillPoint.QAs[QAIndex].answer == a ? " text-lg w-5/12 bg-green-200 font-bold min-h-max  py-4" : " text-base w-4/12 bg-orange-200 min-h-min"}`}

                        onClick={() => { Answer(a) }}>
                        {RightWrong(SkillPoint.QAs[QAIndex], a)}{a}
                    </ListItem>)
                }
            </div>
        </Box>

    </Box >
}