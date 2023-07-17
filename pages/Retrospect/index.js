import React, { useEffect, useState } from "react"

//https://github.com/grubersjoe/react-github-calendar
import { ZRANGEBYSCORE } from "../../component/api";
import AppFrame from "../../component/appFrame";

//https://github.com/grubersjoe/react-activity-calendar
//npm install react-activity-calendar
import ActivityCalendar from 'react-activity-calendar'
import { Tooltip } from "@mui/material";

export const Retrospect = () => {
    const [dayCnt, setDayCnt] = React.useState([{ date: "2023-01-01", count: 1, level: 1, SkillAsk: 0, SkillAnswer: 0 }, { date: "2023-06-01", count: 1, level: 1, SkillAsk: 0, SkillAnswer: 0 }]);

    const RefreshHistory = () => {
        //use zrange instead
        let DayRange = 182
        var past100Days = new Date() - DayRange * 24 * 60 * 60 * 1000
        // to string 20220101
        var past100DaysStr = new Date(past100Days).toISOString().slice(0, 10).replace(/-/g, "")
        var nowStr = new Date().toISOString().slice(0, 10).replace(/-/g, "")
        ZRANGEBYSCORE(`Credit:@pub`, past100DaysStr, nowStr, true).then((data) => {
            // data is [ {av,mx,sd,me,S,ST,DU }] ,continue if data is invalid
            if (!data || !data["members"] || data["members"].length == 0) {
                setDayCnt([])
                return;
            }
            //generate past 365 days data
            let dayCntData = []
            for (let i = 0; i <= DayRange; i++) {
                let d = new Date()
                d.setDate(d.getDate() - (DayRange - i))
                let mon = d.getMonth() + 1, date = d.getDate()
                let dStr = `${d.getFullYear()}-${mon < 10 ? "0" + mon : mon}-${date < 10 ? "0" + date : date}`
                dayCntData.push({ date: dStr, count: 0, SkillAsk: 0, SkillAnswer: 0 })
            }

            let members = data["members"], scores = data["scores"]
            //type Credit struct {	Pub int64	//新知	SkillAnswer int32	SkillAsk    int32	//目标	Goal int32	//状态	HealthAgendaDo int32	//总分	Score    int32	Operates []int64}
            let dayItems = members.map((credit, i) => {
                let d = scores[i].toString()
                //d is 20220101,convert to 2022-01-01
                let dStr = `${d[0]}${d[1]}${d[2]}${d[3]}-${d[4]}${d[5]}-${d[6]}${d[7]}`
                return { date: dStr, count: credit.SkillAsk + credit.SkillAnswer, SkillAsk: credit.SkillAsk, SkillAnswer: credit.SkillAnswer }
            })
            //replace dayCntData with dayItems
            dayCntData = dayCntData.map((dayItem) => {
                let day = dayItems.find((day) => day.date == dayItem.date)
                if (day) {
                    return day
                } else {
                    return dayItem
                }
            })
            //均分。每个档次一样多
            let counts = dayCntData.map((dayItem) => dayItem.count).filter((count) => count > 0)
            counts.push(0)
            counts.sort((a, b) => a - b)
            let countToIndexMap = counts.map((count, i) => [count, Math.floor(5 * i / (counts.length - 1))])
            countToIndexMap = Object.fromEntries(countToIndexMap)

            //set level for each dayItem
            dayCntData = dayCntData.map((dayItem) => {
                let level = countToIndexMap[dayItem.count];
                if (dayItem.count > 0) level = Math.max(1, level)
                return { ...dayItem, level }
            })
            setDayCnt(dayCntData)
        })
    }
    useEffect(() => {
        RefreshHistory()
    }, [])

    return <AppFrame >
        <div key={"history"} className="container flex flex-col h-full w-full max-w-5xl">

            {/* https://github.com/grubersjoe/react-activity-calendar */}
            <div className="flex flex-col h-full w-full bg-gray-light py-4 mt-1  min-h-[512px]  ">
                <ActivityCalendar data={dayCnt} blockSize={28}
                    colorScheme={"light"}
                    labels={{
                        legend: { less: 'Less', more: 'More' },
                        //months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        //months: ['1', '2', '', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                        totalCount: '{{count}} credits in half year',
                        //weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                        weekdays: ['7', '1', '2', '3', '4', '5', '6']
                    }}
                    eventHandlers={{
                        // ignore the type error, it's a bug of react-activity-calendar
                        "onClick": (event) => (data) => {
                            console.log("data", data)
                        }
                        // onClick: (e: event, data: Day) => { setCurrentMeditationDay(data.date) }
                    }}
                    renderBlock={(block, activity) => {
                        return <Tooltip title={`${activity.SkillAnswer} 作答 ${activity.SkillAsk} 提问 ${activity.count} activities on ${activity.date} `}
                            onClick={e => console.log("activity", activity)} >
                            {block}
                        </Tooltip>
                    }}
                />
            </div>
            <div className=" flex flex-row justify-start items-start self-start w-[90%] flex-1 h-full"            >
                {/* show meditationTrails here */}
            </div>
        </div>
    </AppFrame>
}
export default Retrospect