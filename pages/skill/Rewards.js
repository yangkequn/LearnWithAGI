/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from "react"
import { Container, Divider, Grow, Typography, } from "@mui/material";
import { Box } from "@mui/system";
import StarIcon from '@mui/icons-material/Star';
import { API, HGET, ZRANGEBYSCORE } from "../../component/api";
import { Jwt } from "../../component/jwt";
export default function Rewards({ creditTM }) {
    //使用localStorage缓存credit
    const [credit, setCredit] = useState(JSON.parse(typeof window !== 'undefined' && localStorage.getItem("Credit" ?? `{ SkillAnswer: 0, SkillAsk: 0, Goal: 0, Score: 0, HealthAgendaDo: 0 }`)))
    //上一次的credit. 创建此变量主要为使用方便
    const lastCredit = useMemo(() => credit?.SkillAnswer + credit?.SkillAsk + credit?.HealthAgendaDo, [credit]);

    const [rewardScore, setRewardScore] = useState(0)
    const [showReward, setShowReward] = useState(false)
    useEffect(() => {
        //if not login, return
        if(Jwt.Get().IsValid() == false) return
        let today = new Date()
        //to format 20230101
        let todayStr = `${today.getFullYear()}${today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1}${today.getDate() < 10 ? "0" + today.getDate() : today.getDate()}`

        ZRANGEBYSCORE(`Credit:@pub`, todayStr, todayStr, false).then((data) => {
            // data is [ {av,mx,sd,me,S,ST,DU }] ,continue if data is invalid
            if (!data || data.length == 0) {
                return;
            }
            let res = data[0]
            var creditToday = res.SkillAnswer + res.SkillAsk + res.HealthAgendaDo
            var creditGain = creditToday - lastCredit
            //day change, creditGain should be creditToday
            if (creditGain < 0 && creditToday == 1) creditGain = creditToday
            if (creditGain && creditTM > 0) {
                //play mario ding sound, when reward is given and > 0
                let audio = new Audio("/mario-money-sound.mp3")
                audio.play()
                //show reward amimation for 1 second
                setRewardScore(credit - lastCredit)
                setShowReward(true)
                setTimeout(() => setShowReward(false), 1000)
            }
            if (res.Operates.length >= 10 && creditGain > 0) {
                var timeSpans = []
                for (var i = 0; i < res.Operates.length - 1; i++) {
                    timeSpans.push(res.Operates[i + 1] - res.Operates[i])
                }
                var lastTS = timeSpans[timeSpans.length - 1]
                timeSpans.sort((a, b) => a - b)
                if (timeSpans[0] == lastTS) {
                    let audio = new Audio("/kids_woah-6272.mp3")
                    audio.play()
                } else if (timeSpans[4] >= lastTS) {
                    let audio = new Audio("/wow-113128.mp3")
                    audio.play()
                }
            }
            typeof window !== 'undefined' && localStorage.setItem("Credit", JSON.stringify(res))
            setCredit(res)
        })
    }, [creditTM])

    return <Box sx={{ marginTop: "10px", minWidth: "250px" }} >
        <Box key={`credit${lastCredit}`} sx={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
            <Grow in={showReward} timeout={1000} >
                <div className="text-xl" > {`+${rewardScore}`}<StarIcon></StarIcon> </div>
            </Grow>
            <Typography variant="h4" sx={{
                fontWeight: 600, fontSize: 18, color: "#333", fontFamily: "Roboto, Arial, sans-serif", lineHeight: "22px", margin: "6px 0px"
                //single line text
                , overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
            }}>
                今日积分：{lastCredit}. 回答正确：{credit?.SkillAnswer}. 提问：{credit?.SkillAsk} 日程：{credit?.HealthAgendaDo}
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