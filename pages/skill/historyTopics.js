
"use client";
import { useRouter } from "next/navigation";
import { use, useContext, useEffect, useState } from 'react';
import { DbgKey as Title } from '@/component/api/Debugger';
import { Jwt } from '@/component/jwt';
import { GlobalContext } from '../_app';
import { ZREVRANGE } from "../../component/api";
import { FormControl, MenuItem, Select } from "@mui/material";


export default function HistoryTopics() {
    const router = useRouter()

    const [MyHistoryList, setMyHistoryList] = useState([])
    const { LoggedIn } = useContext(GlobalContext)
    useEffect(() => {
        LoggedIn && ZREVRANGE("SkillMyTouchTime:@id", 0, 100).then((res) => {
            setMyHistoryList(res)
        })
    }, [LoggedIn])
    return LoggedIn && <FormControl variant="standard" sx={{ ml: 2, minWidth: 160 }}>
        <Select labelId="select-history-topic" id="select-history-topic" value={""} label="Age" inputProps={{ 'aria-label': 'Without label' }} displayEmpty
            onChange={(e) => !!e.target.value && router.push(`/skill?t=${e.target.value}`)}>
            <MenuItem value=""> <em>切换到 最近学习:</em> </MenuItem>
            {
                MyHistoryList.map((item, index) => <MenuItem key={`menu-item-${item}`} value={item}>{item}</MenuItem>)
            }
        </Select>
    </FormControl>
}