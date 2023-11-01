/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, use, useContext, useEffect, useMemo, useState } from "react"
import { Avatar, Box, Button, LinearProgress, MobileStepper, Tooltip, Typography } from "@mui/material";
import { LoadingComponent } from ".";
import { DemoContext } from "./_DemoContext";
import { Context } from "./Context";
import { TwoIO } from "../../component/appFrame/navigator";
var timoutTalk = null
export default function DemoTextShow({ QAs }) {

    const { paused, setPaused, TalkPassed, setTalkPassed, SceneryInfos, SpeechDuration, Playing, CurrentScene, MindmapRaw } = useContext(DemoContext)
    const { TopicName, SessionName } = useContext(Context)
    const increaseTalkPassed = (talkpassed, speechduration) => {
        if (speechduration != SpeechDuration) return
        if (paused || !Playing) return
        if (talkpassed >= speechduration) return
        setTalkPassed(talkpassed)
        timoutTalk = setTimeout(() => increaseTalkPassed(talkpassed + 0.3, speechduration), 300)
    }

    //continue playing
    useEffect(() => {
        if (!setTalkPassed || !Playing) return
        if (!paused) increaseTalkPassed(TalkPassed, SpeechDuration)
    }, [Playing, paused, setTalkPassed])

    //start new playing
    useEffect(() => {
        if (!setTalkPassed) return
        clearTimeout(timoutTalk)
        increaseTalkPassed(0, SpeechDuration)
    }, [SpeechDuration, Playing, paused, setTalkPassed,])



    const [DemoDialogueSessionLatestTwo, setDemoDialogueSessionLatestTwo] = useState([])
    const [DemoDialogueSessionAll, setDemoDialogueSessionsAll] = useState([])
    useEffect(() => {
        if (!SessionName) return
        var NotReady = !SceneryInfos || SceneryInfos.length <= 0 || !MindmapRaw || MindmapRaw.length <= 0
        if (NotReady) {
            if (!DemoDialogueSessionAll || DemoDialogueSessionAll.length === 0) setDemoDialogueSessionsAll([])
            if (!DemoDialogueSessionLatestTwo || setDemoDialogueSessionLatestTwo.length === 0) setDemoDialogueSessionLatestTwo([])
            return
        }

        var _DemoDialogueTexts = []
        for (var i = 0; i < MindmapRaw.length; i++) {
            var mapItem = MindmapRaw[i]
            if (mapItem.Layer.length != 1) continue
            if (mapItem.Layer == "0") continue
            //讲解从第一个子节点开始
            let BInd = mapItem.SeqNum, EInd = SceneryInfos.length
            for (let j = i + 1; j < MindmapRaw.length; j++)if (MindmapRaw[j].Layer.length === 1) { EInd = MindmapRaw[j].SeqNum; break }

            var DemoTalks = { Q: mapItem.Name, A: "", Talks: [], BInd: BInd, EInd: EInd }
            for (let j = BInd; j < EInd; j++) {
                let Raw = SceneryInfos[j]?.Text
                if (!Raw) {
                    debugger
                    continue
                }
                let ind = Raw.indexOf(":")
                let User = ind > 0 ? Raw.substr(0, ind + 1) : "苏格拉底", Talk = ind > 0 ? Raw.substr(ind + 1).trim() : Raw
                DemoTalks.Talks.push({ User, Talk, Raw })
            }
            _DemoDialogueTexts.push(DemoTalks)
        }
        setDemoDialogueSessionsAll(_DemoDialogueTexts)
    }, [SceneryInfos, SessionName, MindmapRaw])
    //
    useEffect(() => {
        if (DemoDialogueSessionAll.length == 0) return
        var playing = !isNaN(CurrentScene) && CurrentScene >= 0 && CurrentScene < SceneryInfos.length

        if (!playing) return
        if (!SessionName) return
        setPaused(false)
        var _DemoDialogueSession = []
        for (var si = 0; si < DemoDialogueSessionAll.length; si++) {
            var DemoDialogueSession = DemoDialogueSessionAll[si]
            if (CurrentScene >= DemoDialogueSession.BInd && CurrentScene < DemoDialogueSession.EInd) {
                var session = { ...DemoDialogueSession }
                session.Talks = session.Talks.slice(0, CurrentScene - session.BInd + 1)
                session.Talks.reverse()
                _DemoDialogueSession.push(session)
                if (si - 1 >= 0) {
                    session = JSON.parse(JSON.stringify(DemoDialogueSessionAll[si - 1]))
                    session.Talks.reverse()
                    _DemoDialogueSession.push(session)
                }
                setDemoDialogueSessionLatestTwo(_DemoDialogueSession)
                break
            }
        }

    }, [CurrentScene, DemoDialogueSessionAll])

    {/* The whole chat box is scrollable */ }
    return <div key="what-is-my-answered" className="flex flex-col justify-start items-start w-full h-full overflow-auto my-2 pr-1 " style={{ boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.20)" }}>
        {!QAs?.length && <LoadingComponent Text="Loading..." />}
        {
            //苏格拉底演练
            Playing && DemoDialogueSessionLatestTwo.map((qa, index) => {
                return <div key={`question-answer-q-${qa.Q}-${index}`} className="flex flex-col justify-start items-start w-full h-fit py-3 gap-1">
                    <div variant="18px" className="flex flex-row justify-start items-center  text-base text-gray-800 font-sans w-fit bg-orange-100 rounded-full  pl-2 pr-8 mb-2">
                        <div className={"self-center mr-4 "}>
                            <TwoIO ></TwoIO>
                        </div>
                        <div> {qa.Q} </div>
                    </div>
                    {/* align answer to the right */}
                    {!!qa.A && (index != 0 || !Playing || paused) && <div key={`question-answer-a${qa[1]}-${index}`} style={{ maxWidth: "80%", backgroundColor: "#d2f9d1" }}
                        className="flex flex-col justify-start items-start self-end text-sm text-gray-800 font-sans w-fit rounded-lg  px-2 py-2 whitespace-pre-line bg-orange-100 ">

                        💬 {qa.A}
                    </div>
                    }
                    {
                        qa.Talks?.map((talk, ind) => <div key={`question-answer-talks${qa[1]}-${ind}`} style={{ maxWidth: "80%", backgroundColor: "#d2f9d1" }}
                            className={"flex flex-row justify-start items-start self-end font-sans w-fit rounded-lg  px-2 py-2 my-1 whitespace-pre-line  selection:bg-fuchsia-300 gap-1"
                                + (index === 0 && ind == 0 ? " ring-2 text-lg text-gray-900 " : " text-base  text-gray-800 ")} >
                            <div className="w-14 h-14">
                                {talk.User === "女孩:" && <Avatar alt="女孩" src="/image-girl.jpg" className="w-14 h-14"></Avatar>}
                                {talk.User === "男孩:" && <Avatar alt="男孩" src="/image-man.jpeg" className="w-14 h-14"></Avatar>}
                                {talk.User === "苏格拉底:" && <Avatar alt="苏格拉底" src="/socratics.jpeg" className="w-14 h-14"></Avatar>}
                            </div>
                            <div className=" flex-nowrap">
                                <b className={" text-bold"}>{index === 0 && ind == 0 ? talk.Talk.substr(0, talk.Talk.length * (TalkPassed / SpeechDuration)) : ""}</b>
                                {index === 0 && ind == 0 ? talk.Talk.substr(talk.Talk.length * (TalkPassed / SpeechDuration), talk.Talk.length) : talk.Talk}
                            </div>
                        </div>)
                    }
                </div>
            })
        }
        {/* 填充高度的div */}
        <div></div>
    </div>
}