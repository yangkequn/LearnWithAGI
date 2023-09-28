/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useMemo, useState } from "react"
import { API, Cmd, GetUrl, HGET, RspType } from "../../component/api";
import BuildIcon from '@mui/icons-material/Build';
import { Context } from "./Context"
import { GlobalContext } from "../_app";
import { Avatar, Box, Button, LinearProgress, MobileStepper, Tooltip, Typography } from "@mui/material";
import { AvatarWithName } from "../Auth/avatar";
import { TwoIO } from "../../component/appFrame/navigator";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { LoadingComponent } from ".";
import ScrollingBanner from "../../component/banner";
let audio = null

const HoldInRoadAlert = () => <div className=" flex flex-row justify-start items-center w-full  whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-2 px-2 pb-2 h-36"            >
    <div className=" w-40 h-32  rounded-3xl mt-0 self-stretch " title={"苏格拉底之问"}>
        <img className={`rounded-3xl -mr-2 `} src="/holeInRoad.webp" ></img>
    </div>
    <div className="flex h-full text-2xl text-gray-800 font-sans leading-4  w-full  bg-white/70 rounded-md px-2 pt-1 gap-1 items-center pl-4"                    >
        高能！坑已挖好，等你来填!
    </div>
</div>

const Talkers = ({ ScenerInfos, CurrentScene }) => <div key={`talker-${CurrentScene}-${ScenerInfos}`}
    className="flex flex-row  text-xl text-gray-800 font-sans leading-4  w-full  bg-white/70 rounded-md px-2 pt-1 gap-1 justify-between items-center h-36">

    <div className="flex flex-col  h-full text-2xl text-gray-800 font-sans leading-4   bg-white/70 rounded-md my-2 px-4 py-6 gap-4 items-center "                    >
        <div>            苏格拉底        </div>
        <div>            的        </div>
        <div>          演练场 </div>
    </div>

    <div className={"w-32 h-32 rounded-lg"} >
        <img className={CurrentScene >= 0 && CurrentScene < ScenerInfos.length && ScenerInfos[CurrentScene].Text.indexOf("女孩") === 0 && " ring-4 animate-pulse"} src="/image-girl.jpg"></img>
    </div>

    <div className={" w-36 h-32 mt-1 self-stretch overflow-hidden rounded-lg "} title={"苏格拉底之问"}>
        <img className={(CurrentScene >= 0 && CurrentScene < ScenerInfos.length && ScenerInfos[CurrentScene].Text.indexOf("苏格拉底") === 0 && "ring-4 animate-pulse ") + `  -mr-8`} src="/socrates.webp"
        ></img>
    </div>

    <div className="w-32 h-32 rounded-lg" >
        <img className={CurrentScene >= 0 && CurrentScene < ScenerInfos.length && ScenerInfos[CurrentScene].Text.indexOf("男孩") === 0 && " ring-4 animate-pulse"} src="/image-man.jpeg"></img>
    </div>
</div>


export default function Socrates({ topic, volume, playbackRate }) {
    const { setCreditTM } = useContext(GlobalContext)
    const { skillMyTrace, setSkillMyTrace, skillSession, setSkillSession } = useContext(Context)
    //all QAs about this skill topic
    const [QAs, setQAs] = useState([])
    //CurrentQAs QA that use has selected. format [question,answer,question,answer,...]
    const [QATraces, setQAsTraces] = useState([])
    const FullName = () => `${skillSession?.Name}:${skillSession?.Detail}`

    const [ScenerInfos, setScenerInfos] = useState([])
    const [CurrentScene, setCurrentScene] = useState(-1)
    const [CiteQuestion, setCiteQuestion] = useState("")
    const [QASocrates, setQASocrates] = useState([])
    //QAs and QATrace according to skillTreeSelected
    useEffect(() => {
        setQAs([])
        setQAsTraces([])
        setQASocrates([])
        let Name = FullName()
        if (!Name || Name.indexOf("undefined") >= 0 || Name.indexOf("undefined") >= 0) return
        //loadSkillSessionQAs
        API("SkillSocrates", { Name, Topic: topic, Rebuild: false }).then((res) => (Name === FullName()) && setQAs(res ?? []))
        setQAsTraces(skillMyTrace[FullName()]?.Asks ?? [])
        //Senery TTSInfo
        API("SkillSocratesTTS", { Session: FullName(), Topic: topic }).then((res) => {
            if (Name !== FullName()) return
            if (!res || res.length == 0) return setScenerInfos([])
            setScenerInfos(res)
        })

    }, [topic, skillSession])

    useEffect(() => {
        if (!FullName()) return
        setQAsTraces(skillMyTrace[FullName()]?.Asks ?? [])
    }, [topic, skillSession, skillMyTrace])

    const PlayTTSOgg = (...urls) => {
        //play each audio one by one
        let url = urls[0]
        let isOGG = url.indexOf("TTSOgg") >= 0
        audio = new Audio(url)
        //set volume
        audio.volume = isNaN(volume) ? 0.5 : volume
        if (audio && isOGG) {
            audio.playbackRate = playbackRate;
        }
        audio.onended = () => {
            if (urls.length > 1) PlayTTSOgg(...urls.slice(1))
            if (isOGG) setCurrentScene(CurrentScene + 1)
        }
        audio.play()
    }

    //按时间线逐渐显示对话
    const [SpeechDuration, setSpeechDuration] = useState(0)
    const [TalkPassed, setTalkPassed] = useState(0)
    let intervalSetTalkPassed = null
    useEffect(() => {
        if (TalkPassed >= SpeechDuration) return
        //increase duration passed every 100ms
        intervalSetTalkPassed = setTimeout(() => setTalkPassed(TalkPassed + 0.11), 100)
        //clear interval when duration passed
        setTimeout(() => clearTimeout(intervalSetTalkPassed), 120)
    }, [SpeechDuration, TalkPassed])
    const StartPlay = (CurrentScene) => {
        audio?.pause()
        //when CiteQuestion move to another question, play mario ding sound
        if (!!ScenerInfos[CurrentScene]?.CiteQuestion && QASocrates?.length > 0) PlayTTSOgg("/DingSoundEffect.ogg")

        let Text = ScenerInfos[CurrentScene]?.Text
        !!Text && PlayTTSOgg(GetUrl(Cmd.HGET, "TTSOggSocrates", Text, RspType.ogg))

    }
    useEffect(() => {
        if (!FullName()) return
        if (CurrentScene < 0 || CurrentScene >= ScenerInfos.length) return


        //handle of autoplay
        setTalkPassed(0)
        setTimeout(() => StartPlay(CurrentScene), 700)
        setSpeechDuration(((ScenerInfos[CurrentScene]?.Duration ?? 0) + Math.random() * 0.0001) / playbackRate)
        var citeQ = ScenerInfos[CurrentScene]?.CiteQuestion
        citeQ && setCiteQuestion(citeQ)

        //handle of text demo
        //if QASocrates has element that has same question, then add talk to it
        var latestQASocrates = QASocrates.filter((qa) => qa.Q === (citeQ || CiteQuestion))
        //for non exist question, add it to QASocrates
        if (latestQASocrates.length == 0) latestQASocrates = [{ Q: (citeQ || CiteQuestion), A: "", Talks: [] }]
        latestQASocrates = latestQASocrates[0]
        //if citeQ in QAs, then add it to QASocrates
        if (!!citeQ) {
            let matchedQA = QAs.filter((qa) => qa.Q === citeQ)
            if (matchedQA.length > 0) latestQASocrates.A = matchedQA[0].A
        }

        //append to header of Talks
        let Raw = ScenerInfos[CurrentScene].Text
        let ind = Raw.indexOf(":")
        let User = ind > 0 ? Raw.substr(0, ind + 1) : "苏格拉底", Talk = ind > 0 ? Raw.substr(ind + 1).trim() : Raw
        if (!latestQASocrates.Talks.includes(Raw)) latestQASocrates.Talks = [{ User, Talk, Raw }, ...latestQASocrates.Talks.filter((talk) => talk.Raw !== Raw)]
        //remove latestQASocrates from _QASocrates
        var _QASocrates = [latestQASocrates, ...QASocrates.filter((qa) => qa.Q !== (citeQ || CiteQuestion))]
        setQASocrates(_QASocrates)

    }, [CurrentScene])
    const Playing = (CurrentScene) => !isNaN(CurrentScene) && CurrentScene >= 0 && CurrentScene < ScenerInfos.length
    const LinearProgressWithLabel = (value, label) => <div className="flex items-center w-full self-center">
        <div className="w-full mr-1">
            <LinearProgress variant="determinate" value={value} />
        </div>
        <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(value)}%`}</Typography>
        </Box>
    </div>
    if (!FullName(skillSession)) return <div key={`socratic-container-nodata`} className="flex flex-col justify-between items-start w-full h-full overflow-scroll  max-w-[40%]" ></div>
    return <div key={`socratic-container-${skillSession}`} style={{ width: "40%" }} className="flex flex-col justify-between items-start w-full h-full overflow-scroll  max-w-[40%]"    >
        {/* //list Tags of QAs,using mui tag */}
        <div className="flex flex-col flex-wrap justify-start items-start w-full  mt-2 gap-[7px] opacity-90 h-38"        >

            <div className="flex flex-row w-full">
                <ScrollingBanner
                    components={[<HoldInRoadAlert />, <Talkers ScenerInfos={ScenerInfos} CurrentScene={CurrentScene} />]}
                    durations={[3000, 8000]}
                ></ScrollingBanner>
            </div>

            <div title="playSocratesDemo" className="flex flex-row w-full text-base justify-start items-start h-10 -mt-1 " >
                <div title={"自动修复错误的问答列表"} className="flex flex-row pr-1 h-full self-center items-center justify-center"
                    onClick={() => FullName() && API("SkillSocrates", { Name: FullName(), Topic: topic, Rebuild: true }).then((res) => setQAs(res ?? []))
                    } >
                    <BuildIcon />
                </div>
                <div className="flex flex-row  w-full self-center gap-1" >
                    <Button size="small" onClick={() => {
                        audio?.pause();
                        clearTimeout(intervalSetTalkPassed)
                        setCurrentScene(CurrentScene - 1)
                    }} disabled={CurrentScene <= 0}>
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                    <select className="flex flex-row w-full bg-transparent  border-0 text-gray-500 dark:text-gray-400 dark:bg-gray-900 dark:border-gray-900 dark:hover:text-gray-400 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent dark:disabled:hover:text-gray-400 hover:bg-gray-100 rounded-md p-1 ring-1" value={CiteQuestion}
                        onChange={(e) => {
                            //set CurrentScene according to  CurrentScene
                            var NewCurrentSceneToPlay = -1
                            ScenerInfos.map((v, i) => { if (v?.CiteQuestion === e.target.value) NewCurrentSceneToPlay = i; })
                            setCurrentScene(NewCurrentSceneToPlay)

                        }} >
                        {
                            // options betwenn 1 to 100, default 10 
                            // ScenerInfos.map((v, i) => <option key={`option-${i}`} value={i} className={"flex-wrap "} title={v.CiteQuestion} > {!!v.CiteQuestion ? v.CiteQuestion + "\n" + v.Text : "\xA0\xA0\xA0\xA0 " + v.Text} </option>)
                            ScenerInfos.filter((v, i) => { return !!v.CiteQuestion }).map((v, i) => <option key={`option-${i}`} value={v.CiteQuestion} > {(i + 1) + ": " + v.CiteQuestion} </option>)

                        }
                    </select>
                    <Button size="small" onClick={() => {
                        audio?.pause();
                        clearTimeout(intervalSetTalkPassed)
                        setCurrentScene(CurrentScene + 1)
                    }} disabled={CurrentScene >= ScenerInfos.length}>
                        Next <KeyboardArrowRight />
                    </Button>
                </div>

                {/* play or pause senery accoridng to PlayingSenery */}
                <div title={"播放演示"} className="flex flex-row pr-1 h-full self-center items-center justify-center" onClick={() => {
                    if (CurrentScene >= 0 && CurrentScene < ScenerInfos.length) {
                        //if audio is playing ,then pause it
                        let playing = !audio?.paused
                        console.info("playing", playing)
                        if (!playing) {
                            //play at speed of 2x
                            if (audio) {
                                audio.playbackRate = playbackRate;
                            }

                            //continue play
                            audio?.play()
                            intervalSetTalkPassed = setTimeout(() => setTalkPassed(TalkPassed + 0.11), 100)
                        } else {
                            audio?.pause()
                            clearTimeout(intervalSetTalkPassed)
                            setCiteQuestion("")
                        }
                    } else {
                        setQASocrates([])
                        setTimeout(() => setCurrentScene(0), 100)
                    }
                }} >
                    <div className={"flex flex-row gap-1 self-center items-center justify-center flex-nowrap " + (Playing(CurrentScene) ? " animate-pulse hover:grayscale" : " grayscale-[60%] hover:grayscale-0")} >
                        <div className="mt-1"><TwoIO /></div>
                        <div className="text-2xl -mt-2 self-center"> {Playing(CurrentScene) ? "" : ".."}</div>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex flex-col flex-wrap justify-start items-start overflow-scroll w-full  mt-2 gap-[7px] opacity-90 max-h-[60%] min-h-min"        >
            {
                (CurrentScene < 0 || CurrentScene >= ScenerInfos.length) && QAs.filter((QA) => QATraces.join("").indexOf(QA.Q) < 0).map((QA, index) => {
                    return <div key={QA.Q} className=" text-base  even:bg-lime-100 odd: bg-amber-100 max-w-[49%] rounded-md px-4 py-[4px]  items-center"
                        onClick={() => API("SkillMyTraceReport", { SkillName: topic, SessionName: FullName(), Ask: `${QA.Q}|||${QA.A}` }).then((res) => {
                            let newMySkillTrace = { ...skillMyTrace, [FullName()]: res }
                            setSkillMyTrace(newMySkillTrace)
                            //update creditTM to refresh rewards
                            setCreditTM(new Date().getTime())
                        })} >
                        ❓{QA.Q}
                    </div>
                })
            }

        </div>

        {/* <div className="bg" style={{ boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.75)" }}>        </div> */}

        {/* The whole chat box is scrollable */}
        <div key="what-is-my-answered" className="flex flex-col justify-start items-start w-full  max-h-max min-h-min overflow-scroll my-2 " style={{ boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.20)" }}>
            {
                //display CurrentQAs as dialog box,question on the left,answer on the right
                QASocrates?.length === 0 && QATraces.reverse().map((qa, index) => {
                    return <div key={`question-answer-q-${qa.Q}-${index}`} className="flex flex-col justify-start items-start w-full h-fit py-3">
                        <div variant="18px" className="flex flex-row justify-start items-start  text-base text-gray-800 font-sans w-fit bg-orange-100 rounded-full  px-2 mb-2">
                            <div className="text-lg mr-1">🤔</div>  {qa.split("|||")[0]}
                        </div>

                        {/* align answer to the right */}
                        <div key={`question-answer-a${qa[1]}-${index}`} style={{ maxWidth: "80%", backgroundColor: "#d2f9d1" }}
                            className="flex flex-col justify-start items-start self-end text-sm text-gray-800 font-sans w-fit rounded-lg  px-2 py-2 whitespace-pre-line">

                            💬 {qa.split("|||")[1]}
                        </div>
                    </div>
                })
            }
            {!QAs?.length && <LoadingComponent />}
            {
                //苏格拉底演练
                QASocrates?.length > 0 && QASocrates.map((qa, index) => {
                    return <div key={`question-answer-q-${qa.Q}-${index}`} className="flex flex-col justify-start items-start w-full h-fit py-3 gap-1">
                        <div variant="18px" className="flex flex-row justify-start items-start  text-base text-gray-800 font-sans w-fit bg-orange-100 rounded-full  px-2 mb-2">
                            <div className="text-lg mr-1">🤔</div>  {qa.Q}
                        </div>
                        {/* align answer to the right */}
                        {CurrentScene >= 0 && (CurrentScene == ScenerInfos.length || (CiteQuestion != qa.Q)) && !!qa.A && <div key={`question-answer-a${qa[1]}-${index}`} style={{ maxWidth: "80%", backgroundColor: "#d2f9d1" }}
                            className="flex flex-col justify-start items-start self-end text-sm text-gray-800 font-sans w-fit rounded-lg  px-2 py-2 whitespace-pre-line bg-orange-100 ">

                            💬 {qa.A}
                        </div>
                        }
                        {
                            qa.Talks?.map((talk, ind) => <div key={`question-answer-talks${qa[1]}-${ind}`} style={{ maxWidth: "80%", backgroundColor: "#d2f9d1" }}
                                className={"flex flex-row justify-start items-start self-end font-sans w-fit rounded-lg  px-2 py-2 whitespace-pre-line  selection:bg-fuchsia-300 gap-1" + (talk.Raw === ScenerInfos[CurrentScene]?.Text ? " ring-2 text-lg text-gray-900 " : " text-base  text-gray-800 ")} >
                                {talk.User === "女孩:" && <Avatar alt="女孩" src="/image-girl.jpg"></Avatar>}
                                {talk.User === "男孩:" && <Avatar alt="男孩" src="/image-man.jpeg"></Avatar>}
                                {talk.User === "苏格拉底:" && <Avatar alt="苏格拉底" src="/socratics.jpeg"></Avatar>}
                                <div className=" flex-nowrap">
                                    <b className={" text-bold"}>{talk.Raw === ScenerInfos[CurrentScene]?.Text ? talk.Talk.substr(0, talk.Talk.length * (TalkPassed / SpeechDuration)) : ""}</b>
                                    {talk.Raw === ScenerInfos[CurrentScene]?.Text ? talk.Talk.substr(talk.Talk.length * (TalkPassed / SpeechDuration), talk.Talk.length) : talk.Talk}
                                </div>
                            </div>)
                        }
                    </div>
                })
            }
        </div>
        {/* <div key="question-box" className="flex flex-col justify-start items-start w-full h-28 overflow-scroll py-2"  >
            <TextField label="提出一个新问题, Shift + Enter换行, 按Enter提交" multiline={true} rows={1} className="text-base text-gray-800 font-sans w-full h-full" style={{ boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.25)" }}
                onKeyDown={
                    (e) => {
                        //if key press enter+shift,add a new line
                        //if press enter without shift,submit
                        if (e.keyCode === 13 && !e.shiftKey) {
                            e.preventDefault()
                            if (!IsValidSkillPoint()) return
                            //if not empty
                            let question = e.target.value
                            if (!!question) {
                                e.target.value = ""
                                API("SkillSocratic", { Name: FullName(), Quetion: question })
                                    .then((res) => setQAs(res ?? []))
                                API("SkillMyTraceReport", { SkillName: topic, SessionName: FullName(), Ask: `${question}|||${answer}` }).then((res) => {
                                    let newMySkillTrace = { ...skillMyTrace, [FullName()]: res }
                                    setSkillMyTrace(newMySkillTrace)
                                    //update creditTM to refresh rewards
                                    setCreditTM(new Date().getTime())
                                })
                            }
                        }
                    }}
            />
        </div> */}


    </div >
}