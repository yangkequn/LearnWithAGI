/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import { Container, Divider, IconButton, InputAdornment, List, ListItem, MobileStepper, Paper, Popover, Slider, Stack, Step, StepLabel, Stepper, TextField, Tooltip, Typography, } from "@mui/material";

import { Box } from "@mui/system";
import { API, HGET } from "../../component/api";
import BuildIcon from '@mui/icons-material/Build';

export const QAComponent = ({ SkillPaths, setSkillPaths, skillPathSelected, setCreditTM, topic }) => {

    const [skillQAs, setSkillQAs] = useState({ Name: "", QAs: [] });
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


    const LoadSkillQAs = (name, topic, callback) => API("SkillQAs", { Name: name, Topic: topic }).then(callback)
    const LoadSkillQAsCallback = (skillQAs) => {
        if (!skillQAs || !SkillPaths || skillPathSelected < 0) return
        let skillPath = SkillPaths[skillPathSelected]
        //inorder to display the answers, we need to load the answers history from skillPath.
        for (var i = 0; i < skillPath.QAs?.length; i += 2) {
            var q = skillPath.QAs[i], a = skillPath.QAs[i + 1]
            if (!q || !a) continue
            var qa = skillQAs.find(qa => qa.Question == q)
            if (!qa) continue
            let indexAnswer = parseInt(a)
            qa.answer = qa.Answers[indexAnswer]
            qa.correct = a == "0"
        }
        setSkillQAs({ Name: skillPath.Name, QAs: skillQAs })
    }

    //loadSkillPoint according to skillPathSelected
    useEffect(() => {
        if (skillPathSelected < 0) return

        //auto load the first skill point
        if (skillPathSelected < SkillPaths.length) {
            let skillPath = SkillPaths[skillPathSelected]
            let p = skillPath.Path, root_topic = p[p.length - 1]
            LoadSkillQAs(p[0], root_topic, LoadSkillQAsCallback)
        }
        //preload next skill point
        if (false && skillPathSelected + 1 < SkillPaths.length) {
            let p = SkillPaths[skillPathSelected + 1].Path
            let root_topic = p[p.length - 1]
            LoadSkillQAs(p[0], root_topic, (res) => null)

        }
    }, [skillPathSelected])

    //scroll to the first uncompleted question
    useEffect(() => {
        if (!skillQAs || !skillQAs.QAs || skillQAs.QAs.length == 0) {
            setQAIndex(-1)
            return
        }

        if (!!skillQAs.Name && skillQAs.Name.length > 0) setQAIndex(0)
        //for each QAS, choose elements not completed
        let uncompleted = skillQAs.QAs.filter(qa => !qa.answer)
        if (!uncompleted.length) return

        //set the index to the first uncompleted one
        setQAIndex(skillQAs.QAs.indexOf(uncompleted[0]))
    }, [skillQAs])


    const RightWrong = (QA, a) => {
        if (!QA || !QA.answer) return ""
        if (QA.correct && a === QA.Answers[0]) return "✅"
        if (!QA.correct && QA.answer === a) return "❌"
    }
    const Answer = (a) => {
        if (!skillQAs || !skillQAs.QAs || QAIndex > skillQAs.QAs.length || skillQAs.QAs[QAIndex].correct) return

        skillQAs.QAs[QAIndex].answer = a
        let answerIndex = skillQAs.QAs[QAIndex].Answers.indexOf(a)
        skillQAs.QAs[QAIndex].correct = answerIndex == 0
        //	Name    string	Answer  int32	Ask     int32
        API("SkillPathReport", { Name: skillQAs.Name, QA: [skillQAs.QAs[QAIndex].Question, answerIndex.toString()] }).then((res) => {
            setRefresh(refresh + 1)
            //update creditTM to refresh rewards
            setCreditTM(new Date().getTime())
        })

        //for each QAS, choose elements not completed
        let uncompleted = skillQAs.QAs.filter(qa => !qa.answer)
        if (uncompleted.length > 0) {
            //set the index to the first uncompleted one
            setQAIndex(skillQAs.QAs.indexOf(uncompleted[0]))
        }

        //update SkillPaths using setSkillPaths
        setSkillPaths(SkillPaths.map((skillPath) => {
            if (skillPath.Path[0] == skillQAs.Name) {
                skillPath.Answer++
                if (skillQAs.QAs[QAIndex].correct) skillPath.Correct++
            }
            return skillPath
        }))

    }

    const IsValidSkillPoint = () => !!SkillPaths && skillPathSelected >= 0 && skillPathSelected < SkillPaths.length
    return <div key={`QAComponent-${refresh}`} className="flex flex-col justify-between items-start w-full ">

        <div key='skill-sub-knowledge-point-title' className="flex flex-row text-black items-center my-2 gap-3">
            <div className=" text-lg font-sans font-semibold " > 当前主题 </div>
            <div>{skillQAs.Name}  </div>
        </div>

        <div key="knowledge-point-questions" className="flex flex-row h-full w-full justify-start text-gra-800 gap-5"        >

            {/* 当前问题 */}
            {skillQAs?.QAs?.filter(qa => !qa.answer).length == 0 && <Box sx={{ backgroundColor: "#f9f0d1", boxShadow: "5px 5px 10px 0px gold" }}
                className=" flex flex-col h-full justify-start items-start rounded-md min-h-36 w-96 text-gray-700 text-lg" >
                <Typography variant="h4" sx={{ fontWeight: 600, fontSize: 18, color: "#333", fontFamily: "Roboto, Arial, sans-serif", lineHeight: "32px", margin: "16px 0px" }}>
                    {"^_^ 所有题目均已回答. 点击左侧主題"}
                </Typography>
            </Box>
            }

            {/* 已经回答的题目 */}
            <div className="flex flex-row justify-start items-start rounded-md min-h-36 max-h-100 w-full text-gray-800 text-lg overflow-y-hidden bg-slate-300" >
                {/* Dots stepper, current index is {QAIndex}, length is {QAS.length} */}
                <Stepper activeStep={QAIndex} orientation="vertical" variant="dots" position="static"
                    className=" w-full flex flex-col justify-between rounded-md h-full  text-gray-800 text-lg leading-5 overflow-y-hidden bg-slate-300"
                    sx={{ boxShadow: "5px 5px 10px 0px gold", backgroundColor: "#f9f0d1" }} >
                    {skillQAs?.QAs?.map((qa, index) => {
                        return <Step key={`OtherQA${qa.Question}`} className="flex flex-row justify-start items-center w-full h-10 text-lg text-gray-700 "
                            sx={{ boxShadow: index == QAIndex ? "inset 0px 0px 0px 200px gold" : "none", marginTop: index == 0 ? 0 : "-22px" }}
                            onClick={() => setQAIndex(index)} >
                            <StepLabel key={`OtherQA${qa.Question}`} noWrap={true} >
                                {!qa.answer ? "" : (!!qa.correct ? "✅" : "❌")} {qa.Question}
                            </StepLabel>
                        </Step>
                    })}
                </Stepper>
            </div>
            <div onClick={() => {
                debugger
                IsValidSkillPoint() && API("SkillQAs", { Name: SkillPaths[skillPathSelected].Name, Topic: topic, Rebuild: true }).then((res) => {
                    !!res && setSkillQAs({ Name: skillQAs.Name, QAs: res })
                })
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
                    QAIndex >= 0 && skillQAs?.QAs?.length > QAIndex && AnswersShuffled(skillQAs.QAs[QAIndex]).map((a, i) => <ListItem key={`answer-item${a}-${i}`}
                        className={`flex flex-row items-center justify-center rounded text-gray-800 
                        ${skillQAs.QAs[QAIndex].answer == a ? " text-lg w-5/12 bg-green-200 font-bold min-h-max  py-4" : " text-base w-4/12 bg-orange-200 min-h-min"}`}

                        onClick={() => { Answer(a) }}>
                        {RightWrong(skillQAs.QAs[QAIndex], a)}{a}
                    </ListItem>)
                }
            </div>
        </div>

    </div >
}