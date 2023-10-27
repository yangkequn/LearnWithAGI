

import React, { useEffect, useState } from "react";
import { Cmd, GetUrl, RspType } from "../../component/api";
export const DemoContext = React.createContext({
    paused: false,
    setPaused: () => { },

    playbackRate: {},
    setPlaybackRate: () => { },
    setVolume: () => { },

    CurrentScene: false,
    setCurrentScene: () => { },

    TalkPassed: 0,
    setTalkPassed: () => { },

    SceneryInfos: [],
    setSceneryInfos: () => { },

    MindmapRawText: [],
    setMindmapRawText: () => { },


});
var audio = null

export default function DemoContextComponent({ children }) {
    //[{Name,Rank,Path,QAs,Ask,Answer,Correct,Wrong,EmotionValence,EmotionArousal,EmotionDominance},...]
    const [paused, setPaused] = useState(false)
    const [playbackRate, setPlaybackRate] = useState(false)
    const [volume, setVolume] = useState(0.5)
    const [CurrentScene, setCurrentScene] = useState(-1)
    const [TalkPassed, setTalkPassed] = useState(0)
    const [SceneryInfos, setSceneryInfos] = useState([])
    const [MindmapRawText, setMindmapRawText] = useState(null);
    useEffect(() => {
        audio = new Audio(undefined)
    }, [])
    useEffect(() => {
        if (paused) audio?.pause()
        if (!paused) audio?.play()
    }, [paused, audio])
    useEffect(() => {
        if (!audio) return
        audio.playbackRate = playbackRate;
    }, [playbackRate, audio])
    useEffect(() => {
        audio.volume = isNaN(volume) ? 0.5 : volume
    }, [volume, audio])

    const PlayTTSOgg = (...urls) => {
        //play each audio one by one
        audio.src = urls[0].url
        //use default playbackRate
        audio.playbackRate = urls[0].playbackRate ?? playbackRate
        //set volume
        audio.volume = isNaN(volume) ? 0.5 : volume
        audio.onended = () => {
            if (urls.length > 1) PlayTTSOgg(...urls.slice(1))
            else setCurrentScene(CurrentScene + 1)
        }
        audio.play()
    }
    //autoplayTTSAudio
    useEffect(() => {
        if (!audio) return
        if (CurrentScene < 0) return
        if (CurrentScene >= SceneryInfos.length) return
        console.log("CurrentScene changed",CurrentScene)

        var urlToPlay = []
        let Text = SceneryInfos[CurrentScene]?.Text
        if (!!Text) urlToPlay.push({ url: GetUrl(Cmd.HGET, "TTSOggSocrates", Text, RspType.ogg), playbackRate: undefined })

        //when CiteQuestion move to another question, play mario ding sound
        if (!!SceneryInfos[CurrentScene]?.CiteQuestion) urlToPlay.push({ url: "/DingSoundEffect.ogg", playbackRate: 1 })
        PlayTTSOgg(...urlToPlay)

    }, [CurrentScene, SceneryInfos, audio])

    const store = {
        paused, setPaused,
        playbackRate, setPlaybackRate,
        setVolume,
        CurrentScene,
        setCurrentScene,
        TalkPassed, setTalkPassed,
        SceneryInfos, setSceneryInfos,
        MindmapRawText, setMindmapRawText,
    }

    return <DemoContext.Provider value={store}>{children}</DemoContext.Provider>
}
