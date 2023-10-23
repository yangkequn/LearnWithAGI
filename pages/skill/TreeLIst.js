/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"

import Divider from "@mui/material/Divider";


import { API, Cmd, GetUrl, HGET, RspType } from "../../component/api";
import BuildIcon from '@mui/icons-material/Build';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Context } from "./Context"
import { GlobalContext } from "../_app";
import DeleteIcon from '@mui/icons-material/Delete';
import ListIcon from '@mui/icons-material/List';
import { Jwt } from "../../component/jwt";
import { useRouter } from "next/router";
export default function TreeList() {
    const router = useRouter()
    const { skillTree, setSkillTree, skillTreeSelected, setSkillTreeSelected, skillMyTrace, setSkillMyTrace, skillSession, setSkillSession } = useContext(Context)
    const TreeName = () => skillTree?.Name + ":" + skillTree?.Detail
    const [closePlayList, setClosePlayList] = useState(false)
    return skillTree?.TreeList?.length > 0 && !closePlayList &&
        // <div className="flex flex-col ring-2 rounded-md m-2  w-[97%]  p-3 bg-white opacity-90 shadow-md">
        <div className="flex flex-col ring-2 rounded-md m-2  w-[98%]  p-2 bg-white opacity-90 shadow-md max-h-[80vh]">
            <div className="flex flex-row justify-between items-center w-full h-fit mb-2 gap-2" title={skillTree?.TreeListName}>
                <div className="flex flex-row gap-4 font-bold">
                    <ListIcon className="text-blue-500 w-6 h-6"></ListIcon>
                    <div>Play List</div>
                </div>
                <button onClick={() => { setClosePlayList(!closePlayList) }} className="p-1 px-2 hover:bg-gray-200 rounded-xl "                    >
                    X
                </button>
            </div>

            <div className="flex flex-col text-xl font-semibold gap-2 overflow-clip  flex-nowrap whitespace-nowrap" title={skillTree?.TreeListName}>
                <div>{skillTree?.TreeListName}</div>
            </div>


            <div className="flex flex-col bg-gray-50 rounded p-1">
                {skillTree?.TreeList.map((item, index) => (
                    <div key={`skillTree${index}`}
                        className={`flex flex-row justify-start self-center items-center w-full whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-3 px-2 py-1 mb-1 hover:bg-blue-100 rounded ${item === skillTree.Name + ":" + skillTree.Detail && "bg-blue-200"}`}
                        onClick={() => {
                            router.push(`/skill?t=${item}`)
                        }}
                    >
                        <div>                        {index}</div>
                        <div>                        {item}</div>
                    </div>
                ))}
            </div>
        </div>

}