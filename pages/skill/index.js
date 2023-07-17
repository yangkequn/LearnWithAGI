/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import Divider from '@mui/material/Divider';
import QAComponent from "./QAComponent";
import SkillTree from "./SkillTree";
import Rewards from "./Rewards";
import Socratics from "./Socratics";
import AppFrame from "../../component/appFrame"
import { useParams, useRouter } from "next/navigation";
import { API, HMGET } from "../../component/api";
import { GlobalContext } from "../_app";
import ContextComponent, { Context } from "./Context"
import { Jwt } from "../../component/jwt";
//https://github.com/JedWatson/react-select

function ExploreComponent({ topic }) {
    const router = useRouter()
    const { setMenuL2, creditTM, setCreditTM } = useContext(GlobalContext)
    const { skillTree, setSkillTree, skillTreeSelected, setSkillTreeSelected, skillMyTrace, setSkillMyTrace, skillPoint, setSkillPoint } = useContext(Context)
    useEffect(() => {
        if (!topic) return router.push("/")
    }, [])

    //fetch SKillMyTrace according to SkillTree
    useEffect(() => {
        if (skillTree?.length == 0) return
        if (!Jwt.Get().IsValid()) return
        let names = skillTree.map((skill) => `${skill.Name}:${skill.Detail}`)
        !!names && names.length > 0 && HMGET("SkillMyTrace:@id", names).then((res) => {
            //zip names and res to dict
            if (names.length != res?.length) return
            var _res = {}
            for (var i = 0; i < names.length; i++) {
                _res[names[i]] = res[i]
            }
            let _myTrace = { ...skillMyTrace, ..._res }
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

            <div key="reward" className="flex flex-row overflow-hidden w-full items-center justify-between">
                <Rewards creditTM={creditTM}></Rewards>
            </div>
        </div>)
    }, [creditTM])
    return <div className="flex flex-row h-full w-full justify-between bg-cover bg-no-repeat bg-center " style={{
        backgroundImage: "url(/MAUL0r_Reme_kawaii_anime_cumulonimbus_happily_floating_through__01999efc-f065-4823-bf48-40be9c285ec5.png)"
        //use boxShadow to create a shadow of 50% opacity
        , boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.75)"
    }}>

        <SkillTree topic={topic} />
        {/* 大板块分割线 */}
        <Divider sx={{ height: "100%", m: 0.5 }} orientation="vertical" />
        <Socratics topic={topic}></Socratics>
        {/* right side panel */}

        {/* 大板块分割线 */}
        <Divider sx={{ height: "100%", m: 0.5 }} orientation="vertical" />
        {/* 底部的搜索结果,immerse chatbox */}
        <QAComponent setCreditTM={setCreditTM} topic={topic}></QAComponent>

    </div >

}

export default function Home({ topic }) {
    return <ContextComponent><AppFrame >
        <ExploreComponent topic={topic}></ExploreComponent>
    </AppFrame></ContextComponent>
}
export const getServerSideProps = async (context) => {
    return {
        props: {
            topic: context.query.t ?? ""
        }
    }
}