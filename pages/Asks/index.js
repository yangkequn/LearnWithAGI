/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import AskContextComponent, { AskContext } from "./AskContext"
import LeftPanel from "./leftPanel"
import QuestionAandAnswer from "./QuestionAandAnswer";
import AppFrame from "../../component/appFrame";
import { GlobalContext } from "../_app";
import { API } from "@/component/api";
import { Tooltip } from "@mui/material";

function Asks() {
    const { LoggedIn, RedirectUrl, setRedirectUrl, MenuL2, setMenuL2, quota } = useContext(GlobalContext)
    const { modelGPT, setModelGPT } = useContext(AskContext)

    //set L2Menu
    useEffect(() => {
        setMenuL2(<div></div>)
        // setMenuL2(<div className="flex flex-row justify-center items-center w-full h-full  ">
        //     <div className="flex flex-row max-w-lg gap-4 text-base self-center ">
        //         <div className="self-center rounded-lg px-2 py-1">
        //             选择对话模型
        //         </div>

        //         {/* two radio to  select gpt model gpt-4 or gpt-3.5-turbo */}
        //         <Tooltip title={`今日剩余次数 ChatGPT3.5: ${quota.AllowedDayGPT35} ChatGPT4: ${quota.AllowedDayGPT4}`} placement="right">
        //             <div key={modelGPT} className="flex flex-row gap-4" value={modelGPT}>
        //                 {/* if item selected, then bg-amber-200 */}
        //                 <div className={`flex flex-row items-center gap-1 px-2 rounded-xl ${modelGPT === "gpt-4" && "bg-amber-200"}`} >
        //                     <input type="radio" value="gpt-4" checked={modelGPT === "gpt-4"} disabled={quota.AllowedDayGPT4 <= 0}
        //                         onChange={e => quota.AllowedDayGPT4 > 0 && setModelGPT(e.target.value)} />
        //                     <label htmlFor="gpt-4" >ChatGPT 4</label>
        //                 </div>
        //                 <div className={`flex flex-row items-center gap-1 px-2 rounded-xl ${modelGPT === "gpt-3.5" && "bg-amber-200"}`} >
        //                     <input type="radio" value="gpt-3.5" checked={modelGPT === "gpt-3.5"} disabled={quota.AllowedDayGPT35 <= 0}
        //                         onChange={e => quota.AllowedDayGPT35 > 0 && setModelGPT(e.target.value)} />
        //                     <label htmlFor="gpt-3.5-turbo">ChatGPT 3.5</label>
        //                 </div>
        //             </div>
        //         </Tooltip>

        //     </div>
        // </div >)
    }, [modelGPT, quota])
    return <div id="PageAsk" className="bg-zinc-200 flex flex-row gap-x-2 w-full justify-start items-start h-full overflow-x-scroll overflow-scroll" >
        <LeftPanel />
        <QuestionAandAnswer />
    </div>
}
export default function Home() {
    return <AskContextComponent>
        <AppFrame >
            <Asks />
        </AppFrame >
    </AskContextComponent>
}