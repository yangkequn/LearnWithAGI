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
const MenuSkill = new MenuStruct("新技", "/skill", <SchoolIcon fontSize={'large'} />)
const MenuRetro = new MenuStruct(`回顾`, "/Retrospect", null)
const MenuSignIn = new MenuStruct("登录", "/Auth", null)
export const MenuItems: Array<MenuStruct> = [MenuSkill, MenuAsks, MenuRetro]


export default function Navigator() {

  const { LoggedIn, RedirectUrl, setRedirectUrl, MenuL2 } = useContext(GlobalContext)
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



  const [activeReinfyMenu, setActiveReinfyMenu] = useState<MenuStruct>(MenuItems[1])

  const [options, setOptions] = useState([]);
  return <div id="navigator" className="flex flex-col w-full font-sans font" >

    {/* background-color: #2E4052; */}
    <div id="nagivator-l1" className="bg-slate-300 flex  flex-row w-full h-12 items-center whitespace-nowrap justify-center  min-w-max text-white text-2xl gap-4 " >

      <div key="seach-panel" className='flex flex-row items-center w-fit min-w-max justify-center'>
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