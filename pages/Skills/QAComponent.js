/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import { Container, Divider, IconButton, InputAdornment, List, ListItem, MobileStepper, Paper, Popover, Slider, Stack, Step, StepLabel, Stepper, TextField, Typography, } from "@mui/material";

import { Box } from "@mui/system";
import { API, HGET } from "../../component/api";

export const QAComponent = ({ SkillPoint, setCreditTM }) => {
    const [QAIndex, setQAIndex] = useState(-1);
    const [skillPathReport, setSkillPathReport] = useState(null);

    const selectedCss = {
        display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", width: "42%", fontSize: 20, color: "#333",
        //text in center
        alignItems: "center", justifyContent: "center",
        //height should be content height * 2
        minHeight: 80,

        //set background color to conspicuous gold green
        backgroundColor: "#d2f9d1", borderRadius: 2, fontWeight: "bold"
        //shadow effect
        , boxShadow: "5px 5px 10px 0px gold"
    }
    const unSelectedCss = {
        display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", width: "29%", minHeight: 40, fontSize: 18, color: "#333",
        //text in center
        alignItems: "center", justifyContent: "center",
        //align self in top
        alignSelf: "flex-start",
        //set background color to dim yellow
        backgroundColor: "#f9f0d1", borderRadius: 2,
    }
    const [SelectedAnswer, setSelectedAnswer] = useState(0)
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
                display: "flex", flexDirection: "column", height: "100%", width: "55%", justifyContent: "flex-start", alignItems: "flex-start"
                //font color black
                , color: "#333", width: "400px", backgroundColor: "#f9f0d1", minHeight: "150px"
                , borderRadius: "6px", boxShadow: "5px 5px 10px 0px gold"
                //, position: "relative"
            }} className="fadeInOutLessNoticeable">

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
                        return <Step key={`OtherQA${qa.Question}`}
                            sx={{
                                display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", width: "100%", height: 40, fontSize: 18, color: "#333"
                                , boxShadow: index == QAIndex ? "inset 0px 0px 0px 200px gold" : "none"
                                , marginTop: index == 0 ? 0 : "-22px"
                            }}
                            onClick={() => {
                                setQAIndex(index)
                            }} >
                            <StepLabel key={`OtherQA${qa.Question}`} noWrap={true} sx={{
                            }}
                            >
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
            <Box sx={{
                display: "flex", flexDirection: "row", width: "100%", justifyContent: "flex-start", gap: 0.5,
                //lies in the center of the parent
                alignItems: "center", justifyContent: "center"
            }} >
                {
                    QAIndex >= 0 && SkillPoint.QAs.length > QAIndex && AnswersShuffled(SkillPoint.QAs[QAIndex]).map((a, i) => <ListItem sx={i == SelectedAnswer ? selectedCss : (!!a.answer ? SelectedAnswer : unSelectedCss)}
                        key={a} onClick={() => { Answer(a) }}>
                        {RightWrong(SkillPoint.QAs[QAIndex], a)}{a}
                    </ListItem>)
                }
            </Box>
        </Box>

    </Box >
}