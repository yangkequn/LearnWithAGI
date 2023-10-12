"use client";
import AppFrame from '../component/appFrame';
import { useRouter } from "next/navigation";
import { use, useContext, useEffect, useState } from 'react';
import { GlobalContext } from './_app';
import { API, HGET, HKEYS, HMGET, HRANDFIELD } from '../component/api';
import { DbgKey as Title } from '@/component/api/Debugger';
import { Jwt } from '@/component/jwt';
import HistoryTopics from './skill/historyTopics';

const ListItem = ({ skillTree }) => {
  const Router = useRouter()
  //let skillTree = SkillTrees[id] ?? { Name: "", Detail: "", "Rank": 4000.0, "NumActive": 0, "NumInactive": 0, "NumDone": 0, "Items": [], "Ranks": [.0, 4000.0, 5000.0], "Weights": [3.3333333333333335, 5.833333333333334, 7.833333333333334], "TotalWeights": 2.726950354609929 }
  return <div key="skill-container" className='flex flex-col w-60 h-60 max-h-60 max-w-md flex-auto rounded-xl'
    style={{ boxShadow: "inset 0px 0px 0px 1000px rgba(255,255,255,0.25)", minWidth: 330 }} >

    < div key="title" title={skillTree?.Name} className={"w-full min-h-12 max-h-40  bg-yellow-50  rounded-t-xl text-base px-1 py-3 overflow-hidden"}>      {skillTree?.Name}    </div>
    {/* when hover on this, show the detail,swich between details  */}
    <div key="detail" className={"flex flex-col w-full h-full  overflow-scroll text-sky-700 gap-2 hover:bg-stone-100 p-1"} onClick={() => Router.push(`/skill?t=${skillTree.Name}:${skillTree.Detail}`)}  >

      <div key={`skill-topic-${skillTree?.Name}-${skillTree?.Detail}`} className='flex flex-col gap-1'>
        <div className='pl-4'>{skillTree?.Detail}</div>
      </div>
      {
        skillTree?.Sessions?.map((session, _) => <div key={`skill-topic-${session.Name}-${session.Detail}`} className='flex flex-col gap-1'>
          <div>{session?.Name}</div>  <div className='pl-4'>{session?.Detail}</div>
        </div>)
      }
    </div>
  </div >

}
export default function Home() {
  const { Params, LoggedIn, RedirectUrl, setRedirectUrl, MenuL2, setMenuL2 } = useContext(GlobalContext)
  const { search } = Params
  const [skillSearched, setSkillSearched] = useState("")
  const [skillRecommended, setSkillRecommended] = useState("")
  const Router = useRouter();
  const [SkillNames, setSkillNames] = useState([]);
  const [SkillTrees, setSkillTrees] = useState({});
  const [refreshTM, setRefreshTM] = useState(0);
  const [newskillSearched, setNewSkillSearched] = useState("")
  useEffect(() => {
    setMenuL2(<div className='flex flex-row w-full items-center justify-between s gap-8 mx-4'>
      <div>以下是搜索结果</div>
      <HistoryTopics />
    </div >)
  }, [search])
  useEffect(() => {
    //search for a skill
    if (!!search && skillSearched != search) {
      setSkillSearched(search)
      API("SkillSearch", { Name: search }).then((data) => {
        //if data of null or not array, then return
        if (!data || !Array.isArray(data)) return
        //set SkillTrees
        let treeData = data.reduce((acc, item) => {
          acc[item?.Name + ":" + item?.Detail] = item
          return acc
        }, SkillTrees)
        setSkillTrees(treeData)
        //skillNames setted after SkillTrees, to avoid early render
        var names = data.map((item) => item.Name + ":" + item.Detail)
        names = [...new Set(names)]
        setSkillNames(names)
        setRefreshTM(new Date().getTime())
      })
    }
    // 实时创建 新的课程
    // if (!!search && search.length < 6 && !newskillSearched) {
    //   //allow loading info display while searching
    //   setNewSkillSearched("searching")
    //   API("SkillGetNewTopics", { Keyword: search }).then((data) => {
    //     setNewSkillSearched(search)
    //     if (!data || !Array.isArray(data)) return
    //     //set SkillTrees
    //     let treeData = data.reduce((acc, item) => {
    //       acc[item?.Name + ":" + item?.Detail] = item
    //       return acc
    //     }, SkillTrees)
    //     setSkillTrees(treeData)
    //     //skillNames setted after SkillTrees, to avoid early render
    //     var names = data.map((item) => item.Name + ":" + item.Detail)
    //     names = [...names, ...SkillNames]
    //     names = [...new Set(names)]
    //     setSkillNames(names)
    //     setRefreshTM(new Date().getTime())
    //   })
    // }
    //case not search, but logged in, then get recommended skilltress
    if (!search && Jwt.Id() && !skillRecommended) {
      setSkillRecommended("searched")
      API("SkillRecommend", {}).then((skillTrees) => {
        //recommended skilltress responded
        if (!skillTrees || !Array.isArray(skillTrees)) return
        //set SkillTrees
        let treeData = skillTrees.reduce((acc, item) => {
          acc[item?.Name + ":" + item?.Detail] = item
          return acc
        }, SkillTrees)
        setSkillTrees(treeData)
        //skillNames setted after SkillTrees, to avoid early render
        var skillNames = skillTrees.map((skillTree) => skillTree.Name + ":" + skillTree.Detail)
        var names = [...skillNames, ...SkillNames]
        //make name unique
        names = [...new Set(names)]
        setSkillNames(names)
        setRefreshTM(new Date().getTime())
      })
    }
  }, [search, SkillNames])

  useEffect(() => {
    //wait for the search result to be load first
    if (!!search && (!SkillNames || SkillNames.length == 0)) return

    if (document.querySelector('#load-more')) {
      const intersectionObserver = new IntersectionObserver(function (entries) {
        // 如果不可见，就返回
        if (entries[0].intersectionRatio <= 0) return

        // 触发加载更多
        HRANDFIELD("SkillTree", 30).then((NewNames) => {
          HMGET("SkillTree", NewNames).then((data) => {
            // data is list ,if in exists in SkillTrees, then Append it
            let _skillTrees = data.reduce((acc, item) => {
              acc[item?.Name + ":" + item?.Detail] = item
              return acc
            }, SkillTrees)
            setSkillTrees(_skillTrees)
            var names = [...SkillNames, ...NewNames]
            setSkillNames(names)
            setRefreshTM(new Date().getTime())
          })
        })
        //scroll  up to make the load-more div invisible
        document.querySelector('#load-more').scrollIntoView({ behavior: 'smooth', block: 'center' })

      })
      // 开始观察
      intersectionObserver.observe(document.querySelector('#load-more'))

      return () => {
        intersectionObserver.disconnect()
      }
    }
  }, [SkillNames])

  return <AppFrame>
    <div className='w-full h-full px-4 pt-2'>
      {!!search && (!newskillSearched || newskillSearched == "searching") && <div className='flex flex-row justify-center animate-pulse' >
        <div>正在生成新的主题列表...</div>
      </div>}

      {/* <div>        a search box      </div> */}
      <div key={`search-results`} className='flex flex-row w-full flex-wrap columns-7 gap-8 flex-grow pt-2'>
        {
          !!refreshTM && SkillNames?.map((name) => <ListItem key={`${name}`} {...Title(name)} skillTree={SkillTrees[name]} />)
        }
      </div>
      <div id="load-more" className='flex flex-row items-center justify-center w-full h-12 text-lg font-bold text-yellow-700 hover:bg-orange-200 rounded-md px-2 ' > 正在加载更多</div>
    </div>
  </AppFrame>
}
