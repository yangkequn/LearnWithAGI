/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"

import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";

import { Box } from "@mui/system";
import { API, HGET } from "../../component/api";
import Checkbox from '@mui/material/Checkbox';
import { Context } from "./Context";
export default function SkillTree({ topic }) {
    const { skillTree, setSkillTree, skillTreeSelected, setSkillTreeSelected, skillMyTrace, setSkillMyTrace, skillPoint, setSkillPoint } = useContext(Context)

    //auto sort the skill paths 
    const SortSkillTree = (skillTree) => {
        if (!skillTree || skillTree?.length == 0) return skillTree
        skillTree.sort((a, b) => {
            let p1 = [...a.Path], p2 = [...b.Path]
            p1.reverse(); p2.reverse()
            return (a.Rank - b.Rank) + (p1.join("") <= p2.join("") * 100)
        })
        return [...skillTree]
    }
    //auto load skillTree
    useEffect(() => {
        HGET("SkillTree", topic).then((res) => {
            if (!res || res.length == 0) return
            //keeps only leafs, which means items.length == 0
            let leafs = res.filter((item) => !item.Items || item.Items.length == 0)
            setSkillTree(leafs);
        })
        // API("SkillTree", { Name: topic }).then((res) => {
        //     if (!res || res.length == 0) return
        //     //sort res by rank
        //     //res = SortSkillTree(res)
        //     setSkillTree(res);
        // })
    }, [])

    //auto select the first uncompleted skill path as default
    useEffect(() => {
        //allow set only once. in order to avoid disturbing user
        if (skillTreeSelected >= 0) return
        for (var i = 0; i < skillTree.length; i++) {
            if (Complete(skillMyTrace[skillTree[i].Name + ":" + skillTree[i].Detail]) >= 2) continue
            return setSkillTreeSelected(i)
        }
    }, [skillTree, skillMyTrace])


    const Complete = (myTrace) => {
        if (!myTrace) return 0
        let correctAsks = myTrace.Asks?.length ?? 0, correctQAs = myTrace.QAs?.filter((qa) => qa.indexOf("|||0") > 0)?.length ?? 0
        return (correctAsks / 2) + correctQAs
    }

    {/* 相关的主题 */ }
    return <div className="flex flex-col justify-start items-start w-full h-full overflow-scroll gap-1 max-w-lg"    >
        <div key="title" className="flex flex-row pt-1 whitespace-normal text-lg bg-yellow-50 w-full rounded pl-2 gap-2" >
            <div className=" font-semibold ">课程</div>
            <div className=" font-semibold "> {topic}</div>
        </div>
        <div className=" flex flex-row justify-start items-center w-full  whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-3 px-2 pb-2"            >
            目录：
        </div>


        {skillTreeSelected >= 0 && skillTree?.length > 0 && <Stepper orientation="vertical" className="flex w-full break-all whitespace-nowrap h-fit" activeStep={skillTreeSelected}>
            {
                !!skillTree && skillTree.map((Point, seq) => {
                    return <Step key={`skillTree${seq}`} className="flex flex-col justify-start items-start w-full h-fit overflow-scroll whitespace-nowrap min-h-max"
                        sx={{
                            margin: "-5px 0 -15px 0",
                            //when mouse is over, change background color
                            ":hover": { backgroundColor: "#e8e8e8" }
                            //if index equals nextSkill, change box shadow
                            , boxShadow: seq == skillTreeSelected ? "inset 0px 0px 0px 200px gold" : "none"
                        }} onClick={(e) => {
                            if (skillTreeSelected > 0 && (skillTree[skillTreeSelected]?.Path[0] === Point.Path[0])) return
                            setSkillTreeSelected(seq)
                        }}
                    // StepContent={true}
                    >
                        <StepLabel sx={{ margin: "-5px 0 -5px 0" }} className="flex flex-row justify-start items-start w-full  whitespace-nowrap">
                            <div className="flex flex-col  items-start gap-2  w-full  overflow-hidden whitespace-nowrap justify-between leading-6 " >

                                <div key="first-row" className="flex  first-row justify-between items-start w-full  whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-3 " >
                                    <div className="flex flex-row justify-start w-full  whitespace-nowrap overflow-visible text-ellipsis text-base text-gray-700 font-sans font-semibold leading-6 gap-3" >
                                        {Point.Path[0].split(":")[0]}
                                    </div>

                                    <div className=" flex flex-row justify-end items-center w-full  whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-3 mr-2" >
                                        <div>难度:{Point.Rank}</div>
                                        <div className="mr-2">{Complete(skillMyTrace[Point.Name + ":" + Point.Detail]) >= 2 ? "✅" : "⬜"}</div>
                                    </div>
                                </div>

                                <div key="second-row" className="flex flex-row justify-start items-start w-full overflow-hidden whitespace-nowrap text-base text-gray-700" >
                                    {
                                        "/ " + [...Point.Path].reverse().slice(1).map((path) => path.split(":")[0]).join(" / ")
                                    }
                                </div>
                            </div>
                        </StepLabel>
                    </Step>
                })
            }
        </Stepper>
        }
    </div >
}