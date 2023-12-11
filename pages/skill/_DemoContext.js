

import React, { use, useEffect, useState } from "react";
import { Cmd, GetUrl, RspType } from "../../component/api";
export const DemoContext = React.createContext({
    paused: false,
    setPaused: () => { },

    playbackRate: {},
    setPlaybackRate: () => { },
    setVolume: () => { },

    CurrentScene: -1,
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
    const [playbackRate, setPlaybackRate] = useState(false)
    const [volume, setVolume] = useState(0.5)
    const [TalkPassed, setTalkPassed] = useState(0)
    const [SceneryInfos, setSceneryInfos] = useState([])
    const [MindmapRaw, setMindmapRaw] = useState(null);
    const [SpeechDuration, setSpeechDuration] = useState(0)
    const [CurrentScene, setCurrentScene] = useState(-1)
    const [paused, setPaused] = useState(false)
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
        if (paused) {
            if (!!audio) audio?.pause()
            else if (CurrentScene == -1) setCurrentScene(0)
        }
        if (!paused) {
            if (CurrentScene >= 0) audio?.play()
            else if (CurrentScene == -1) setCurrentScene(0)
        }
    }, [paused, audio])
    useEffect(() => {
        if (!audio) return
        audio.playbackRate = playbackRate;
    }, [playbackRate, audio])
    //set volume if changed
    useEffect(() => {
        if (!!audio) audio.volume = isNaN(volume) ? 0.5 : volume
    }, [volume, audio])

    //set duration of each scene
    useEffect(() => {
        if (CurrentScene < 0) return
        if (CurrentScene >= SceneryInfos.length) return
        setSpeechDuration(((SceneryInfos[CurrentScene]?.DurationSec ?? 0) + Math.random() * 0.0001) / playbackRate)
    }, [CurrentScene, SceneryInfos, playbackRate])

    const PlayTTSOgg = (urlObj) => {
        //play each audio one by one
        audio.src = urlObj.url
        //use default playbackRate
        audio.playbackRate = urlObj.playbackRate ?? playbackRate
        //set volume
        if (!!audio) audio.volume = isNaN(volume) ? 0.5 : volume
        //stop at the end of last audio
        if (CurrentScene < SceneryInfos.length - 1) audio.onended = () => setCurrentScene(CurrentScene + 1)
        if (CurrentScene == SceneryInfos.length - 1) audio.onended = () => {
            setTimeout(() => console.log("AutoPlayEnd"), 2000)
        }
        audio.play()
    }

    const PlayTDing = () => {
        var audio = new Audio("/DingSoundEffect.ogg")
        //use default playbackRate
        audio.playbackRate = 1.0
        //set volume
        if (!!audio) audio.volume = isNaN(volume) ? 0.5 : volume * 0.5
        audio.play()
    }
    //autoplayTTSAudio
    useEffect(() => {
        if (!audio) return
        if (CurrentScene < 0) {
            //stop playing
            audio?.pause()
            return
        }
        if (CurrentScene >= SceneryInfos.length) return
        //console.log("CurrentScene changed", CurrentScene)

        if (!MindmapRaw) return
        //when CiteQuestion move to another question, play mario ding sound
        var playDing = MindmapRaw.filter((line) => line.NodeID.length === 1 && line.SeqNum === CurrentScene).length > 0
        CurrentScene > 0 && (CurrentScene >= SceneryInfos.length || playDing) && PlayTDing()

        let Text = SceneryInfos[CurrentScene]?.Text

        var urlObj = { url: GetUrl(Cmd.HGET, "TalksOgg", Text, RspType.ogg), playbackRate: undefined }
        if (!!Text) PlayTTSOgg(urlObj)

    }, [CurrentScene, SceneryInfos, audio, MindmapRaw])

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
        Playing,
    }

    return <DemoContext.Provider value={store}>{children}</DemoContext.Provider>
}
