/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import Divider from '@mui/material/Divider';
import QAComponent from "./QAComponent";
import SkillTree from "./_SkillTree";
import Rewards from "./Rewards";
import DemoTalk from "./_DemoTalk";
import AppFrame from "../../component/appFrame"
import { useParams, useRouter } from "next/navigation";
import { API, HGET, HGETALL, HKEYS, HMGET, ZCARD, ZREVRANGE } from "../../component/api";
import { GlobalContext } from "../_app";
import ContextComponent, { Context } from "./Context"
import { Jwt } from "../../component/jwt";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import HistoryTopics from "./historyTopics";
import TreeList from "./TreeLIst";
import AskAnswer from "./AskAnswer";
import DemoContextComponent, { DemoContext } from "./_DemoContext";
import { parse } from "path";
//https://github.com/JedWatson/react-select

export const LoadingComponent = ({ Text }) => {
    return (
        <div className="flex justify-center items-center min-h-screen space-x-4">
            <div className="loader w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <div className="text-3xl text-blue-500">{Text}</div>
        </div>
    );
}
export const GreenCircle = () => <svg className="w-5 h-5" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" ><circle fill="#78B159" cx="18" cy="18" r="18"></circle></svg>
export const RedCircle = () => <svg className="w-5„ h-5" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" ><circle fill="#ed4c5c" cx="18" cy="18" r="18"></circle></svg>
export function ExploreComponent() {
    const router = useRouter()
    const { setMenuL2, creditTM, setCreditTM } = useContext(GlobalContext)
    const [volume, setVolume] = useState(0.5)
    const [playbackRate, setPlaybackRate] = useState(1)
    const { TopicName, setTopicName, skillTree, setSkillTree, skillMyTrace, setSkillMyTrace, skillSessionNum, setskillSessionNum, SessionName } = useContext(Context)
    const { ShowDemo, ShowAskAnswer, ShowQA, setShowDemo, setShowAskAnswer, setShowQA } = useContext(Context)
    const { Params } = useContext(GlobalContext)
    useEffect(() => {
        const { t, sn } = Params;
        // Since useRouter will only be invoked inside useEffect, it's ensured to run on the client side only
        if (!!t) setTopicName(t);
        //set session number
        if (!!sn && parseInt(sn) >= 0) setskillSessionNum(parseInt(sn));
    }, [Params]);



    const [RelatedSkills, setRelatedSkills] = useState([])
    useEffect(() => {
        API("SkillSearch", { Name: TopicName }).then((data) => {
            //if data of null or not array, then return
            if (!data || !Array.isArray(data)) return

            //skillNames setted after SkillTrees, to avoid early render
            var names = data.map((item) => item.Name + ":" + item.Detail)
            names = [...new Set(names)]
            setRelatedSkills(names)

        })
    }, [TopicName])

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

            <div className="flex flex-row gap-4 items-center justify-between mr-4 ">

                <button className="flex flex-row items-center gap-2 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded transition duration-300 ease-in-out border border-gray-400 hover:border-gray-500" onClick={() => setShowDemo(!ShowDemo)}>
                    <div className="text-lg font-medium">讲解</div>
                    <div>{ShowDemo ? <GreenCircle /> : <RedCircle />}</div>
                </button>

                <button className="flex flex-row items-center gap-2 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded transition duration-300 ease-in-out border border-gray-400 hover:border-gray-500" onClick={() => setShowAskAnswer(!ShowAskAnswer)}>
                    <div className="text-lg font-medium">深问</div>
                    <div>{ShowAskAnswer ? <GreenCircle /> : <RedCircle />}</div>
                </button>

                <button className="flex flex-row items-center gap-2 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded transition duration-300 ease-in-out border border-gray-400 hover:border-gray-500" onClick={() => setShowQA(!ShowQA)}>
                    <div className="text-lg font-medium">练习</div>
                    <div>{ShowQA ? <GreenCircle /> : <RedCircle />}</div>
                </button>

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
                        {volume !== 0.0 && <div onClick={() => { window.lastVolume = volume; setVolume(0) }} >
                            <svg fill="#000000" className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.43,4.1a1,1,0,0,0-1,.12L6.65,8H3A1,1,0,0,0,2,9v6a1,1,0,0,0,1,1H6.65l4.73,3.78A1,1,0,0,0,12,20a.91.91,0,0,0,.43-.1A1,1,0,0,0,13,19V5A1,1,0,0,0,12.43,4.1ZM11,16.92l-3.38-2.7A1,1,0,0,0,7,14H4V10H7a1,1,0,0,0,.62-.22L11,7.08ZM19.66,6.34a1,1,0,0,0-1.42,1.42,6,6,0,0,1-.38,8.84,1,1,0,0,0,.64,1.76,1,1,0,0,0,.64-.23,8,8,0,0,0,.52-11.79ZM16.83,9.17a1,1,0,1,0-1.42,1.42A2,2,0,0,1,16,12a2,2,0,0,1-.71,1.53,1,1,0,0,0-.13,1.41,1,1,0,0,0,1.41.12A4,4,0,0,0,18,12,4.06,4.06,0,0,0,16.83,9.17Z" /></svg>
                        </div>}
                        {volume === 0.0 && <div onClick={() => setVolume(window.lastVolume)} >
                            <svg fill="#000000" className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.43,4.1a1,1,0,0,0-1,.12L6.65,8H3A1,1,0,0,0,2,9v6a1,1,0,0,0,1,1H6.65l4.73,3.78A1,1,0,0,0,12,20a.91.91,0,0,0,.43-.1A1,1,0,0,0,13,19V5A1,1,0,0,0,12.43,4.1ZM11,16.92l-3.38-2.7A1,1,0,0,0,7,14H4V10H7a1,1,0,0,0,.62-.22L11,7.08ZM19.91,12l1.8-1.79a1,1,0,0,0-1.42-1.42l-1.79,1.8-1.79-1.8a1,1,0,0,0-1.42,1.42L17.09,12l-1.8,1.79a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l1.79-1.8,1.79,1.8a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" /></svg>
                        </div>}
                    </div>
                    <input type="range" min="0" max="1" step="0.1" value={volume} onChange={(e) => setVolume(e.target.value)} />
                </div>
            </div>
        </div>)
    }, [creditTM, volume, RelatedSkills, playbackRate, ShowDemo, ShowAskAnswer, ShowQA])
    return <div className="flex flex-row h-full w-full justify-between bg-cover bg-no-repeat bg-center " style={{
        //我有一个学习网站，我希望得到一张作为背景的图片,使得阅读时候有一点灵动的感觉。以使得网站背景不会太过无聊。这个图片有干净的天空，一朵淡淡的云，一个小女孩。整个图片是漫画，看起来是宫崎骏的风格。
        backgroundImage: "url(/bg03.webp)"
        //use boxShadow to create a shadow of 50% opacity
        , boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.75)"
    }}>
        <div className="flex flex-col h-full max-w-[390px] overflow-y: auto">
            <SkillTree />
            <TreeList></TreeList>
        </div>
        {/* 大板块分割线 */}
        <div title="divider" className="h-full bg-gray-400 w-[2px] my-[4px] mx-1"></div>
        {ShowDemo && <DemoTalk volume={volume} playbackRate={playbackRate}></DemoTalk>}
        {/* right side panel */}

        {
            ShowAskAnswer && <AskAnswer />
        }
        {/* 大板块分割线 */}
        {ShowQA && <div title="divider" className="h-full bg-gray-400 w-[2px] my-[4px] mx-1"></div>}
        {/* 底部的搜索结果,immerse chatbox */}
        {ShowQA && <QAComponent setCreditTM={setCreditTM} volume={volume}></QAComponent>}

    </div >

}

export default function Home({ }) {

    return (
        <ContextComponent>
            <AppFrame>
                <DemoContextComponent>
                    <ExploreComponent></ExploreComponent>
                </DemoContextComponent>
            </AppFrame>
        </ContextComponent>
    );
}
export async function getStaticProps() {
    return {
        props: {}
    };
}