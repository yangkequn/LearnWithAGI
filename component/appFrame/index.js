import React, { useContext, useEffect } from 'react';
import "tailwindcss/tailwind.css"
import Navigator from './navigator';

export default function AppFrame({ children }) {

  return <div id="appFrame" className="flex flex-col text-center h-full w-full" style={{ height: "100vh" }}>
    <Navigator />
    <div key="page-panel" className="flex h-full w-full flex-col items-center justify-center font-sans bg-[#E7EBF0]">
      {children}
    </div>
    <div id="frame-footer" className='flex h-4 text-xs bg-slate-50 items-center self-center mt-2' >闽ICP备2022003454号</div>
  </div>

}