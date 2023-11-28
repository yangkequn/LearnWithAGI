import React, { useContext, useEffect, useState } from 'react';
//import "tailwindcss/tailwind.css";
import { GlobalContext } from "../../pages/_app"
import UserAvatar from '../../pages/Auth/avatar';
import { Jwt } from '../jwt';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Tooltip } from '@mui/material';


const MenuRetro = { name: `回顾`, path: "/Retrospect", icon: null }
const MenuSignIn = { name: `登录`, path: "/Auth", icon: null }
const MenuItems = [MenuRetro]


export const TwoIO = ({ className }) => <svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 360 360" enableBackground="new 0 0 360 360" width="56" height="56" data-uid="o_f8g157ak0_6" className={className}><g data-uid="o_f8g157ak0_7"><g data-uid="o_f8g157ak0_8"><g data-uid="o_f8g157ak0_9"><g data-uid="o_f8g157ak0_10"><g data-uid="o_f8g157ak0_11"><path className="st0" d="M241.67 202.99c-13.18 49.17-63.71 78.35-112.88 65.17c-49.17-13.17-78.35-63.71-65.17-112.88
c13.17-49.17 63.71-78.35 112.88-65.17C225.66 103.28 254.84 153.82 241.67 202.99z" fill="#FFD300" data-uid="o_f8g157ak0_12"></path><path className="st0" fill="#FFD300" data-type="polygon" d="M90.81 242.85L42.81 242.55L66.55 200.83Z" data-uid="o_f8g157ak0_13"></path></g></g><g data-uid="o_f8g157ak0_14"><g data-uid="o_f8g157ak0_15"><path className="st1" d="M118.97 164.23c13.18 49.17 63.71 78.35 112.88 65.17c49.17-13.17 78.35-63.71 65.17-112.88
c-13.17-49.17-63.71-78.35-112.88-65.17C134.98 64.52 105.8 115.06 118.97 164.23z" fill="#2D3CE9" data-uid="o_f8g157ak0_16"></path><path className="st1" fill="#2D3CE9" data-type="polygon" d="M269.83 204.09L317.83 203.78L294.09 162.06Z" data-uid="o_f8g157ak0_17"></path></g></g></g><path className="st2" d="M229.52 229.96c5.33-8.07 9.5-17.11 12.14-26.97c13.17-49.17-16-99.71-65.17-112.88
c-15.37-4.12-30.87-4.1-45.32-0.62c-14.07 21.25-19.32 48.19-12.21 74.74C131.93 212.62 181.1 241.62 229.52 229.96z" fill="#FA0EB8" data-uid="o_f8g157ak0_18"></path></g><g data-uid="o_f8g157ak0_19"><g data-uid="o_f8g157ak0_20"><path className="st3" d="M161.58 159.74c0 4.92-3.99 8.92-8.92 8.92s-8.92-3.99-8.92-8.92c0-4.92 3.99-8.92 8.92-8.92
S161.58 154.81 161.58 159.74z" fill="#FFFFFF" data-uid="o_f8g157ak0_21"></path><path className="st3" d="M189.24 159.74c0 4.92-3.99 8.92-8.92 8.92s-8.92-3.99-8.92-8.92c0-4.92 3.99-8.92 8.92-8.92
S189.24 154.81 189.24 159.74z" fill="#FFFFFF" data-uid="o_f8g157ak0_22"></path><path className="st3" d="M216.89 159.74c0 4.92-3.99 8.92-8.92 8.92s-8.92-3.99-8.92-8.92c0-4.92 3.99-8.92 8.92-8.92
S216.89 154.81 216.89 159.74z" fill="#FFFFFF" data-uid="o_f8g157ak0_23"></path></g></g></g></svg>

export default function Navigator() {
  const { LoggedIn, RedirectUrl, setRedirectUrl, MenuL2 } = useContext(GlobalContext)

  const [question, setQuestion] = useState("")
  const router = useRouter()
  const pathName = usePathname()
  const [hint, setHint] = useState("")
  useEffect(() => {
    if (!RedirectUrl) return
    router.push(RedirectUrl)
    setRedirectUrl("")
  }, [RedirectUrl, router, setRedirectUrl])
  useEffect(() => {
    //每3秒轮显一次
    var hintContent = ["Ask life, the universe, and everything..", "voiceofai.cc AI的长话短说"]
    var index = 0
    var timer = setInterval(() => {
      setHint(hintContent[index])
      index = (index + 1) % hintContent.length
    }, 6000);
    return () => clearInterval(timer);
  }, [])



  return <div id="navigator" className="flex flex-col w-full h-fit font-sans font" >

    {/* background-color: #2E4052; */}
    <div id="nagivator-l1" className="bg-slate-300 flex w-full flex-row h-12 items-center whitespace-nowrap justify-center text-white text-2xl" >
      <div key="retrict-width" className='flex flex-row min-w-[600px] items-center  gap-2 '>
        <div className="flex flex-row items-center " onClick={e => { router.push("/") }} >
          {/* <Tooltip title={"learning using 2-io"} placement="right" >  <button> <TwoIO /></button></Tooltip> */}

          <Tooltip title={"dive in topics using 2-io"}><span><div className='mt-1' title="learn using 2-io"> <TwoIO />  </div> </span></Tooltip>
        </div>

        <div key="searchbox-and-icon-buttons" className="flex flex-row h-full l hover:w-full items-center gap-2" >
          <div key="question-box" className="flex flex-row  flex-grow py-1 md:pl-4 border border-black/10 bg-white
           dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] self-center items-center w-full h-full  "  >
            <div className="flex flex-row w-full  h-full items-center self-center">
              <textarea className="flex flex-row flex-grow m-0 w-full min-w-[285px]  h-6 border-0 bg-transparent focus:ring-0 focus-visible:ring-0 dark:bg-transparent outline-none self-center  text-base text-gray-700 resize-none flex-nowrap overflow-clip"
                value={question}
                placeholder={hint}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.keyCode !== 13) return
                  //if not empty
                  let value = event?.target.value
                  if (!!value) {
                    router.push("/?search=" + value)
                    setQuestion("")
                  }
                  // stop propagation
                  e.preventDefault()
                }}
              />
            </div>

            <div key="create-skill" className=" flex  text-2xl leading-8 px-1 pr-1">
              <div className="flex flex-row gap-1 w-fit items-center  text-gray-700 bg-slate-300 h-fit bg-transparent   dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent rounded-lg  border-black hover:bg-orange-200 px-1"
                onClick={e => router.push("/?search=" + question)}>
                <div className='' ><svg className='w-7 h-7 rounded-xl' viewBox="0 0 48 48" version="1" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 48 48">
                  <path fill="#F44336" d="M38,42H10c-2.2,0-4-1.8-4-4V10c0-2.2,1.8-4,4-4h28c2.2,0,4,1.8,4,4v28C42,40.2,40.2,42,38,42z" />
                  <polygon fill="#ffffff" points="31,24 20,16 20,32" />
                </svg></div>
                <div className=' text-lg  mx-1'>探索</div>
              </div>
            </div>

          </div>

          <div className="flex flex-row gap-1 text-2xl leading-8 items-center  px-2 ml-6 text-gray-700  hover:bg-orange-200 rounded-lg " onClick={e => {
            //为避免以极高的误点击率错误提问，禁用直接提问：if (question.length == 0) return router.push("/Asks") else router.push("/Asks?q=" + question)
            router.push("/Asks")
          }} >
            {/* <div className='w-fit h-full ' >📄</div> */}
            <div className='w-fit h-full'><svg fill="#000000" className='w-7 h-7 fill-slate-400' viewBox="0 0 24 24" id="chat" data-name="Line Color" xmlns="http://www.w3.org/2000/svg"><path id="primary" className=' fill-gray-400' d="M18.81,16.23,20,21l-4.95-2.48A9.84,9.84,0,0,1,12,19c-5,0-9-3.58-9-8s4-8,9-8,9,3.58,9,8A7.49,7.49,0,0,1,18.81,16.23Z" ></path></svg></div>
            <div className=' text-lg mx-1'>对话</div>
          </div>
        </div>

        <div id="nagivator-l1-menuitems " className='flex flex-row self-center max-w-2xl gap-4 '>
          {!!MenuItems && MenuItems.map((item, index) => <Link key={`menu-item-${item.name}`} href={item.path}> <button key={`menu_${item.name}`} onClick={(e) => router.push(item.path)}
            className={` text-lg text-gray-800 w-fit px-2  hover:bg-orange-200 font-sans rounded-lg ${pathName?.toLowerCase().indexOf(item.path.toLowerCase()) >= 0 ? "text-black font-bold bg-orange-200" : ""}`}
          >
            <div className='flex flex-row gap-2 self-center justify-center h-full items-center w-full'>
              <svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" className='w-7 h-7' viewBox="0 0 32 32" >
                <path class="dashing_een" d="M17.5,22h-2c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h2c0.276,0,0.5,0.224,0.5,0.5
	S17.776,22,17.5,22z M13,21.5c0-0.276-0.224-0.5-0.5-0.5h-2c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5h2
	C12.776,22,13,21.776,13,21.5z M8,21.5C8,21.224,7.776,21,7.5,21h-2C5.224,21,5,21.224,5,21.5S5.224,22,5.5,22h2
	C7.776,22,8,21.776,8,21.5z M22.5,21c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5S22.776,21,22.5,21z M26,26.5
	v-4.798l5.238,3.224c0.156,0.096,0.348,0.099,0.506,0.011C31.902,24.848,32,24.681,32,24.5v-16c0-0.181-0.098-0.348-0.256-0.437
	c-0.158-0.088-0.351-0.085-0.506,0.011L26,11.298V6.5C26,6.224,25.776,6,25.5,6h-25C0.224,6,0,6.224,0,6.5v20
	C0,26.776,0.224,27,0.5,27h25C25.776,27,26,26.776,26,26.5z M1,7h24v5.192c0,0.181,0.098,0.348,0.256,0.437
	c0.159,0.088,0.351,0.085,0.506-0.011L31,9.395v14.211l-5.238-3.224c-0.155-0.096-0.347-0.098-0.506-0.011
	C25.098,20.46,25,20.627,25,20.808V26H1V7z"/>
              </svg>
              <div className='leading-10 text-lg '>{item.name}</div>
            </div>
          </button></Link>
          )}

          {/* display avatar if logged in */}
          <Link className={" text-zinc-700 h-full text-lg w-fit px-3 items-center"} href={LoggedIn ? "/UserCenter?page=Order&to=" + pathName : "/Auth?page=Login&to=" + pathName} >
            <UserAvatar pubID={Jwt.Pub()} />
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