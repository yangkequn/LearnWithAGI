/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import { Container, Divider, IconButton, InputAdornment, List, ListItem, Paper, Popover, Stack, TextField, Typography, } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Box } from "@mui/system";
import SendIcon from '@mui/icons-material/Send';
import { QAComponent } from "./skill/QAComponent";
import { SkillTree } from "./skill/SkillTree";
import { Rewards } from "./skill/Rewards";
import { Socratics } from "./skill/Socratics";
import { AppFrame } from "../component/AppFrame"
import { useParams, useRouter } from "next/navigation";
import { GetStaticProps, GetServerSideProps } from "next";
import { API, HMGET } from "../component/api";
import { GlobalContext } from "./_app";
//https://github.com/JedWatson/react-select

export default function ExploreComponent({ topic }) {
    const router = useRouter()
    const { setMenuL2 } = useContext(GlobalContext)
    //[{Name,Rank,Path,QAs,Ask,Answer,Correct,Wrong,EmotionValence,EmotionArousal,EmotionDominance},...]
    const [skillTree, setSkillTree] = useState([]);
    const [skillTreeSelected, setSkillTreeSelected] = useState(-1);

    //key skillPoint name, value is the skillMyTrace{QAs,Asks}
    //for each line of QA, the first is question, the second is answer,seperated by |||. the answer is 0 or 1 or 2 or 3
    //for each line of Asks, the first is question, the second is answer,seperated by |||
    const [skillMyTrace, setSkillMyTrace] = useState({});
    const [skillPoint, setSkillPoint] = useState(null)

    const [creditTM, setCreditTM] = useState(0)
    useEffect(() => {
        if (!topic) return router.push("/")
    }, [])

    //fetch SKillMyTrace according to SkillTree
    useEffect(() => {
        if (skillTree?.length == 0) return
        let names = skillTree.map((skill) => `${skill.Name}:${skill.Detail}`)
        !!names && names.length > 0 && HMGET("SkillMyTrace:@id", names).then((res) => {
            let _myTrace = { ...skillMyTrace, ...res }
            setSkillMyTrace(_myTrace)
        })
    }, [skillTree])

    //set SkillPoint according to skillTreeSelected
    useEffect(() => {
        if (skillTreeSelected < 0 || !skillTree || skillTreeSelected >= skillTree.length) return setSkillPoint(null)
        setSkillPoint(skillTree[skillTreeSelected])
    }, [skillTree, skillTreeSelected])

    useEffect(() => {
        setMenuL2(<div className="flex justify-between w-full items-center">
            <div key="title" className="flex flex-row pt-2 ml-4  whitespace-nowrap text-base" > 主题:<div className=" font-semibold "> {topic}</div>                        </div>
            <div key="reward" className="flex flex-row overflow-hidden w-full items-center justify-between">
                <Rewards creditTM={creditTM}></Rewards>
            </div>
        </div>)
    }, [creditTM])
    return <AppFrame ><div className="flex flex-row h-full w-full justify-between bg-cover bg-no-repeat bg-center " style={{
        backgroundImage: "url(/MAUL0r_Reme_kawaii_anime_cumulonimbus_happily_floating_through__01999efc-f065-4823-bf48-40be9c285ec5.png)"
        //use boxShadow to create a shadow of 50% opacity
        , boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.75)"
    }}>

        <div className="flex flex-col justify-between items-start w-1/4 h-full overflow-scroll  max-w-screen-sm min-w-min" >
            <Divider sx={{ width: 280, m: 0.5 }} orientation="horizontal" />
            <SkillTree topic={topic} skillTree={skillTree} setSkillTree={setSkillTree} skillTreeSelected={skillTreeSelected} setSkillTreeSelected={setSkillTreeSelected}
                skillMyTrace={skillMyTrace} />
        </div>

        {/* 大板块分割线 */}
        <Divider sx={{ height: "100%", m: 0.5 }} orientation="vertical" />
        {/* 底部的搜索结果,immerse chatbox */}
        <Box className="flex flex-col justify-start items-start w-full h-full overflow-scroll  max-w-screen-sm min-w-min" >
            {!!(skillPoint?.Name) && <QAComponent skillPoint={skillPoint} skillMyTrace={skillMyTrace} setSkillMyTrace={setSkillMyTrace} setCreditTM={setCreditTM} topic={topic}></QAComponent>}
        </Box>

        {/* 大板块分割线 */}
        <Divider sx={{ height: "100%", m: 0.5 }} orientation="vertical" />
        <Socratics skillPoint={skillPoint} skillMyTrace={skillMyTrace} setSkillMyTrace={setSkillMyTrace} setcreditTM={setCreditTM} topic={topic}></Socratics>
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