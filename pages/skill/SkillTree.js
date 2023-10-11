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
export default function SkillTree({ }) {
    const router = useRouter()
    const { topic, setTopic, skillTree, setSkillTree, skillMyTrace, setSkillMyTrace, skillSession, setSkillSession } = useContext(Context)

    //load skillTree according to topic.
    //load skillMyTrace according to skillTree
    useEffect(() => {
        if (!topic) return
        //step1: auto load skillTree
        var Name = topic.split(":")[0], Detail = topic.split(":")[1]
        API("SkillLoadList", { Name, Detail }).then((tree) => {

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
    }, [topic])

    //auto select the first uncompleted skill path as default.
    //only set once, in order to avoid disturbing user
    const [topicSessionSelectedOnce, setTopicSessionSelectedOnce] = useState("")
    useEffect(() => {
        //allow set only once. in order to avoid disturbing user
        if (!skillTree?.Sessions?.length) return
        //if no skillMyTrace, then select the first one as default
        if (Object.keys(skillMyTrace).length == 0) {
            return setSkillSession(skillTree.Sessions[0])
        }
        //allow set only once. in order to avoid disturbing user
        if (topicSessionSelectedOnce == topic) return
        for (var i = 0; i < skillTree?.Sessions?.length; i++) {
            var session = skillTree.Sessions[i]
            var myTraceOnSession = skillMyTrace[session.Name + ":" + session.Detail]
            if (!myTraceOnSession) continue
            if (Complete(myTraceOnSession) < 2) {
                setTopicSessionSelectedOnce(topic)
                return setSkillSession(session)
            }
        }
        //if all sessions are completed, then select the first one
        setSkillSession(skillTree.Sessions[0])
        //if skillMyTrace is not fecthed to local, allow reset later
        setTopicSessionSelectedOnce(topic)
    }, [skillTree, skillMyTrace])


    const Complete = (myTrace) => {
        if (!myTrace) return 0
        let correctAsks = myTrace.Asks?.length ?? 0, correctQAs = myTrace.QAs?.filter((qa) => qa.indexOf("|||0") > 0)?.length ?? 0
        return (correctAsks / 2) + correctQAs
    }
    const fullName = () => skillTree?.Name + ":" + skillTree?.Detail

    const [closePlayList, setClosePlayList] = useState(false)
    {/* 相关的主题 */ }
    return <div className="flex flex-col justify-start items-start w-full max-w-[390px] h-full overflow-x-scroll gap-1 mt-1"    >
        {
            skillTree?.TreeList?.length > 0 && !closePlayList && <div className="flex flex-col ring-2 rounded-md m-1  w-full p-3 bg-white opacity-90 shadow-md">
                <div className="flex flex-row justify-between items-center overflow-hidden w-full h-7 mb-3">
                    <div className="text-xl font-semibold" title={skillTree?.TreeListName}>
                        {skillTree?.TreeListName}
                    </div>
                    <button onClick={() => { setClosePlayList(!closePlayList) }} className="p-1 hover:bg-gray-200 rounded"                    >
                        X
                    </button>
                </div>

                <div className="flex flex-row gap-3 px-3 items-center mb-2">
                    {/* icon for list */}
                    <ListIcon className="text-blue-500 w-6 h-6"></ListIcon>
                    <div className="text-lg font-medium text-gray-800">
                        Play list {`${skillTree?.TreeList.indexOf(fullName()) + 1} / ${skillTree?.TreeList?.length}`}
                    </div>
                </div>

                <div className="flex flex-col bg-gray-50 rounded p-3">
                    {skillTree?.TreeList.map((item, index) => (
                        <div key={`skillTree${index}`}
                            className={`flex flex-row justify-start self-center items-center w-full whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-3 px-2 py-1 mb-1 hover:bg-blue-100 rounded ${item === skillTree.Name + ":" + skillTree.Detail && "bg-blue-200"}`}
                            onClick={() => {
                                router.push(`/skill?t=${item}`)
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        }
        <div key="title" className="flex flex-row pt-1 whitespace-normal text-lg bg-yellow-50 w-full rounded ml-2 gap-2 items-center" >
            <div className="flex font-semibold h-12 self-center items-center   ">
                <div className="pl-1">课程</div>
            </div>
            <div className="flex flex-col">
                <div className=" font-semibold text-base "> {skillTree.Name}</div>
                <div className=" font-semibold text-sm "> {skillTree.Detail}</div>
            </div>
        </div>
        <div className=" flex flex-row justify-start items-center w-full  whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-3 px-2 pb-2"            >
            目录：
        </div>
        {
            !skillTree?.Sessions?.length && <LoadingComponent Text={"正在创建课程..."} />
        }

        {skillTree?.Sessions?.length > 0 && <Stepper orientation="vertical" className="flex w-full break-all whitespace-nowrap h-fit" activeStep={skillTree?.Sessions.indexOf(skillSession)}>
            {
                !!skillTree && skillTree?.Sessions.map((Point, seq) => {
                    return <Step key={`skillTree${seq}`} className={`flex flex-col justify-start items-start w-full h-fit whitespace-nowrap min-h-max`}
                        sx={{
                            margin: "-5px 0 -12px 0",
                            //when mouse is over, change background color
                            ":hover": { backgroundColor: "#e8e8e8" }
                            //if index equals nextSkill, change box shadow
                            , boxShadow: seq == skillTree?.Sessions.indexOf(skillSession) ? "inset 0px 0px 0px 200px gold" : "none"
                        }} onClick={(e) => setSkillSession(Point)}
                    // StepContent={true}
                    //in clickable if  Point.ChapterSession is 1.0
                    //clickable={Point.ChapterSession != "1"}
                    >
                        <StepLabel sx={{ margin: "-5px 0 -5px 0" }} className="flex flex-row justify-start items-start w-full  whitespace-nowrap">
                            <div className="flex flex-col  items-start gap-2  w-full whitespace-nowrap justify-between leading-6 " >

                                <div key="first-row" className="flex  first-row justify-between items-start w-full  whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-3 " >
                                    <div className="flex flex-row justify-start w-full  whitespace-nowrap  text-ellipsis text-base text-gray-700 font-sans font-semibold leading-6 gap-3" >
                                        {Point.ChapterSession + " " + Point.Name}
                                    </div>

                                    <div className=" flex flex-row justify-end items-center w-full  whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-3 mr-2" >
                                        <div>难度:{Point.Difficulty}</div>
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