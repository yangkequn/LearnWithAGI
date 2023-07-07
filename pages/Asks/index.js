/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import { AppFrame } from "../../component/AppFrame";
import { AskContext, AskContextComponent } from "./AskContext"
import { LeftPanel } from "./leftPanel"
//use tailwindcss
import "tailwindcss/tailwind.css"
import { TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { API } from "@/component/api";
import { QuestionAandAnswer } from "./QuestionAandAnswer";

function Asks() {
    return <div className="bg-zinc-200 flex flex-row gap-x-2 w-full justify-start items-start h-full overflow-x-scroll overflow-scroll" >
        <LeftPanel></LeftPanel>
        <QuestionAandAnswer/>
    </div>
}
export default function Home() {
    return <AskContextComponent>        <AppFrame >
        <Asks />
    </AppFrame >    </AskContextComponent>
}