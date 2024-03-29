/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"

import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";

import { Box } from "@mui/system";
import { API, HGET, HMGET } from "../../component/api";
import Checkbox from '@mui/material/Checkbox';
import { Context } from "./Context";
import { Tooltip } from "@mui/material";
import { Jwt } from "../../component/jwt";
import { LoadingComponent } from ".";
import ListIcon from '@mui/icons-material/List';
import { useRouter } from "next/router";
import { DemoContext } from "./_DemoContext";
export default function SkillTree({ }) {
    const router = useRouter()
    const { TopicName, setTopicName, skillTree, setSkillTree, skillMyTrace, setSkillMyTrace, skillSessionNum, setskillSessionNum } = useContext(Context)
    const { paused, setPaused, CurrentScene, setCurrentScene, SceneryInfos, setSceneryInfos, MindmapRaw, setMindmapRaw, Playing } = useContext(DemoContext)

    //load skillTree according to topic.
    //load skillMyTrace according to skillTree
    useEffect(() => {
        if (!TopicName) return
        HGET("SkillTree", TopicName).then((tree) => {

            //sort sessions by session.ChapterSession
            tree?.Sessions?.sort((a, b) => a.ChapterSession - b.ChapterSession)

            !!tree && setSkillTree(tree)

            //step2: fetch SKillMyTrace according to SkillTree
            if (!Jwt.Get().IsValid()) return
            let names = tree.Sessions.map((session) => `${session.Name}:${session.Detail}`)
            names?.length > 0 && HMGET("SkillMyTrace:@id", names).then((res) => {
                //zip names and res to dict
                if (names.length != res?.length) return
                var _mytrace = res.reduce((acc, item, index) => { acc[names[index]] = item; return acc }, {})
                setSkillMyTrace(_mytrace)
            })
        })
    }, [TopicName])

    //auto select the first uncompleted skill path as default.
    useEffect(() => {
        //allow set only once. in order to avoid disturbing user
        if (!skillTree?.Sessions?.length) return
        //allow set only once. in order to avoid disturbing user
        if (skillSessionNum < 0) for (var i = 0; i < skillTree?.Sessions?.length; i++) {
            var session = skillTree.Sessions[i]
            var myTraceOnSession = skillMyTrace[session.Name + ":" + session.Detail]
            if (!myTraceOnSession) continue
            if (Complete(myTraceOnSession) < 2) {
                return setskillSessionNum(i)
            }
        }
    }, [skillTree, skillMyTrace])


    const Complete = (myTrace) => {
        if (!myTrace) return 0
        let correctAsks = myTrace.Asks?.length ?? 0, correctQAs = myTrace.QAs?.filter((qa) => qa.indexOf("|||0") > 0)?.length ?? 0
        return (correctAsks / 2) + correctQAs
    }

    {/* 相关的主题 */ }
    // use bold font
    return <div className="flex flex-col justify-start items-start w-full ring-2 rounded-lg m-1  h-fit  gap-1 p-2 font-sans tracking-wider  "    >
        <div key="title" className="flex pt-1 bg-yellow-50 rounded-lg w-full  gap-2 items-center " >

            <div className="flex flex-col w-full">
                <div className="flex gap-4 items-center">
                    <div className="font-semibold flex items-center p-2  ">
                        <span className="pl-1">主题:</span>
                    </div>
                    <div className="font-semibold text-base">{skillTree.Name}</div>
                </div>
                <div className="font-semibold text-sm px-2 pb-1">{skillTree.Detail}</div>
            </div>

        </div>
        <div className=" flex flex-row justify-start items-center w-full  whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-3 px-2 pb-2" >
            目录：
        </div>
        {
            !skillTree?.Sessions?.length && <LoadingComponent Text={"正在创建课程..."} />
        }

        {skillTree?.Sessions?.length > 0 && <Stepper orientation="vertical" className="flex w-full ml-1 mb-2 break-all whitespace-nowrap h-fit" activeStep={skillSessionNum}>
            {
                !!skillTree && skillTree?.Sessions.map((Point, seq) => {
                    return <Step key={`skillTree${seq}`} className={`flex flex-col justify-start items-start w-full h-fit whitespace-nowrap min-h-max rounded`}
                        sx={{
                            margin: "-5px 0 -12px 0",
                            //when mouse is over, change background color
                            ":hover": { backgroundColor: "#e8e8e8" }
                            //if index equals nextSkill, change box shadow
                            , boxShadow: seq == skillSessionNum ? "inset 0px 0px 0px 200px gold" : "none"
                        }} onClick={(e) => {
                            if (seq == skillSessionNum) return
                            setskillSessionNum(seq)                            
                        }}
                    // StepContent={true}
                    //in clickable if  Point.ChapterSession is 1.0
                    //clickable={Point.ChapterSession != "1"}
                    >
                        <StepLabel sx={{ margin: "-5px 0 -5px 0" }} className="flex flex-row justify-start items-start w-full  whitespace-nowrap">
                            <div className="flex flex-col  items-start gap-2  w-full whitespace-nowrap justify-between leading-6 " >

                                <div key="first-row" className="flex  first-row justify-between items-start w-full  whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-3 " >
                                    <div className="flex flex-row justify-start w-full  whitespace-nowrap  text-ellipsis text-base text-gray-700 font-sans font-semibold leading-6 gap-3" >
                                        {Point?.Session + " " + Point.Name}
                                    </div>

                                    <div className=" flex flex-row justify-end items-center w-full  whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-3 mr-2" >
                                        {/* <div>难度:{Point.Difficulty}</div> */}
                                        <div className="mr-2">{Complete(skillMyTrace[Point.Name + ":" + Point.Detail]) >= 2 ? "✅" : "⬜"}</div>
                                    </div>
                                </div>
                                <Tooltip title={Point.Detail} placement="right" >
                                    <div key="second-row" className="flex flex-row flex-wrap justify-start -ml-7 items-start w-full  text-sm text-gray-700" >
                                        {Point.Detail}
                                    </div>
                                </Tooltip>
                            </div>
                        </StepLabel>
                    </Step>
                })
            }
        </Stepper>
        }
    </div >
}