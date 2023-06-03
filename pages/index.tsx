"use client";
import { AppFrame } from '@/component/AppFrame';
import Image from 'next/image'
import Link from 'next/link';
import "tailwindcss/tailwind.css"

import { use, useContext, useEffect, useState } from 'react';
import { GlobalContext } from './_app';
import { Step, StepLabel, Stepper } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { API, HGET, HGETALL, HKEYS } from '@/component/api';
import { useRouter } from 'next/navigation';
const ListItem = ({ id }) => {
  const Router = useRouter()
  const [data, setData] = useState({
    "Name": "《思考，快与慢》 丹尼尔·卡尼曼",
    "Detail": "《思考，快与慢》 丹尼尔·卡尼曼",
    "Rank": 4000.0,
    "NumActive": 0,
    "NumInactive": 0,
    "NumDone": 0,
    "Items": [
      "系统一与系统二的概念:系统一与系统二是卡尼曼对人的思维方式的划分，其中系统一快速、直观、自动，系统二慢速、理智、需要努力",
      "启发式与偏见:启发式是人们在决策时使用的简化策略或“经验法则”，偏见则是决策中的系统性误差",
      "决策与概率:讨论人们如何根据概率来做决策，以及在这个过程中可能出现的错误"
    ],
    "Ranks": [
      3000.0,
      4000.0,
      5000.0
    ],
    "Weights": [
      3.3333333333333335,
      5.833333333333334,
      7.833333333333334
    ],
    "TotalWeights": 2.726950354609929
  });
  useEffect(() => {
    HGET("SkillPoint", id).then((data) => {
      setData(data)
    }).catch()
  }, [])
  let details = [data.Detail, ...(data.Items ?? [])]
  return <div key="skill-container" className='flex flex-col w-60 h-60 max-h-60 overflow-hidden flex-auto rounded-xl' style={{ boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.25)" }} >

    < div key="title" className={"w-full h-12  bg-yellow-50"}>
      {data.Name}
    </div>
    {/* when hover on this, show the detail,swich between details  */}
    <div key="detail" className={"flex flex-col w-full h-full  overflow-scroll text-sky-700 gap-4 hover:bg-stone-100 "} onClick={
      () => {
        Router.push("/skill?t=" + id)
      }
    }  >
      {
        details.map((item, _) => <div className=''>{item} <br /> </div>)
      }
    </div>
  </div >
}
export default function Home() {
  const [SkillNames, setSkillNames] = useState([]);
  useEffect(() => {
    HKEYS("SkillLibrary").then((data) => {
      setSkillNames(data)
    }).catch()
  }, [])
  return <AppFrame>
    <div className=' h-full'>
      {/* <div>        a search box      </div> */}
      <div key={"search results"} className='flex flex-row columns-7 gap-8 flex-grow pt-2'>
        {SkillNames.map((name, _) => <ListItem key={`skill-item${name}`} id={name} />)}
      </div>
    </div>
  </AppFrame>
}

