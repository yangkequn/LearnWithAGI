
import React, { ReactComponentElement, useEffect, useState } from 'react';
import './globals.css'
import { Jwt } from "../component/jwt"
import type { AppProps /*, AppContext */ } from 'next/app'
import App from 'next/app'
import CustomEvents from '../component/customEvents';

interface GlobalContextType { 
  LoggedIn: boolean,
  // UpdateJWT: (removeJWT?: boolean) => void;
  // SignOut: (e: any) => void;
  RedirectUrl: string, 
  setRedirectUrl: React.Dispatch<React.SetStateAction<string>>,

  openAlert: string,
  setOpenAlert: React.Dispatch<React.SetStateAction<string>>,
  MenuL2: any,
  setMenuL2: React.Dispatch<React.SetStateAction<any>>,
  creditTM: number,
  setCreditTM: React.Dispatch<React.SetStateAction<number>>,
}
// export const GlobalContext = React.createContext<GlobalContextType>({
//   LoggedIn: false, RedirectUrl: "", setRedirectUrl: e => null, openAlert: false, SetOpenAlert: e => null, MenuL2: null, setMenuL2: e => null, creditTM: 0, setCreditTM: e => null
// });
export const GlobalContext = React.createContext<GlobalContextType>({
  LoggedIn: false, RedirectUrl: "", setRedirectUrl: e => null, openAlert: "", setOpenAlert: e => null, MenuL2: null, setMenuL2: e => null, creditTM: 0, setCreditTM: e => null
});

function MyApp({ Component, pageProps }: AppProps) {
  //const [LoggedIn, setLoggedIn] = useState(Jwt.Get().IsValid())
  const [LoggedIn, setLoggedIn] = useState(false)
  const [RedirectUrl, setRedirectUrl] = useState("")
  const [openAlert, setOpenAlert] = React.useState("");
  const [MenuL2, setMenuL2] = useState(null)
  const [creditTM, setCreditTM] = useState(0) 


  useEffect(() => {
    setLoggedIn(Jwt.Get().IsValid())

    //handle event for:   dispatchEvent(new CustomEvent(Events.Login, { detail: { status: data.IsValid() } }));
    window.addEventListener(CustomEvents.LoginStatus, (event: Event) => {
      const status = (event as CustomEvent).detail.status
      setLoggedIn(status)
    })
    //handle event for:     dispatchEvent(new CustomEvent("auth", { detail: { page: AuthPage } }));
    window.addEventListener(CustomEvents.Redirect, (event: Event) => {
      const page = (event as CustomEvent).detail.page
      setRedirectUrl(page)
    })
    return () => {
      // window.removeEventListener(Jwt.eventName, LoadJwt)
      // window.removeEventListener(HeartBeat.EventName, LoadHeartRate)
    }
  }, [])
  useEffect(() => {
    if (!openAlert) return
    //Auto close alert after 3 seconds
    setTimeout(() => { setOpenAlert(""); }, 3000);
  }, [openAlert])
  const store = {
    LoggedIn,
    RedirectUrl,
    setRedirectUrl,
    openAlert, setOpenAlert,
    MenuL2, setMenuL2,
    creditTM, setCreditTM
  }
  return <GlobalContext.Provider value={store} >
    <Component {...pageProps} />
  </GlobalContext.Provider>
}
export default MyApp
