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

export default function DemoMindmap() {
    //完整的mindmap
    const [mermaidMindmap, setMermaidMindmap] = useState([]);
    //playingMindmap 是 mermaidMindmap的子集。同时添加了样式控制。以便更好聚焦正在讲授的内容
    const [playingMindmap, setPlayingMindmap] = useState("");
    const { paused, setPaused, setPlaybackRate, setVolume, CurrentScene, setCurrentScene, SceneryInfos, setSceneryInfos, MindmapRawText, setMindmapRawText } = useContext(DemoContext)
    const { skillTree, skillMyTrace, setSkillMyTrace, skillSession, setSkillSession } = useContext(Context)
    //auto load SkillSessionMindmap
    useEffect(() => {
        const FullName = () => `${skillSession?.Name}:${skillSession?.Detail}`
        if (FullName().length < 1) return
        API("SkillSessionMindmap", { SessionName: FullName() }).then((res) => {
            if (!res) return
            setMindmapRawText(res)
            var map = ToMermaidMindmapFormat(res)
            setMermaidMindmap(map)
            setPlayingMindmap(map.join("\n"))
        })
    }, [skillSession])



    //AutoMoveMindmapToNextTopic
    useEffect(() => {
        var playing = !isNaN(CurrentScene) && CurrentScene >= 0 && CurrentScene < SceneryInfos.length
        if (!playing) {
            setPlayingMindmap(mermaidMindmap.join("\n"))
            return
        }
        for (var i = 0; i < mermaidMindmap.length; i++) {
            var s = mermaidMindmap[i]
            if (s.indexOf(`_${CurrentScene}-`) < 0) continue
            console.log("topic moved to next one", s, "CurrentScene", CurrentScene, "i", i)
            var idL1 = s.split("_")[0].trim()
            var playingmapStr = ToPlayingFormat(mermaidMindmap, idL1).join("\n")
            setPlayingMindmap(playingmapStr)
            break
        }
    }, [CurrentScene])
    //儿童成长阶段的行为差异探讨

    // 1 儿童行为的阶段差异:探讨儿童在不同成长阶段的行为表现及其差异|||0
    // 1.1 幼儿期
    // 1.1.1 情感需求较多
    // 1.1.2 依赖家庭
    // 1.2 青少年期
    // 1.2.1 寻求自主性
    // 1.2.2 独立性增强

    const Mermaid = ({ chart }) => {
        useEffect(() => {
            mermaid.initialize({ startOnLoad: true, securityLevel: 'loose' });



            //确保图表渲染完成后添加点击事件监听器
            mermaid.init(undefined, '.mermaid', (charID) => {
                const mermaidNodes = document.querySelectorAll('.mindmap-node');

                var playingMap = playingMindmap.split("\n")
                //remove lines that contains "animate-pulse"
                playingMap = playingMap.filter((line) => line.indexOf(":::") < 0)
                if (playingMap.length != mermaidNodes.length) {
                    console.log("playingMap.length!=mermaidNodes.length", playingMap.length, mermaidNodes.length)
                    return
                }
                mermaidNodes.forEach((node, ind) => {
                    node.id = playingMap[ind].trim().split("-")[0];
                    node.addEventListener('click', (e) => {

                        setPaused(true)

                        var idSentenceStr = e.currentTarget.id
                        console.log("id clicked:", idSentenceStr)
                        var id_sentense = idSentenceStr.split("_")
                        var playingmapStr = ToPlayingFormat(mermaidMindmap, id_sentense[0]).join("\n")
                        setPlayingMindmap(playingmapStr)
                        setPaused(false)
                        setCurrentScene(parseInt(id_sentense[1]))
                        e.preventDefault();
                        e.stopPropagation();
                    });
                })
            });

        }, [chart]);

        return <div className="mermaid" key={`mermaid-mindmap-${chart}`}>{chart}</div>;
    };


    {/* <Mermaid chart={
`mindmap
root((mindmap))
  Tools
    Pen and paper
    Mermaid`
            } /> */}

    {/* <Mermaid chart={`
mindmap
root((mindmap))
    Origin))Origin((
    history[Long history]
    :::animate-pulse

  `} />      */}
    return <div className="w-full " key={playingMindmap}>
        {playingMindmap?.length > 0 ? <Mermaid chart={"mindmap\n" + playingMindmap} /> : null}
    </div>
}