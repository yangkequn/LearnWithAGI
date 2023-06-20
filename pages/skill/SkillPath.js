/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import { Button, Step, StepContent, StepLabel, Stepper, Typography, } from "@mui/material";
import { Box } from "@mui/system";
import { API, HGET } from "../../component/api";
export const SkillPath = ({ topic, SkillPaths, setSkillPaths, skillPathSelected, setSkillPathSelected }) => {
    //auto select the first uncompleted skill path
    useEffect(() => {
        API("SkillPath", { Name: topic }).then((res) => {
            if (!res || res.length == 0) return
            //sort res by rank
            res.sort((a, b) => a.Rank - b.Rank)
            setSkillPaths(res);

            //set default skillPathSelected
            for (var i = 0; i < res.length; i++) {
                if (Complete(res[i]) >= 2) continue
                setSkillPathSelected(i)
                break
            }
            setSkillPathSelected(res.length - 1)
        })
    }, [])
    const Complete = (skillPath) => (skillPath.Correct + skillPath.Ask)


    {/* 相关的主题 */ }
    return <div className="flex flex-col justify-start items-start w-full h-full overflow-scroll gap-3"    >
        <Button>
            <Typography variant="h4" sx={{ fontWeight: 600, fontSize: 18, color: "#333", width: "100%", fontFamily: "Roboto, Arial, sans-serif", lineHeight: "22px", margin: "6px 0px", gap: "10px" }}>
                主题展开
            </Typography>
        </Button>
        {skillPathSelected >= 0 && <Stepper orientation="vertical" className="flex w-full break-all whitespace-nowrap h-fit" Steps={SkillPaths.length} activeStep={skillPathSelected}>
            {
                !!SkillPaths && SkillPaths.map((Point, seq) => {
                    return <Step key={`skillPath${seq}`} className="flex flex-col justify-start items-start w-full h-fit overflow-scroll whitespace-nowrap min-h-max"
                        sx={{
                            margin: "-5px 0 -5px 0",
                            //when mouse is over, change background color
                            ":hover": { backgroundColor: "#e8e8e8" }
                            //if index equals nextSkill, change box shadow
                            , boxShadow: seq == skillPathSelected ? "inset 0px 0px 0px 200px gold" : "none"
                        }} onClick={(e) => {
                            if (skillPathSelected > 0 && (SkillPaths[skillPathSelected]?.Path[0] === Point.Path[0])) return
                            setSkillPathSelected(seq)
                        }}
                        StepContent={true}
                    >
                        <StepLabel sx={{ margin: "-5px 0 -5px 0" }} className="flex flex-row justify-start items-start w-full  whitespace-nowrap">
                            <div className="flex flex-row justify-start items-start gap-2  w-full  overflow-hidden whitespace-nowrap" >
                                <div>难度:{Point.Rank}</div>
                                <div>完成:{Complete(Point) >= 2 ? "✅" : Complete(Point)}</div>
                                <div>
                                    {
                                        Point.Path.slice(0, 1).map((path, index) => <div
                                            sx={{ backgroundColor: index % 2 == 0 ? "#f5f5f5" : "#d8d8d8" }}
                                            className="flex flex-row justify-start items-start w-full  whitespace-wrap overflow-visible text-ellipsis text-base text-gray-700 font-sans font-medium leading-6 gap-3" >
                                            {path.split(":")[0]}
                                        </div>
                                        )
                                    }</div>
                            </div>
                        </StepLabel>
                        <StepContent>
                            <div className="flex flex-row justify-start items-start w-full  whitespace-nowrap text-base text-gray-700" >
                                {Point.Path.slice(1).map((path) => path.split(":")[0]).join(" / ")}
                            </div>
                        </StepContent>

                    </Step>
                })
            }
        </Stepper>}
    </div >
}