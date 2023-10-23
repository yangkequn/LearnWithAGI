import React, { useContext, useEffect } from 'react';
import Navigator from './navigator';
export default function AppFrame({ children }) {

  return <div id="app" className="flex flex-col justify-start text-center w-full max-h-screen min-h-screen h-screen " style={{ height: "100vh" }}>
    <Navigator />
    <div key="page-panel" className="flex h-full w-full flex-col items-center justify-center font-sans bg-[#E7EBF0] overflow-hidden ">
      {children}
    </div>
    {/* <div id="frame-footer" className='flex h-4 text-xs bg-slate-50 items-center self-center mt-2' >闽ICP备2022003454号</div> */}
  </div>

}