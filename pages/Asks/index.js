/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import AskContextComponent, { AskContext } from "./AskContext"
import LeftPanel from "./leftPanel"
import QuestionAandAnswer from "./QuestionAandAnswer";
import AppFrame from "../../component/appFrame";

function Asks() {
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
export const getServerSideProps = async (context) => {
    return {
        props: {
        }
    }
}