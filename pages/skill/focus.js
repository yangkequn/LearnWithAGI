/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useEffect, useState } from "react"
import { FormControlLabel, FormGroup, IconButton, InputAdornment, Stack, TextField, Typography, } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { API, HGET, HSET } from "../../component/api";
import { Box } from "@mui/system";
import { Cancel } from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export const SkillFocus = () => {
    const createThemeRef = createRef();
    const [skillPointsMyList, setSkillPointsMyList] = useState([]);
    //["Active", "Later", "Done"]
    const [group, setGroup] = useState("Active");
    const RefreshSkillPoints = () => {
        HGET("SkillPointsMyList:@id", group).then((res) => {
            setSkillPointsMyList(res)
        }).catch((err) => {
            setSkillPointsMyList([])
        })
    }
    useEffect(() => {
        RefreshSkillPoints()
    }, [group])
    const CreateNewSkillPoint = () => {
        let focus = createThemeRef.current.value
        if (!focus) return
        createThemeRef.current.value = ""

        HGET("SkillPointsMyList:@id", group).then((res) => {
            if (!res) return
            var knowledgePoints = [focus, ...res.filter((t) => t.Name !== focus)]
            setSkillPointsMyList(knowledgePoints)
            HSET("SkillPointsMyList:@id", group, knowledgePoints).catch()
        }).catch((err) => {
            setSkillPointsMyList([focus])
            HSET("SkillPointsMyList:@id", group, [focus]).catch()
        })
        API("SkillLibrary", { Name: focus, Action: "add" })
    }
    const RemoveSkillPointFromSourceGroup = (skillPointName, groupFrom) => {
        HGET("SkillPointsMyList:@id", groupFrom).then((res) => {
            if (!res) return
            var knowledgePoints = res.filter((t) => t !== skillPointName)
            HSET("SkillPointsMyList:@id", groupFrom, knowledgePoints).catch()
            //if group == groupFrom, refresh
            if (group == groupFrom) setSkillPointsMyList(knowledgePoints)
        }).catch()
    }

    const SkillPointMoveGroup = (groupFrom, groupTo, skillPointName) => {
        if (groupFrom == groupTo) return
        //both groupFrom and groupTo Should within ["Active","Later","Done"]
        if (!["Active", "Later", "Done"].includes(groupFrom)) return
        if (!["Active", "Later", "Done"].includes(groupTo)) return

        HGET("SkillPointsMyList:@id", groupTo).then((res) => {
            if (!res) return
            var knowledgePoints = [skillPointName, ...res.filter((t) => t.Name !== skillPointName)]
            HSET("SkillPointsMyList:@id", groupTo, knowledgePoints).catch()
            //remove from groupFrom
            HGET("SkillPointsMyList:@id", groupFrom).then((res) => {
                if (!res) return
                RemoveSkillPointFromSourceGroup(skillPointName, groupFrom)
            }).catch()
        }).catch((err) => {
            //case groupTo is empty
            var knowledgePoints = [skillPointName]
            HSET("SkillPointsMyList:@id", groupTo, knowledgePoints).catch()
            //remove from groupFrom
            RemoveSkillPointFromSourceGroup(skillPointName, groupFrom)
        })
    }
    const [hoverLabel, setHoverLabel] = useState("")

    {/* https://github.com/JedWatson/react-select */ }
    return <Box sx={{
        display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "7px", width: "100%"
    }}>
        {/* create new theme */}

        <Box sx={{
            display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "7px", width: "100%"
        }} >

            {/* 创建新焦点 */}
            {/* Here use TextField to create  tag of new learning Focus using mui */}
            <TextField
                sx={{ width: "100%" }}
                //label="Create New Skill Focus"
                label="输入 主题名称，以开始学习"
                variant="standard"
                inputRef={createThemeRef}
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={CreateNewSkillPoint}
                            onKeyDown={CreateNewSkillPoint}
                        >
                            <AddIcon />
                        </IconButton>
                    </InputAdornment>,
                }}
            />
        </Box>

        {/* 显示焦点列表 */}
        {/* 显示焦点分组 */}
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "7px", width: "30%" }}            >
            {/* a select component to switch between diffrent groups, active,later or done */}
            <Stack direction='row' gap={3} sx={{ width: "100%", color: "#2196f3" }}>
                {["Active", "Later", "Done"].map((g, i) =>
                    <Box key={`group-${g}`} onClick={() => setGroup(g)}
                        sx={{
                            //using gray boundary if g!=group,else using blue boundary
                            border: g === group ? "1px solid #2196f3" : "1px solid #ccc", borderRadius: 2,
                            boxShadow: g === group ? "inset 0 0 0 100px gold" : "none",
                            //line height is 1.3x of the font size
                            lineHeight: "1.3em", fontSize: 14, fontWeight: 400, fontFamily: "Roboto, Arial, sans-serif"
                            , paddingLeft: 2, paddingRight: 2
                        }}
                    >
                        {g}
                    </Box>)}
            </Stack>

            {/* konwledge point of selected˝ group */}
            <Stack direction='row' gap={3} sx={{ marginTop: "0.5em", width: "100%" }}>
                {
                    skillPointsMyList.map((name, i) => <Box key={`themes-${name}`}
                        sx={{
                            display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start"
                            //using gray boundary
                            , border: "1px solid #ccc", borderRadius: 2,
                            //line height is 1.3x of the font size
                            lineHeight: "1.3em", fontSize: 14, fontWeight: 400, fontFamily: "Roboto, Arial, sans-serif"
                            , paddingLeft: 2
                            // Typography text should lines middle in the box
                            , alignItems: "center"

                        }}
                        onHover={() => setHoverLabel(name)}
                        onMouseLeave={() => setHoverLabel("")}
                    >
                        {/* Remove Icon, to remove this Learning Focus Tag ,including events to remove tag*/}
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {
                                //remove name from skillPointsMyList
                                var leftSkillPoints = skillPointsMyList.filter((t, j) => i !== j)
                                setSkillPointsMyList(leftSkillPoints)
                                HSET("SkillPointsMyList:@id", group, leftSkillPoints).catch()

                                API("SkillLibrary", { Name: name, Action: "remove" })
                            }}
                        >
                            <Cancel />
                        </IconButton>
                        <Box sx={{
                            display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start"
                            //single line text
                            , overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                        }}>
                            <Typography variant="h4" sx={{ fontWeight: 600, fontSize: 16, color: "#333", fontFamily: "Roboto, Arial, sans-serif", lineHeight: "20px", }}>
                                {name}
                            </Typography>
                        </Box>
                        {/* detail Icon */}
                        <IconButton sx={{ marginLeft: "auto" }} onClick={() => {
                            setHoverLabel(name)
                        }} >
                            {hoverLabel !== name && <ArrowForwardIosIcon />}
                            {hoverLabel === name && <ArrowBackIcon />}
                        </IconButton>
                        {
                            hoverLabel === name && <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked={group === "Active"} onChange={e => {
                                    //if checked, move to Active
                                    if (e.target.checked) SkillPointMoveGroup(group, "Active", name)
                                }} />} label="正在学习" />
                                <FormControlLabel required control={<Checkbox defaultChecked={group === "Later"} onChange={
                                    e => {
                                        //if checked, move to Later
                                        if (e.target.checked) SkillPointMoveGroup(group, "Later", name)
                                    }
                                } />} label="稍后学习" />
                                <FormControlLabel control={<Checkbox defaultChecked={group === "Done"} onChange={e => {
                                    //if checked, move to Done
                                    if (e.target.checked) SkillPointMoveGroup(group, "Done", name)

                                }} />} label="完成学习" />
                            </FormGroup>
                        }
                    </Box>)
                }
            </Stack>
        </Box >

    </Box >
}