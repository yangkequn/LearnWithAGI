import React, { useContext, useEffect } from 'react';
import Navigator from '../appFrame/Navigator';
import "tailwindcss/tailwind.css"

export function AppFrame({ children }) {

  return <div className="flex flex-col text-center h-full w-full" style={{ height: "100vh" }} id="appFrame">
    <Navigator />
    {/* header classes
    background-color: #E7EBF0;
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white; */}
    <div className="flex h-full w-full flex-col items-center justify-center font-sans bg-[#E7EBF0]">
      {children}
    </div>
    <div className='flex h-4 text-xs bg-slate-50 items-center self-center mt-2' >闽ICP备2022003454号</div>
  </div>

}