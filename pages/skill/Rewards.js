/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo, useContext } from "react"
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import { API, HGET, ZRANGEBYSCORE } from "../../component/api";
import { GlobalContext } from "../_app";
import { Link } from "@mui/material";
import { MenuRetro } from "../../component/appFrame/navigator";
import { useRouter } from "next/router";
export default function Rewards({ creditTM, volume }) {
    const { LoggedIn } = useContext(GlobalContext)
    //使用localStorage缓存credit
    const [credit, setCredit] = useState(JSON.parse(typeof window !== 'undefined' && localStorage.getItem("Credit" ?? `{ SkillAnswer: 0, SkillAsk: 0, Goal: 0, Score: 0, HealthAgendaDo: 0 }`)))
    //上一次的credit. 创建此变量主要为使用方便
    const lastCredit = useMemo(() => credit?.SkillAnswer + credit?.SkillAsk + credit?.HealthAgendaDo, [credit]);

    const [rewardScore, setRewardScore] = useState(0)
    const [showReward, setShowReward] = useState(false)
    useEffect(() => {
        //if not login, return
        if (!LoggedIn) return
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
                // //play mario ding sound, when reward is given and > 0
                // let audio = new Audio("/mario-money-sound.mp3")
                // //set volume
                // audio?.volume = volume
                // audio.play()
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
    const router = useRouter()

    return !LoggedIn ? <div> </div> : <div className="flex flex-row ml-2 min-w-[250px]  items-center w-fit" >

        <Link key={`menu-item-${MenuRetro.name}`} href={MenuRetro.path}>
            <button key={`menu_${MenuRetro.name}`} onClick={(e) => router.push(MenuRetro.path)} className={` mt-2 text-lg text-gray-800 w-fit px-2  hover:bg-orange-200 font-sans rounded-lg font-bold bg-orange-200" }`} >
                <div className='flex flex-row gap-2 self-center justify-center h-full items-center w-fit px-3'>
                    <svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" className='w-7 h-7' viewBox="0 0 32 32" >
                        <path d="M17.5,22h-2c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h2c0.276,0,0.5,0.224,0.5,0.5
S17.776,22,17.5,22z M13,21.5c0-0.276-0.224-0.5-0.5-0.5h-2c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5h2
C12.776,22,13,21.776,13,21.5z M8,21.5C8,21.224,7.776,21,7.5,21h-2C5.224,21,5,21.224,5,21.5S5.224,22,5.5,22h2
C7.776,22,8,21.776,8,21.5z M22.5,21c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5S22.776,21,22.5,21z M26,26.5
v-4.798l5.238,3.224c0.156,0.096,0.348,0.099,0.506,0.011C31.902,24.848,32,24.681,32,24.5v-16c0-0.181-0.098-0.348-0.256-0.437
c-0.158-0.088-0.351-0.085-0.506,0.011L26,11.298V6.5C26,6.224,25.776,6,25.5,6h-25C0.224,6,0,6.224,0,6.5v20
C0,26.776,0.224,27,0.5,27h25C25.776,27,26,26.776,26,26.5z M1,7h24v5.192c0,0.181,0.098,0.348,0.256,0.437
c0.159,0.088,0.351,0.085,0.506-0.011L31,9.395v14.211l-5.238-3.224c-0.155-0.096-0.347-0.098-0.506-0.011
C25.098,20.46,25,20.627,25,20.808V26H1V7z"/>
                    </svg>
                    <div className='text-lg '>{MenuRetro.name}</div>
                </div>
            </button>
        </Link>

        <div key={`credit${lastCredit}`} className="relative flex flex-row w-fit h-full justify-center self-center -px-4">
            <Grow in={showReward} timeout={1000}  >
                <div className="text-3xl absolute left-0" > {`+${rewardScore}`}<StarIcon></StarIcon> </div>
            </Grow>
            <Typography variant="h4" className="flex flex-row text-lg  text-gray-800 overflow-hidden font-sans font-bold  gap-2  self-center justify-center items-center " >
                + {isNaN(credit?.SkillAnswer) ? 0 : credit?.SkillAnswer} 练习 　+ {isNaN(credit?.SkillAsk) ? 0 : credit?.SkillAsk} 提问
            </Typography>

        </div>

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

    </div>
}