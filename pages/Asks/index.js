/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState } from "react"
import AskContextComponent, { AskContext } from "./AskContext"
import LeftPanel from "./leftPanel"
//use tailwindcss
import "tailwindcss/tailwind.css"
import QuestionAandAnswer from "./QuestionAandAnswer";
import AppFrame from "../../component/AppFrame";

function Asks({ question }) {
    return <div className="bg-zinc-200 flex flex-row gap-x-2 w-full justify-start items-start h-full overflow-x-scroll overflow-scroll" >
        <LeftPanel></LeftPanel>
        <QuestionAandAnswer question={question} />
    </div>
}
export default function Home({ question }) {
    return <AskContextComponent>
        <AppFrame >
            <Asks question={question} />
        </AppFrame >
    </AskContextComponent>
}
export const getServerSideProps = async (context) => {
    return {
        props: {
            question: context.query.q ?? ""
        }
    }
}