/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, use, useContext, useEffect, useMemo, useState } from "react"
import { Avatar, Box, Button, LinearProgress, MobileStepper, Tooltip, Typography } from "@mui/material";
import { LoadingComponent } from ".";
import { DemoContext } from "./_DemoContext";
export default function DemoTextShow({ QAs, QASocrates, Playing, SpeechDuration }) {

    const { paused, setPaused, TalkPassed, setTalkPassed } = useContext(DemoContext)
    useEffect(() => {
        if (TalkPassed >= SpeechDuration) return
        if (!Playing || paused) return
        //ouput debugging info 
        // console.log("TalkPassed", TalkPassed, "SpeechDuration", SpeechDuration)
        setTimeout(() => setTalkPassed(TalkPassed + 0.3), 300)
    }, [TalkPassed, setTalkPassed])
    useEffect(() => { setTalkPassed(0) }, [SpeechDuration, setTalkPassed])
    //continue playing
    useEffect(() => {
        setTalkPassed(TalkPassed + 0.3)
    }, [Playing, paused, setTalkPassed])
    //reset playing
    useEffect(() => {
        setTalkPassed(0)
    }, [SpeechDuration, setTalkPassed])




    {/* The whole chat box is scrollable */ }
    return <div key="what-is-my-answered" className="flex flex-col justify-start items-start w-full max-h-max min-h-min overflow-auto my-2 pr-1 " style={{ boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.20)" }}>
        {!QAs?.length && <LoadingComponent Text="Loading..." />}
        {
            //苏格拉底演练
            QASocrates?.length > 0 && QASocrates.map((qa, index) => {
                return <div key={`question-answer-q-${qa.Q}-${index}`} className="flex flex-col justify-start items-start w-full h-fit py-3 gap-1">
                    <div variant="18px" className="flex flex-row justify-start items-start  text-base text-gray-800 font-sans w-fit bg-orange-100 rounded-full  px-2 mb-2">
                        <div className="text-lg mr-1">🤔</div>  {qa.Q}
                    </div>
                    {/* align answer to the right */}
                    {!!qa.A && (index != 0 || !Playing || paused) && <div key={`question-answer-a${qa[1]}-${index}`} style={{ maxWidth: "80%", backgroundColor: "#d2f9d1" }}
                        className="flex flex-col justify-start items-start self-end text-sm text-gray-800 font-sans w-fit rounded-lg  px-2 py-2 whitespace-pre-line bg-orange-100 ">

                        💬 {qa.A}
                    </div>
                    }
                    {
                        qa.Talks?.map((talk, ind) => <div key={`question-answer-talks${qa[1]}-${ind}`} style={{ maxWidth: "80%", backgroundColor: "#d2f9d1" }}
                            className={"flex flex-row justify-start items-start self-end font-sans w-fit rounded-lg  px-2 py-2 whitespace-pre-line  selection:bg-fuchsia-300 gap-1"
                                + (index === 0 && ind == 0 ? " ring-2 text-lg text-gray-900 " : " text-base  text-gray-800 ")} >
                            {talk.User === "女孩:" && <Avatar alt="女孩" src="/image-girl.jpg"></Avatar>}
                            {talk.User === "男孩:" && <Avatar alt="男孩" src="/image-man.jpeg"></Avatar>}
                            {talk.User === "苏格拉底:" && <Avatar alt="苏格拉底" src="/socratics.jpeg"></Avatar>}
                            <div className=" flex-nowrap">
                                <b className={" text-bold"}>{index === 0 && ind == 0 ? talk.Talk.substr(0, talk.Talk.length * (TalkPassed / SpeechDuration)) : ""}</b>
                                {index === 0 && ind == 0 ? talk.Talk.substr(talk.Talk.length * (TalkPassed / SpeechDuration), talk.Talk.length) : talk.Talk}
                            </div>
                        </div>)
                    }
                </div>
            })
        }
    </div>
}