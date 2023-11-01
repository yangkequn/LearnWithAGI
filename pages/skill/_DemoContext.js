

import React, { use, useEffect, useState } from "react";
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
    setSceneryInfos: undefined,

    MindmapRaw: [],
    setMindmapRaw: undefined,
    SpeechDuration: 0,
    Playing: false,
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
    const [MindmapRaw, setMindmapRaw] = useState(null);
    const [SpeechDuration, setSpeechDuration] = useState(0)
    const [Playing, setPlaying] = useState(false)
    //listen to key event if space pressed, then set paused or continue
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === "Space") setPaused(!paused)
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [paused])

    useEffect(() => {
        var playing = !isNaN(CurrentScene) && CurrentScene >= 0 && CurrentScene < SceneryInfos.length
        if (playing != Playing) setPlaying(playing)
    }, [CurrentScene, SceneryInfos])


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
    //set volume if changed
    useEffect(() => {
        audio.volume = isNaN(volume) ? 0.5 : volume
    }, [volume, audio])

    //set duration of each scene
    useEffect(() => {
        if (CurrentScene < 0) return
        if (CurrentScene >= SceneryInfos.length) return
        setSpeechDuration(((SceneryInfos[CurrentScene]?.Duration ?? 0) + Math.random() * 0.0001) / playbackRate)
    }, [CurrentScene, SceneryInfos, playbackRate])

    const PlayTTSOgg = (urlObj) => {
        //play each audio one by one
        audio.src = urlObj.url
        //use default playbackRate
        audio.playbackRate = urlObj.playbackRate ?? playbackRate
        //set volume
        audio.volume = isNaN(volume) ? 0.5 : volume
        audio.onended = () => setCurrentScene(CurrentScene + 1)
        audio.play()
    }

    const PlayTDing = () => {
        var audio = new Audio("/DingSoundEffect.ogg")
        //use default playbackRate
        audio.playbackRate = 1.0
        //set volume
        audio.volume = isNaN(volume) ? 0.5 : volume
        audio.play()
    }
    //autoplayTTSAudio
    useEffect(() => {
        if (!audio) return
        if (CurrentScene < 0) return
        if (CurrentScene >= SceneryInfos.length) return
        //console.log("CurrentScene changed", CurrentScene)

        //when CiteQuestion move to another question, play mario ding sound
        var playDing = MindmapRaw.filter((line) => line.Layer.length === 1 && line.SeqNum === CurrentScene).length > 0
        CurrentScene > 0 && (CurrentScene >= SceneryInfos.length || playDing) && PlayTDing()

        let Text = SceneryInfos[CurrentScene]?.Text

        var urlObj = { url: GetUrl(Cmd.HGET, "TTSOggSocrates", Text, RspType.ogg), playbackRate: undefined }
        if (!!Text) PlayTTSOgg(urlObj)

    }, [CurrentScene, SceneryInfos, audio])

    const store = {
        paused, setPaused,
        playbackRate, setPlaybackRate,
        setVolume,
        CurrentScene,
        setCurrentScene,
        TalkPassed, setTalkPassed,
        SceneryInfos, setSceneryInfos,
        MindmapRaw, setMindmapRaw,
        SpeechDuration,
        Playing
    }

    return <DemoContext.Provider value={store}>{children}</DemoContext.Provider>
}
