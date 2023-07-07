import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from "../../pages/_app"
import { UserAvatar } from '@/pages/Auth/avatar';
import { Jwt } from '../jwt';
import { Container, Button, Autocomplete, Input } from "@mui/material";

import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import SchoolIcon from '@mui/icons-material/School';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import "tailwindcss/tailwind.css"
import { Login } from '../Auth/login';
import { request } from 'http';



export class MenuStruct {
  constructor(public name: string, public path: string, public icon: any | null) { }
  public isCurrentPath = (pathname: string): boolean => pathname?.toLowerCase().indexOf(this.path.toLowerCase()) >= 0
}

const MenuHome = new MenuStruct("🏠", "/", <SearchIcon fontSize={'large'} ></SearchIcon>)
const MenuAsks = new MenuStruct("提问", "/Asks", <ChatIcon fontSize={'large'} />)
const MenuSkill = new MenuStruct("课程", "/skill", <SchoolIcon fontSize={'large'} />)
const MenuRetro = new MenuStruct(`回顾`, "/Retrospect", null)
const MenuSignIn = new MenuStruct("登录", "/Auth", null)
export const MenuItems: Array<MenuStruct> = [MenuRetro]


export default function Navigator() {

  const { LoggedIn, RedirectUrl, setRedirectUrl, MenuL2 } = useContext(GlobalContext)

  const [activeReinfyMenu, setActiveReinfyMenu] = useState<MenuStruct>(MenuItems[1])

  const [options, setOptions] = useState([]);

  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const pathName = usePathname()
  useEffect(() => {
    if (!RedirectUrl) return
    router.push(RedirectUrl)
    setRedirectUrl("")
  }, [RedirectUrl, router, setRedirectUrl])

  //dynamic set signin menu's redirect url
  useEffect(() => {
    MenuSignIn.path = "/Auth/login?to=" + pathName
    //if logged in, set menu to null
    if (!LoggedIn && !MenuItems.find(e => e.name == "登录")) MenuItems.push(MenuSignIn)
    else if (LoggedIn && MenuItems.find(e => e.name == "登录")) MenuItems.pop()
  }, [LoggedIn])

  //read jwt from cookie, if not exist, redirect to login page


  return <div id="navigator" className="flex flex-col w-full font-sans font" >

    {/* background-color: #2E4052; */}
    <div id="nagivator-l1" className="bg-slate-300 flex w-full flex-row h-12 items-center whitespace-nowrap justify-center text-white text-2xl gap-4 " >
      <div key="retrict-width" className='flex flex-row max-w-2xl  min-w-[500px] w-full '>

        <div key="searchbox-and-icon-buttons" className="flex flex-row h-5 w-96 active:w-full " >
          <div key="question-box" className="flex flex-row  flex-grow py-1 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] self-center items-center  h-5  "  >
            <div className='flex flex-row w-full active:w-full '>
              <textarea className={`m-0 w-full  border-0 bg-transparent focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-4 pr-20   outline-none self-center overflow-hidden text-gray-700 ${loading && " bg-gray-400"}`}
                //    style={{ boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.25)", maxHeight: 200, height: 24, overflowY: "hidden" }}
                style={{ height: 20, ":activef": "width: 200px" }}
                value={question}
                placeholder="Ask me anything..."
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.keyCode !== 13) return
                  //if not empty
                  let value = (event.target as HTMLInputElement).value
                  if (!!value) {
                    router.push("/?search=" + value)
                  }
                  // stop propagation
                  e.preventDefault()
                }}
                disabled={loading}
              />
            </div>
            <div className="absolute right-1 flex flex-row gap-3 text-3xl leading-8   px-1">
              <div className=" w-fit h-fit bg-transparent   hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
                onClick={e => router.push("/?search=" + question)}>
                📚
              </div>
              {/* <div className='w-fit h-full ' >📄</div> */}
              <div className='w-fit h-full' onClick={e => {
                if (question.length == 0) return
                router.push("/Asks?q=" + question)
              }} >❓</div>

              {loading && <LoadingElement />}
            </div>
          </div>
        </div>


        <div id="nagivator-l1-menuitems " className='flex flex-row self-center max-w-2xl gap-4 '>

          {!!MenuItems && MenuItems.map((item, index) => <Link key={`menu-item-${item.name}`} href={item.path}> <button key={`menu_${item.name}`} onClick={(e) => router.push(item.path)}
            className={` h-full text-lg text-gray-800 w-fit px-2  hover:bg-orange-200 font-sans rounded-lg ${item.isCurrentPath(pathName) ? "text-black font-bold bg-orange-200" : ""}`}
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