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
export const MenuItems: Array<MenuStruct> = [MenuSkill, MenuAsks,  MenuRetro]


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
    <div id="nagivator-l1" className="bg-slate-300 flex  flex-row w-full h-12 items-center whitespace-nowrap justify-center  min-w-max text-white text-2xl gap-4 " >

      {/* <div key="seach-panel" className='flex flex-row items-center w-fit min-w-max justify-center'>
        <Link key={`menu-home-with-search`} className=" text-zinc-700 h-full text-lg w-fit px-3 self-center" size="large" href={"/"}>
          {MenuHome.icon}
        </Link>

        <Autocomplete id="search-skill-box" options={options} freeSolo className='self-center gap-4'

          onChange={(event: React.SyntheticEvent, value: T | Array<T>, reason: string, details?: string) => {
            if (value?.toString().startsWith("create topic:")) {
              router.push("/?create=" + value.toString().replace("create topic:", ""))
            } else if (value?.toString().startsWith("search topic:")) {
              router.push("/?search=" + value.toString().replace("search topic:", ""))
            } else if (!!value) {
              router.push("/?search=" + value)
            }
          }}
          onKeyDown={(event: React.KeyboardEvent) => {
            if (event.key == "Enter") {
              let value = (event.target as HTMLInputElement).value
              if (!!value) {
                router.push("/?search=" + value)
              }
            }
          }}
          onInputChange={(event: object, value: string, reason: string) => {
            // if (value.length < 5) {
            //   return setOptions([])
            // }
            // if (reason === 'input') {
            //   setOptions(["create topic:" + value, "search topic:" + value])
            // }
          }}
          renderInput={(params) => <input ref={params.InputProps.ref} {...params.inputProps} placeholder=' what you want to explore' type="text"
            className=' w-60 bg-slate-0 rounded hover:w-100 ring-2 text-gray-800 text-base self-center' />
          }
        />
      </div> */}

      <div className="flex flex-row h-5" >
        <div key="question-box" className="flex flex-row  flex-grow py-1 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] max-w-2xl self-center items-center  h-5  "  >
          <div className='active:w-full '>
            <textarea className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2  outline-none self-center overflow-hidden text-gray-700 "
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

          <button class="absolute p-1  h-5 rounded-md text-gray-500 bottom-1.5  hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent right-1 md:right-2" onClick={e => router.push("/?search=" + question)}>
            {loading ? <LoadingElement /> : <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>}
          </button>
        </div>
      </div>


      <div id="nagivator-l1-to-restrict-width " className='flex flex-row self-center max-w-2xl gap-4 '>

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
    </div >

    {/* layer 2 menu */}
    < div id="nagivator-l2 " className=" bg-slate-100 min-h-fit flex flex-row w-full h-9 items-center whitespace-nowrap justify-start text-black text-lg "  >
      {MenuL2}
    </div >

  </div >

}