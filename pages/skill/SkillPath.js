/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import { Button, Step, StepContent, StepLabel, Stepper, Typography, } from "@mui/material";
import { Box } from "@mui/system";
import { API, HGET } from "../../component/api";
export const SkillPath = ({ skillPoint, setSkillPoint, SkillPaths }) => {
    useEffect(() => {
        //auto roll to the latest uncompleted skill path
        if (!SkillPaths || SkillPaths.length <= 1) return
        var selectedIndex = 0
        for (var i = 0; i < SkillPaths.length; i++) {
            if (Complete(SkillPaths[i]) >= 2) continue
            selectedIndex = i
            break
        }
        setSelectedSkillPath(selectedIndex)
        //auto load the first skill point
        if (!skillPoint || !skillPoint.Name) {
            LoadSkillPoint(SkillPaths[selectedIndex].Path[0])
        }
        //preload next skill point
        if (selectedIndex + 1 < SkillPaths.length) {
            API("SkillQAs", { Name: SkillPaths[selectedIndex + 1].Path[0] })
            API("SkillSocratic", { Name: SkillPaths[selectedIndex + 1].Path[0] })

        }
    }, [SkillPaths])

    const LoadSkillPoint = (skllName) => API("SkillQAs", { Name: skllName }).then((res) => { setSkillPoint({ Name: skllName, QAs: res }) })
    const Complete = (skillPath) => (skillPath.Correct + skillPath.Ask)


    const [selectedSkillPath, setSelectedSkillPath] = useState(0);
    {/* 相关的主题 */ }
    return <Box sx={{
        display: "flex", width: "100%", height: "100%"
        //row first then column
        , flexDirection: "column", gap: "10px", alignItems: "flex-start", justifyContent: "flex-start"
        //horizontal scrollable
        , overflowX: "scroll", overflowY: "scroll"

    }}>
        <Button>
            <Typography variant="h4" sx={{ fontWeight: 600, fontSize: 18, color: "#333", width: "100%", fontFamily: "Roboto, Arial, sans-serif", lineHeight: "22px", margin: "6px 0px", gap: "10px" }}>
                主题展开
            </Typography>
        </Button>
        <Stepper sx={{
            display: "flex", width: "100%"
            //multiple line text
            , wordBreak: "break-all"
            //single line
            , flexWrap: "nowrap"
        }} orientation="vertical"
            Steps={SkillPaths.length} activeStep={selectedSkillPath}
        >
            {
                !!SkillPaths && SkillPaths.map((Point, seq) => {
                    return <Step key={`skillPath${seq}`}
                    sx={{
                        display: "flex"
                        //when mouse is over, change background color
                        , ":hover": { backgroundColor: "#e8e8e8" }
                        //2 column
                        , flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start"
                        //100% width
                        , width: "100%"
                        //single line
                        , flexWrap: "nowrap"
                        //if index equals nextSkill, change box shadow
                        , boxShadow: seq == selectedSkillPath ? "inset 0px 0px 0px 200px gold" : "none"
                    }} onClick={
                        (e) => {
                            if (!!skillPoint && skillPoint.Name == Point.Path[0]) return
                            LoadSkillPoint(Point.Path[0])
                            setSelectedSkillPath(seq)
                        }}
                    >
                        <StepLabel sx={{
                            //horizontal layout, and single line
                            display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start"
                            //single line
                            , flexWrap: "nowrap"
                            , margin: seq == 0 ? "-0px 0px -15px 0" : "-15px 0px"
                            , width: "100%"
                        }}>
                            <Box sx={{
                                display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: "10px"
                                , marginTop: "-2px"
                                , whiteSpace: "nowrap"
                                , overflow: "hidden"
                            }}>
                                <div>难度:{Point.Rank}</div>
                                <div>完成:{Complete(Point) >= 2 ? "✅" : Complete(Point)}</div>
                                {
                                    Point.Path.slice(0, 1).map((path, index) => <Typography variant="h4" sx={{
                                        fontWeight: 600, fontSize: 18, color: "#333"
                                        , backgroundColor: index % 2 == 0 ? "#f5f5f5" : "#d8d8d8"
                                        , fontFamily: "Roboto, Arial, sans-serif", lineHeight: "22px", margin: "6px 0px", gap: "10px"
                                        , backgroundColor: index % 2 == 0 ? "#f5f5f5" : "#d8d8d8"
                                        // multiple line text if overflow
                                        , whiteSpace: "wrap", overflow: "visible", textOverflow: "ellipsis"
                                    }}>
                                        {path.split(":")[0]}

                                    </Typography>
                                    )
                                }
                            </Box>
                        </StepLabel>
                        <StepContent>
                            <Typography sx={{
                                //font color black
                                color: "#333", width: "100%"
                                //single line
                                , flexWrap: "nowrap"
                                //font size 18
                                , fontSize: 18
                            }}
                            >{Point.Path.slice(1).map((path) => path.split(":")[0]).join(" / ")}</Typography>
                        </StepContent>

                    </Step>
                })
            }
        </Stepper>
    </Box >
}