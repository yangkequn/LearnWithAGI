import React, { useContext, useEffect, useState } from 'react';
import { MenuHome, MenuItems, MenuPopup, MenuStruct, SignIn } from './Menu';
import { GlobalContext } from "../../pages/_app"
import { UserAvatar } from '@/pages/Auth/avatar';
import { Jwt } from '../jwt';
import { Container, Button } from "@mui/material";

import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import "tailwindcss/tailwind.css"
import { Login } from '../Auth/login';
import { request } from 'http';


export default function Navigator() {
  const { LoggedIn, RedirectUrl, setRedirectUrl } = useContext(GlobalContext)
  const router = useRouter()
  const pathName = usePathname()
  const [SubMenuItems, setSubMenuItems] = useState<MenuStruct[]>([])
  const selectMenuL1 = (menu: any) => {
    setSubMenuItems(menu.subMenu)
  }
  const sekectMenuL2 = (menu: any) => {
  }
  useEffect(() => {
    if (!RedirectUrl) return
    router.push(RedirectUrl)
    setRedirectUrl("")
  }, [RedirectUrl, router, setRedirectUrl])

  useEffect(() => {
    //choose the item in menu that isCurrentPath
    let currentMenu = MenuItems.find(item => item.isCurrentPath())
    if (currentMenu === undefined) {
      return
    }
    setSubMenuItems(currentMenu.subMenu === undefined ? [] as MenuStruct[] : currentMenu.subMenu as MenuStruct[])
  }, [])
  //if MenuItems contains SignIn ,remove it 
  if (MenuItems.find(item => item.name === "登录") !== undefined) {
    MenuItems.pop()
  }
  //read jwt from cookie, if not exist, redirect to login page
  if (!LoggedIn) MenuItems.push(SignIn)


  const [activeReinfyMenu, setActiveReinfyMenu] = useState<MenuStruct>(MenuItems[1])

  return <div className="flex flex-col w-full font-sans font" id="appnavigator">

    {/* background-color: #2E4052; */}
    <div className="bg-slate-300 flex  flex-row w-full h-12 items-center whitespace-nowrap justify-start text-white text-2xl " id="App-Nagivator-l1" >
      {/* <div style={{ width: 190, height: 0, margin: "0em 0 0 0", alignSelf: "flex-start" }} >
        <Link to={"/"} >
          <Logo4 />
        </Link>
      </div> */}


      <Container sx={{ display: "flex", flexDirection: "row", alignItems: "center" }} >

        {/* home */}
        <Link key={`menu_home`} className=" text-zinc-700 h-full text-lg w-fit px-3" size="large" href={"/"}>
          {MenuHome.name}
        </Link>


        {!!MenuItems && MenuItems.map((item, index) => <Link key={`menu_${item.name}`}
          onClick={(e) => selectMenuL1(item)} href={item.path + "?to=" + pathName} >
          <Button variant={item.Variant(pathName)} className="text-zinc-300 h-full text-lg w-fit px-3 hover:bg-orange-200" >{item.name}</Button>
        </Link>)}

        {/* display avatar if logged in */}
        {LoggedIn && <Link className={" text-zinc-700 h-full text-lg w-fit px-3"} href={"/Auth/my-profile?to=" + pathName} >
          <UserAvatar userID={Jwt.Pub()} style={{ height: 32, width: 32, fontSize: 18 }} />
        </Link>}

      </Container >
    </div >

    {/* layer 2 menu */}
    < div className=" bg-slate-100 min-h-fit flex flex-row w-full h-9 items-center whitespace-nowrap justify-start text-black text-lg " id="App-Nagivator-l2    " >
      {
        SubMenuItems.map(
          (item, index) => <Button key={`menu_${item.name}`} variant={item.Variant(pathName)} size="small" onClick={e => sekectMenuL2(item)}
            sx={{ height: "95%", width: "100%", fontSize: 16, backgroundColor: item.isCurrentPath() ? "#007E9B" : "#FFF", color: "black", borderRadius: 0 }}>
            {item.name}
            {/* icon */}
            {item.icon}
          </Button>)
      }
    </div >

  </div >

}