/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import Divider from '@mui/material/Divider';
import QAComponent from "./QAComponent";
import SkillTree from "./SkillTree";
import Rewards from "./Rewards";
import Socrates from "./Socrates";
import AppFrame from "../../component/appFrame"
import { useParams, useRouter } from "next/navigation";
import { API, HGET, HGETALL, HKEYS, HMGET, ZCARD, ZREVRANGE } from "../../component/api";
import { GlobalContext } from "../_app";
import ContextComponent, { Context } from "./Context"
import { Jwt } from "../../component/jwt";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import HistoryTopics from "./historyTopics";
//https://github.com/JedWatson/react-select

export const LoadingComponent = ({ Text }) => {
    return (
        <div className="flex justify-center items-center min-h-screen space-x-4">
            <div className="loader w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <div className="text-3xl text-blue-500">{Text}</div>
        </div>
    );
}
export function ExploreComponent() {
    const router = useRouter()
    const { setMenuL2, creditTM, setCreditTM } = useContext(GlobalContext)
    const [volume, setVolume] = useState(0.5)
    const [playbackRate, setPlaybackRate] = useState(1)
    const { topic, setTopic, skillTree, setSkillTree, skillMyTrace, setSkillMyTrace, skillSession, setSkillSession } = useContext(Context)
    const { Params } = useContext(GlobalContext)
    useEffect(() => {
        const { t } = Params;
        // Since useRouter will only be invoked inside useEffect, it's ensured to run on the client side only
        if (!!t) {
            setTopic(t);
            return
        }
    }, [Params]);


    const [RelatedSkills, setRelatedSkills] = useState([])
    useEffect(() => {
        API("SkillSearch", { Name: topic }).then((data) => {
            //if data of null or not array, then return
            if (!data || !Array.isArray(data)) return

            //skillNames setted after SkillTrees, to avoid early render
            var names = data.map((item) => item.Name + ":" + item.Detail)
            names = [...new Set(names)]
            setRelatedSkills(names)
        })
    }, [topic])

    useEffect(() => {
        setMenuL2(<div className="flex justify-between w-full items-center">
            <HistoryTopics></HistoryTopics>
            <FormControl variant="standard" sx={{ ml: 10, minWidth: 155 }}>
                <Select labelId="select-related-topic" id="select-related-topic" value={''} displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }} onChange={(e) => !!e.target.value && router.push(`/skill?t=${e.target.value}`)}>
                    <MenuItem value=""> <em>相关的主题:</em> </MenuItem>
                    {
                        RelatedSkills.map((item, index) => <MenuItem key={`menu-item-${item}`} value={item}>{item}</MenuItem>)
                    }
                </Select>
            </FormControl>


            <div key="reward" className="flex flex-row overflow-hidden w-full items-center justify-between">
                <Rewards creditTM={creditTM} volume={volume}></Rewards>
            </div>
            <div className="flex flex-row   gap-2 items-center justify-between">
                {/* playbackRate */}
                <div title="设置倍速" className="group flex flex-col w-12 h-8 items-center relative z-10 rounded-md opacity-100 mt-1 bg-inherit ">
                    <div className="flex flex-row group-hover:flex items-center self-center rounded-md h-fit bg-inherit">
                        倍速
                    </div>

                    {[0.5, 0.75, 1, 1.25, 1.5, 2, 2.25, 2.5, 2.75, 3].map((value, ind) => (
                        <button key={`speed-${value}-${ind}`} onClick={() => { setPlaybackRate(value) }}
                            className="flex flex-row group-hover:visible invisible items-center space-x-2 hover:bg-gray-200 p-2 rounded-md focus:outline-none" >
                            <span className={playbackRate == value ? " text-blue-400" : ""} >{value === 1 ? "Normal" : value + "x"}</span>
                        </button>
                    ))
                    }
                </div >

                {/* set volume here , and allow mute. a broad cast emoj followed by a slider */}
                <div className="flex flex-row justify-center items-center gap-2 mr-1">
                    <div>音量</div>
                    <div className="flex flex-row justify-center items-center gap-2">
                        {volume !== 0.0 && <div onClick={() => { window.lastVolume = volume; setVolume(0) }} >🔊</div>}
                        {volume === 0.0 && <div onClick={() => setVolume(window.lastVolume)} >🔇</div>}
                    </div>
                    <input type="range" min="0" max="1" step="0.1" value={volume} onChange={(e) => setVolume(e.target.value)} />
                </div>
            </div>
        </div>)
    }, [creditTM, volume, RelatedSkills, playbackRate])
    return <div className="flex flex-row h-full w-full justify-between bg-cover bg-no-repeat bg-center " style={{
        //我有一个学习网站，我希望得到一张作为背景的图片,使得阅读时候有一点灵动的感觉。以使得网站背景不会太过无聊。这个图片有干净的天空，一朵淡淡的云，一个小女孩。整个图片是漫画，看起来是宫崎骏的风格。
        backgroundImage: "url(/bg03.webp)"
        //use boxShadow to create a shadow of 50% opacity
        , boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.75)"
    }}>

        <SkillTree />
        {/* 大板块分割线 */}
        <div title="divider" className="h-full bg-gray-400 w-[2px] my-[4px] mx-1"></div>
        <Socrates volume={volume} playbackRate={playbackRate}></Socrates>
        {/* right side panel */}

        {/* 大板块分割线 */}
        <div title="divider" className="h-full bg-gray-400 w-[2px] my-[4px] mx-1"></div>
        {/* 底部的搜索结果,immerse chatbox */}
        <QAComponent setCreditTM={setCreditTM} volume={volume}></QAComponent>

    </div >

}

export default function Home({ }) {

    return (
        <ContextComponent>
            <AppFrame>
                <ExploreComponent></ExploreComponent>
            </AppFrame>
        </ContextComponent>
    );
}
export async function getStaticProps() {
    return {
        props: {}
    };
}