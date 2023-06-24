/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import { Button, Step, StepContent, StepLabel, Stepper, Typography, } from "@mui/material";
import { Box } from "@mui/system";
import { API, HGET } from "../../component/api";
import Checkbox from '@mui/material/Checkbox';
export const SkillTree = ({ topic, skillTree, setSkillTree, skillTreeSelected, setSkillTreeSelected, skillMyTrace }) => {
    //auto select the first uncompleted skill path
    useEffect(() => {
        API("SkillTree", { Name: topic }).then((res) => {
            if (!res || res.length == 0) return
            //sort res by rank
            res = SortSkillTree(res)
            setSkillTree(res);

            //set default skillTreeSelected
            for (var i = 0; i < res.length; i++) {
                if (Complete(res[i]) >= 2) continue
                setSkillTreeSelected(i)
                break
            }
            setSkillTreeSelected(res.length - 1)
        })
    }, [])

    //auto sort the skill paths 
    const [sortType, setSortType] = useState("difficulty")
    const SortSkillTree = (skillTree) => {
        if (!skillTree || skillTree?.length == 0) return skillTree
        if (sortType == "difficulty") skillTree.sort((a, b) => {
            let p1 = [...a.Path], p2 = [...b.Path]
            p1.reverse(); p2.reverse()
            return (a.Rank - b.Rank) + ((p1.join("") <= p2.join("")) * 100)
        })
        else if (sortType == "path") skillTree.sort((a, b) => {
            let p1 = [...a.Path], p2 = [...b.Path]
            p1.reverse(); p2.reverse()
            return (a.Rank - b.Rank) + (p1.join("") <= p2.join("") * 5000)
        })
        return [...skillTree]
    }
    useEffect(() => {
        if (!skillTree || skillTree.length == 0) return
        setSkillTree(SortSkillTree(skillTree))
    }, [sortType])

    const Complete = (skillPoint) => {
        let myTrace = skillMyTrace[skillPoint.Name];
        if (!myTrace) return false
        let correctAsks = myTrace.Asks.length, correctQAs = myTrace.QAs.filter((qa) => qa.indexOf("|||0") > 0).length
        return (correctAsks / 2) + correctQAs >= 3
    }

    {/* 相关的主题 */ }
    return <div className="flex flex-col justify-start items-start w-full h-full overflow-scroll gap-1"    >
        <div className=" flex flex-row justify-start items-center w-full  whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-3 px-2 pb-2"            >
            <div className="flex flex-row justify-start items-center w-full  whitespace-nowrap text-base text-sky-600 font-sans font-medium leading-6 gap-3"            >
                {/* add a check box here to show only uncompleted skill paths */}
                <Checkbox sx={{ color: "#333" }} checked={sortType === "difficulty"} onChange={(e) => setSortType("difficulty")} />
                按难度排序
            </div>

            <div className="flex flex-row justify-start items-center w-full  whitespace-nowrap text-base text-sky-600 font-sans font-medium leading-6 gap-3"            >
                {/* add a check box here to show only uncompleted skill paths */}
                <Checkbox sx={{ color: "#333" }} checked={sortType === "path"} onChange={(e) => setSortType("path")} />
                按目录排序
            </div>
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
                                        <div className="mr-2">{Complete(Point) >= 2 ? "✅" : "-"}</div>
                                    </div>
                                </div>

                                <div key="second-row" className="flex flex-row justify-start items-start w-full overflow-hidden whitespace-nowrap text-base text-gray-700" >
                                    {
                                        sortType === "path" ?
                                            [...Point.Path].reverse().slice(1).map((path) => path.split(":")[0]).join(" / ") :
                                            Point.Path.slice(0, Point.Path.length - 1).map((path) => path.split(":")[0]).join(" / ")
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