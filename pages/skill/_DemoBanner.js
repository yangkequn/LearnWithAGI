/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, use, useContext, useEffect, useMemo, useState } from "react"
import { API, Cmd, GetUrl, HGET, RspType } from "../../component/api";
import BuildIcon from '@mui/icons-material/Build';
import { Context } from "./Context"
import { GlobalContext } from "../_app";
import { Avatar, Box, Button, LinearProgress, MobileStepper, Tooltip, Typography } from "@mui/material";
import { AvatarWithName } from "../Auth/avatar";
import { TwoIO } from "../../component/appFrame/navigator";
import ScrollingBanner from "../../component/banner";

const HoldInRoadAlert = () => {
    const items = `想象力和幻想是邻居：这是AI的特性，也是探索者的本性！
voiceofai 目标: 让AI提供全局最重要, 最均衡的事实和观点
voiceofai.cc ...更多的内容、练习`.split("\n")
    const Images = [<img className={`rounded-3xl -mr-2 `} src="/holeInRoad.webp" ></img>,
    <img className={`rounded-3xl -mr-2 `} src="/voice-of-ai.webp" ></img>,
    <TwoIO className={`rounded-3xl -mr-2 w-full h-full `} ></TwoIO>]
    const [randIndex, setRandIndex] = React.useState(0);
    const [randomText, setRandomText] = React.useState(null);
    const [img, setImg] = React.useState(null);

    React.useEffect(() => {
        setRandIndex(Math.floor(Math.random() * items.length))
    }), [];
    React.useEffect(() => {
        setRandomText(items[randIndex])
        setImg(Images[randIndex])
    }, [randIndex]);


    return <div className=" flex flex-row justify-start items-center w-full  whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-2 px-2 pb-2 h-36"            >
        <div className=" w-40 h-32  rounded-3xl mt-0 self-stretch " title={"苏格拉底之问"}>
            {img}
        </div>
        <div className="flex h-full text-2xl text-gray-800 font-sans leading-4  w-full  bg-white/70 rounded-md px-2 pt-1 gap-1 items-center pl-4"                    >
            {randomText}
        </div>
    </div>
}

const Talkers = ({ ScenerInfos, CurrentScene }) => <div key={`talker-${CurrentScene}-${ScenerInfos}`}
    className="flex flex-row  text-xl text-gray-800 font-sans leading-4  w-full  bg-white/70 rounded-md px-2 pt-1 gap-1 justify-between items-center h-36">


    <div className={"w-32 h-32 rounded-lg"} >
        <img className={!isNaN(CurrentScene) && CurrentScene >= 0 && CurrentScene < ScenerInfos?.length && ScenerInfos[CurrentScene].Text.indexOf("女孩") === 0 && " ring-4 animate-pulse" || ""} src="/image-girl.jpg"></img>
    </div>

    <div className={" w-36 h-32 mt-1 self-stretch overflow-hidden rounded-lg "} title={"苏格拉底之问"}>
        <img className={(!isNaN(CurrentScene) && CurrentScene >= 0 && CurrentScene < ScenerInfos?.length && ScenerInfos[CurrentScene].Text.indexOf("苏格拉底") === 0 && "ring-4 animate-pulse " || "") + `  -mr-8`} src="/socrates.webp"
        ></img>
    </div>

    <div className="w-32 h-32 rounded-lg" >
        <img className={!isNaN(CurrentScene) && CurrentScene >= 0 && CurrentScene < ScenerInfos?.length && ScenerInfos[CurrentScene].Text.indexOf("男孩") === 0 && " ring-4 animate-pulse" || ""} src="/image-man.jpeg"></img>
    </div>
    <div className="flex flex-col  h-full text-2xl text-gray-800 font-sans leading-4   bg-white/70 rounded-xl my-2 px-4 py-6 gap-6 items-center "                    >
        <div>追问        </div>
        <div>          思辨</div>
        <div>-&gt; 自我发现</div>
    </div>
</div>
export default function DemoBanner() {

    return <div className="flex flex-row w-full">
        <ScrollingBanner
            components={[<HoldInRoadAlert />, <HoldInRoadAlert />]}
            durations={[3000, 3000]}
        ></ScrollingBanner>
    </div>
}