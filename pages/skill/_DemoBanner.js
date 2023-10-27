/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, use, useContext, useEffect, useMemo, useState } from "react"
import { API, Cmd, GetUrl, HGET, RspType } from "../../component/api";
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

const HoldInRoadAlert = () => {
    var items = `警惕！这里可能值得想一想。
天才在左，疯子在右：你能发现吗？
想象力和幻想只有一步之遥：好好想想！
内容有“小陷阱”：你会掉进去吗？`.split("\n")
    const RaondomItem = () => items[Math.floor(Math.random() * items.length)]
    const [randomText, setRandomText] = React.useState(null);

    React.useEffect(() => {
        setRandomText(RaondomItem());
    }, []);


    return <div className=" flex flex-row justify-start items-center w-full  whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-2 px-2 pb-2 h-36"            >
        <div className=" w-40 h-32  rounded-3xl mt-0 self-stretch " title={"苏格拉底之问"}>
            <img className={`rounded-3xl -mr-2 `} src="/holeInRoad.webp" ></img>
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
            durations={[3000, 8000]}
        ></ScrollingBanner>
    </div>
}