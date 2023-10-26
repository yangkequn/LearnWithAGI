/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, use, useContext, useEffect, useMemo, useState } from "react"
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
import { ToMermaidMindmapFormat, ToPlayingFormat } from "./mindmap";
import mermaid from 'mermaid';
import { parse } from "path";

let audio = null

const HoldInRoadAlert = () => {
    var items = `警惕！这里可能有误区。
内容有“坑”：你能发现吗？
不靠谱的内容，你辨识出来了吗！
谁能捕捉到有哪些失误？
错误就在眼前：留心观察！
警觉！别让错误滑过你的眼睛。
内容有“小陷阱”：你会掉进去吗？`.split("\n")
    const RaondomItem = () => items[Math.floor(Math.random() * items.length)]
    const [randomText, setRandomText] = React.useState(null);

    React.useEffect(() => {
        setRandomText(RaondomItem());
    }, []);


    return <div className=" flex flex-row justify-start items-center w-full  whitespace-nowrap text-base text-gray-700 font-sans font-medium leading-6 gap-2 px-2 pb-2 h-36"            >
        <div className=" w-40 h-32  rounded-3xl mt-0 self-stretch " title={"苏格拉底之问"}>
            <img className={`rounded-3xl -mr-2 `} src="/holeInRoad.webp" ></img>
        </div>
        <div className="flex h-full text-2xl text-gray-800 font-sans leading-4  w-full  bg-white/70 rounded-md px-2 pt-1 gap-1 items-center pl-4"                    >
            {randomText}
        </div>
    </div>
}

const Talkers = ({ ScenerInfos, CurrentScene }) => <div key={`talker-${CurrentScene}-${ScenerInfos}`}
    className="flex flex-row  text-xl text-gray-800 font-sans leading-4  w-full  bg-white/70 rounded-md px-2 pt-1 gap-1 justify-between items-center h-36">


    <div className={"w-32 h-32 rounded-lg"} >
        <img className={!isNaN(CurrentScene) && CurrentScene >= 0 && CurrentScene < ScenerInfos?.length && ScenerInfos[CurrentScene].Text.indexOf("女孩") === 0 && " ring-4 animate-pulse" || ""} src="/image-girl.jpg"></img>
    </div>

    <div className={" w-36 h-32 mt-1 self-stretch overflow-hidden rounded-lg "} title={"苏格拉底之问"}>
        <img className={(!isNaN(CurrentScene) && CurrentScene >= 0 && CurrentScene < ScenerInfos?.length && ScenerInfos[CurrentScene].Text.indexOf("苏格拉底") === 0 && "ring-4 animate-pulse " || "") + `  -mr-8`} src="/socrates.webp"
        ></img>
    </div>

    <div className="w-32 h-32 rounded-lg" >
        <img className={!isNaN(CurrentScene) && CurrentScene >= 0 && CurrentScene < ScenerInfos?.length && ScenerInfos[CurrentScene].Text.indexOf("男孩") === 0 && " ring-4 animate-pulse" || ""} src="/image-man.jpeg"></img>
    </div>
    <div className="flex flex-col  h-full text-2xl text-gray-800 font-sans leading-4   bg-white/70 rounded-xl my-2 px-4 py-6 gap-6 items-center "                    >
        <div>追问        </div>
        <div>          思辨</div>
        <div>-&gt; 自我发现</div>
    </div>
</div>

export default function DemoTalk({ volume, playbackRate }) {
    const { setCreditTM, debugMode } = useContext(GlobalContext)
    const { skillTree, skillMyTrace, setSkillMyTrace, skillSession, setSkillSession } = useContext(Context)
    //all QAs about this skill topic
    const [QAs, setQAs] = useState([])
    const FullName = () => `${skillSession?.Name}:${skillSession?.Detail}`

    const [ScenerInfos, setScenerInfos] = useState([])
    const [CurrentScene, setCurrentScene] = useState(-1)
    const [paused, setPaused] = useState(false)
    const [CiteQuestion, setCiteQuestion] = useState("")
    const [QASocrates, setQASocrates] = useState([])
    const topic = () => skillTree?.Name + ":" + skillTree?.Detail
    const [mermaidMindmap, setMermaidMindmap] = useState([]);
    //playingMindmap 是 mermaidMindmap的子集。同时添加了样式控制。以便更好聚焦正在讲授的内容
    const [playingMindmap, setPlayingMindmap] = useState("");
    const [MindmapRawText, setMindmapRawText] = useState(null);


    useEffect(() => {
        if (FullName().length < 1) return
        API("SkillSessionMindmap", { SessionName: FullName() }).then((res) => {
            if (!res) return
            setMindmapRawText(res)
            var map = ToMermaidMindmapFormat(res)
            setMermaidMindmap(map)
            setPlayingMindmap(map.join("\n"))
        })
    }, [skillSession])



    //QAs and QATrace according to skillTreeSelected
    useEffect(() => {
        setQAs([])
        setQASocrates([])
        let Name = FullName()
        if (!Name || Name.indexOf("undefined") >= 0 || Name.indexOf("undefined") >= 0) return
        if (!skillTree?.Sessions || skillTree?.Sessions?.length <= 0) return
        var Topic = topic()
        //loadSkillSessionQAs
        API("SkillSocrates", { Name, Topic, Rebuild: false }).then((res) => (Name === FullName()) && setQAs(res ?? []))
        //Senery TTSInfo
        API("SkillSocratesTTS", { Session: FullName(), Topic }).then((res) => {
            if (Name !== FullName()) return
            if (!res || res.length == 0) return setScenerInfos([])
            setScenerInfos(res)
        })

    }, [skillTree, skillSession])

    useEffect(() => {
        if (!FullName()) return
    }, [skillSession, skillMyTrace])

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

    //儿童成长阶段的行为差异探讨

    // 1 儿童行为的阶段差异:探讨儿童在不同成长阶段的行为表现及其差异|||0
    // 1.1 幼儿期
    // 1.1.1 情感需求较多
    // 1.1.2 依赖家庭
    // 1.2 青少年期
    // 1.2.1 寻求自主性
    // 1.2.2 独立性增强

    const Mermaid = ({ chart }) => {
        useEffect(() => {
            mermaid.initialize({ startOnLoad: true, securityLevel: 'loose' });



            //确保图表渲染完成后添加点击事件监听器
            mermaid.init(undefined, '.mermaid', (charID) => {
                const mermaidNodes = document.querySelectorAll('.mindmap-node');

                var playingMap = playingMindmap.split("\n")
                //remove lines that contains "animate-pulse"
                playingMap = playingMap.filter((line) => line.indexOf(":::") < 0)
                if (playingMap.length != mermaidNodes.length) {
                    console.log("playingMap.length!=mermaidNodes.length", playingMap.length, mermaidNodes.length)
                    return
                }
                mermaidNodes.forEach((node, ind) => {
                    node.id = playingMap[ind].trim().split("-")[0];
                    node.addEventListener('click', (e) => {

                        if (!!audio) audio.pause()
                        clearTimeout(intervalSetTalkPassed)
                        setQASocrates([])


                        var idSentenceStr = e.currentTarget.id
                        console.log("id clicked:", idSentenceStr)
                        var id_sentense = idSentenceStr.split("_")
                        var playingmapStr = ToPlayingFormat(mermaidMindmap, id_sentense[0]).join("\n")
                        setPlayingMindmap(playingmapStr)
                        setCurrentScene(parseInt(id_sentense[1]))
                        setPaused(false)
                        e.preventDefault();
                        e.stopPropagation();
                    });
                })
            });

        }, [chart]);

        return <div className="mermaid" key={`mermaid-mindmap-${chart}`}>{chart}</div>;
    };
    useEffect(() => {
        console.log("playingMindmap changed", playingMindmap)

    }, [playingMindmap])

    const Playing = (CurrentScene) => !isNaN(CurrentScene) && CurrentScene >= 0 && CurrentScene < ScenerInfos.length
    const LinearProgressWithLabel = (value, label) => <div className="flex items-center w-full self-center">
        <div className="w-full mr-1">
            <LinearProgress variant="determinate" value={value} />
        </div>
        <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(value)}%`}</Typography>
        </Box>
    </div>
    if (!FullName(skillSession)) return <div key={`socratic-container-nodata`} className="flex flex-col justify-between items-start w-full h-full  max-w-[40%]" ></div>
    return <div key={`socratic-container-${skillSession}`} style={{ width: "40%" }} className="flex flex-col justify-between items-start w-full h-full max-w-[97%]"    >
        {/* //list Tags of QAs,using mui tag */}
        <div className="flex flex-col flex-wrap justify-start items-start w-full  mt-2 gap-[7px] opacity-90 h-38"        >

            <div className="flex flex-row w-full">
                {!Playing(CurrentScene) && <ScrollingBanner
                    components={[<HoldInRoadAlert />, <Talkers ScenerInfos={ScenerInfos} CurrentScene={CurrentScene} />]}
                    durations={[3000, 8000]}
                ></ScrollingBanner>}
            </div>

            <div title="playSocratesDemo" className="flex flex-row w-full text-base justify-start items-start h-10 -mt-1 " >
                {
                    debugMode >= 3 && <div title={"自动修复错误的问答列表"} className="flex flex-row pr-1 h-full self-center items-center justify-center"
                        onClick={() => FullName() && API("SkillSocrates", { Name: FullName(), Topic: topic(), Rebuild: true }).then((res) => setQAs(res ?? []))
                        } >
                        <BuildIcon />
                    </div>
                }
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
                <div title={"播放演示"} className="flex flex-row pr-1 h-10 self-center items-center justify-center" >
                    <div className={"flex flex-row gap-1 self-center items-center justify-center flex-nowrap h-10 "} >
                        <div className={"mt-1" + (Playing(CurrentScene) ? " animate-pulse hover:grayscale" : " grayscale-[60%] hover:grayscale-0")}><TwoIO /></div>
                        {
                            !Playing(CurrentScene) && <div className="flex flex-row w-10 flex-nowrap h-fit text-2xl -mt-2 self-center" onClick={() => {
                                //play at speed of 2x
                                if (audio) {
                                    audio.playbackRate = playbackRate;
                                }
                                setQASocrates([])
                                setPaused(false)
                                setTimeout(() => setCurrentScene(0), 100)
                            }
                            } >.. ▶️</div>
                        }
                        {
                            Playing(CurrentScene) && <div className="flex -mt-1 flex-row gap-2  self-center">
                                {!paused && <div title="暂停播放" className="flex h-fit" onClick={() => {
                                    if (!!audio) audio.pause()
                                    clearTimeout(intervalSetTalkPassed)
                                    setPaused(true)
                                }} >⏸️</div>
                                }

                                {paused && <div title="继续播放" className="flex h-fit" onClick={() => {
                                    //continue play
                                    audio?.play()
                                    setPaused(false)
                                    intervalSetTalkPassed = setTimeout(() => setTalkPassed(TalkPassed + 0.11), 100)
                                }}>▶️</div>
                                }
                                <div className="flex h-fit" onClick={() => {
                                    if (!!audio) audio.pause()
                                    setCurrentScene(-1)
                                    setCiteQuestion("")
                                    setQASocrates([])
                                    clearTimeout(intervalSetTalkPassed)
                                    setTalkPassed(0)
                                }}>⏹️</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {/* <Mermaid chart={
`mindmap
root((mindmap))
  Tools
    Pen and paper
    Mermaid`
            } /> */}

            {/* <Mermaid chart={`
mindmap
root((mindmap))
    Origin))Origin((
    history[Long history]
    :::animate-pulse

  `} />      */}
            {playingMindmap?.length > 0 && <div className="w-full " key={playingMindmap}>
                <Mermaid chart={"mindmap\n" + playingMindmap} />
            </div>}
        </div>



        {/* The whole chat box is scrollable */}
        <div key="what-is-my-answered" className="flex flex-col justify-start items-start w-full max-h-max min-h-min overflow-auto my-2 pr-1 " style={{ boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.20)" }}>
            {!QAs?.length && <LoadingComponent Text="Loading..." />}
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

    </div >
}