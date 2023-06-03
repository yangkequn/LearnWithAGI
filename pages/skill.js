/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import { Container, Divider, IconButton, InputAdornment, List, ListItem, Paper, Popover, Stack, TextField, Typography, } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Box } from "@mui/system";
import SendIcon from '@mui/icons-material/Send';
import { QAComponent } from "./skill/QAComponent";
import { SkillPath } from "./skill/SkillPath";
import { Rewards } from "./skill/Rewards";
import { SkillFocus } from "./skill/focus.js";
import { Socratics } from "./skill/Socratics";
import { AppFrame } from "../component/AppFrame"
import { useRouter } from "next/navigation";
import { GetStaticProps, GetServerSideProps } from "next";
import { API } from "../component/api";
//https://github.com/JedWatson/react-select

export default function ExploreComponent({ topic }) {
    const [skillPoint, setSkillPoint] = useState({ Name: "", QAs: [] });
    //[{Name,Rank,Path,QAs,Ask,Answer,Correct,Wrong,EmotionValence,EmotionArousal,EmotionDominance},...]
    const [SkillPaths, setSkillPaths] = useState([]);
    const [creditTM, setCreditTM] = useState(0)
    useEffect(() => {
        if (!topic) return
        API("SkillPath", { Name: topic }).then((res) => {
            if (!res || res.length == 0) return
            //sort res by rank
            res.sort((a, b) => a.Rank - b.Rank)
            setSkillPaths(res);
        })
    }, [])
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
    return <AppFrame ><div className="flex flex-row h-full w-full justify-between bg-cover bg-no-repeat bg-center " style={{
        backgroundImage: "url(/MAUL0r_Reme_kawaii_anime_cumulonimbus_happily_floating_through__01999efc-f065-4823-bf48-40be9c285ec5.png)"
        //use boxShadow to create a shadow of 50% opacity
        , boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.75)"
    }}>

        <div className="flex flex-col justify-between items-start w-1/4 h-full overflow-scroll  max-w-screen-sm min-w-min" >
            <Divider sx={{ width: 280, m: 0.5 }} orientation="horizontal" />
            <SkillPath skillPoint={skillPoint} setSkillPoint={setSkillPoint} SkillPaths={SkillPaths} setSkillPaths={setSkillPaths} ></SkillPath>
        </div>

        {/* 大板块分割线 */}
        <Divider sx={{ height: "100%", m: 0.5 }} orientation="vertical" />
        {/* 底部的搜索结果,immerse chatbox */}
        <Box className="flex flex-col justify-start items-start w-full h-full overflow-scroll  max-w-screen-sm min-w-min" >

            <Rewards creditTM={creditTM}></Rewards>

            <QAComponent SkillPoint={skillPoint} setCreditTM={setCreditTM}></QAComponent>


        </Box>

        {/* 大板块分割线 */}
        <Divider sx={{ height: "100%", m: 0.5 }} orientation="vertical" />
        <Socratics SkillPoint={skillPoint} setcreditTM={setCreditTM} SkillPaths={SkillPaths}></Socratics>
        {/* right side panel */}
    </div >
    </AppFrame>
}

export const getServerSideProps = async (context) => {
    return {
        props: {
            topic: context.query.t
        }
    }
}