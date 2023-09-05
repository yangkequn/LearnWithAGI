/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import { API, Cmd, GetUrl, HGET, RspType } from "../../component/api";
import BuildIcon from '@mui/icons-material/Build';
import { Context } from "./Context"
import { GlobalContext } from "../_app";
import { LinearProgress } from "@mui/material";

export default function Scenery({ topic, volume }) {
    const { setCreditTM } = useContext(GlobalContext)
    const { skillMyTrace, setSkillMyTrace, skillSession, setSkillSession } = useContext(Context)
    const [ScenerInfos, setScenerInfos] = useState([])

    const FullName = () => `${skillSession?.Name}:${skillSession?.Detail}`
    //QAs and QATrace according to skillTreeSelected
    useEffect(() => {
        let Name = FullName()
        if (!Name || Name.indexOf("undefined") >= 0 || Name.indexOf("undefined") >= 0) return
        //loadSkillSessionQAs
        HGET("TTSInfo", FullName()).then((res) => (Name === FullName()) && setScenerInfos(res ?? []))
    }, [topic, skillSession])
    const [CurrentScenerInfo, setCurrentScenerInfo] = useState(-1)
    const playNext = () => {
        if (CurrentScenerInfo < ScenerInfos.length - 1) {
            setCurrentScenerInfo(CurrentScenerInfo + 1)
        }
    }
    useEffect(() => {
        if (!FullName()) return
        if (CurrentScenerInfo < 0) return

        let audio = new Audio(GetUrl(Cmd.HGET, "TTSOgg", ScenerInfos[CurrentScenerInfo].Text, RspType.ogg))
        //set volume
        audio.volume = 0.5
        //on end, play next
        audio.onended = playNext
        audio.play()
    }, [CurrentScenerInfo, volume])

    //progress value
    const [progressValue, setProgressValue] = useState(0)

    if (!FullName(skillSession)) return <div key={`socratic-container-nodata`} className="flex flex-col justify-between items-start w-full h-full overflow-scroll  max-w-[40%]" ></div>
    return <div key={`socratic-container-${skillSession}`} style={{ width: "40%" }} className="flex flex-col justify-between items-start w-full h-full overflow-scroll  max-w-[40%]"    >

        <div className="flex flow-row text-xl text-gray-800 h-fit font-sans leading-4 w-[100%]  bg-white/70 rounded-md px-4 py-2 gap-2 items-center">
            <div className="" >Scenery</div>
        </div>
        {/* //list Tags of QAs,using mui tag */}
        <div className="flex flex-col flex-wrap justify-start items-start overflow-y-scroll w-full h-full  mt-2 gap-[7px] opacity-90 min-h-min"        >

            {
                ScenerInfos?.map((QA, index) => {
                    return <div key={QA.Q} className=" text-base  even:bg-lime-100 odd: bg-amber-100 w-full rounded-md px-4 py-[4px]  items-center"
                        onClick={() => setCurrentScenerInfo(index)}                    >
                        {QA.Text}
                    </div>
                })
            }
        </div>
        <div className="flex flow-row text-xl text-gray-800 h-fit font-sans leading-4 w-[100%]  bg-white/70 rounded-md px-4 py-2 gap-2 items-center">
            {/* here's a mui bar, to show how many ScenerInfo have been completed */}
            <LinearProgress variant="determinate" value={progressValue} style={{ width: "100%" }} onChange={(e, newValue) => setProgressValue(newValue)} contentEditable={true} />
        </div>


    </div>
}