import axios from "axios"
import React from "react"
import { useContext } from "react"
import { AuthPages } from "../../pages/Auth"
import { GlobalContext } from "../../pages/_app"
import { Menu, MenuItem } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Jwt } from "../jwt"
import { ThisWeekEnds } from "../api/APIKey"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HistoryIcon from '@mui/icons-material/History';
import SpeedIcon from '@mui/icons-material/Speed';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import SchoolIcon from '@mui/icons-material/School';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ChatIcon from '@mui/icons-material/Chat';
import { useRouter } from "next/router"

export class MenuStruct {
  constructor(public name: string, public path: string, public icon: any | null, public subMenu: Array<MenuStruct>) { }
  public isCurrentPath = (pathname: string): boolean => {
    if (this.path.toLowerCase() === pathname?.toLowerCase()) return true
    //if no submenu, return false
    if (!this.subMenu) return false
    // foreach submenu, if any of them is current path, return true
    for (let item of this.subMenu) {
      if (item.isCurrentPath()) return true
    }
    return false
  }

  public Variant = (pathname): "text" | "outlined" | "contained" | undefined => this.isCurrentPath(pathname) ? "contained" : "text"
}

export const MenuHome = new MenuStruct("🏠", "/", null, [
  new MenuStruct("Reinfy /行为强化 :恢复我们的无穷潜力", "/Reinfy", null, []),
])
//
const Asks = new MenuStruct("提问", "/Asks", <ChatIcon fontSize={'large'} />, [
  //new MenuStruct("选择设备", "/Sleep/Device", null,[]),
])
//learning new skills
const learnSkill = new MenuStruct("新技", "/skill", <SchoolIcon fontSize={'large'} />, [
  new MenuStruct("探索", "/skill", <PlayArrowIcon />, []),
  //new MenuStruct("选择设备", "/Sleep/Device", null,[]),
])
const Retro = new MenuStruct(`回顾`, "/Retrospect", null, [
])
export const SignIn = new MenuStruct("登录", "/Auth", null, [
])

export const MenuItems: Array<MenuStruct> = [ learnSkill, Asks, Retro]
