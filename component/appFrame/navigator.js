import React, { useContext, useEffect, useState } from 'react';
//import "tailwindcss/tailwind.css";
import { GlobalContext } from "../../pages/_app"
import UserAvatar from '../../pages/Auth/avatar';
import { Jwt } from '../jwt';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';


const MenuRetro = { name: `回顾`, path: "/Retrospect", icon: null }
const MenuSignIn = { name: `登录`, path: "/Auth", icon: null }
const MenuItems = [MenuRetro]


export default function Navigator() {
  const { LoggedIn, RedirectUrl, setRedirectUrl, MenuL2 } = useContext(GlobalContext)

  const [question, setQuestion] = useState("")
  const router = useRouter()
  const pathName = usePathname()
  useEffect(() => {
    if (!RedirectUrl) return
    router.push(RedirectUrl)
    setRedirectUrl("")
  }, [RedirectUrl, router, setRedirectUrl])


  //read jwt from cookie, if not exist, redirect to login page


  return <div id="navigator" className="flex flex-col w-full h-fit font-sans font" >

    {/* background-color: #2E4052; */}
    <div id="nagivator-l1" className="bg-slate-300 flex w-full flex-row h-12 items-center whitespace-nowrap justify-center text-white text-2xl" >
      <div key="retrict-width" className='flex flex-row min-w-[600px] items-center  gap-2 '>
        <div title="Home" onClick={e => { router.push("/") }} className={`text-2xl h-full px-2 w-9 justify-center self-center py-1 rounded-lg  hover:bg-orange-200`}>
          🏠
        </div>

        <div key="searchbox-and-icon-buttons" className="flex flex-row h-full l hover:w-full items-center gap-2" >
          <div key="question-box" className="flex flex-row  flex-grow py-1 md:pl-4 border border-black/10 bg-white
           dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] self-center items-center w-full h-full  "  >
            <div className="flex flex-row w-full  h-full items-center self-center">
              <textarea className="flex flex-row flex-grow m-0 w-full min-w-[250px] h-6 border-0 bg-transparent focus:ring-0 focus-visible:ring-0 dark:bg-transparent outline-none self-center overflow-hidden text-base text-gray-700"
                value={question}
                placeholder="Ask me anything..."
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.keyCode !== 13) return
                  //if not empty
                  let value = event?.target.value
                  if (!!value) {
                    router.push("/?search=" + value)
                  }
                  // stop propagation
                  e.preventDefault()
                }}
              />
            </div>

            <div key="create-skill" className=" flex  text-2xl leading-8 px-1 pr-1">
              <div className="flex flex-row gap-1 w-fit items-center  text-gray-700 bg-slate-300 h-fit bg-transparent   dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent rounded-lg  border-black hover:bg-orange-200 px-1"
                onClick={e => router.push("/?search=" + question)}>
                <div >📚</div> <div className=' text-lg  mx-1'>课程</div>
              </div>
            </div>

          </div>

          <div className="flex flex-row gap-1 text-2xl leading-8 items-center  px-1 ml-6 text-gray-700  hover:bg-orange-200 rounded-lg " onClick={e => {
            //为避免以极高的误点击率错误提问，禁用直接提问：if (question.length == 0) return router.push("/Asks") else router.push("/Asks?q=" + question)
            router.push("/Asks")
          }} >
            {/* <div className='w-fit h-full ' >📄</div> */}
            <div className='w-fit h-full'>💬</div> <div className=' text-lg mx-1'>对话</div>
          </div>
        </div>

        <div id="nagivator-l1-menuitems " className='flex flex-row self-center max-w-2xl gap-4 '>
          {!!MenuItems && MenuItems.map((item, index) => <Link key={`menu-item-${item.name}`} href={item.path}> <button key={`menu_${item.name}`} onClick={(e) => router.push(item.path)}
            className={` text-lg text-gray-800 w-fit px-2  hover:bg-orange-200 font-sans rounded-lg ${pathName?.toLowerCase().indexOf(item.path.toLowerCase()) >= 0 ? "text-black font-bold bg-orange-200" : ""}`}
          >
            <div className='leading-8'>{item.name}</div>
          </button></Link>
          )}

          {/* display avatar if logged in */}
          <Link className={" text-zinc-700 h-full text-lg w-fit px-3 items-center"} href={LoggedIn ? "/UserCenter?page=Order&to=" + pathName : "/Auth?page=Login&to=" + pathName} >
            <UserAvatar userID={Jwt.Pub()} />
          </Link>

        </div>
      </div>
    </div >

    {/* layer 2 menu */}
    < div id="nagivator-l2 " className=" bg-slate-100 min-h-fit flex flex-row w-full h-9 items-center whitespace-nowrap justify-start text-black text-lg "  >
      {MenuL2}
    </div >

  </div >

}