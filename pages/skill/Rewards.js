/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { Container, Divider, Grow, Typography, } from "@mui/material";
import { Box } from "@mui/system";
import StarIcon from '@mui/icons-material/Star';
import { API, HGET, ZRANGEBYSCORE } from "../../component/api";
import { KeyYMD, KeyYW } from "../../component/api/APIKey";
export const Rewards = ({ creditTM }) => {
    const [credit, setCredit] = useState({ SkillAnswer: 0, SkillAsk: 0, Goal: 0, Score: 0, HealthAgendaDo: 0 })
    const [rewardScore, setRewardScore] = useState(0)
    useEffect(() => {
        let today = new Date()
        //to format 20230101
        let todayStr = `${today.getFullYear()}${today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1}${today.getDate() < 10 ? "0" + today.getDate() : today.getDate()}`

        ZRANGEBYSCORE(`Credit:@pub`, todayStr, todayStr, false).then((data) => {
            // data is [ {av,mx,sd,me,S,ST,DU }] ,continue if data is invalid
            if (!data || data.length == 0) {
                return;
            }
            let res = data[0]
            var deltaAnser = res.SkillAnswer - credit.SkillAnswer
            var deltaAsk = res.SkillAsk - credit.SkillAsk
            var deltaHealthAgendaDo = res.HealthAgendaDo - credit.HealthAgendaDo
            if (deltaAnser + deltaAsk + deltaHealthAgendaDo > 0 && creditTM > 0) {
                //play mario ding sound, when reward is given and > 0
                let audio = new Audio("/mario-money-sound.mp3")
                audio.play()
                //show reward amimation for 1 second
                setRewardScore(deltaAnser + deltaAsk + deltaHealthAgendaDo)
                setTimeout(() => { setRewardScore(0) }, 1000)
            }
            setCredit(res)
        })
    }, [creditTM])

    return <Box sx={{ marginTop: "10px", minWidth: "250px" }} >
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
            <Grow in={!!rewardScore} timeout={1000}>
                <Box sx={{
                    //text and icon size large
                    fontSize: "1.5em"
                }}>
                    {"+"}<StarIcon></StarIcon>
                </Box>
            </Grow>
            <Typography variant="h4" sx={{
                fontWeight: 600, fontSize: 18, color: "#333", fontFamily: "Roboto, Arial, sans-serif", lineHeight: "22px", margin: "6px 0px"
                //single line text
                , overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
            }}>
                今日积分：{(credit.SkillAnswer + credit.SkillAnswer)}. 回答正确：{credit.SkillAnswer}. 提问：{credit.SkillAsk} 日程：{credit.HealthAgendaDo}
            </Typography>

        </Box>

        {/* <Divider sx={{ width: "90%", m: 0.5, justifyContent: "space-between" }} orientation="horizontal" /> */}
        {/* <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Typography variant="h4" sx={{ fontWeight: 600, fontSize: 18, color: "#333", fontFamily: "Roboto, Arial, sans-serif", lineHeight: "22px", margin: "6px 0px" }}>
                    情绪唤醒：{!!SkillPoint && SkillPoint.EmotionArousal}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, fontSize: 18, color: "#333", fontFamily: "Roboto, Arial, sans-serif", lineHeight: "22px", margin: "6px 0px" }}>
                    情绪积极性：{!!SkillPoint && SkillPoint.EmotionValence}
                </Typography>
            </Box>
        </Box> */}

    </Box>
}