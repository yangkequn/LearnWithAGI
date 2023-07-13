import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from "../../pages/_app"
import UserAvatar from '../../pages/Auth/avatar';
import { Jwt } from '../jwt';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import SchoolIcon from '@mui/icons-material/School';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import "tailwindcss/tailwind.css"

const MenuHome = { name: `🏠`, path: "/", icon: <SearchIcon fontSize={'large'} /> }
const MenuAsks = { name: `提问`, path: "/Asks", icon: <ChatIcon fontSize={'large'} /> }
const MenuSkill = { name: `课程`, path: "/skill", icon: <SchoolIcon fontSize={'large'} /> }
const MenuRetro = { name: `回顾`, path: "/Retrospect", icon: null }
const MenuSignIn = { name: `登录`, path: "/Auth", icon: null }
const MenuItems = [MenuRetro]


export default function Navigator() {
  const { LoggedIn, RedirectUrl, setRedirectUrl, MenuL2 } = useContext(GlobalContext)

  const [question, setQuestion] = useState("")
  const router = useRouter()
  const pathName = usePathname()
  useEffect(() => {
    if (!RedirectUrl) return
    router.push(RedirectUrl)
    setRedirectUrl("")
  }, [RedirectUrl, router, setRedirectUrl])

  //dynamic set signin menu's redirect url
  useEffect(() => {
    MenuSignIn.path = "/Auth?page=Login&to=" + pathName
    //if logged in, set menu to null
    if (!LoggedIn && !MenuItems.find(e => e.name == "登录")) MenuItems.push(MenuSignIn)
    else if (LoggedIn && MenuItems.find(e => e.name == "登录")) MenuItems.pop()
  }, [LoggedIn])

  //read jwt from cookie, if not exist, redirect to login page


  return <div id="navigator" className="flex flex-col w-full font-sans font" >

    {/* background-color: #2E4052; */}
    <div id="nagivator-l1" className="bg-slate-300 flex w-full flex-row h-12 items-center whitespace-nowrap justify-center text-white text-2xl" >
      <div key="retrict-width" className='flex flex-row max-w-2xl  min-w-[500px] w-full items-center  gap-2 '>
        <div key="Home" onClick={e => { if (pathName != "/") router.push("/") }} className=' text-3xl h-full w-7 justify-center self-center'>
          {MenuHome.name}
        </div>

        <div key="searchbox-and-icon-buttons" className="flex flex-row h-full w-96 active:w-full hover:w-full items-center gap-2" >
          <div key="question-box" className="flex flex-row  flex-grow py-1 md:pl-4 relative border border-black/10 bg-white
           dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] self-center items-center w-full h-full  "  >
            <div className='flex flex-row w-full active:w-full h-full items-center'>
              <textarea className={`m-0 w-full h-6 border-0 bg-transparent focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-4 pr-20  outline-none self-center overflow-hidden text-base text-gray-700`}
                //    style={{ boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.25)", maxHeight: 200, height: 24, overflowY: "hidden" }}

                value={question}
                placeholder="Ask me anything..."
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.keyCode !== 13) return
                  //if not empty
                  let value = event?.target.value
                  if (!!value) {
                    router.push("/?search=" + value)
                  }
                  // stop propagation
                  e.preventDefault()
                }}
              />
            </div>

            <div key="create-skill" className="absolute right-0 block  text-3xl leading-8 px-1">
              <div className="flex flex-row gap-1 w-fit items-center  text-gray-700 bg-slate-300 h-fit bg-transparent   dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent rounded-lg  border-black hover:bg-orange-200 px-1"
                onClick={e => router.push("/?search=" + question)}>
                <div >📚</div> <div className=' text-lg'>课程</div>
              </div>
            </div>

          </div>

          <div className="flex flex-row gap-1 text-3xl leading-8 items-center  px-1 ml-6 text-gray-700  hover:bg-orange-200 rounded-lg ">
            {/* <div className='w-fit h-full ' >📄</div> */}
            <div className='w-fit h-full' onClick={e => {
              //为避免以极高的误点击率错误提问，禁用直接提问：if (question.length == 0) return router.push("/Asks") else router.push("/Asks?q=" + question)
              router.push("/Asks")
            }} >💬</div> <div className=' text-lg'>对话</div>
          </div>
        </div>

        <div id="nagivator-l1-menuitems " className='flex flex-row self-center max-w-2xl gap-4 '>
          {!!MenuItems && MenuItems.map((item, index) => <Link key={`menu-item-${item.name}`} href={item.path}> <button key={`menu_${item.name}`} onClick={(e) => router.push(item.path)}
            className={` h-full text-lg text-gray-800 w-fit px-2  hover:bg-orange-200 font-sans rounded-lg ${pathName?.toLowerCase().indexOf(item.path.toLowerCase()) >= 0 ? "text-black font-bold bg-orange-200" : ""}`}
          >
            <div className=''>{item.name}</div>
          </button></Link>
          )}

          {/* display avatar if logged in */}
          {LoggedIn && <Link className={" text-zinc-700 h-full text-lg w-fit px-3 items-center"} href={"/Auth/my-profile?to=" + pathName} >
            <UserAvatar userID={Jwt.Pub()} />
          </Link>}
        </div>
      </div>
    </div >

    {/* layer 2 menu */}
    < div id="nagivator-l2 " className=" bg-slate-100 min-h-fit flex flex-row w-full h-9 items-center whitespace-nowrap justify-start text-black text-lg "  >
      {MenuL2}
    </div >

  </div >

}