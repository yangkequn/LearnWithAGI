
import React, { useContext, useEffect, useState } from 'react';
import { DemoContext } from './_DemoContext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';
const ProgressBar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [newProgress, setNewProgress] = useState(0);
    const [TotalDuration, setTotalDuration] = useState(0);
    const { paused, setPaused, setPlaybackRate, setVolume, CurrentScene, setCurrentScene, SceneryInfos, setSceneryInfos, TalkPassed, MindmapRaw } = useContext(DemoContext)

    //calculate total duration
    //accumulate each scene duration
    useEffect(() => {
        let totalDuration = 0
        SceneryInfos.forEach((item) => totalDuration += item.Duration)
        setTotalDuration(totalDuration)

    }, [CurrentScene, SceneryInfos])

    //calculate newProgress
    useEffect(() => {
        if (CurrentScene < 0 || SceneryInfos.length == 0 || TotalDuration <= 2) return setNewProgress(0)
        if (CurrentScene >= SceneryInfos.length) return setNewProgress(100)

        let totalDuration = TalkPassed
        for (var ind = 0; ind < CurrentScene; ind++) totalDuration += SceneryInfos[ind].Duration
        let newProgressValue = (totalDuration / TotalDuration) * 100;
        setNewProgress(newProgressValue);
    }, [CurrentScene, SceneryInfos, TalkPassed])

    //select scene to play
    const handleClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const newProgressValue = (x / rect.width) * 100;
        //select senery to play
        let totalDuration = newProgressValue * TotalDuration / 100
        for (let i = 0; i < SceneryInfos.length; i++) {
            totalDuration -= SceneryInfos[i].Duration
            if (totalDuration < 0) {
                setCurrentScene(i)
                break
            }
        }
        setNewProgress(newProgressValue);
        // 你可以在这里处理新的进度值，比如更新父组件的状态或触发其他功能
    };
    const [chapters, setChapters] = useState([{ position: 0, text: "章节1" }])
    const StartPosition = (index) => {
        let totalDuration = 0
        SceneryInfos.forEach((item, ind) => { if (ind < index) totalDuration += item.Duration })
        return (totalDuration / TotalDuration) * 100;
    }
    useEffect(() => {
        if (TotalDuration <= 0 || !MindmapRaw || MindmapRaw.length == 0) {
            setChapters([])
            return
        }
        //1 儿童行为的阶段差异:探讨儿童在不同成长阶段的行为表现及其差异|||0
        var _chapters = []
        MindmapRaw.map((node, index) => {
            if (node.Layer.length != 1) return
            if (node.Layer == "0") return
            var position = StartPosition(parseInt(node.SeqNum))
            _chapters.push({ position, text: node.Name })
        })
        setChapters(_chapters)
    }, [TotalDuration, MindmapRaw])

    const formatTime = (percentage) => {
        const totalSeconds = (percentage / 100) * TotalDuration;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div
            className="flex flex-col relative w-full h-fit  rounded cursor-pointer mb-5"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 显示session标题 */}
            <div className='flex w-full absolute -top-0'>
                {isHovered && <div className='flex flex-row relative w-full h-4'>
                    {chapters.map((chapter, index) => (
                        <div key={index} style={{ left: `${chapter.position}%` }} className={`absolute flex flex-row bottom-0 mb-5 text-xs  -rotate-12`}>
                            <div className={`mt-1 text-white rounded p-1 ${index % 2 == 0 ? " bg-black" : " bg-gray-600"} `}>{chapter.text}</div>
                        </div>
                    ))}
                </div>}
            </div>
            <div className="flex flex-row w-full relative h-1 rounded-r" onClick={handleClick}>
                <div className=" flex w-full flex-row  h-1 bg-gray-50 opacity-90  rounded-r" > </div>
                <div style={{ width: `${newProgress}%` }} className="flex flex-row absolute h-1 bg-red-600 opacity-60  rounded-r" > </div>
                {chapters.map((chapter, index) => (
                    <div key={index} style={{ left: `${chapter.position}%` }} className="absolute flex flex-row bottom-0 mb-0 text-xs ">
                        <div className="w-1 h-1 bg-black"></div>
                    </div>
                ))}

            </div>

            <div className="flex flex-row h-6 bottom-0 w-full justify-between gap-2">
                <div className="flex px-4 py-1 gap-2">
                    {paused && <PlayArrowIcon title="Play" onClick={e => {
                        setPaused(false)
                        e.preventDefault();
                        e.stopPropagation()
                    }} ></PlayArrowIcon>}
                    {!paused && <PauseIcon title="Paused" onClick={e => {
                        setPaused(true)
                        e.preventDefault();
                        e.stopPropagation()
                    }}></PauseIcon>}
                    <StopIcon onClick={e => {
                        setPaused(true)
                        setCurrentScene(-1)
                        e.preventDefault();
                        e.stopPropagation()
                    }}></StopIcon>
                </div>
                <span className="mx-2 py-1">{formatTime(newProgress)} / {formatTime(100)}</span>
            </div>
        </div>
    );
};

export default ProgressBar;
