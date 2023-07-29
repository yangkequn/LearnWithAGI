
import React, { ReactComponentElement, useEffect, useState } from 'react';
import './globals.css'
import { Jwt } from "../component/jwt"
import type { AppProps /*, AppContext */ } from 'next/app'
import App from 'next/app'
import CustomEvents from '../component/customEvents';
import { API } from '@/component/api';

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
  quota: any,
  setQuota: React.Dispatch<React.SetStateAction<any>>
}
// export const GlobalContext = React.createContext<GlobalContextType>({
//   LoggedIn: false, RedirectUrl: "", setRedirectUrl: e => null, openAlert: false, SetOpenAlert: e => null, MenuL2: null, setMenuL2: e => null, creditTM: 0, setCreditTM: e => null
// });
export const GlobalContext = React.createContext<GlobalContextType>(undefined);

function MyApp({ Component, pageProps }: AppProps) {
  //const [LoggedIn, setLoggedIn] = useState(Jwt.Get().IsValid())
  const [LoggedIn, setLoggedIn] = useState(false)
  const [RedirectUrl, setRedirectUrl] = useState("")
  const [openAlert, setOpenAlert] = React.useState("");
  const [MenuL2, setMenuL2] = useState(null)
  const [creditTM, setCreditTM] = useState(0)
  const [quota, setQuota] = useState({ AllowedDayGPT4: 0, AllowedDayGPT35: 0, AllowedDaySkill: 0 })

  const refreshQuota = () => API("OrderQuota", { Action: 0 }).then((data) => !!data && setQuota(data))
  useEffect(() => {
    //refresh quota every 5 minutes
    setInterval(() => refreshQuota, 300000);
    //refresh quota on load
    refreshQuota()
  }, [])

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
    setTimeout(() => { setOpenAlert(""); }, 5000);
  }, [openAlert])
  const store = {
    LoggedIn,
    RedirectUrl,
    setRedirectUrl,
    openAlert, setOpenAlert,
    MenuL2, setMenuL2,
    creditTM, setCreditTM,
    quota, setQuota
  }
  return <GlobalContext.Provider value={store} >
    <Component {...pageProps} />
  </GlobalContext.Provider>
}
export default MyApp
