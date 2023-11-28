

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
//[{NodeID: "0", Name: "成长阶段:儿童如何在不同阶段表现出特定的行为", SeqNum: 0},{NodeID: "1", Name: "生理和社会因素的影响", SeqNum: 3},{NodeID: "1.1", Name: "生理因素的作用", SeqNum: 4},]
export const ToMermaidMindmapFormat = (raw) => {
    if (!raw) return []
    var TonicN = 0;
    var result = raw.map(line => {
        //repeat \t for leadingTabs times
        let layer = line.NodeID.replace(".", "")
        if (layer == "0") return `0_0-((${line.Name}))`
        else if (layer.length == 1) return `${"\t"}${line.NodeID + "_" + line.SeqNum + "-"}(${++TonicN}: ${line.Name})`
        else if (layer.length == 2) return `${"\t\t"}${line.NodeID + "_" + line.SeqNum + "-"}{{${line.Name}}}`
        else if (layer.length == 3) return `${"\t\t\t"}${line.NodeID + "_" + line.SeqNum + "-"}[${line.Name}]`
        return ""
    })
    //console.log("result\n", result)
    return result
}
//选中的思维导图分支加闪动CSS，其它分支只显示到第一级
export const ToPlayingFormat = (raw, topicID) => {
    if (topicID == "0") topicID = "1"
    if (topicID.length > 1) topicID = topicID.substr(0, 1)
    var TonicN = 0;
    //如果不为空，topicID 是 1.* ,那么只有1.* 的内容会被全部显示。其它2.* 3.* 的内容只显示到第一级为止
    var result = raw.map(line => {
        //repeat \t for leadingTabs times
        let layer = line.NodeID.replace(/\./g, ""), focused = line.NodeID.indexOf(topicID) == 0, ret = ""
        if (!(focused || layer.length == 1 || layer == "0")) return ""

        if (layer == "0") ret = `0_0-((${line.Name}))`
        else if (layer.length == 1) ret = `${"\t"}${line.NodeID + "_" + line.SeqNum + "-"}(${++TonicN}: ${line.Name})`
        else if (layer.length == 2) ret = `${"\t\t"}${line.NodeID + "_" + line.SeqNum + "-"})${line.Name}(`
        else if (layer.length == 3) ret = `${"\t\t\t"}${line.NodeID + "_" + line.SeqNum + "-"}[${line.Name}]`
        if (focused) ret += "\n:::customAnimate hover:grayscale hover:text-yellow-700"
        return ret
    })
    result = result.filter((line) => !!line.trim())
    console.log("result\n", result.join("\n"))
    return result;
}