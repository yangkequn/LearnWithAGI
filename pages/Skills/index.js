/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import { Container, Divider, IconButton, InputAdornment, List, ListItem, Paper, Popover, Stack, TextField, Typography, } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Box } from "@mui/system";
import SendIcon from '@mui/icons-material/Send';
import { QAComponent } from "./QAComponent";
import { SkillPath } from "./SkillPath";
import { Rewards } from "./Rewards";
import { SkillFocus } from "./focus.js";
import { Socratics } from "./Socratics";
import { AppFrame } from "../../component/AppFrame"
//https://github.com/JedWatson/react-select

export default function ExploreComponent() {

    const [skillPoint, setSkillPoint] = useState({ Name: "", QAs: [] });
    //[{Name,Rank,Path,QAs,Ask,Answer,Correct,Wrong,EmotionValence,EmotionArousal,EmotionDominance},...]
    const [SkillPaths, setSkillPaths] = useState([]);
    const [creditTM, setCreditTM] = useState(0)
    useEffect(() => {
        if (creditTM <= 0) return
        //for skillPath in SkillPaths, if skillPath.Path[0] == SkillPoint.Name, then skillPath.Correct++
        setSkillPaths(SkillPaths.map((skillPath) => {
            if (skillPath.Path[0] == skillPoint.Name) {
                skillPath.Correct++
                skillPath.Answer++
            }
            return skillPath
        }))

    }, [creditTM])
    return <AppFrame ><Container sx={{
        display: "flex", flexDirection: "row", height: "100%", justifyContent: "space-between"
        //backgroundimage /Users/yang/iam26/www/public/MAUL0r_Reme_kawaii_anime_cumulonimbus_happily_floating_through__01999efc-f065-4823-bf48-40be9c285ec5.png
        , backgroundImage: "url(/MAUL0r_Reme_kawaii_anime_cumulonimbus_happily_floating_through__01999efc-f065-4823-bf48-40be9c285ec5.png)", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"
        //use boxShadow to create a shadow of 50% opacity
        , boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.75)"
    }} maxWidth={false} >

        <Box sx={{
            display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", width: "25%", minWidth: 300, height: "100%"
            //height 100%, and scrollable
            , height: "100%", overflow: "scroll"
        }}>
            <SkillFocus></SkillFocus>
            <Divider sx={{ width: 280, m: 0.5 }} orientation="horizontal" />
            <SkillPath skillPoint={skillPoint} setSkillPoint={setSkillPoint} SkillPaths={SkillPaths} setSkillPaths={setSkillPaths} ></SkillPath>
        </Box>

        {/* 大板块分割线 */}
        <Divider sx={{ height: "100%", m: 0.5 }} orientation="vertical" />
        {/* 底部的搜索结果,immerse chatbox */}
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", maxWidth: 900, justifyContent: "flex-start", alignItems: "flex-start" }}>

            <Rewards creditTM={creditTM}></Rewards>

            <QAComponent SkillPoint={skillPoint} setCreditTM={setCreditTM}></QAComponent>


        </Box>

        {/* 大板块分割线 */}
        <Divider sx={{ height: "100%", m: 0.5 }} orientation="vertical" />
        <Socratics SkillPoint={skillPoint} setcreditTM={setCreditTM} SkillPaths={SkillPaths}></Socratics>
        {/* right side panel */}
    </Container >
    </AppFrame>

}

