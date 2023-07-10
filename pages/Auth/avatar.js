import React, { useEffect, useState } from "react";
import { Avatar, Tooltip } from "@mui/material";
import { RspType, GetUrl, Cmd, HGET } from "../../component/api";

export default function UserAvatar({ userID }) {
    const [name, setName] = useState("")

    useEffect(() => {
        !!userID && HGET("UserInfoPublic", userID).then((data) => { !!data && setName(data["Nick"]) })
    }, [])
    return <Tooltip title={name} placement="left" className="h-full self-center items-center justify-center">
        {!!userID ? <Avatar src={GetUrl(Cmd.HGET, "UserAvatar", userID, RspType.jpeg, "*")} alt={name} /> : <Avatar alt={name} />}
    </Tooltip>
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
