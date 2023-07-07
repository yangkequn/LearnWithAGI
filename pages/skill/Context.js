

import React, { useState } from "react";

export const Context = React.createContext(null)
export const ContextComponent = ({ children }) => {
    //[{Name,Rank,Path,QAs,Ask,Answer,Correct,Wrong,EmotionValence,EmotionArousal,EmotionDominance},...]
    const [skillTree, setSkillTree] = useState([]);
    const [skillTreeSelected, setSkillTreeSelected] = useState(-1);

    //key skillPoint name, value is the skillMyTrace{QAs,Asks}
    //for each line of QA, the first is question, the second is answer,seperated by |||. the answer is 0 or 1 or 2 or 3
    //for each line of Asks, the first is question, the second is answer,seperated by |||
    const [skillMyTrace, setSkillMyTrace] = useState({});
    const [skillPoint, setSkillPoint] = useState(null)
    const store = {
        skillTree, setSkillTree,
        skillTreeSelected, setSkillTreeSelected,
        skillMyTrace, setSkillMyTrace,
        skillPoint, setSkillPoint,
    }

    return <Context.Provider value={store}>{children}</Context.Provider>
}
