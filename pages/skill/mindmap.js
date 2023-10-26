

import mermaid from 'mermaid';
import { useEffect } from 'react';

export const Mermaid = ({ chart }) => {
    useEffect(() => {
        mermaid.initialize({ startOnLoad: true, securityLevel: 'loose' });

        const handleNodeClick = (nodeId) => {
            console.log("Node clicked:", nodeId);
        };

        // 确保图表渲染完成后添加点击事件监听器
        mermaid.init(undefined, '.mermaid', (charID) => {
            const mermaidNodes = document.querySelectorAll('.mindmap-node');

            mermaidNodes.forEach((node, ind) => {
                node.id = node.id || `mmp-${ind}`;
                node.addEventListener('click', (e) => {
                    handleNodeClick(e.currentTarget.id);
                });
            })
        });

    }, [chart]);

    return <div className="mermaid">{chart}</div>;
};

//     format:
// 儿童成长阶段的行为差异探讨

// 1 儿童行为的阶段差异:探讨儿童在不同成长阶段的行为表现及其差异|||0
// 1.1 幼儿期
// 1.1.1 情感需求较多
// 1.1.2 依赖家庭
// 1.2 青少年期
// 1.2.1 寻求自主性
// 1.2.2 独立性增强
// 2 影响因素分析:分析生理和社会因素如何影响儿童的行为|||3
// 2.1 生理因素
// 2.1.1 大脑和神经系统发展
// 2.1.2 认知能力提高
// 2.1.3 荷尔蒙水平变化
// 2.1.4 情感调控
// 2.2 社会因素
// 2.2.1 家庭影响
// 2.2.2 学校作用
// 2.2.3 同伴关系
// 2.2.4 文化背景
export const ToMermaidMindmapFormat = (raw, currentTopic) => {
    if (!raw) return []
    const lines = raw.split("\n")
    var startSentence = 0
    var result = lines.map(line => {
        if (line?.length === 0) return ""

        var leadingTabs = 0, ind = 0
        for (ind = 0; ind < line.length; ind++) {
            if (line[ind] == " " || line[ind] == "\t" || line[ind] == ".") continue
            if ((line[ind] >= "0" && line[ind] <= "9")) {
                leadingTabs += 1
                continue
            }
            break
        }

        var leadingSessionNum = line.substr(0, ind).trim()
        var marshaled = line.substr(ind, line.length - ind)
        if (marshaled?.length === 0) return ""
        var marshaledItems = marshaled.split("|||")
        if (marshaledItems.length > 1) {
            var numStr = marshaledItems[marshaledItems.length - 1]
            startSentence = parseInt(numStr)
        }
        var text = marshaledItems[0]
        //if  contains :,then split and remove post part
        if (text.indexOf(":") >= 0) {
            text = text.split(":")[0]
        }
        //repeat \t for leadingTabs times
        if (leadingTabs == 0) return `0_0-((${text}))`
        if (leadingTabs == 1) return `${"\t"}${leadingSessionNum + "_" + startSentence + "-"}(${leadingSessionNum[0] ?? ""} ${text})`
        if (leadingTabs == 2) return `${"\t\t"}${leadingSessionNum + "_" + startSentence + "-"}))${text}((`
        if (leadingTabs == 3) return `${"\t\t\t"}${leadingSessionNum + "_" + startSentence + "-"}[${text}]`
        return ""
    })
    result = result.filter(line => line?.length > 0)
    console.log("result\n", result)
    return result
}
export const ToPlayingFormat = (lines, topicID) => {
    // "root((儿童成长阶段的行为差异探讨))
    // "\t1_0-(儿童行为的阶段差异)
    // "\t\t1.1_0-))幼儿期((
    // "\t\t\t1.1.1_0-[情感需求较多]
    // "\t\t\t1.1.2_0-[依赖家庭]
    // "\t\t1.2_0-))青少年期((
    // "\t\t\t1.2.1_0-[寻求自主性]
    // "\t\t\t1.2.2_0-[独立性增强]
    // "\t2_3-(影响因素分析)
    // "\t\t2.1_3-))生理因素(("
    // "\t\t\t2.1.1_3-[大脑和神经系统发展]"
    // "\t\t\t2.1.2_3-[认知能力提高]"
    // "\t\t\t2.1.3_3-[荷尔蒙水平变化]"
    // "\t\t\t2.1.4_3-[情感调控]"
    // "\t\t2.2_3-))社会因素(("
    // "\t\t\t2.2.1_3-[家庭影响]"
    // "\t\t\t2.2.2_3-[学校作用]"
    // "\t\t\t2.2.3_3-[同伴关系]"
    // "\t\t\t2.2.4_3-[文化背景]"
    // "\t3_12-(如何支持儿童行为发展)"
    // "\t\t3.1_12-))积极教育方法(("
    // "\t\t\t3.1.1_12-[鼓励积极行为]"
    // "\t\t\t3.1.2_12-[提供正面反馈]"
    // "\t\t3.2_12-))情感支持(("
    // "\t\t\t3.2.1_12-[处理情感需求]"
    // "\t\t3.3_12-))开放沟通(("
    // "\t\t\t3.3.1_12-[建立信任和尊重]"
    // "\t4_15-(情感发展与行为表现)"
    // "\t\t4.1_15-))幼儿时期(("
    // "\t\t\t4.1.1_15-[情感需求强烈]"
    // "\t\t\t4.1.2_15-[表现出依赖和焦虑]"
    // "\t\t4.2_15-))青少年时期(("
    // "\t\t\t4.2.1_15-[寻求独立处理情感]"
    // "\t\t\t4.2.2_15-[依然存在情感需求]"
    if (!topicID) return lines;
    //root id is 0, so if topicID is 0, then set it to 1
    if (topicID == "0") topicID = "1"
    //如果不为空，topicID 是 1.* ,那么只有1.* 的内容会被全部显示。其它2.* 3.* 的内容只显示到第一级为止
    const result = [];
    let currentLevel = 0;
    result.push(lines[0]);
    result.push("::: animate-pulse");
    for (let i = 1; i < lines.length; i++) {
        let line = lines[i];
        let level = line.split(' ')[0].split('.').length;
        let leadingTabNum = 0;
        for (let ind = 0; ind < line.length; ind++) if (line[ind] == "\t") leadingTabNum++; else break;
        if (line.trim().indexOf(topicID.substr(0, 1)) === 0) {
            result.push(line);
            result.push(line.substr(0, leadingTabNum) + "::: animate-pulse hover:grayscale hover:text-yellow-700");

            currentLevel = line.split(' ')[0].split('.').length;
        } else {
            if (level < 2) {
                result.push(line);
            }
        }
    }
    console.log("resultresult", result)
    return result;
}