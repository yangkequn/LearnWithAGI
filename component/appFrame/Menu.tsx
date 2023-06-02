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
const Focused = new MenuStruct("目标强化", "/Meditation/Start", <CenterFocusWeakIcon fontSize={'large'} />, [
  new MenuStruct("开始专注", "/Meditation/Start", <PlayArrowIcon />, []),
  new MenuStruct("历史", "/Focused/History", <HistoryIcon />, []),
  new MenuStruct("添加背景音乐", "/Focused/Append", <AddCircleOutlineIcon />, []),
  new MenuStruct("测量", "/Focused/HBV", <SpeedIcon />, []),
  //new MenuStruct("选择设备", "/Sleep/Device", null,[]),
])
const Asks = new MenuStruct("提问", "/Asks", <ChatIcon fontSize={'large'} />, [
  //new MenuStruct("选择设备", "/Sleep/Device", null,[]),
])
//learning new skills
const learnSkill = new MenuStruct("新知强化", "/Skills", <SchoolIcon fontSize={'large'} />, [
  new MenuStruct("探索", "/Skills", <PlayArrowIcon />, []),
  //new MenuStruct("选择设备", "/Sleep/Device", null,[]),
])
//a health lifestye
const medit = new MenuStruct("medit", "/Meditation/Start", <SelfImprovementIcon fontSize={'large'} />, [
  new MenuStruct("开始冥想", "/Meditation/Start", <PlayArrowIcon />, []),
  new MenuStruct("历史", "/Meditation/History", <HistoryIcon />, []),
  new MenuStruct("添加冥想", "/Meditation/Append", <AddCircleOutlineIcon />, []),
  new MenuStruct("测量", "/Meditation/HBV", <SpeedIcon />, []),
  //new MenuStruct("选择设备", "/Sleep/Device", null,[]),
])
const health = new MenuStruct("Health", "/Health/Schedules", <DirectionsRunIcon fontSize={'large'} />, [
  new MenuStruct("健康目标", "/Health/Schedules", <PlayArrowIcon />, []),
  //new MenuStruct("选择设备", "/Sleep/Device", null,[]),
])
const Retro = new MenuStruct(`回顾`, "/Retrospect", null, [
])
const Benchmark = new MenuStruct(`基准测试榜`, "/Reinfy/Week", null, [
  new MenuStruct(`本周榜单 ~ ${ThisWeekEnds()}`, "/Reinfy/Week", null, []),
  new MenuStruct("动态消息", "/Reinfy/NewsFeed", null, []),
  new MenuStruct("内在动机", "/Reinfy/Motive", null, []),
  new MenuStruct("基准测试与榜单说明", "/Reinfy/Anno", null, []),
])
const goals = new MenuStruct("修改目标", "/Goals", null, [
  new MenuStruct("我的目标", "/Goals/Mine", null, []),
  new MenuStruct("添加 / 创建", "/Goals", null, []),
])
const _goals = new MenuStruct("修改目标", "/Goals", null, [
  new MenuStruct("我的目标", "/Goals/Mine", null, []),
  new MenuStruct("添加 / 创建", "/Goals", null, []),
])
const methods = new MenuStruct("措施", "/Act", null, [
  new MenuStruct("我常用", "/Act/Mine", null, []),
  new MenuStruct("全部列表", "/Act", null, []),
])
const measure = new MenuStruct("评估", "/Measure", null, [
  new MenuStruct("我常用", "/Measure/Mine", null, []),
  new MenuStruct("全部列表", "/Measure", null, []),
])
export const SignIn = new MenuStruct("登录", "/Auth", null, [
])

export const MenuItems: Array<MenuStruct> = [ learnSkill, Asks, Retro]

type handleCloseFunction = (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;

export const MenuPopup = ({ anchorEl, handleClose }: { anchorEl: any, handleClose: handleCloseFunction }) => {
  const { SetAuthPage, LoggedIn } = useContext(GlobalContext)
  const popupAuthPage = (page: string, e: React.SyntheticEvent) => {
    SetAuthPage(page);
    e.preventDefault();
    e.stopPropagation();
    handleClose(e, e.type === "KeyboardEvent" ? "escapeKeyDown" : "backdropClick");
  }
  const popupLoginPage = (e: React.SyntheticEvent) => popupAuthPage(AuthPages.Login, e);
  const popupMyProfile = (e: React.SyntheticEvent) => popupAuthPage(AuthPages.MyProfile, e);
  const signIn = (e: React.SyntheticEvent) => popupAuthPage(AuthPages.Login, e);
  const signUp = (e: React.SyntheticEvent) => popupAuthPage(AuthPages.SignUp, e);
  const signout = (e: React.SyntheticEvent) => {
    Jwt.Clear();
    SetAuthPage(AuthPages.None);
    handleClose(e, e.type === "KeyboardEvent" ? "escapeKeyDown" : "backdropClick");
  }
  return <Menu id="MenuPopup" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} key={`Menu_${LoggedIn}`}>
    <MenuItem sx={{ display: LoggedIn && !!Jwt.Get().temporaryAccount ? "block" : "none" }} onClick={popupLoginPage}>
      <ErrorOutlineIcon sx={{ color: "yellowgreen" }} />  临时账号，暂存两月
    </MenuItem>
    <MenuItem sx={{ display: LoggedIn && !!Jwt.Get().temporaryAccount ? "block" : "none" }} onClick={signUp}>及时来不？注册 ..</MenuItem>
    <MenuItem sx={{ display: LoggedIn && !!Jwt.Get().temporaryAccount ? "block" : "none" }} onClick={signIn}>及时来不？登录 ..</MenuItem>
    <MenuItem sx={{ display: LoggedIn && !Jwt.Get().temporaryAccount ? "block" : "none" }} onClick={popupMyProfile}>个人信息</MenuItem>
    <MenuItem sx={{ display: LoggedIn && !Jwt.Get().temporaryAccount ? "block" : "none" }} onClick={signout}  >退出登录</MenuItem>
    <MenuItem onClick={signIn} sx={{ display: !LoggedIn ? "block" : "none" }}>登录</MenuItem>

    {/* <MenuItem onClick={e=>setRedirectUrl("/Results")}  >搜索结果</MenuItem> */}

  </Menu>
}

