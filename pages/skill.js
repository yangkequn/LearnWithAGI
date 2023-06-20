/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import { Container, Divider, IconButton, InputAdornment, List, ListItem, Paper, Popover, Stack, TextField, Typography, } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Box } from "@mui/system";
import SendIcon from '@mui/icons-material/Send';
import { QAComponent } from "./skill/QAComponent";
import { SkillPath } from "./skill/SkillPath";
import { Rewards } from "./skill/Rewards";
import { Socratics } from "./skill/Socratics";
import { AppFrame } from "../component/AppFrame"
import { useParams, useRouter } from "next/navigation";
import { GetStaticProps, GetServerSideProps } from "next";
import { API } from "../component/api";
import { GlobalContext } from "./_app";
//https://github.com/JedWatson/react-select

export default function ExploreComponent({ topic }) {
    const router = useRouter()
    const { setMenuL2 } = useContext(GlobalContext)
    //[{Name,Rank,Path,QAs,Ask,Answer,Correct,Wrong,EmotionValence,EmotionArousal,EmotionDominance},...]
    const [SkillPaths, setSkillPaths] = useState([]);
    const [skillPathSelected, setSkillPathSelected] = useState(-1);
    const [creditTM, setCreditTM] = useState(0)
    useEffect(() => {
        if (!topic) return router.push("/")
    }, [])
    useEffect(() => {
        setMenuL2(reward)
    }, [creditTM])
    const reward = <div className="flex flex-row overflow-hidden w-full items-center justify-between">
        {/* <div>            {skillPoint?.Name}        </div> */}
        <Rewards creditTM={creditTM}></Rewards>
    </div>
    return <AppFrame ><div className="flex flex-row h-full w-full justify-between bg-cover bg-no-repeat bg-center " style={{
        backgroundImage: "url(/MAUL0r_Reme_kawaii_anime_cumulonimbus_happily_floating_through__01999efc-f065-4823-bf48-40be9c285ec5.png)"
        //use boxShadow to create a shadow of 50% opacity
        , boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.75)"
    }}>

        <div className="flex flex-col justify-between items-start w-1/4 h-full overflow-scroll  max-w-screen-sm min-w-min" >
            <Divider sx={{ width: 280, m: 0.5 }} orientation="horizontal" />
            <SkillPath topic={topic} SkillPaths={SkillPaths} setSkillPaths={setSkillPaths}  skillPathSelected={skillPathSelected} setSkillPathSelected={setSkillPathSelected} ></SkillPath>
        </div>

        {/* 大板块分割线 */}
        <Divider sx={{ height: "100%", m: 0.5 }} orientation="vertical" />
        {/* 底部的搜索结果,immerse chatbox */}
        <Box className="flex flex-col justify-start items-start w-full h-full overflow-scroll  max-w-screen-sm min-w-min" >
            <QAComponent SkillPaths={SkillPaths} setSkillPaths={setSkillPaths} skillPathSelected={skillPathSelected} setCreditTM={setCreditTM} topic={topic}></QAComponent>
        </Box>

        {/* 大板块分割线 */}
        <Divider sx={{ height: "100%", m: 0.5 }} orientation="vertical" />
        <Socratics SkillPaths={SkillPaths} setSkillPaths={setSkillPaths} skillPathSelected={skillPathSelected} setcreditTM={setCreditTM} topic={topic}></Socratics>
        {/* right side panel */}
    </div >
    </AppFrame>
}

export const getServerSideProps = async (context) => {
    return {
        props: {
            topic: context.query.t ?? null
        }
    }
}