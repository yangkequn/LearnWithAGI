/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import { Chip, Container, Divider, IconButton, InputAdornment, List, ListItem, Paper, Popover, Stack, TextField, Typography as div, breadcrumbsClasses, Tooltip, } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { API } from "../../component/api";
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import "tailwindcss/tailwind.css"
import BuildIcon from '@mui/icons-material/Build';
import { Context } from "./Context"
import { GlobalContext } from "../_app";

export default function Socratics({ topic }) {
    const { setCreditTM } = useContext(GlobalContext)
    const { skillMyTrace, setSkillMyTrace, skillPoint, setSkillPoint } = useContext(Context)
    //all QAs about this skill topic
    const [QAs, setQAs] = useState([])
    //CurrentQAs QA that use has selected. format [question,answer,question,answer,...]
    const [QATraces, setQAsTraces] = useState([])
    const FullName = () => `${skillPoint?.Name}:${skillPoint?.Detail}`
    const loadSkillPoint = (Name, topic) => API("SkillSocratic", { Name, Topic: topic, Rebuild: false })
        .then((res) => (Name === FullName()) && setQAs(res ?? []))
    //QAs and QATrace according to skillTreeSelected
    useEffect(() => {
        setQAs([])
        setQAsTraces([])
        let Name = FullName()
        if (!Name || Name.indexOf("undefined") >= 0 || Name.indexOf("undefined") >= 0) return
        loadSkillPoint(Name, topic)
        setQAsTraces(skillMyTrace[FullName()]?.Asks ?? [])

    }, [skillPoint])

    useEffect(() => {
        if (!FullName()) return
        setQAsTraces(skillMyTrace[FullName()]?.Asks ?? [])
    }, [skillPoint, skillMyTrace])

    if (!FullName(skillPoint)) return <div key={`socratic-container-nodata`} className="flex flex-col justify-between items-start w-full h-full overflow-scroll  max-w-screen-sm" ></div>
    return <div key={`socratic-container-${skillPoint}`} style={{ width: "40%" }} className="flex flex-col justify-between items-start w-full h-full overflow-scroll  max-w-screen-sm"    >
        {/* //list Tags of QAs,using mui tag */}
        <div className="flex flex-row flex-wrap justify-start items-start overflow-scroll w-full py-3 gap-1 max-h-max min-h-min "        >

            <div className="flex flow-row text-xl text-gray-800 font-sans leading-4 w-fit bg-slate-300 rounded-md px-4 py-2 gap-2 items-center">
                <div> 苏格拉底演练场</div>

                <div onClick={() => FullName() && API("SkillSocratic", { Name: FullName(), Topic: topic, Rebuild: true })
                    .then((res) => setQAs(res ?? []))
                } className="pr-1">
                    <Tooltip title={"自动修复错误的问答列表"} placement="left" className="h-full self-center items-center justify-center"><BuildIcon></BuildIcon></Tooltip>
                </div>

            </div>
            {
                QAs.filter((QA) => QATraces.join("").indexOf(QA.Q) < 0).map((QA, index) => {
                    return <Chip key={QA.Q} label={QA.Q} icon={<ContactSupportIcon />} className=" text-base"
                        onClick={() => API("SkillMyTraceReport", { Name: FullName(), Ask: `${QA.Q}|||${QA.A}` }).then((res) => {
                            let newMySkillTrace = { ...skillMyTrace, [FullName()]: res }
                            setSkillMyTrace(newMySkillTrace)
                            //update creditTM to refresh rewards
                            setCreditTM(new Date().getTime())
                        })} />
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
                        <div variant="18px" className="flex flex-col justify-start items-start  text-base text-gray-800 font-sans w-fit bg-orange-100 rounded-full  px-2 mb-2">
                            {qa.split("|||")[0]}
                        </div>

                        {/* align answer to the right */}
                        <div key={`question-answer-a${qa[1]}-${index}`} style={{ maxWidth: "80%", backgroundColor: "#d2f9d1" }}
                            className="flex flex-col justify-start items-start self-end text-sm text-gray-800 font-sans w-fit rounded-lg  px-2 py-2"
                        >
                            {qa.split("|||")[1]}
                        </div>
                    </div>
                })
            }
        </div>
        <div key="question-box" className="flex flex-col justify-start items-start w-full h-28 overflow-scroll py-2"  >
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
                                API("SkillMyTraceReport", { Name: FullName(), Ask: `${question}|||${answer}` }).then((res) => {
                                    let newMySkillTrace = { ...skillMyTrace, [FullName()]: res }
                                    setSkillMyTrace(newMySkillTrace)
                                    //update creditTM to refresh rewards
                                    setCreditTM(new Date().getTime())
                                })
                            }
                        }
                    }}
            />
        </div>

        {/* <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", maxWidth: 900, height: 180, fontSize: 14 }}> */}
        {/* <IconButton type="button" sx={{ p: '10px' }} aria-label="search"><SearchIcon /> </IconButton> */}
        {/* <Autocomplete options={selectedOption}
                disablePortal={true}
                freeSolo={true}
                sx={{ width: 400 }}
                renderInput={(params) => <TextField {...params} placeholder="在Reinfy上搜索新的主题" multiline={true} rows={4} />}
                onChange={(e, v) => {
                    setSearchText(v)
                    e.preventDefault();
                    e.stopPropagation()
                }}
            /> */}

        {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}

        {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions"> <MicIcon /> </IconButton> */}
        {/* </Paper> */}
    </div>
}