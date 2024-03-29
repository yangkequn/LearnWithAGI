/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, use, useContext, useEffect, useMemo, useState } from "react"
import { API, Cmd, HGET, RspType } from "../../component/api";
import BuildIcon from '@mui/icons-material/Build';
import { Context } from "./Context"
import { GlobalContext } from "../_app";
import { Avatar, Box, Button, LinearProgress, MobileStepper, Tooltip, Typography } from "@mui/material";
import DemoTextShow from "./_DemoTextShow";
import DemoBanner from "./_DemoBanner";
import ProgressBar from "./_DemoProgressbar";
import { DemoContext } from "./_DemoContext";
import DemoMindmap from "./_DemoMindMap";
import CustomEvents from "../../component/customEvents";


export default function DemoTalk({ volume, playbackRate }) {
    const { setCreditTM, debugMode, Params } = useContext(GlobalContext)
    const { paused, setPaused, setPlaybackRate, setVolume, CurrentScene, setCurrentScene, SceneryInfos, setSceneryInfos,
        MindmapRaw, setMindmapRaw, Playing, TalkPassed, SpeechDuration } = useContext(DemoContext)
    const { skillTree, skillMyTrace, setSkillMyTrace, skillSessionNum, TopicName, SessionName } = useContext(Context)
    //all QAs about this skill topic
    const [QAs, setQAs] = useState([])

    useEffect(() => { setPlaybackRate(playbackRate) }, [playbackRate])
    useEffect(() => { setVolume(volume) }, [volume])

    //read autoPlay from params
    useEffect(() => {
        if (!SceneryInfos || SceneryInfos.length == 0) return
        //for each elemnt in SceneryInfos, If the audio is available, then the durationSeconds is available
        var AudioIsReady = true
        for (let i = 0; i < SceneryInfos.length; i++) {
            if (!SceneryInfos[i]?.DurationSec || SceneryInfos[i]?.DurationSec <= 0) {
                AudioIsReady = false
                break
            }
        }
        const { autoPlay } = Params;
        if (autoPlay === "true" && AudioIsReady) {
            setTimeout(() => {
                //notify screen video capture to start
                console.log("notify screen video capture to start,set window.AutoPlayStart = true")
                window.AutoPlayStart = true;
                setTimeout(() => setCurrentScene(0), 1000);
                
                //setTimeout(() => setCurrentScene(0), 1000);
            }, 2000);
        }
    }, [Params, SceneryInfos]);


    //QAs and QATrace according to skillTreeSelected
    useEffect(() => {
        setQAs([])
        if (!SessionName || SessionName.indexOf("undefined") >= 0 || SessionName.indexOf("undefined") >= 0 || setSceneryInfos == undefined) return
        //loadskillSessionNumQAs
        HGET("SkillSocrates", SessionName).then((res) => setQAs(res ?? []))
        //Senery TTSInfo
        HGET("TalksTTSInfo", SessionName).then((res) => {
            if (!res || res.length == 0) return setSceneryInfos([])
            setSceneryInfos(res)
            setPaused(true)
            setCurrentScene(-1)
        })

    }, [SessionName, setSceneryInfos,])



    const LinearProgressWithLabel = (value, label) => <div className="flex items-center w-full self-center">
        <div className="w-full mr-1">
            <LinearProgress variant="determinate" value={value} />
        </div>
        <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(value)}%`}</Typography>
        </Box>
    </div>
    if (!SessionName) return <div key={`socratic-container-nodata`} className="flex flex-col justify-between items-start w-full h-full  max-w-[40%]" ></div>
    return <div key={`socratic-container-${skillSessionNum}`} style={{ width: "40%" }} className="flex flex-col justify-between items-start w-full h-full max-w-[97%]"    >
        {/* //list Tags of QAs,using mui tag */}
        <div className="flex flex-col flex-wrap justify-start items-start w-full  mt-2 gap-[7px] opacity-90 h-38" >
            {!Playing && <DemoBanner ></DemoBanner>}
            {
                debugMode >= 3 && <div title={"自动修复错误的问答列表"} className="flex flex-row pr-1 h-full self-center items-center justify-center"
                    onClick={() => SessionName && API("SkillSocrates", { Name: SessionName, Topic: topic(), Rebuild: true }).then((res) => setQAs(res ?? []))
                    } >
                    <BuildIcon />
                </div>
            }

            <DemoMindmap></DemoMindmap>
        </div>
        <div className="flex flex-row w-full h-8 self-start mt-2">
            <ProgressBar />
        </div>

        <DemoTextShow QAs={QAs} ></DemoTextShow>

    </div >
}