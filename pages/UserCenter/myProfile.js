import React, { useContext, useEffect, useState } from "react";

import { Box, Button, TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import { GetUrl, RspType, API, Cmd, HGET } from "../../component/api";
import { Jwt } from "../../component/jwt";
import { GlobalContext } from "../_app";
import { usePathname, useRouter } from "next/navigation";
import AppFrame from "@/component/appFrame";

export const unixTime = () => Math.floor(new Date().getTime() / 1000)

const Avatar = ({ id }) => {
  const [avatarUpdateTime, setAvatarUpdateTime] = useState(0)
  const AvatarPostBinary = (e) => {
    var reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onloadend = function (evt) {
      if (evt.target.readyState === FileReader.DONE) {
        //convert evt.target.result to uint8array
        // @ts-ignore
        var arrayBuffer = evt.target.result, array = new Uint8Array(arrayBuffer);

        API("userResetAvatar", { "Avatar": array }).then(data => setAvatarUpdateTime(unixTime()))
      }
    }
  }
  return <div style={{ margin: "0 0 1em 0" }}>
    {<div className=" flex flex-row justify-start w-full items-center font-sans border-b">
      <div style={{ margin: "0 1em 0 0" }}>头像</div>
      <img src={GetUrl(Cmd.HGET, "UserAvatar", id, RspType.jpeg, "*") + `?t=${avatarUpdateTime}`} alt={""} /></div>}
    {<div className=" flex flex-row justify-between w-full items-center font-sans ">
      <input type="file" style={{ display: "none" }} id="upload_avatar" onChange={AvatarPostBinary} />
      <button style={{ margin: "1em 0 0 0" }} onClick={e => document.getElementById("upload_avatar").click()}>
        {"修改头像"}
      </button>

    </div>
    }

  </div>
}
const MyProfileMenuTitle = (language_ind) => {
  const info_languages = {
    Title: ["Complete my profile", "完善我的资料"][language_ind],
    footer: ["Every thing you pursuit, there's an answer", "你总在乎的，终有答案"][language_ind],
    save: ["Save modification", "保存修改"][language_ind],
    channelName: ["My channel name:", "呢称："][language_ind],
    noChannelName: ["Write channel name here", "缺失，在这里添加.."][language_ind],
    noChannelNameError: ["Channel name incomplete", "未填写频道名称.."][language_ind],
    loginAccount: ["Login Account:", "登录账号："][language_ind],
    noLoginAccount: ["Write real name here", "缺失，在这里填写.."][language_ind],

  }
  return info_languages
}
export default function MyProfile() {
  const router = useRouter();
  const path = usePathname();
  const { LoggedIn } = useContext(GlobalContext)
  const css = {
    button: { margin: "0 0 0 1em", lineHeight: 1.0, border: "0px", width: "120px", background: "#FFFFFF" },
    inputColor: (error, input) => {
      if (!!error) return "#f1403c"
      if (!!input) return "#000"
      return "#89a"
    },
  }
  const info = MyProfileMenuTitle(1)

  const [countryCode, setCountryCode] = useState("")
  const [phone, setPhone] = useState("")
  const [Nick, setNick] = useState("")
  const [NickError, setNickError] = useState("")
  const [Introduction, setIntroduction] = useState("")
  const [Region, setRegion] = useState("")
  const [loginAccount, setLoginAccount] = useState("")
  const [buttonAlert, setButtonAlert] = useState("")
  const SaveProfile = (e) => {
    if (!Nick) {
      setNickError(info.noChannelNameError);
      return
    }

    if (!!Nick && !!loginAccount && LoggedIn && Jwt.Get().jwt) {
      API("userResetProfile", { Nick, Region, Introduction }).then(data => {
        if (data["response"] !== "ok") return
        setButtonAlert("已修改")
        setTimeout(() => setButtonAlert(""), 2000)
      })
    }
  }
  useEffect(() => {
    if (!Jwt.Get().IsValid()) return
    HGET("UserInfo", "@id").then((data) => {
      setCountryCode(data?.CountryCode)
      setPhone(data?.Phone)
      setLoginAccount(data?.Account)
    })
    HGET("UserInfoPublic", Jwt.Pub()).then((data) => {
      setNick(data?.Nick)
      setIntroduction(data?.Introduction)
      setRegion(data?.Region)
    })
  }, [LoggedIn])

  if (!LoggedIn) return <div className="flex flex-col justify-center h-full items-center font-sans" >
    you should loggin first
  </div>

  return <div key={`MyProfile${LoggedIn}`} className="flex flex-col justify-center h-full items-center font-sans w-full" >
    <div className="flex flex-col justify-center w-full min-w-max items-center font-sans max-w-sm bg-white text-black px-8 pt-12  ">
      <div className="flex flex-row w-full justify-between mb-8 items-center">
        <div><h2> {info["Title"]} </h2></div>

        <button className="bg-sky-500 w-28 rounded " onClick={e => {
          Jwt.Clear();
          router.push(path.split("to=")[1] ?? "/");
        }}>退出</button>
      </div>

      <div className={"flex flex-row justify-between w-8/12 min-w-fit items-center font-sans  mb-4 self-start"}>

        <div key={"input-phone-number"} className="flex flex-row">
          <div>手机号：</div>
          <div className=" bg-gray-200 rounded px-2">{countryCode} &nbsp; | {phone}</div>
        </div>
        {!!phone && <div className="  whitespace-nowrap" >&nbsp; 已经认证</div>}
      </div>


      {/* inputContainer */}
      <div key="input-channel-conainer" className=" container max-w-2xl flex  flex-row justify-start  items-center font-sans  mb-4" >
        <div>{info.channelName}</div>

        <input placeholder={info.noChannelName} value={NickError || Nick}
          className="flex flex-row justify-center w-fit items-center font-sans text bg-orange-50 rounded border-solid border-2 border-lime-200 px-2 py-1"
          style={{ "color": css.inputColor(NickError, Nick) }}
          onChange={e => setNick(e.target.value)} onClick={e => setNickError("")} />

      </div>

      <Avatar id={Jwt.Pub()} />

      {/* display introduction ,left adjust */}
      <div className="flex flex-row h-full self-start w-full rounded-md">
        <textarea key="input-channel-name" className="flex flex-row justify-start self-start font-sans h-full  mb-4 ring-1  resize-none " style={{ "width": "100%" }}
          placeholder={"简介:"} aria-label="maximum height" value={Introduction} rows={1}
          onChange={(e) => setIntroduction(e.target.value)} minRows={3} onResize={undefined} onResizeCapture={undefined} />
      </div>

      <button className="flex flex-row justify-center w-full items-center font-sans text-sm h-9 bg-sky-200 text-gray-700 rounded my-4" key={"sign-up-button"} onClick={e => SaveProfile(e)}
        disabled={!!buttonAlert}> {buttonAlert || info.save} </button>
    </div>

    <div className="flex flex-row justify-center w-full items-center font-sans  mb-8 mu-8 text-sm rounded">{ }</div>
  </div>
}