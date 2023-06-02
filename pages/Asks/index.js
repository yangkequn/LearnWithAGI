/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import { AppFrame } from "../../component/AppFrame";
//use tailwindcss
import "tailwindcss/tailwind.css"

export default function Asks() {
    const [historyTopics, setHistoryTopics] = useState(["艾默生论自立"])
    return <AppFrame ><div className="bg-zinc-200 flex flex-row w-full gap-x-10 justify-start items-start h-full overflow-x-scroll overflow-scroll" >
        <div className={"flex flex-col min-w-250 w-35 bg-zinc-400 border-amber-200 rounded-xl text-base h-full"}>
            <div className="">
                新建聊天
            </div>
            {
                historyTopics.map((topic, index) => {
                    return <div key={index} className="hover:bg-amber-300 flex-row gap-10 items-center p-10 rounded-10 bg-zinc-300"                     >
                        {topic}
                    </div>
                })
            }

        </div>
        <div className="flex flex-col min-w-250 w-80 h-full">
            <div>
                聊天内容
            </div>

        </div>
    </div></AppFrame>
}