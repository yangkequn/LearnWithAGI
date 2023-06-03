/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import { Chip, Container, Divider, IconButton, InputAdornment, List, ListItem, Paper, Popover, Stack, TextField, Typography as div, breadcrumbsClasses, } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { API } from "../../component/api";
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import "tailwindcss/tailwind.css"

export const Socratics = ({ SkillPoint, setcreditTM, SkillPaths }) => {
    const [QAs, setQAs] = useState([])
    const [CurrentQAs, setCurrentQAs] = useState([])
    const [lastSkillName, setlastSkillName] = useState("")
    useEffect(() => {
        if (!SkillPoint || !SkillPoint.Name) {
            setCurrentQAs([])
            setQAs([])
            return
        }
        if (SkillPoint.Nam != lastSkillName) {
            setCurrentQAs([])
            setQAs([])
            setlastSkillName(SkillPoint.Name)
        }
        //if SkillPoint.Name in SkillPaths then take SkillPaths.Asks as setCurrentQAs
        var asks = []
        for (var i = 0; i < SkillPaths.length; i++) {
            if (SkillPaths[i].Name != SkillPoint.Name) continue
            //copy SkillPaths[i].Asks to asks
            if (!SkillPaths[i].Asks) break
            //SkillPaths[i].Asks :[Q,A,Q,A,...]
            for (var j = 0; j < SkillPaths[i].Asks.length; j += 2)
                asks.push({ Q: SkillPaths[i].Asks[j], A: SkillPaths[i].Asks[j + 1] })
        }
        setCurrentQAs(asks)

        API("SkillSocratic", { Name: SkillPoint.Name }).then((res) => {
            if (!res) return
            //show QAs that not in CurrentQAs
            res = res.filter((QA) => {
                for (var i = 0; i < asks.length; i++) {
                    if (asks[i].Q === QA.Q) return false
                }
                return true
            })
            setQAs(res)
        })
    }, [SkillPoint])

    return <div key="socratic_container" style={{ width: "40%" }} className="flex flex-col justify-start items-start w-full h-full overflow-scroll  max-w-screen-sm"    >
        {/* //list Tags of QAs,using mui tag */}
        <div className="flex flex-row flex-wrap justify-start items-start overflow-scroll w-full h-52 py-3 gap-1 max-h-max min-h-min"        >
            <div className=" text-xl text-gray-800 font-sans leading-4 w-fit bg-slate-300 rounded-md px-4 py-2 "> 苏格拉底演练场 </div>
            {
                QAs.map((QA, index) => {
                    // QA = { Q: "What is the meaning of life?", A: "42" }
                    return <Chip key={QA.Q} label={QA.Q} icon={<ContactSupportIcon />} className=" text-base"
                        onClick={() => {
                            setCurrentQAs([QA, ...CurrentQAs])
                            //remove from QAs
                            setQAs(QAs.filter((_, i) => i != index))

                            API("SkillPathReport", { Name: SkillPoint.Name, Ask: [QA.Q, QA.A] }).then((res) => {
                                //update creditTM to refresh rewards
                                setcreditTM(new Date().getTime())
                            }).catch()
                        }}
                    />
                })
            }
        </div>

        {/* <div className="bg" style={{ boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.75)" }}>        </div> */}

        {/* The whole chat box is scrollable */}
        <div className="flex flex-col justify-start items-start w-full h-full overflow-scroll my-2 " style={{ boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.20)" }}>
            {
                //display CurrentQAs as dialog box,question on the left,answer on the right
                CurrentQAs.map((QA, index) => {
                    return <div key={QA.Q} className="flex flex-col justify-start items-start w-full h-fit py-3">
                        <div variant="18px" className="flex flex-col justify-start items-start  text-base text-gray-800 font-sans w-fit bg-orange-100 rounded-full  px-2 mb-2">
                            {QA.Q}
                        </div>

                        {/* align answer to the right */}
                        <div key={`anser${QA.A}`} style={{ maxWidth: "80%", backgroundColor: "#d2f9d1" }}
                            className="flex flex-col justify-start items-start self-end text-sm text-gray-800 font-sans w-fit rounded-lg  px-2 py-2"
                        >
                            {QA.A}
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
                            //if not empty
                            let question = e.target.value
                            if (!!question) {
                                e.target.value = ""
                                setCurrentQAs([{ Q: question, A: "..." }, ...CurrentQAs])
                                API("SkillSocratic", { Name: SkillPoint.Name, Quetion: question }).then((res) => {
                                    //update creditTM to refresh rewards
                                    res = res.filter((QA) => {
                                        return question === QA.Q
                                    })
                                    if (res.length == 0) return
                                    let answer = res[0].A
                                    //remove question from CurrentQAs
                                    let newQAs = CurrentQAs.filter((QA) => QA.Q != question)
                                    setCurrentQAs([{ Q: question, A: answer }, ...newQAs])
                                    API("SkillPathReport", { Name: SkillPoint.Name, Ask: [question, answer] }).then((res) => {
                                        //update creditTM to refresh rewards
                                        setcreditTM(new Date().getTime())
                                    })
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