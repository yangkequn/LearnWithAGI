/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"

import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";

import { Box } from "@mui/system";
import { API, HGET } from "../../component/api";
import Checkbox from '@mui/material/Checkbox';
import { Context } from "./Context";
import { Tooltip } from "@mui/material";
export default function SkillTree({ topic }) {
    const { skillTree, setSkillTree, skillMyTrace, setSkillMyTrace, skillSession, setSkillSession } = useContext(Context)

    //auto load skillTree
    useEffect(() => {
        if (!topic) return
        var Name = topic.split(":")[0], Detail = topic.split(":")[1]
        API("SkillLoad", { Name, Detail }).then((tree) => {

            //sort sessions by session.ChapterSession
            tree?.Sessions?.sort((a, b) => a.ChapterSession - b.ChapterSession)

            !!tree && setSkillTree(tree)
        })
    }, [topic])

    //auto select the first uncompleted skill path as default.
    //only set once, in order to avoid disturbing user
    const [topicSessionSelected, setTopicSessionSelected] = useState("")
    useEffect(() => {
        //allow set only once. in order to avoid disturbing user
        if (skillTree?.Sessions?.length < 1 || topicSessionSelected == topic) return
        for (var i = 0; i < skillTree?.Sessions?.length; i++) {
            var session = skillTree.Sessions[i]
            if (Complete(skillMyTrace[session.Name + ":" + session.Detail]) < 3) {
                if (skillMyTrace.length > 0) setTopicSessionSelected(topic)
                return setSkillSession(session)
            }

        }
        //if all sessions are completed, then select the first one
        if (i == skillTree?.Sessions?.length) setSkillSession(skillTree.Sessions[0])
        //if skillMyTrace is not fecthed to local, allow reset later
        if (skillMyTrace.length > 0) setTopicSessionSelected(topic)
    }, [skillTree, skillMyTrace])


    const Complete = (myTrace) => {
        if (!myTrace) return 0
        let correctAsks = myTrace.Asks?.length ?? 0, correctQAs = myTrace.QAs?.filter((qa) => qa.indexOf("|||0") > 0)?.length ?? 0
        return (correctAsks / 2) + correctQAs
    }

    {/* 相关的主题 */ }
    return <div className="flex flex-col justify-start items-start w-full max-w-[20%] h-full overflow-scroll gap-1 mt-1"    >
        <div key="title" className="flex flex-row pt-1 whitespace-normal text-lg bg-yellow-50 w-full rounded ml-2 gap-2" >
            <div className=" font-semibold ">课程</div>
            <div className=" font-semibold "> {topic}</div>
        </div>
        <div className=" flex flex-row justify-start items-center w-full  whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-3 px-2 pb-2"            >
            目录：
        </div>


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