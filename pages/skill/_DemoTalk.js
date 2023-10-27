/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, use, useContext, useEffect, useMemo, useState } from "react"
import { API, Cmd, HGET, RspType } from "../../component/api";
import BuildIcon from '@mui/icons-material/Build';
import { Context } from "./Context"
import { GlobalContext } from "../_app";
import { Avatar, Box, Button, LinearProgress, MobileStepper, Tooltip, Typography } from "@mui/material";
import { AvatarWithName } from "../Auth/avatar";
import { TwoIO } from "../../component/appFrame/navigator";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { LoadingComponent } from ".";
import ScrollingBanner from "../../component/banner";
import { ToMermaidMindmapFormat, ToPlayingFormat } from "./mindmap";
import mermaid from 'mermaid';
import { parse } from "path";
import DemoTextShow from "./_DemoTextShow";
import DemoBanner from "./_DemoBanner";
import ProgressBar from "./_DemoProgressbar";
import { DemoContext } from "./_DemoContext";
import DemoMindmap from "./_DemoMindMap";


export default function DemoTalk({ volume, playbackRate }) {
    const { setCreditTM, debugMode } = useContext(GlobalContext)
    const { paused, setPaused, setPlaybackRate, setVolume, CurrentScene, setCurrentScene, SceneryInfos, setSceneryInfos, MindmapRawText, setMindmapRawText } = useContext(DemoContext)
    const { skillTree, skillMyTrace, setSkillMyTrace, skillSession, setSkillSession } = useContext(Context)
    //all QAs about this skill topic
    const [QAs, setQAs] = useState([])
    const FullName = () => `${skillSession?.Name}:${skillSession?.Detail}`

    const [CiteQuestion, setCiteQuestion] = useState("")
    const [QASocrates, setQASocrates] = useState([])
    const topic = () => skillTree?.Name + ":" + skillTree?.Detail

    useEffect(() => { setPlaybackRate(playbackRate) }, [playbackRate])
    useEffect(() => { setVolume(volume) }, [volume])


    //QAs and QATrace according to skillTreeSelected
    useEffect(() => {
        setQAs([])
        setQASocrates([])
        let Name = FullName()
        if (!Name || Name.indexOf("undefined") >= 0 || Name.indexOf("undefined") >= 0) return
        if (!skillTree?.Sessions || skillTree?.Sessions?.length <= 0) return
        var Topic = topic()
        //loadSkillSessionQAs
        API("SkillSocrates", { Name, Topic, Rebuild: false }).then((res) => (Name === FullName()) && setQAs(res ?? []))
        //Senery TTSInfo
        API("SkillSocratesTTS", { Session: FullName(), Topic }).then((res) => {
            if (Name !== FullName()) return
            if (!res || res.length == 0) return setSceneryInfos([])
            setSceneryInfos(res)
        })

    }, [skillTree, skillSession])


    const [SpeechDuration, setSpeechDuration] = useState(0)
    const [Playing, setPlaying] = useState(false)

    //
    useEffect(() => {
        var playing = !isNaN(CurrentScene) && CurrentScene >= 0 && CurrentScene < SceneryInfos.length
        if (playing != Playing) setPlaying(playing)

        if (!FullName()) return
        if (!playing) { return }
        setPaused(false)


        setSpeechDuration(((SceneryInfos[CurrentScene]?.Duration ?? 0) + Math.random() * 0.0001) / playbackRate)
        var citeQ = SceneryInfos[CurrentScene]?.CiteQuestion
        citeQ && setCiteQuestion(citeQ)

        //handle of text demo
        //if QASocrates has element that has same question, then add talk to it
        var latestQASocrates = QASocrates.filter((qa) => qa.Q === (citeQ || CiteQuestion))
        //for non exist question, add it to QASocrates
        if (latestQASocrates.length == 0) latestQASocrates = [{ Q: (citeQ || CiteQuestion), A: "", Talks: [] }]
        latestQASocrates = latestQASocrates[0]
        //if citeQ in QAs, then add it to QASocrates
        if (!!citeQ) {
            let matchedQA = QAs.filter((qa) => qa.Q === citeQ)
            if (matchedQA.length > 0) latestQASocrates.A = matchedQA[0].A
        }

        //append to header of Talks
        let Raw = SceneryInfos[CurrentScene].Text
        let ind = Raw.indexOf(":")
        let User = ind > 0 ? Raw.substr(0, ind + 1) : "苏格拉底", Talk = ind > 0 ? Raw.substr(ind + 1).trim() : Raw
        if (!latestQASocrates.Talks.includes(Raw)) latestQASocrates.Talks = [{ User, Talk, Raw }, ...latestQASocrates.Talks.filter((talk) => talk.Raw !== Raw)]
        //remove latestQASocrates from _QASocrates
        var _QASocrates = [latestQASocrates, ...QASocrates.filter((qa) => qa.Q !== (citeQ || CiteQuestion))]
        setQASocrates(_QASocrates)

    }, [CurrentScene])


    const LinearProgressWithLabel = (value, label) => <div className="flex items-center w-full self-center">
        <div className="w-full mr-1">
            <LinearProgress variant="determinate" value={value} />
        </div>
        <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(value)}%`}</Typography>
        </Box>
    </div>
    if (!FullName(skillSession)) return <div key={`socratic-container-nodata`} className="flex flex-col justify-between items-start w-full h-full  max-w-[40%]" ></div>
    return <div key={`socratic-container-${skillSession}`} style={{ width: "40%" }} className="flex flex-col justify-between items-start w-full h-full max-w-[97%]"    >
        {/* //list Tags of QAs,using mui tag */}
        <div className="flex flex-col flex-wrap justify-start items-start w-full  mt-2 gap-[7px] opacity-90 h-38"        >

            {!Playing && <DemoBanner ></DemoBanner>}

            {
                debugMode >= 3 && <div title={"自动修复错误的问答列表"} className="flex flex-row pr-1 h-full self-center items-center justify-center"
                    onClick={() => FullName() && API("SkillSocrates", { Name: FullName(), Topic: topic(), Rebuild: true }).then((res) => setQAs(res ?? []))
                    } >
                    <BuildIcon />
                </div>
            }

            <DemoMindmap></DemoMindmap>
        </div>
        <div className="flex flex-row w-full h-8">
            <ProgressBar />
        </div>

        <DemoTextShow QAs={QAs} QASocrates={QASocrates} Playing={Playing} SpeechDuration={SpeechDuration}></DemoTextShow>

    </div >
}