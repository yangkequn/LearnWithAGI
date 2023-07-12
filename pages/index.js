"use client";
import AppFrame from '../component/appFrame';
import Image from 'next/image'
import Link from 'next/link';
import "tailwindcss/tailwind.css"

import { use, useContext, useEffect, useState } from 'react';
import { GlobalContext } from './_app';
import { Step, StepLabel, Stepper } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { API, HGET, HGETALL, HKEYS } from '../component/api';
import { useRouter } from 'next/navigation';
const ListItem = ({ id }) => {
  const Router = useRouter()
  const [data, setData] = useState({
    Name: "", Detail: "", "Rank": 4000.0, "NumActive": 0, "NumInactive": 0, "NumDone": 0, "Items": [],
    "Ranks": [.0, 4000.0, 5000.0], "Weights": [3.3333333333333335, 5.833333333333334, 7.833333333333334], "TotalWeights": 2.726950354609929
  });
  useEffect(() => {
    HGET("SkillPoint", id).then((data) => !!data && setData(data))
  }, [])
  let details = [data.Detail, ...(data.Items ?? [])]
  return data.Name != "" && <div key="skill-container" className='flex flex-col w-60 h-60 max-h-60 max-w-md flex-auto rounded-xl'
    style={{ boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.25)", minWidth: 330 }} >

    < div key="title" className={"w-full h-12  bg-yellow-50  rounded-t-xl p-1"}>      {data.Name}    </div>
    {/* when hover on this, show the detail,swich between details  */}
    <div key="detail" className={"flex flex-col w-full h-full  overflow-scroll text-sky-700 gap-4 hover:bg-stone-100 p-1"} onClick={() => Router.push("/skill?t=" + id)}  >
      {
        details.map((item, _) => <div key={`skill-topic-${item}`} className=''>{item} <br /> </div>)
      }
    </div>
  </div >
}
export default function Home({ search }) {
  const { LoggedIn, RedirectUrl, setRedirectUrl, MenuL2, setMenuL2 } = useContext(GlobalContext)
  const Router = useRouter()
  const [SkillNames, setSkillNames] = useState([]);
  const CreateSkill = (content) => {
    const loadSkill = () => {
      API("Skill", { Name: content, Action: "add" }).then((rsb) => {
        if (!!rsb?.Name) {
          Router.push("/skill?t=" + content)
        } else if (rsb == "loading") {
          setMenuL2(<div className='flex flex-row w-full gap-12 mx-4'><div>正在创建技能，请稍后</div><div className='text-lg font-bold  text-yellow-700 hover:bg-orange-200 rounded-md px-2 ' onClick={loadSkill}> 继续让AI创建课程: {content}</div></div>)
          //setTimeout(loadSkill, 100 * 1000)
        } else if (rsb == "notAllowed") {
          setMenuL2(<div className='flex flex-row w-full gap-12 mx-4'><div>创建技能失败，您没有权限</div><div className='text-lg font-bold  text-yellow-700 hover:bg-orange-200 rounded-md px-2 ' onClick={loadSkill}> 让AI创建课程: {content}</div></div>)
        } else if (rsb == "busy") {
          setMenuL2(<div className='flex flex-row w-full gap-12 mx-4'><div>后台任务已达容量上限！</div><div className='text-lg font-bold  text-yellow-700 hover:bg-orange-200 rounded-md px-2 ' onClick={loadSkill}> 继续让AI创建课程: {content}</div></div>)
        }
      })
    }
    return !!content && <div className='flex flex-row f-full items-center justify-between gap-8 mx-4'>
      <div className='text-base font-bold'>对搜索结果不满意？</div>
      <div className='text-lg font-bold  text-yellow-700 hover:bg-orange-200 rounded-md px-2 ' onClick={loadSkill}> 让AI创建课程，需约两分钟: {content}</div>
    </div>
  }

  useEffect(() => {
    if (!search) {
      HKEYS("SkillLibrary").then((data) => { setSkillNames(data) })
    }
    //create a new skill
    //API("SkillLibrary", { Name: search, Action: "add" }).then()
    //search for a skill
    API("SkillLibrary", { Name: search, Action: "search" }).then((data) => {
      //if data of null or not array, then return
      if (!data || !Array.isArray(data)) return
      //take Names from data
      setSkillNames(data.map((item) => item.Name))
    })
    setMenuL2(CreateSkill(search))
  }, [search])
  //create a new skill
  // HSET("SkillLibrary", "《思考，快与慢》 丹尼尔·卡尼曼", JSON.stringify({
  return <AppFrame>
    <div className='w-full h-full px-4 pt-2'>
      <div id="my-skill-list" className=' w-60 rounded '>
        <div className='flex flex-row items-center justify-start w-full'>
          <div className='text-xl font-bold'>以下是搜索结果</div>
        </div>

      </div>
      {/* <div>        a search box      </div> */}
      <div key={"search results"} className='flex flex-row w-full flex-wrap columns-7 gap-8 flex-grow pt-2'>
        {SkillNames?.map((name, _) => <ListItem key={`skill-item${name}`} id={name} />)}
      </div>
    </div>
  </AppFrame>
}
export const getServerSideProps = async (context) => {
  return {
    props: {
      search: context.query.search ?? ""
    }
  }
}

