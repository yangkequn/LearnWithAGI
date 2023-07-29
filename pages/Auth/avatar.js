import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { RspType, GetUrl, Cmd, HGET, API } from "../../component/api";
import { Badge, Tooltip } from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import { GlobalContext } from "../_app";

export default function UserAvatar({ userID }) {
    const [name, setName] = useState("")
    const [src, setSrc] = useState("")
    const { quota } = useContext(GlobalContext)

    useEffect(() => {
        if (!userID) { setName(""); setSrc(""); return }
        HGET("UserInfoPublic", userID).then((data) => { !!data && setName(data["Nick"]) })
        setSrc(GetUrl(Cmd.HGET, "UserAvatar", userID, RspType.jpeg, "*"))
    }, [])
    const EnoughQuota = () => quota?.AllowedDayGPT4 > 2 || quota?.AllowedDayGPT35 > 2 || quota?.AllowedDaySkill > 2
    return <Badge key={`${quota?.AllowedDayGPT4}-${quota?.AllowedDayGPT35}-${quota?.AllowedDaySkill}`}
        overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} color={EnoughQuota() ? "primary" : "grey"}
        badgeContent={
            <PaidIcon className="text-white" />
            // <div className="  text-white text-xs font-bold rounded-full w-4 h-4 flex justify-center items-center " >VIP</div>
        } >
        <Tooltip key={`${quota}-${name}`} title={`${name}您好，今日剩余额度：chatGPT 3.5: ${quota?.AllowedDayGPT35} chatGPT 4: ${quota?.AllowedDayGPT4} 创建课程: ${quota?.AllowedDaySkill}        `} placement="right">
            <Avatar alt={name} src={src} />
        </Tooltip>
    </Badge>

}
export const UserName = ({ pub }) => {
    const [name, setName] = useState("")
    useEffect(() => {
        if (!!pub) HGET("UserInfoPublic", pub).then((data) => { !!data && setName(data["Nick"]) })
        else setName("")
    }, [pub])
    return <div>
        {name}
    </div>
} 
