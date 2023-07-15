import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { RspType, GetUrl, Cmd, HGET } from "../../component/api";

export default function UserAvatar({ userID }) {
    const [name, setName] = useState("")
    const [src, setSrc] = useState("")

    useEffect(() => {
        if (!userID) {
            setName("")
            setSrc("")
            return
        }
        HGET("UserInfoPublic", userID).then((data) => { !!data && setName(data["Nick"]) })
        setSrc(GetUrl(Cmd.HGET, "UserAvatar", userID, RspType.jpeg, "*"))
    }, [])
    return <div title={name} placement="left" className="h-full self-center items-center justify-center">
        <Avatar alt={name} src={src} />
    </div>
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
